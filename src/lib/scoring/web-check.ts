/**
 * Pemeriksaan situs hasil deploy peserta.
 *
 * Lapis 1 (selalu jalan): cek HTTP status situs live.
 * Lapis 2 (opsional, jika GOOGLE_PAGESPEED_API_KEY ada): Lighthouse.
 *
 * Catatan penting soal penalti: situs yang mati TIDAK memblokir submit.
 * Submit tetap diterima, lalu skor kena potongan sesuai bobot di
 * tabel scoring_config (penalty_deployment_down).
 */

export interface WebCheckResult {
  live: boolean;
  httpStatus: number | null;
  finalUrl: string | null;
  responseTimeMs: number | null;
  /** 0-100 */
  score: number;
  error: string | null;
}

export interface LighthouseResult {
  available: boolean;
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
  /** 0-100 */
  score: number;
  error: string | null;
}

const TIMEOUT_MS = 15000;

export async function checkDeployment(url: string): Promise<WebCheckResult> {
  const empty: WebCheckResult = {
    live: false,
    httpStatus: null,
    finalUrl: null,
    responseTimeMs: null,
    score: 0,
    error: null,
  };

  if (!/^https?:\/\//i.test(url.trim())) {
    return { ...empty, error: "URL harus dimulai dengan http:// atau https://" };
  }

  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url.trim(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Beberapa platform (Vercel) membalas 403 untuk UA bot default
        "User-Agent":
          "Mozilla/5.0 (compatible; VibeCodeScoring/1.0; +https://vibe-code-learning-platform.vercel.app)",
      },
      cache: "no-store",
    });

    const elapsed = Date.now() - started;
    clearTimeout(timer);

    const live = res.status >= 200 && res.status < 400;

    let score = 0;
    if (live) {
      score += 60;
      if (elapsed < 1500) score += 20;
      else if (elapsed < 3500) score += 12;
      else if (elapsed < 8000) score += 6;
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("text/html")) score += 20;
    }

    return {
      live,
      httpStatus: res.status,
      finalUrl: res.url || url,
      responseTimeMs: elapsed,
      score: live ? Math.min(100, score) : 0,
      error: live ? null : `Situs membalas HTTP ${res.status}.`,
    };
  } catch (err: any) {
    clearTimeout(timer);
    const msg =
      err?.name === "AbortError"
        ? `Situs tidak merespons dalam ${TIMEOUT_MS / 1000} detik.`
        : err?.message ?? "Gagal membuka situs.";
    return { ...empty, responseTimeMs: Date.now() - started, error: msg };
  }
}

export async function runLighthouse(url: string): Promise<LighthouseResult> {
  const empty: LighthouseResult = {
    available: false,
    performance: null,
    accessibility: null,
    bestPractices: null,
    seo: null,
    score: 0,
    error: null,
  };

  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (!apiKey) {
    return {
      ...empty,
      error:
        "Lighthouse dilewati: GOOGLE_PAGESPEED_API_KEY belum diset. Penilaian teknis tetap jalan tanpa skor Lighthouse.",
    };
  }

  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("key", apiKey);
  endpoint.searchParams.set("strategy", "mobile");
  for (const cat of ["performance", "accessibility", "best-practices", "seo"]) {
    endpoint.searchParams.append("category", cat);
  }

  try {
    const res = await fetch(endpoint.toString(), { cache: "no-store" });
    if (!res.ok) {
      return { ...empty, error: `PageSpeed API error: ${res.status}` };
    }
    const data = await res.json();
    const cats = data?.lighthouseResult?.categories ?? {};

    const pct = (key: string): number | null =>
      typeof cats[key]?.score === "number" ? Math.round(cats[key].score * 100) : null;

    const performance = pct("performance");
    const accessibility = pct("accessibility");
    const bestPractices = pct("best-practices");
    const seo = pct("seo");

    const values = [performance, accessibility, bestPractices, seo].filter(
      (v): v is number => v !== null
    );
    const score = values.length
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 0;

    return {
      available: true,
      performance,
      accessibility,
      bestPractices,
      seo,
      score,
      error: values.length ? null : "Lighthouse tidak mengembalikan skor.",
    };
  } catch (err: any) {
    return { ...empty, error: err?.message ?? "Gagal menjalankan Lighthouse." };
  }
}
