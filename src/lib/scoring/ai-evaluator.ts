/**
 * Penilaian kualitas karya oleh AI (Google Gemini).
 *
 * Alur: ambil sampel file penting dari repo GitHub -> susun prompt ->
 * minta Gemini mengembalikan JSON terstruktur berisi 4 sub-skor (0-100),
 * ringkasan, kelebihan, dan saran perbaikan.
 *
 * Mengapa ambil sampel, bukan seluruh repo: repo peserta bisa punya
 * ratusan file & node_modules. Kita ambil file yang paling informatif
 * (README, package.json, komponen UI, API routes) agar biaya token
 * terkendali dan tetap dalam batas free tier.
 */

import { parseGithubRepo } from "./github-check";

export interface AiScores {
  codeQuality: number;
  featureCompleteness: number;
  uiUx: number;
  documentation: number;
}

export interface AiEvaluation {
  available: boolean;
  scores: AiScores;
  /** 0-100, rata-rata berbobot keempat sub-skor */
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  verdict: string;
  model: string | null;
  filesAnalyzed: string[];
  raw: unknown;
  error: string | null;
}

const MODEL = "gemini-2.0-flash";
const MAX_FILES = 14;
const MAX_CHARS_PER_FILE = 6000;
const MAX_TOTAL_CHARS = 60000;

const SKIP_DIRS =
  /(^|\/)(node_modules|\.next|dist|build|out|coverage|\.git|vendor|__pycache__)(\/|$)/i;
const SKIP_EXT =
  /\.(png|jpe?g|gif|svg|ico|webp|mp4|mp3|woff2?|ttf|eot|pdf|zip|lock|map)$/i;

/** File yang paling menunjukkan kualitas karya — diurutkan prioritas. */
const PRIORITY_PATTERNS: Array<[RegExp, number]> = [
  [/^readme\.md$/i, 100],
  [/^package\.json$/i, 95],
  [/^app\/(page|layout)\.(tsx?|jsx?)$/i, 90],
  [/^src\/app\/page\.(tsx?|jsx?)$/i, 90],
  [/^src\/app\/.*\/page\.(tsx?|jsx?)$/i, 80],
  [/^app\/.*\/page\.(tsx?|jsx?)$/i, 80],
  [/^src\/components\/.*\.(tsx?|jsx?)$/i, 70],
  [/^components\/.*\.(tsx?|jsx?)$/i, 70],
  [/route\.(ts|js)$/i, 75],
  [/^src\/lib\/.*\.(ts|js)$/i, 60],
  [/^supabase\/.*\.sql$/i, 65],
  [/^src\/types\/.*\.ts$/i, 55],
  [/tailwind\.config\.(ts|js|mjs)$/i, 50],
  [/\/page\.(tsx?|jsx?)$/i, 45],
];

function scoreFile(path: string): number {
  for (const [pattern, weight] of PRIORITY_PATTERNS) {
    if (pattern.test(path)) return weight;
  }
  if (path.endsWith(".ts") || path.endsWith(".tsx")) return 40;
  if (path.endsWith(".js") || path.endsWith(".jsx")) return 35;
  if (path.endsWith(".json")) return 25;
  if (path.endsWith(".md")) return 30;
  return 10;
}

function ghHeaders(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "vibecode-scoring",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

/** Ambil isi file paling informatif dari repo. */
export async function fetchRepoCode(
  url: string
): Promise<{ files: Array<{ path: string; content: string }>; error: string | null }> {
  const repoPath = parseGithubRepo(url);
  if (!repoPath) return { files: [], error: "URL GitHub tidak valid." };

  try {
    const metaRes = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: ghHeaders(),
      cache: "no-store",
    });
    if (!metaRes.ok) {
      return { files: [], error: `Tidak bisa membaca repo (HTTP ${metaRes.status}).` };
    }
    const meta = await metaRes.json();

    const treeRes = await fetch(
      `https://api.github.com/repos/${repoPath}/git/trees/${meta.default_branch}?recursive=1`,
      { headers: ghHeaders(), cache: "no-store" }
    );
    if (!treeRes.ok) {
      return { files: [], error: `Tidak bisa membaca daftar file (HTTP ${treeRes.status}).` };
    }
    const tree = await treeRes.json();

    const candidates = (tree.tree ?? [])
      .filter((t: any) => t.type === "blob")
      .filter((t: any) => !SKIP_DIRS.test(t.path))
      .filter((t: any) => !SKIP_EXT.test(t.path))
      .filter((t: any) => (t.size ?? 0) > 0 && (t.size ?? 0) < 400000)
      .map((t: any) => ({ path: t.path, sha: t.sha, weight: scoreFile(t.path) }))
      .sort((a: any, b: any) => b.weight - a.weight)
      .slice(0, MAX_FILES);

    const files: Array<{ path: string; content: string }> = [];
    let totalChars = 0;

    for (const f of candidates) {
      if (totalChars >= MAX_TOTAL_CHARS) break;
      try {
        const blobRes = await fetch(
          `https://api.github.com/repos/${repoPath}/git/blobs/${f.sha}`,
          { headers: ghHeaders(), cache: "no-store" }
        );
        if (!blobRes.ok) continue;
        const blob = await blobRes.json();
        if (blob.encoding !== "base64") continue;
        let content = Buffer.from(blob.content, "base64").toString("utf-8");
        if (content.length > MAX_CHARS_PER_FILE) {
          content = content.slice(0, MAX_CHARS_PER_FILE) + "\n... (dipotong)";
        }
        files.push({ path: f.path, content });
        totalChars += content.length;
      } catch {
        /* lewati file yang gagal */
      }
    }

    return { files, error: files.length ? null : "Tidak ada file kode yang bisa dianalisis." };
  } catch (err: any) {
    return { files: [], error: err?.message ?? "Gagal mengambil kode dari GitHub." };
  }
}

const SYSTEM_PROMPT = `Anda adalah penilai teknis untuk pelatihan web development pemula di Indonesia.

Peserta adalah PEMULA yang membangun aplikasi web full-stack (Next.js + Supabase) dengan bantuan AI coding agent.

Tugas Anda: nilai 4 aspek, masing-masing skor 0-100, dengan kalibrasi berikut:
- 0-30: tidak ada / sangat kurang
- 31-55: ada tapi banyak kekurangan mendasar
- 56-70: berfungsi, cukup untuk pemula
- 71-85: bagus, rapi, melampaui ekspektasi pemula
- 86-100: sangat bagus, setara developer junior profesional

KALIBRASI PENTING: peserta adalah pemula. Jangan menilai dengan standar engineer senior.
Beri apresiasi pada usaha dan hal yang berhasil berjalan. Yang penting adalah Anda KONSISTEN,
sehingga peringkat antar peserta bermakna.

Balas HANYA dengan JSON valid (tanpa markdown fence), dengan struktur:
{
  "code_quality": <number 0-100>,
  "feature_completeness": <number 0-100>,
  "ui_ux": <number 0-100>,
  "documentation": <number 0-100>,
  "summary": "<ringkasan 2-3 kalimat dalam Bahasa Indonesia>",
  "strengths": ["<kelebihan 1>", "<kelebihan 2>", "<kelebihan 3>"],
  "improvements": ["<saran 1>", "<saran 2>", "<saran 3>"],
  "verdict": "<satu kalimat penilaian keseluruhan dalam Bahasa Indonesia>"
}`;

export async function evaluateWithAi(
  projectTitle: string,
  projectDescription: string,
  githubUrl: string,
  deploymentUrl: string
): Promise<AiEvaluation> {
  const empty: AiEvaluation = {
    available: false,
    scores: { codeQuality: 0, featureCompleteness: 0, uiUx: 0, documentation: 0 },
    score: 0,
    summary: "",
    strengths: [],
    improvements: [],
    verdict: "",
    model: null,
    filesAnalyzed: [],
    raw: null,
    error: null,
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      ...empty,
      error:
        "Penilaian AI dilewati: GEMINI_API_KEY belum diset. Skor akhir hanya dihitung dari penilaian teknis.",
    };
  }

  const { files, error: fetchError } = await fetchRepoCode(githubUrl);
  if (fetchError || !files.length) {
    return { ...empty, error: fetchError ?? "Tidak ada kode untuk dianalisis." };
  }

  const codeBlock = files
    .map((f) => `--- FILE: ${f.path} ---\n${f.content}`)
    .join("\n\n");

  const userPrompt = `NILAI KARYA PESERTA BERIKUT.

JUDUL PROYEK: ${projectTitle}

DESKRIPSI YANG DITULIS PESERTA:
${projectDescription || "(peserta tidak menulis deskripsi)"}

LINK SITUS LIVE: ${deploymentUrl}

KODE SUMBER (${files.length} file terpilih):
${codeBlock}

Berikan penilaian dalam format JSON sesuai instruksi sistem.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
          },
        }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ...empty,
        filesAnalyzed: files.map((f) => f.path),
        error: `Gemini API error ${res.status}: ${detail.slice(0, 300)}`,
      };
    }

    const data = await res.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ?? "";

    let parsed: any;
    try {
      parsed = JSON.parse(text.replace(/^\s*\`\`\`(json)?/i, "").replace(/\`\`\`\s*$/, ""));
    } catch {
      return {
        ...empty,
        filesAnalyzed: files.map((f) => f.path),
        raw: { text },
        error: "AI mengembalikan format yang tidak bisa dibaca.",
      };
    }

    const clamp = (v: unknown): number => {
      const n = typeof v === "number" ? v : Number(v);
      if (!Number.isFinite(n)) return 0;
      return Math.max(0, Math.min(100, Math.round(n)));
    };

    const scores: AiScores = {
      codeQuality: clamp(parsed.code_quality),
      featureCompleteness: clamp(parsed.feature_completeness),
      uiUx: clamp(parsed.ui_ux),
      documentation: clamp(parsed.documentation),
    };

    // Rata-rata sederhana; pembobotan sesungguhnya dilakukan di scoring engine
    const score = Math.round(
      (scores.codeQuality + scores.featureCompleteness + scores.uiUx + scores.documentation) / 4
    );

    return {
      available: true,
      scores,
      score,
      summary: String(parsed.summary ?? "").slice(0, 2000),
      strengths: Array.isArray(parsed.strengths)
        ? parsed.strengths.slice(0, 6).map((s: any) => String(s))
        : [],
      improvements: Array.isArray(parsed.improvements)
        ? parsed.improvements.slice(0, 6).map((s: any) => String(s))
        : [],
      verdict: String(parsed.verdict ?? "").slice(0, 500),
      model: MODEL,
      filesAnalyzed: files.map((f) => f.path),
      raw: parsed,
      error: null,
    };
  } catch (err: any) {
    return {
      ...empty,
      filesAnalyzed: files.map((f) => f.path),
      error: err?.message ?? "Gagal menghubungi Gemini API.",
    };
  }
}
