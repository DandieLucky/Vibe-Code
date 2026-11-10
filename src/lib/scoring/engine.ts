/**
 * SCORING ENGINE — orkestrator penilaian otomatis.
 *
 * Alur penilaian satu submission:
 *   1. Cek repo GitHub   (gratis)  -> technicalScore.github
 *   2. Cek situs live    (gratis)  -> technicalScore.deployment
 *   3. Lighthouse        (opsional)-> technicalScore.lighthouse
 *   4. Evaluasi AI       (Gemini)  -> aiScore + komentar
 *   5. Gabungkan bobot + terapkan penalti -> finalScore
 *   6. Simpan ke work_submissions + submission_scores + scoring_logs
 *
 * Semua bobot dibaca dari tabel scoring_config sehingga admin bisa
 * mengubahnya tanpa deploy ulang.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import { checkGithubRepo } from "./github-check";
import { checkDeployment, runLighthouse } from "./web-check";
import { evaluateWithAi } from "./ai-evaluator";

export interface ScoringConfig {
  weight_technical: number;
  weight_ai: number;
  weight_tc_github: number;
  weight_tc_deployment: number;
  weight_tc_lighthouse: number;
  weight_ai_code: number;
  weight_ai_features: number;
  weight_ai_ui: number;
  weight_ai_docs: number;
  penalty_deployment_down: number;
  penalty_github_private: number;
  penalty_no_readme: number;
}

export const DEFAULT_CONFIG: ScoringConfig = {
  weight_technical: 40,
  weight_ai: 60,
  weight_tc_github: 30,
  weight_tc_deployment: 40,
  weight_tc_lighthouse: 30,
  weight_ai_code: 35,
  weight_ai_features: 30,
  weight_ai_ui: 20,
  weight_ai_docs: 15,
  penalty_deployment_down: 20,
  penalty_github_private: 25,
  penalty_no_readme: 5,
};

export interface ScoringOutcome {
  ok: boolean;
  finalScore: number | null;
  technicalScore: number | null;
  aiScore: number | null;
  penaltyApplied: number;
  penaltyReason: string | null;
  message: string;
  detail: Record<string, unknown>;
}

/** Ambil konfigurasi bobot dari database (fallback ke default). */
export async function loadScoringConfig(): Promise<ScoringConfig> {
  const admin = createAdminClient();
  if (!admin) return DEFAULT_CONFIG;

  const { data } = await admin
    .from("scoring_config")
    .select("*")
    .eq("id", "default")
    .maybeSingle();

  if (!data) return DEFAULT_CONFIG;

  const num = (k: keyof ScoringConfig) =>
    typeof (data as any)[k] === "number" ? (data as any)[k] : DEFAULT_CONFIG[k];

  return {
    weight_technical: num("weight_technical"),
    weight_ai: num("weight_ai"),
    weight_tc_github: num("weight_tc_github"),
    weight_tc_deployment: num("weight_tc_deployment"),
    weight_tc_lighthouse: num("weight_tc_lighthouse"),
    weight_ai_code: num("weight_ai_code"),
    weight_ai_features: num("weight_ai_features"),
    weight_ai_ui: num("weight_ai_ui"),
    weight_ai_docs: num("weight_ai_docs"),
    penalty_deployment_down: num("penalty_deployment_down"),
    penalty_github_private: num("penalty_github_private"),
    penalty_no_readme: num("penalty_no_readme"),
  };
}

/** Bobot relatif -> persentase yang berjumlah 100. */
function normalize(weights: number[]): number[] {
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) return weights.map(() => 0);
  return weights.map((w) => (w / total) * 100);
}

export async function scoreSubmission(submissionId: string): Promise<ScoringOutcome> {
  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      finalScore: null,
      technicalScore: null,
      aiScore: null,
      penaltyApplied: 0,
      penaltyReason: null,
      message: "SUPABASE_SERVICE_ROLE_KEY belum diset — penilaian otomatis tidak bisa berjalan.",
      detail: {},
    };
  }

  const started = Date.now();

  // Tandai sedang diproses
  await admin
    .from("work_submissions")
    .update({ scoring_status: "processing", scoring_error: null })
    .eq("id", submissionId);

  const { data: sub, error: subErr } = await admin
    .from("work_submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  if (subErr || !sub) {
    await admin
      .from("work_submissions")
      .update({ scoring_status: "failed", scoring_error: "Submission tidak ditemukan." })
      .eq("id", submissionId);
    return {
      ok: false,
      finalScore: null,
      technicalScore: null,
      aiScore: null,
      penaltyApplied: 0,
      penaltyReason: null,
      message: "Submission tidak ditemukan.",
      detail: {},
    };
  }

  const config = await loadScoringConfig();
  const log = async (
    step: string,
    status: string,
    detail: Record<string, unknown>,
    httpStatus?: number,
    errorMessage?: string
  ) => {
    await admin.from("scoring_logs").insert({
      submission_id: submissionId,
      step,
      status,
      http_status: httpStatus ?? null,
      detail,
      error_message: errorMessage ?? null,
    });
  };

  // ---------- 1. GITHUB ----------
  const github = await checkGithubRepo(sub.github_url);
  await log("github_check", github.error ? "failed" : "success", {
    repo: github.repoName,
    fileCount: github.fileCount,
    hasReadme: github.hasReadme,
    score: github.score,
  }, undefined, github.error ?? undefined);

  // ---------- 2. SITUS LIVE ----------
  const web = await checkDeployment(sub.deployment_url);
  await log("deployment_check", web.live ? "success" : "failed", {
    httpStatus: web.httpStatus,
    responseTimeMs: web.responseTimeMs,
    score: web.score,
  }, web.httpStatus ?? undefined, web.error ?? undefined);

  // ---------- 3. LIGHTHOUSE ----------
  const lighthouse = web.live
    ? await runLighthouse(sub.deployment_url)
    : { available: false, performance: null, accessibility: null, bestPractices: null, seo: null, score: 0, error: "Dilewati karena situs tidak aktif." };

  await log(
    "lighthouse",
    lighthouse.available ? "success" : "skipped",
    { performance: lighthouse.performance, score: lighthouse.score },
    undefined,
    lighthouse.error ?? undefined
  );

  // ---------- 4. AI ----------
  const ai = await evaluateWithAi(
    sub.project_title,
    sub.project_description,
    sub.github_url,
    sub.deployment_url
  );
  await log(
    "ai_eval",
    ai.available ? "success" : "failed",
    { model: ai.model, filesAnalyzed: ai.filesAnalyzed.length, score: ai.score },
    undefined,
    ai.error ?? undefined
  );

  // ---------- 5. GABUNGKAN ----------
  // 5a. Skor teknis (sub-bobot dinormalisasi agar Lighthouse opsional tidak menekan skor)
  const tcWeights = [config.weight_tc_github, config.weight_tc_deployment];
  const tcValues = [github.score, web.score];

  if (lighthouse.available) {
    tcWeights.push(config.weight_tc_lighthouse);
    tcValues.push(lighthouse.score);
  }

  const tcNorm = normalize(tcWeights);
  const technicalScore = Math.round(
    tcValues.reduce((sum, v, i) => sum + v * (tcNorm[i] / 100), 0)
  );

  // 5b. Skor AI
  let aiScore = 0;
  if (ai.available) {
    const aiWeights = [
      config.weight_ai_code,
      config.weight_ai_features,
      config.weight_ai_ui,
      config.weight_ai_docs,
    ];
    const aiValues = [
      ai.scores.codeQuality,
      ai.scores.featureCompleteness,
      ai.scores.uiUx,
      ai.scores.documentation,
    ];
    const aiNorm = normalize(aiWeights);
    aiScore = Math.round(aiValues.reduce((sum, v, i) => sum + v * (aiNorm[i] / 100), 0));
  }

  // 5c. Skor akhir — kalau AI tidak tersedia, skor teknis jadi penentu tunggal
  let finalScore: number;
  if (ai.available) {
    const mainNorm = normalize([config.weight_technical, config.weight_ai]);
    finalScore = technicalScore * (mainNorm[0] / 100) + aiScore * (mainNorm[1] / 100);
  } else {
    finalScore = technicalScore;
  }

  // 5d. Penalti
  const penalties: string[] = [];
  let penaltyTotal = 0;

  if (!web.live) {
    penaltyTotal += config.penalty_deployment_down;
    penalties.push(`situs tidak dapat dibuka (-${config.penalty_deployment_down})`);
  }
  if (github.repoName && !github.isPublic) {
    penaltyTotal += config.penalty_github_private;
    penalties.push(`repository tidak publik (-${config.penalty_github_private})`);
  } else if (!github.reachable) {
    penaltyTotal += config.penalty_github_private;
    penalties.push(`repository tidak dapat diakses (-${config.penalty_github_private})`);
  }
  if (github.reachable && !github.hasReadme) {
    penaltyTotal += config.penalty_no_readme;
    penalties.push(`tidak ada README (-${config.penalty_no_readme})`);
  }

  const finalWithPenalty = Math.max(0, Math.round((finalScore - penaltyTotal) * 100) / 100);
  const duration = Date.now() - started;

  // ---------- 6. SIMPAN ----------
  await admin
    .from("work_submissions")
    .update({
      is_github_public: github.isPublic,
      is_deployment_live: web.live,
      deployment_http_status: web.httpStatus,
      lighthouse_performance: lighthouse.performance,
      lighthouse_accessibility: lighthouse.accessibility,
      lighthouse_best_practices: lighthouse.bestPractices,
      lighthouse_seo: lighthouse.seo,
      repo_file_count: github.fileCount,
      repo_language: github.language,
      repo_has_readme: github.hasReadme,
      repo_last_commit: github.lastCommit,
      technical_score: technicalScore,
      ai_score: ai.available ? aiScore : null,
      final_score: finalWithPenalty,
      score: Math.round(finalWithPenalty),
      ai_summary: ai.summary || null,
      ai_strengths: ai.strengths,
      ai_improvements: ai.improvements,
      penalty_applied: penaltyTotal,
      penalty_reason: penalties.length ? penalties.join("; ") : null,
      scoring_status: "completed",
      scoring_error: ai.error && !ai.available ? ai.error : null,
      scored_at: new Date().toISOString(),
      scoring_duration_ms: duration,
    })
    .eq("id", submissionId);

  // Simpan breakdown detail
  await admin.from("submission_scores").upsert(
    {
      submission_id: submissionId,
      score_github_reachable: github.score,
      score_deployment_live: web.score,
      score_lighthouse: lighthouse.available ? lighthouse.score : null,
      score_code_quality: ai.available ? ai.scores.codeQuality : null,
      score_feature_completeness: ai.available ? ai.scores.featureCompleteness : null,
      score_ui_ux: ai.available ? ai.scores.uiUx : null,
      score_documentation: ai.available ? ai.scores.documentation : null,
      weights: config as unknown as Record<string, number>,
      ai_model: ai.model,
      ai_raw_response: ai.raw as object,
      ai_verdict: ai.verdict || null,
      technical_checks: {
        github,
        deployment: web,
      },
      lighthouse_json: lighthouse.available
        ? (lighthouse as unknown as Record<string, unknown>)
        : null,
    },
    { onConflict: "submission_id" }
  );

  return {
    ok: true,
    finalScore: finalWithPenalty,
    technicalScore,
    aiScore: ai.available ? aiScore : null,
    penaltyApplied: penaltyTotal,
    penaltyReason: penalties.length ? penalties.join("; ") : null,
    message: "Penilaian selesai.",
    detail: {
      github: { pass: github.reachable, score: github.score, error: github.error },
      deployment: { live: web.live, status: web.httpStatus, score: web.score, error: web.error },
      lighthouse: {
        available: lighthouse.available,
        score: lighthouse.score,
        error: lighthouse.error,
      },
      ai: { available: ai.available, score: ai.available ? aiScore : null, error: ai.error },
      durationMs: duration,
    },
  };
}

/** Nilai semua submission yang belum berstatus completed. */
export async function scorePendingSubmissions(limit = 25): Promise<{
  processed: number;
  results: Array<{ id: string; code: string | null; ok: boolean; finalScore: number | null }>;
}> {
  const admin = createAdminClient();
  if (!admin) return { processed: 0, results: [] };

  const { data } = await admin
    .from("work_submissions")
    .select("id, submission_code")
    .in("scoring_status", ["pending", "failed"])
    .order("submitted_at", { ascending: true })
    .limit(limit);

  const results: Array<{ id: string; code: string | null; ok: boolean; finalScore: number | null }> = [];

  for (const row of data ?? []) {
    const outcome = await scoreSubmission(row.id);
    results.push({
      id: row.id,
      code: row.submission_code,
      ok: outcome.ok,
      finalScore: outcome.finalScore,
    });
  }

  return { processed: results.length, results };
}

/** Papan peringkat: top N karya yang sudah dinilai. */
export async function getLeaderboard(limit = 10) {
  const admin = createAdminClient();
  if (!admin) return [];

  const { data } = await admin
    .from("work_submissions")
    .select(
      "id, submission_code, full_name, institution, project_title, github_url, deployment_url, submitted_at, final_score, technical_score, ai_score, penalty_applied, penalty_reason, lighthouse_performance, is_deployment_live, ai_summary, scoring_status"
    )
    .eq("scoring_status", "completed")
    .order("final_score", { ascending: false, nullsFirst: false })
    .order("submitted_at", { ascending: true })
    .limit(limit);

  return (data ?? []).map((row, i) => ({ ...row, rank_position: i + 1 }));
}
