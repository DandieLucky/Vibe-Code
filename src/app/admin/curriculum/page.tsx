"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileCode,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { MODULES_DATA, FullModule } from "@/lib/data/curriculum-data";
import { Lesson } from "@/types/database";

export default function AdminCurriculumCMSPage() {
  const [modules, setModules] = useState<FullModule[]>(MODULES_DATA);
  const [selectedModule, setSelectedModule] = useState<FullModule>(MODULES_DATA[0]);

  // Edit Module Modal
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<{
    id?: string;
    module_number: number;
    title: string;
    description: string;
    estimated_minutes: number;
    difficulty_level: string;
  }>({
    module_number: 1,
    title: "",
    description: "",
    estimated_minutes: 45,
    difficulty_level: "Pemula",
  });

  // Edit Lesson Modal
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<{
    id?: string;
    lesson_number: number;
    title: string;
    description: string;
    estimated_minutes: number;
    promptTujuan: string;
    promptInstruksi: string;
    promptBatasan: string;
  }>({
    lesson_number: 1,
    title: "",
    description: "",
    estimated_minutes: 15,
    promptTujuan: "",
    promptInstruksi: "",
    promptBatasan: "",
  });

  const handleOpenAddModule = () => {
    setEditingModule({
      module_number: modules.length + 1,
      title: "",
      description: "",
      estimated_minutes: 45,
      difficulty_level: "Pemula",
    });
    setModuleModalOpen(true);
  };

  const handleOpenEditModule = (m: FullModule) => {
    setEditingModule({
      id: m.id,
      module_number: m.module_number,
      title: m.title,
      description: m.description,
      estimated_minutes: m.estimated_minutes,
      difficulty_level: m.difficulty_level,
    });
    setModuleModalOpen(true);
  };

  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingModule.id) {
      // Update existing module
      const updated = modules.map((m) =>
        m.id === editingModule.id
          ? {
              ...m,
              module_number: editingModule.module_number,
              title: editingModule.title,
              description: editingModule.description,
              estimated_minutes: editingModule.estimated_minutes,
              difficulty_level: editingModule.difficulty_level as any,
            }
          : m
      );
      setModules(updated);
      const cur = updated.find((m) => m.id === editingModule.id);
      if (cur) setSelectedModule(cur);
    } else {
      // Create new module
      const newMod: FullModule = {
        id: `modul-${Date.now()}`,
        course_id: "course-web-dev-antigravity",
        module_number: editingModule.module_number,
        title: editingModule.title,
        slug: `modul-${editingModule.module_number}-${editingModule.title.toLowerCase().replace(/\s+/g, "-")}`,
        description: editingModule.description,
        estimated_minutes: editingModule.estimated_minutes,
        difficulty_level: editingModule.difficulty_level as any,
        is_published: true,
        order_index: modules.length + 1,
        created_at: new Date().toISOString(),
        lessons: [],
      };
      setModules([...modules, newMod]);
      setSelectedModule(newMod);
    }
    setModuleModalOpen(false);
  };

  const handleDeleteModule = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
      const remaining = modules.filter((m) => m.id !== id);
      setModules(remaining);
      if (remaining.length > 0) setSelectedModule(remaining[0]);
    }
  };

  const handleOpenAddLesson = () => {
    setEditingLesson({
      lesson_number: selectedModule.lessons.length + 1,
      title: "",
      description: "",
      estimated_minutes: 15,
      promptTujuan: "",
      promptInstruksi: "",
      promptBatasan: "",
    });
    setLessonModalOpen(true);
  };

  const handleOpenEditLesson = (l: Lesson) => {
    setEditingLesson({
      id: l.id,
      lesson_number: l.lesson_number,
      title: l.title,
      description: l.description,
      estimated_minutes: l.estimated_minutes,
      promptTujuan: l.antigravity_prompt?.tujuan || "",
      promptInstruksi: l.antigravity_prompt?.instruksi.join("\n") || "",
      promptBatasan: l.antigravity_prompt?.batasan.join("\n") || "",
    });
    setLessonModalOpen(true);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedLessons = [...selectedModule.lessons];

    if (editingLesson.id) {
      const idx = updatedLessons.findIndex((l) => l.id === editingLesson.id);
      if (idx !== -1) {
        updatedLessons[idx] = {
          ...updatedLessons[idx],
          lesson_number: editingLesson.lesson_number,
          title: editingLesson.title,
          description: editingLesson.description,
          estimated_minutes: editingLesson.estimated_minutes,
          antigravity_prompt: {
            tujuan: editingLesson.promptTujuan || "Menyelesaikan implementasi materi.",
            konteks: "Next.js 15, TypeScript, Tailwind CSS, Supabase.",
            instruksi: editingLesson.promptInstruksi.split("\n").filter(Boolean),
            batasan: editingLesson.promptBatasan.split("\n").filter(Boolean),
            hasilAkhir: "Fitur berhasil terpasang dan berfungsi normal.",
            validasi: "Verifikasi tanpa error pada kompilasi kode.",
            rawPrompt: `[TUJUAN]\n${editingLesson.promptTujuan}\n\n[INSTRUKSI]\n${editingLesson.promptInstruksi}\n\n[BATASAN]\n${editingLesson.promptBatasan}`,
          },
        };
      }
    } else {
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        module_id: selectedModule.id,
        lesson_number: editingLesson.lesson_number,
        title: editingLesson.title,
        slug: editingLesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: editingLesson.description,
        estimated_minutes: editingLesson.estimated_minutes,
        order_index: selectedModule.lessons.length + 1,
        is_published: true,
        created_at: new Date().toISOString(),
        concept_explanation: "Penjelasan materi baru yang baru saja ditambahkan oleh admin.",
        antigravity_prompt: {
          tujuan: editingLesson.promptTujuan || "Implementasi materi baru.",
          konteks: "Next.js 15 App Router.",
          instruksi: editingLesson.promptInstruksi.split("\n").filter(Boolean),
          batasan: editingLesson.promptBatasan.split("\n").filter(Boolean),
          hasilAkhir: "Implementasi berhasil.",
          validasi: "Uji kode dengan npm run test.",
          rawPrompt: `[TUJUAN]\n${editingLesson.promptTujuan}\n\n[INSTRUKSI]\n${editingLesson.promptInstruksi}`,
        },
      };
      updatedLessons.push(newLesson);
    }

    const updatedModule = { ...selectedModule, lessons: updatedLessons };
    setSelectedModule(updatedModule);
    setModules(modules.map((m) => (m.id === updatedModule.id ? updatedModule : m)));
    setLessonModalOpen(false);
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (confirm("Hapus materi ini?")) {
      const updatedLessons = selectedModule.lessons.filter((l) => l.id !== lessonId);
      const updatedModule = { ...selectedModule, lessons: updatedLessons };
      setSelectedModule(updatedModule);
      setModules(modules.map((m) => (m.id === updatedModule.id ? updatedModule : m)));
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="teal">CMS CONTENT MANAGEMENT</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Kurikulum, Modul & Prompt AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola modul, materi praktik, prompt Antigravity, dan status publikasi tanpa mengubah kode sumber inti.
          </p>
        </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 12 Modules Nav List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span>Daftar Modul ({modules.length})</span>
            <span>Urutan</span>
          </div>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {modules.map((m) => {
              const isSelected = selectedModule.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModule(m)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isSelected
                          ? "bg-sky-500/20 text-sky-300"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      MODUL {m.module_number}
                    </span>
                    <span className="text-[11px] opacity-75">
                      {m.lessons.length} Materi
                    </span>
                  </div>
                  <h3 className="text-xs font-bold line-clamp-1">{m.title}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Module Details & Lessons List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Module Summary Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    MODUL {selectedModule.module_number}
                  </span>
                  <Badge variant="default" className="text-[10px]">
                    {selectedModule.difficulty_level}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    ±{selectedModule.estimated_minutes} Menit
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedModule.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {selectedModule.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEditModule(selectedModule)}
                  className="text-xs gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Modul</span>
                </Button>
                {modules.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Materi di Modul Ini ({selectedModule.lessons.length})
              </h3>
              <Button
                type="button"
                variant="accent"
                size="sm"
                onClick={handleOpenAddLesson}
                className="text-xs gap-1 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Materi Praktik</span>
              </Button>
            </div>

            {/* Lessons Table in this Module */}
            <div className="mt-4 space-y-2.5">
              {selectedModule.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white transition-all gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-400 w-8">
                      #{selectedModule.module_number}.{lesson.lesson_number}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {lesson.title}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {lesson.antigravity_prompt && (
                      <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-mono font-medium hidden sm:inline">
                        Prompt AI
                      </span>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEditLesson(lesson)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-3.5 h-3.5 text-slate-600" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Module Modal */}
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
              <label className="text-xs font-bold uppercase text-slate-700">
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
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
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

          <Input
            label="Estimasi Waktu Belajar (Menit)"
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

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModuleModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="accent" className="font-bold">
              Simpan Modul
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Lesson Modal */}
      <Modal
        isOpen={lessonModalOpen}
        onClose={() => setLessonModalOpen(false)}
        title={editingLesson.id ? "Edit Materi & Prompt AI" : "Tambah Materi Baru"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveLesson} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Nomor Materi"
              type="number"
              value={editingLesson.lesson_number}
              onChange={(e) =>
                setEditingLesson({
                  ...editingLesson,
                  lesson_number: Number(e.target.value),
                })
              }
              required
            />
            <Input
              label="Estimasi (Menit)"
              type="number"
              value={editingLesson.estimated_minutes}
              onChange={(e) =>
                setEditingLesson({
                  ...editingLesson,
                  estimated_minutes: Number(e.target.value),
                })
              }
              required
            />
          </div>

          <Input
            label="Judul Materi Pembelajaran"
            value={editingLesson.title}
            onChange={(e) =>
              setEditingLesson({ ...editingLesson, title: e.target.value })
            }
            required
          />

          <Textarea
            label="Deskripsi Ringkas"
            rows={2}
            value={editingLesson.description}
            onChange={(e) =>
              setEditingLesson({
                ...editingLesson,
                description: e.target.value,
              })
            }
            required
          />

          {/* Antigravity Prompt Builder Fields */}
          <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-900 block">
              Prompt AI Google Antigravity
            </span>
            <Input
              label="Tujuan Prompt"
              value={editingLesson.promptTujuan}
              onChange={(e) =>
                setEditingLesson({
                  ...editingLesson,
                  promptTujuan: e.target.value,
                })
              }
              placeholder="Apa yang akan dibuat oleh AI..."
            />
            <Textarea
              label="Instruksi Teknis (Satu per baris)"
              rows={3}
              value={editingLesson.promptInstruksi}
              onChange={(e) =>
                setEditingLesson({
                  ...editingLesson,
                  promptInstruksi: e.target.value,
                })
              }
              placeholder="1. Buat file X&#10;2. Tambahkan fungsi Y..."
            />
            <Textarea
              label="Batasan (Satu per baris)"
              rows={2}
              value={editingLesson.promptBatasan}
              onChange={(e) =>
                setEditingLesson({
                  ...editingLesson,
                  promptBatasan: e.target.value,
                })
              }
              placeholder="Jangan ubah file layout&#10;Gunakan hanya Tailwind CSS..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLessonModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="accent" className="font-bold">
              Simpan Materi
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
