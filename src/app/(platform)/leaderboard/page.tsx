import Link from "next/link";
import {
  Trophy,
  Medal,
  Award,
  Github,
  ExternalLink,
  ChevronRight,
  Star,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { getLeaderboard } from "@/lib/scoring/engine";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function rankStyle(rank: number) {
  if (rank === 1)
    return { ring: "ring-2 ring-amber-400", bg: "bg-amber-50", text: "text-amber-700" };
  if (rank === 2)
    return { ring: "ring-2 ring-slate-300", bg: "bg-slate-50", text: "text-slate-600" };
  if (rank === 3)
    return { ring: "ring-2 ring-orange-300", bg: "bg-orange-50", text: "text-orange-700" };
  return { ring: "", bg: "bg-white", text: "text-slate-500" };
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-amber-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
  if (rank === 3) return <Award className="w-5 h-5 text-orange-500" />;
  return <span className="text-sm font-bold text-slate-400">#{rank}</span>;
}

export default async function LeaderboardPage() {
  let entries: any[] = [];
  let dbUnavailable = false;

  try {
    entries = await getLeaderboard(10);
  } catch {
    dbUnavailable = true;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-800">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800">Papan Peringkat</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-md">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                10 Karya Terbaik
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Dinilai otomatis dari kualitas kode, situs live, dan performa
              </p>
            </div>
          </div>
        </div>

        {dbUnavailable && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Papan peringkat belum dapat dimuat. Pastikan database sudah terkonfigurasi
              (environment variable Supabase sudah diisi di Vercel).
            </span>
          </div>
        )}

        {!dbUnavailable && entries.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h2 className="font-bold text-slate-800 mb-1">Belum ada karya yang dinilai</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Papan peringkat akan terisi otomatis setelah peserta mengumpulkan karya dan
              sistem selesai menilai.
            </p>
          </div>
        )}

        {/* Daftar peringkat */}
        <div className="space-y-3">
          {entries.map((e) => {
            const style = rankStyle(e.rank_position);
            return (
              <div
                key={e.id}
                className={`rounded-2xl border border-slate-200 ${style.bg} ${style.ring} p-5 shadow-xs hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Rank + Skor */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                      <RankIcon rank={e.rank_position} />
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-extrabold ${style.text} leading-none`}>
                        {Math.round(e.final_score ?? 0)}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                        Skor
                      </div>
                    </div>
                  </div>

                  {/* Info karya */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-slate-900 truncate">{e.project_title}</h3>
                      {e.submission_code && (
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                          {e.submission_code}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">
                      {e.full_name}
                      {e.institution ? ` · ${e.institution}` : ""}
                    </p>

                    {/* Sub-skor */}
                    <div className="flex items-center gap-3 mt-2 flex-wrap text-[11px]">
                      <span className="text-slate-500">
                        Teknis: <strong className="text-slate-700">{Math.round(e.technical_score ?? 0)}</strong>
                      </span>
                      <span className="text-slate-500">
                        AI: <strong className="text-slate-700">{Math.round(e.ai_score ?? 0)}</strong>
                      </span>
                      {e.lighthouse_performance != null && (
                        <span className="text-slate-500 flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500" />
                          Performa: <strong className="text-slate-700">{Math.round(e.lighthouse_performance)}</strong>
                        </span>
                      )}
                      {Number(e.penalty_applied) > 0 && (
                        <span className="text-rose-600 font-semibold">
                          Penalti −{e.penalty_applied}
                        </span>
                      )}
                    </div>

                    {e.penalty_reason && (
                      <p className="text-[11px] text-rose-600 mt-1">⚠ {e.penalty_reason}</p>
                    )}

                    <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Dikumpulkan: {formatDate(e.submitted_at)}
                    </p>
                  </div>

                  {/* Tombol cek karya */}
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <a
                      href={e.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                    <a
                      href={e.deployment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        e.is_deployment_live
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {e.is_deployment_live ? "Situs Live" : "Situs Mati"}
                    </a>
                  </div>
                </div>

                {/* Ringkasan AI */}
                {e.ai_summary && (
                  <div className="mt-3 pt-3 border-t border-slate-200/70">
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      <strong className="text-slate-700">Penilaian AI:</strong> {e.ai_summary}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-8">
          Peringkat dihitung otomatis: 40% penilaian teknis · 60% penilaian AI · dikurangi penalti.
          Jika skor sama, yang mengumpulkan lebih awal berada di atas.
        </p>
      </div>
    </div>
  );
}
