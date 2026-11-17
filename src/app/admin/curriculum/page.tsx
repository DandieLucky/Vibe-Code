"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { MODULES_DATA, type FullModule } from "@/lib/data/curriculum-data";
import type { Lesson } from "@/types/database";
import {
  BlogspotLessonEditor,
  lessonToDraft,
  type BlogspotLessonDraft,
} from "@/components/admin/blogspot-lesson-editor";

export default function AdminCurriculumCMSPage() {
  const [modules, setModules] = useState<FullModule[]>(MODULES_DATA);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(MODULES_DATA[0]?.id || "");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Module modal state
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<{
    id?: string;
    module_number: number;
    title: string;
    slug: string;
    description: string;
    estimated_minutes: number;
    difficulty_level: string;
    is_published: boolean;
    order_index: number;
  }>({
    module_number: 1,
    title: "",
    slug: "",
    description: "",
    estimated_minutes: 45,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 1,
  });

  // Blogspot full-panel lesson editor state
  const [lessonEditorDraft, setLessonEditorDraft] = useState<BlogspotLessonDraft | null>(null);

  const selectedModule =
    modules.find((m) => m.id === selectedModuleId) ?? modules[0] ?? null;

  const showNotice = (type: "ok" | "err", text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const loadCurriculum = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/curriculum", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.modules)) {
          setModules(data.modules);
          if (data.modules.length > 0) {
            setSelectedModuleId((prev) =>
              data.modules.some((m: FullModule) => m.id === prev) ? prev : data.modules[0].id
            );
          }
        }
      }
    } catch {
      // Tetap gunakan data bawaan jika berjalan offline/demo
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCurriculum();
  }, [loadCurriculum]);

  const callCurriculumApi = async (payload: Record<string, any>) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        showNotice("err", data.error || "Gagal menyimpan perubahan ke database.");
        return null;
      }
      if (Array.isArray(data.modules)) {
        setModules(data.modules);
      }
      return data;
    } catch (err: any) {
      showNotice("err", err?.message || "Terjadi kesalahan jaringan.");
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // ---------- MODULE ACTIONS ----------
  const handleOpenAddModule = () => {
    const nextNum = modules.length + 1;
    setEditingModule({
      module_number: nextNum,
      title: "",
      slug: "",
      description: "",
      estimated_minutes: 45,
      difficulty_level: "Pemula",
      is_published: true,
      order_index: nextNum,
    });
    setModuleModalOpen(true);
  };

  const handleOpenEditModule = (m: FullModule) => {
    setEditingModule({
      id: m.id,
      module_number: m.module_number,
      title: m.title,
      slug: m.slug,
      description: m.description,
      estimated_minutes: m.estimated_minutes,
      difficulty_level: m.difficulty_level,
      is_published: m.is_published,
      order_index: m.order_index,
    });
    setModuleModalOpen(true);
  };

  const handleSaveModule = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await callCurriculumApi({
      action: "upsert_module",
      module: editingModule,
    });
    if (res) {
      if (res.id) setSelectedModuleId(res.id);
      setModuleModalOpen(false);
      showNotice("ok", editingModule.id ? "Modul berhasil diperbarui." : "Modul baru berhasil ditambahkan.");
    }
  };

  const handleToggleModulePublish = async (m: FullModule) => {
    const res = await callCurriculumApi({
      action: "upsert_module",
      module: {
        id: m.id,
        module_number: m.module_number,
        title: m.title,
        slug: m.slug,
        description: m.description,
        estimated_minutes: m.estimated_minutes,
        difficulty_level: m.difficulty_level,
        is_published: !m.is_published,
        order_index: m.order_index,
      },
    });
    if (res) {
      showNotice(
        "ok",
        !m.is_published ? "Modul dipublikasikan ke siswa." : "Modul disimpan sebagai draf."
      );
    }
  };

  const handleDeleteModule = async (id: string) => {
    if (!confirm("Hapus modul ini beserta seluruh materi di dalamnya?")) return;
    const res = await callCurriculumApi({ action: "delete_module", moduleId: id });
    if (res) {
      const remaining: FullModule[] = res.modules || [];
      if (remaining.length > 0) setSelectedModuleId(remaining[0].id);
      showNotice("ok", "Modul berhasil dihapus.");
    }
  };

  const handleMoveModule = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= modules.length) return;
    const reordered = [...modules];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved);
    setModules(reordered);
    await callCurriculumApi({
      action: "reorder_modules",
      orderedIds: reordered.map((m) => m.id),
    });
  };

  // ---------- LESSON (BLOGSPOT POST) ACTIONS ----------
  const handleOpenAddLesson = () => {
    if (!selectedModule) return;
    setLessonEditorDraft(
      lessonToDraft(selectedModule.id, undefined, selectedModule.lessons.length + 1)
    );
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    if (!selectedModule) return;
    setLessonEditorDraft(lessonToDraft(selectedModule.id, lesson));
  };

  const handleSaveLessonDraft = async (draft: BlogspotLessonDraft) => {
    const instruksi = draft.promptInstruksi
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const batasan = draft.promptBatasan
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const hasPrompt =
      draft.promptTujuan.trim() || instruksi.length > 0 || batasan.length > 0;

    const antigravity_prompt = hasPrompt
      ? {
          tujuan: draft.promptTujuan.trim() || "Menyelesaikan materi praktik.",
          konteks: draft.promptKonteks.trim() || "Proyek terstruktur.",
          instruksi,
          batasan,
          hasilAkhir: draft.promptHasilAkhir.trim() || "Fitur berjalan sesuai rancangan.",
          validasi: draft.promptValidasi.trim() || "Pastikan tidak ada error saat dijalankan.",
          rawPrompt: `[TUJUAN]\n${draft.promptTujuan}\n\n[KONTEKS]\n${draft.promptKonteks}\n\n[INSTRUKSI]\n${draft.promptInstruksi}\n\n[BATASAN]\n${draft.promptBatasan}\n\n[HASIL AKHIR]\n${draft.promptHasilAkhir}\n\n[VALIDASI]\n${draft.promptValidasi}`.trim(),
        }
      : undefined;

    const validation_check = draft.validation_check_text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      action: "upsert_lesson",
      lesson: {
        id: draft.id,
        module_id: draft.module_id,
        lesson_number: draft.lesson_number,
        title: draft.title,
        slug: draft.slug,
        description: draft.description,
        estimated_minutes: draft.estimated_minutes,
        order_index: draft.lesson_number,
        is_published: draft.is_published,
        objective: draft.objective || undefined,
        concept_explanation: draft.concept_explanation,
        expected_result: draft.expected_result || undefined,
        validation_check: validation_check.length > 0 ? validation_check : undefined,
        code_snippets: draft.code_snippets.length > 0 ? draft.code_snippets : undefined,
        antigravity_prompt,
      },
    };

    const res = await callCurriculumApi(payload);
    if (res) {
      setLessonEditorDraft(null);
      showNotice(
        "ok",
        draft.is_published
          ? "Materi berhasil disimpan dan dipublikasikan!"
          : "Materi disimpan sebagai draf."
      );
    }
  };

  const handleToggleLessonPublish = async (lesson: Lesson) => {
    const res = await callCurriculumApi({
      action: "upsert_lesson",
      lesson: {
        ...lesson,
        is_published: !lesson.is_published,
      },
    });
    if (res) {
      showNotice(
        "ok",
        !lesson.is_published ? "Materi dipublikasikan." : "Materi diubah ke draf."
      );
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Hapus materi ini secara permanen?")) return;
    const res = await callCurriculumApi({ action: "delete_lesson", lessonId });
    if (res) {
      showNotice("ok", "Materi berhasil dihapus.");
    }
  };

  const handleMoveLesson = async (index: number, direction: -1 | 1) => {
    if (!selectedModule) return;
    const target = index + direction;
    if (target < 0 || target >= selectedModule.lessons.length) return;
    const reordered = [...selectedModule.lessons];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved);
    await callCurriculumApi({
      action: "reorder_lessons",
      orderedIds: reordered.map((l) => l.id),
    });
  };

  const handleResetDefaults = async () => {
    if (
      !confirm(
        "Sinkronkan database dengan 10 modul kurikulum bawaan terbaru? Perubahan kustom sebelumnya di database akan diganti."
      )
    ) {
      return;
    }
    const res = await callCurriculumApi({ action: "reset_defaults" });
    if (res) {
      if (Array.isArray(res.modules) && res.modules.length > 0) {
        setSelectedModuleId(res.modules[0].id);
      }
      showNotice(
        "ok",
        res.warning || "Database berhasil disinkronkan dengan 10 modul kurikulum bawaan."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rule">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="teal">CMS Kurikulum &amp; Materi</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Manajemen Modul &amp; Postingan Materi
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Tambah, ubah, atur urutan, terbitkan atau simpan sebagai draf materi layaknya mengelola blog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetDefaults}
            disabled={isLoading || isSaving}
            className="gap-1.5 text-xs"
          >
            <span>Sinkronkan Bawaan (10 Modul)</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loadCurriculum}
            disabled={isLoading || isSaving}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin motion-reduce:animate-none" : ""}`} />
            <span>Muat Ulang</span>
          </Button>
          <Button
            type="button"
            variant="accent"
            size="sm"
            onClick={handleOpenAddModule}
            className="gap-2 font-bold shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Modul Baru</span>
          </Button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            statusMsg.type === "ok"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-rose-50 border-rose-300 text-rose-900"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Blogspot-style Full Editor OR Split Module + Lesson List */}
      {lessonEditorDraft && selectedModule ? (
        <BlogspotLessonEditor
          moduleTitle={`Modul ${selectedModule.module_number}: ${selectedModule.title}`}
          initialDraft={lessonEditorDraft}
          isSaving={isSaving}
          onCancel={() => setLessonEditorDraft(null)}
          onSave={handleSaveLessonDraft}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Modules Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-muted mb-2">
              <span>Daftar Modul ({modules.length})</span>
              <span>Urutan</span>
            </div>

            <div className="space-y-2 max-h-[72vh] overflow-y-auto pr-1">
              {modules.map((m, idx) => {
                const isSelected = selectedModule?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModuleId(m.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-ink text-sheet border-ink-2 shadow-sm"
                        : "bg-sheet text-ink border-rule hover:bg-paper"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? "bg-accent text-sheet" : "bg-paper-2 text-ink-2"
                          }`}
                        >
                          Modul {m.module_number}
                        </span>
                        {!m.is_published && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            Draf
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          title="Geser ke atas"
                          disabled={idx === 0 || isSaving}
                          onClick={() => handleMoveModule(idx, -1)}
                          className="p-1 rounded hover:bg-paper-3/20 disabled:opacity-30"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          title="Geser ke bawah"
                          disabled={idx === modules.length - 1 || isSaving}
                          onClick={() => handleMoveModule(idx, 1)}
                          className="p-1 rounded hover:bg-paper-3/20 disabled:opacity-30"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xs font-bold line-clamp-1">{m.title}</h3>
                    <span className="text-[11px] opacity-75">
                      {m.lessons.length} Materi
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Module & Blogspot-like Posts List */}
          <div className="lg:col-span-8 space-y-6">
            {selectedModule ? (
              <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-rule">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-accent bg-accent-soft px-2 py-0.5 rounded border border-rule">
                        Modul {selectedModule.module_number}
                      </span>
                      <Badge variant="default" className="text-[10px]">
                        {selectedModule.difficulty_level}
                      </Badge>
                      <Badge variant={selectedModule.is_published ? "success" : "warning"} className="text-[10px]">
                        {selectedModule.is_published ? "Terbit" : "Draf"}
                      </Badge>
                      <span className="text-xs text-muted">
                        ±{selectedModule.estimated_minutes} Menit
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-ink">{selectedModule.title}</h2>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      {selectedModule.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleModulePublish(selectedModule)}
                      disabled={isSaving}
                      className="text-xs gap-1"
                    >
                      {selectedModule.is_published ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Jadikan Draf</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Terbitkan</span>
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditModule(selectedModule)}
                      className="text-xs gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Button>
                    {modules.length > 1 && (
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        disabled={isSaving}
                        onClick={() => handleDeleteModule(selectedModule.id)}
                        className="text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Lessons Section Header */}
                <div className="pt-4 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-muted">
                    Postingan Materi di Modul Ini ({selectedModule.lessons.length})
                  </h3>
                  <Button
                    type="button"
                    variant="accent"
                    size="sm"
                    onClick={handleOpenAddLesson}
                    className="text-xs gap-1 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tulis Materi Baru</span>
                  </Button>
                </div>

                {/* Lessons List */}
                <div className="mt-4 space-y-2.5">
                  {selectedModule.lessons.length === 0 ? (
                    <div className="p-8 text-center rounded-xl border border-dashed border-rule bg-paper">
                      <p className="text-sm font-bold text-ink">Belum ada materi di modul ini</p>
                      <p className="text-xs text-muted mt-1">
                        Klik tombol Tulis Materi Baru untuk mulai menulis artikel materi pertama.
                      </p>
                    </div>
                  ) : (
                    selectedModule.lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-rule bg-paper hover:bg-sheet transition-colors gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs font-bold text-muted w-9 shrink-0">
                            #{selectedModule.module_number}.{lesson.lesson_number}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-ink truncate">
                                {lesson.title}
                              </span>
                              {!lesson.is_published && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">
                                  Draf
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted line-clamp-1">
                              {lesson.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            title="Geser ke atas"
                            disabled={idx === 0 || isSaving}
                            onClick={() => handleMoveLesson(idx, -1)}
                            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-paper-2 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Geser ke bawah"
                            disabled={idx === selectedModule.lessons.length - 1 || isSaving}
                            onClick={() => handleMoveLesson(idx, 1)}
                            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-paper-2 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title={lesson.is_published ? "Ubah ke Draf" : "Terbitkan"}
                            disabled={isSaving}
                            onClick={() => handleToggleLessonPublish(lesson)}
                            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-paper-2"
                          >
                            {lesson.is_published ? (
                              <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                            )}
                          </button>
                          {lesson.is_published && selectedModule.is_published && (
                            <Link
                              href={`/kurikulum/${selectedModule.slug}/${lesson.slug}`}
                              target="_blank"
                              title="Lihat halaman materi"
                              className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-paper-2"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEditLesson(lesson)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-3.5 h-3.5 text-ink-2" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={isSaving}
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Edit / Add Module Modal */}
      <Modal
        isOpen={moduleModalOpen}
        onClose={() => setModuleModalOpen(false)}
        title={editingModule.id ? "Edit Informasi Modul" : "Tambah Modul Baru"}
      >
        <form onSubmit={handleSaveModule} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Nomor Modul"
              type="number"
              value={editingModule.module_number}
              onChange={(e) =>
                setEditingModule({
                  ...editingModule,
                  module_number: Number(e.target.value),
                })
              }
              required
            />
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink-2">
                Tingkat Kesulitan
              </label>
              <select
                value={editingModule.difficulty_level}
                onChange={(e) =>
                  setEditingModule({
                    ...editingModule,
                    difficulty_level: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-rule text-xs sm:text-sm bg-sheet text-ink"
              >
                <option value="Pemula">Pemula</option>
                <option value="Menengah">Menengah</option>
                <option value="Lanjutan">Lanjutan</option>
              </select>
            </div>
          </div>

          <Input
            label="Judul Modul"
            value={editingModule.title}
            onChange={(e) =>
              setEditingModule({ ...editingModule, title: e.target.value })
            }
            required
          />

          <Textarea
            label="Deskripsi Modul"
            rows={3}
            value={editingModule.description}
            onChange={(e) =>
              setEditingModule({
                ...editingModule,
                description: e.target.value,
              })
            }
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Estimasi Waktu (Menit)"
              type="number"
              value={editingModule.estimated_minutes}
              onChange={(e) =>
                setEditingModule({
                  ...editingModule,
                  estimated_minutes: Number(e.target.value),
                })
              }
              required
            />
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink-2">Status</label>
              <select
                value={editingModule.is_published ? "published" : "draft"}
                onChange={(e) =>
                  setEditingModule({
                    ...editingModule,
                    is_published: e.target.value === "published",
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-rule text-xs sm:text-sm bg-sheet text-ink"
              >
                <option value="published">Terbit</option>
                <option value="draft">Draf</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModuleModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="accent" isLoading={isSaving} className="font-bold">
              Simpan Modul
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
