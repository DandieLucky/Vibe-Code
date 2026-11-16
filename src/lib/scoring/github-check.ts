/**
 * Pemeriksaan repository GitHub peserta.
 *
 * Menggunakan REST API publik GitHub. Jika GITHUB_TOKEN tersedia,
 * rate limit naik dari 60/jam menjadi 5000/jam — penting saat menilai
 * 100 peserta sekaligus dalam waktu berdekatan.
 */

export interface GithubCheckResult {
  reachable: boolean;
  isPublic: boolean;
  repoName: string | null;
  fileCount: number;
  kotlinFileCount: number;
  hasGradleFile: boolean;
  hasManifest: boolean;
  hasCompose: boolean;
  hasRoom: boolean;
  hasCredentialManager: boolean;
  language: string | null;
  hasReadme: boolean;
  lastCommit: string | null;
  stars: number;
  description: string | null;
  error: string | null;
  /** 0-100 */
  score: number;
}

interface GitTreeBlob {
  path?: string;
  type?: string;
  sha?: string;
  size?: number;
}

/** Ubah URL GitHub apa pun menjadi "owner/repo". */
export function parseGithubRepo(url: string): string | null {
  try {
    const cleaned = url.trim().replace(/\.git$/, "").replace(/\/$/, "");
    const match = cleaned.match(
      /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\s]+)\/([^\/\s?#]+)/i
    );
    if (!match) return null;
    return `${match[1]}/${match[2]}`;
  } catch {
    return null;
  }
}

export function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "composelab-smkn1-scoring",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function checkGithubRepo(url: string): Promise<GithubCheckResult> {
  const empty: GithubCheckResult = {
    reachable: false,
    isPublic: false,
    repoName: null,
    fileCount: 0,
    kotlinFileCount: 0,
    hasGradleFile: false,
    hasManifest: false,
    hasCompose: false,
    hasRoom: false,
    hasCredentialManager: false,
    language: null,
    hasReadme: false,
    lastCommit: null,
    stars: 0,
    description: null,
    error: null,
    score: 0,
  };

  const repoPath = parseGithubRepo(url);
  if (!repoPath) {
    return { ...empty, error: "URL GitHub tidak valid atau bukan tautan repository." };
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: githubHeaders(),
      cache: "no-store",
    });

    if (res.status === 404) {
      return {
        ...empty,
        repoName: repoPath,
        error:
          "Repository tidak ditemukan atau bersifat PRIVATE. Pastikan repo sudah diatur publik.",
      };
    }

    if (res.status === 403 || res.status === 429) {
      return {
        ...empty,
        repoName: repoPath,
        error: "Kuota GitHub API habis. Coba lagi nanti atau set GITHUB_TOKEN.",
      };
    }

    if (!res.ok) {
      return { ...empty, repoName: repoPath, error: `GitHub API error: ${res.status}` };
    }

    const data = await res.json();

    // Hitung jumlah file & deteksi struktur proyek Android Kotlin
    let fileCount = 0;
    let kotlinFileCount = 0;
    let hasGradleFile = false;
    let hasManifest = false;
    let hasCompose = false;
    let hasRoom = false;
    let hasCredentialManager = false;
    let hasReadme = false;
    try {
      const treeRes = await fetch(
        `https://api.github.com/repos/${repoPath}/git/trees/${data.default_branch}?recursive=1`,
        { headers: githubHeaders(), cache: "no-store" }
      );
      if (treeRes.ok) {
        const tree = await treeRes.json();
        const rawTree: GitTreeBlob[] = Array.isArray(tree.tree) ? tree.tree : [];
        const blobs = rawTree.filter((t) => t.type === "blob");
        fileCount = blobs.length;
        hasReadme = blobs.some((b) =>
          /^readme(\.md|\.txt)?$/i.test((b.path ?? "").split("/").pop() ?? "")
        );
        hasGradleFile = blobs.some((b) =>
          /build\.gradle(\.kts)?$/i.test(b.path ?? "")
        );
        hasManifest = blobs.some((b) =>
          /AndroidManifest\.xml$/i.test(b.path ?? "")
        );
        kotlinFileCount = blobs.filter((b) =>
          /\.kt$/i.test(b.path ?? "")
        ).length;
        hasRoom = blobs.some((b) =>
          /(Entity|Dao|Database)\.kt$/i.test(b.path ?? "")
        );
        hasCompose = blobs.some((b) =>
          /(Screen|Card|Dialog|Theme)\.kt$/i.test(b.path ?? "")
        );
        hasCredentialManager = blobs.some((b) =>
          /(Auth|Credential|Login).*\.kt$/i.test(b.path ?? "")
        );
      }
    } catch {
      /* tree opsional */
    }

    // Skor teknis repo Android (0-100)
    let score = 0;
    score += 25; // publik & bisa diakses
    if (hasGradleFile) score += 10;
    if (hasManifest) score += 10;
    if (kotlinFileCount >= 5) score += 15;
    else if (kotlinFileCount >= 2) score += 8;
    else if (fileCount >= 5) score += 5;
    if (hasRoom) score += 10;
    if (hasCompose) score += 5;
    if (hasCredentialManager) score += 5;
    if (hasReadme) score += 15;
    if (data.description) score += 5;

    return {
      reachable: true,
      isPublic: !data.private,
      repoName: repoPath,
      fileCount,
      kotlinFileCount,
      hasGradleFile,
      hasManifest,
      hasCompose,
      hasRoom,
      hasCredentialManager,
      language: data.language ?? null,
      hasReadme,
      lastCommit: data.pushed_at ?? null,
      stars: data.stargazers_count ?? 0,
      description: data.description ?? null,
      error: null,
      score: Math.min(100, score),
    };
  } catch (err: any) {
    return { ...empty, repoName: repoPath, error: err?.message ?? "Gagal menghubungi GitHub." };
  }
}
