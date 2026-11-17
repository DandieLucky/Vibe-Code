"use client";

import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  Bold,
  ChevronDown,
  ChevronRight,
  Code,
  Code2,
  Eye,
  FileCode,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  PenLine,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownContent } from "@/components/ui/markdown-content";
import type { Lesson } from "@/types/database";

export interface BlogspotLessonDraft {
  id?: string;
  module_id: string;
  lesson_number: number;
  title: string;
  slug: string;
  description: string;
  estimated_minutes: number;
  is_published: boolean;
  objective: string;
  concept_explanation: string;
  expected_result: string;
  validation_check_text: string;
  promptTujuan: string;
  promptKonteks: string;
  promptInstruksi: string;
  promptBatasan: string;
  promptHasilAkhir: string;
  promptValidasi: string;
  code_snippets: { filename: string; language: string; code: string }[];
}

export function lessonToDraft(moduleId: string, lesson?: Lesson, nextNumber = 1): BlogspotLessonDraft {
  if (!lesson) {
    return {
      module_id: moduleId,
      lesson_number: nextNumber,
      title: "",
      slug: "",
      description: "",
      estimated_minutes: 15,
      is_published: true,
      objective: "",
      concept_explanation: "",
      expected_result: "",
      validation_check_text: "",
      promptTujuan: "",
      promptKonteks: "",
      promptInstruksi: "",
      promptBatasan: "",
      promptHasilAkhir: "",
      promptValidasi: "",
      code_snippets: [],
    };
  }

  return {
    id: lesson.id,
    module_id: lesson.module_id || moduleId,
    lesson_number: lesson.lesson_number,
    title: lesson.title,
    slug: lesson.slug,
    description: lesson.description || "",
    estimated_minutes: lesson.estimated_minutes || 15,
    is_published: lesson.is_published !== false,
    objective: lesson.objective || "",
    concept_explanation: lesson.concept_explanation || "",
    expected_result: lesson.expected_result || "",
    validation_check_text: (lesson.validation_check || []).join("\n"),
    promptTujuan: lesson.antigravity_prompt?.tujuan || "",
    promptKonteks: lesson.antigravity_prompt?.konteks || "",
    promptInstruksi: (lesson.antigravity_prompt?.instruksi || []).join("\n"),
    promptBatasan: (lesson.antigravity_prompt?.batasan || []).join("\n"),
    promptHasilAkhir: lesson.antigravity_prompt?.hasilAkhir || "",
    promptValidasi: lesson.antigravity_prompt?.validasi || "",
    code_snippets: lesson.code_snippets ? [...lesson.code_snippets] : [],
  };
}

interface BlogspotLessonEditorProps {
  moduleTitle: string;
  initialDraft: BlogspotLessonDraft;
  isSaving: boolean;
  onCancel: () => void;
  onSave: (draft: BlogspotLessonDraft) => void;
}

export function BlogspotLessonEditor({
  moduleTitle,
  initialDraft,
  isSaving,
  onCancel,
  onSave,
}: BlogspotLessonEditorProps) {
  const [draft, setDraft] = useState<BlogspotLessonDraft>(initialDraft);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [openSection, setOpenSection] = useState<"prompt" | "code" | "validation" | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const applyFormat = (prefix: string, suffix = "", placeholder = "teks") => {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart ?? draft.concept_explanation.length;
    const end = el.selectionEnd ?? start;
    const selected = draft.concept_explanation.slice(start, end) || placeholder;
    const updated =
      draft.concept_explanation.slice(0, start) +
      prefix +
      selected +
      suffix +
      draft.concept_explanation.slice(end);
    setDraft((prev) => ({ ...prev, concept_explanation: updated }));
    setTimeout(() => {
      el.focus();
      const cursor = start + prefix.length + selected.length + suffix.length;
      el.setSelectionRange(cursor, cursor);
    }, 0);
  };

  const addSnippet = () => {
    setDraft((prev) => ({
      ...prev,
      code_snippets: [
        ...prev.code_snippets,
        { filename: "Contoh.kt", language: "kotlin", code: "" },
      ],
    }));
  };

  const updateSnippet = (
    idx: number,
    field: "filename" | "language" | "code",
    value: string
  ) => {
    setDraft((prev) => {
      const next = [...prev.code_snippets];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, code_snippets: next };
    });
  };

  const removeSnippet = (idx: number) => {
    setDraft((prev) => ({
      ...prev,
      code_snippets: prev.code_snippets.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent, publishState?: boolean) => {
    e.preventDefault();
    const finalDraft =
      typeof publishState === "boolean" ? { ...draft, is_published: publishState } : draft;
    onSave(finalDraft);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="rounded-2xl border border-rule bg-sheet shadow-xs overflow-hidden"
    >
      {/* Blogspot-style Sticky Action Bar */}
      <div className="px-6 py-4 bg-paper-2 border-b border-rule flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" size="sm" onClick={onCancel} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Button>
          <div>
            <p className="text-[11px] font-semibold text-muted">{moduleTitle}</p>
            <h2 className="text-sm font-bold text-ink">
              {draft.id ? "Edit Postingan Materi" : "Tulis Materi Baru"}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSaving}
            onClick={(e) => handleSubmit(e, false)}
            className="text-xs"
          >
            Simpan sebagai Draf
          </Button>
          <Button
            type="submit"
            variant="accent"
            size="sm"
            isLoading={isSaving}
            onClick={() => setDraft((prev) => ({ ...prev, is_published: true }))}
            className="gap-1.5 font-bold"
          >
            <Save className="w-4 h-4" />
            <span>{draft.id ? "Simpan & Publikasikan" : "Publikasikan Materi"}</span>
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Post Title & Meta Row */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink-2 mb-1.5">
              Judul Materi
            </label>
            <input
              type="text"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Contoh: Mengenal State dan Navigasi Layar"
              required
              className="w-full px-4 py-3 rounded-xl border border-rule bg-paper text-lg font-bold text-ink focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Input
              label="Nomor Urut"
              type="number"
              value={draft.lesson_number}
              onChange={(e) =>
                setDraft({ ...draft, lesson_number: Number(e.target.value) || 1 })
              }
              required
            />
            <Input
              label="Estimasi (Menit)"
              type="number"
              value={draft.estimated_minutes}
              onChange={(e) =>
                setDraft({ ...draft, estimated_minutes: Number(e.target.value) || 15 })
              }
              required
            />
            <Input
              label="Slug URL (Opsional)"
              value={draft.slug}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              placeholder="otomatis-dari-judul"
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink-2">Status</label>
              <select
                value={draft.is_published ? "published" : "draft"}
                onChange={(e) =>
                  setDraft({ ...draft, is_published: e.target.value === "published" })
                }
                className="w-full px-3 py-2 rounded-xl border border-rule bg-sheet text-sm text-ink"
              >
                <option value="published">Dipublikasikan</option>
                <option value="draft">Draf (Tersembunyi)</option>
              </select>
            </div>
          </div>

          <Textarea
            label="Ringkasan Singkat (Tampil di Daftar Modul)"
            rows={2}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="Ringkasan singkat isi materi dalam 1–2 kalimat…"
            required
          />

          <Input
            label="Tujuan Pembelajaran (Opsional)"
            value={draft.objective}
            onChange={(e) => setDraft({ ...draft, objective: e.target.value })}
            placeholder="Setelah mempelajari materi ini, peserta mampu…"
          />
        </div>

        {/* Blogspot Formatting Toolbar + Content Editor / Live Preview */}
        <div className="rounded-2xl border border-rule overflow-hidden bg-sheet">
          <div className="px-3 py-2 bg-paper-2 border-b border-rule flex flex-wrap items-center justify-between gap-2">
            {/* Formatting Buttons */}
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                title="Heading"
                onClick={() => applyFormat("\n## ", "\n", "Judul Bagian")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Sub-heading"
                onClick={() => applyFormat("\n### ", "\n", "Sub Judul")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <Heading3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Tebal"
                onClick={() => applyFormat("**", "**", "teks tebal")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Miring"
                onClick={() => applyFormat("*", "*", "teks miring")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Daftar Poin"
                onClick={() => applyFormat("\n- ", "", "Poin pertama")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Daftar Bernomor"
                onClick={() => applyFormat("\n1. ", "", "Langkah pertama")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Kode Sebaris"
                onClick={() => applyFormat("`", "`", "kode")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Blok Kode"
                onClick={() => applyFormat("\n```kotlin\n", "\n```\n", "// tulis kode di sini")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <Code2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Tautan"
                onClick={() => applyFormat("[", "](https://)", "teks tautan")}
                className="p-1.5 rounded-lg text-ink-2 hover:bg-paper-3 hover:text-ink transition-colors"
              >
                <Link2 className="w-4 h-4" />
              </button>
            </div>

            {/* Write vs Preview Toggle */}
            <div className="inline-flex rounded-lg bg-paper-3 p-0.5 border border-rule text-xs">
              <button
                type="button"
                onClick={() => setEditorMode("write")}
                className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                  editorMode === "write" ? "bg-sheet text-ink shadow-2xs" : "text-muted hover:text-ink"
                }`}
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Tulis</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorMode("preview")}
                className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                  editorMode === "preview" ? "bg-sheet text-ink shadow-2xs" : "text-muted hover:text-ink"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Pratinjau</span>
              </button>
            </div>
          </div>

          {editorMode === "write" ? (
            <textarea
              ref={bodyRef}
              rows={14}
              value={draft.concept_explanation}
              onChange={(e) => setDraft({ ...draft, concept_explanation: e.target.value })}
              placeholder="Tulis isi artikel materi di sini… Mendukung format Markdown (**tebal**, *miring*, ## Judul, daftar poin, dan blok kode)."
              className="w-full p-4 text-sm text-ink bg-sheet focus:outline-none leading-relaxed font-sans resize-y"
            />
          ) : (
            <div className="p-5 min-h-[280px] bg-sheet">
              <MarkdownContent
                content={draft.concept_explanation}
                emptyText="Belum ada isi materi. Mulai menulis di tab Tulis Materi untuk melihat pratinjau."
              />
            </div>
          )}
        </div>

        {/* Collapsible Optional Sections */}
        <div className="space-y-3">
          {/* 1. Prompt AI 6-Bagian */}
          <div className="rounded-xl border border-rule bg-paper overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenSection(openSection === "prompt" ? null : "prompt")}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-bold text-ink hover:bg-paper-2 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Prompt AI Terstruktur — Formula 6-Bagian (Opsional)</span>
              </span>
              {openSection === "prompt" ? (
                <ChevronDown className="w-4 h-4 text-muted" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted" />
              )}
            </button>
            {openSection === "prompt" && (
              <div className="p-4 border-t border-rule bg-sheet space-y-3">
                <Input
                  label="Tujuan Prompt"
                  value={draft.promptTujuan}
                  onChange={(e) => setDraft({ ...draft, promptTujuan: e.target.value })}
                  placeholder="Apa yang ingin dicapai…"
                />
                <Input
                  label="Konteks"
                  value={draft.promptKonteks}
                  onChange={(e) => setDraft({ ...draft, promptKonteks: e.target.value })}
                  placeholder="Bahasa, framework, dan arsitektur proyek…"
                />
                <Textarea
                  label="Instruksi Teknis (Satu per baris)"
                  rows={3}
                  value={draft.promptInstruksi}
                  onChange={(e) => setDraft({ ...draft, promptInstruksi: e.target.value })}
                  placeholder="1. Buat file X&#10;2. Tambahkan fungsi Y…"
                />
                <Textarea
                  label="Batasan (Satu per baris)"
                  rows={2}
                  value={draft.promptBatasan}
                  onChange={(e) => setDraft({ ...draft, promptBatasan: e.target.value })}
                  placeholder="Jangan ubah struktur file utama…"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Hasil Akhir"
                    value={draft.promptHasilAkhir}
                    onChange={(e) => setDraft({ ...draft, promptHasilAkhir: e.target.value })}
                  />
                  <Input
                    label="Validasi"
                    value={draft.promptValidasi}
                    onChange={(e) => setDraft({ ...draft, promptValidasi: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Code Snippets */}
          <div className="rounded-xl border border-rule bg-paper overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenSection(openSection === "code" ? null : "code")}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-bold text-ink hover:bg-paper-2 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-accent" />
                <span>Cuplikan Kode ({draft.code_snippets.length}) — Opsional</span>
              </span>
              {openSection === "code" ? (
                <ChevronDown className="w-4 h-4 text-muted" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted" />
              )}
            </button>
            {openSection === "code" && (
              <div className="p-4 border-t border-rule bg-sheet space-y-4">
                {draft.code_snippets.map((sn, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-rule bg-paper space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <Input
                          label="Nama File"
                          value={sn.filename}
                          onChange={(e) => updateSnippet(idx, "filename", e.target.value)}
                          placeholder="MainActivity.kt"
                        />
                        <Input
                          label="Bahasa"
                          value={sn.language}
                          onChange={(e) => updateSnippet(idx, "language", e.target.value)}
                          placeholder="kotlin"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSnippet(idx)}
                        className="mt-5 text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      label="Kode"
                      rows={5}
                      value={sn.code}
                      onChange={(e) => updateSnippet(idx, "code", e.target.value)}
                      className="font-mono text-xs"
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addSnippet} className="gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Cuplikan Kode</span>
                </Button>
              </div>
            )}
          </div>

          {/* 3. Validation & Expected Result */}
          <div className="rounded-xl border border-rule bg-paper overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenSection(openSection === "validation" ? null : "validation")}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-bold text-ink hover:bg-paper-2 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-accent" />
                <span>Hasil yang Diharapkan &amp; Checklist Validasi (Opsional)</span>
              </span>
              {openSection === "validation" ? (
                <ChevronDown className="w-4 h-4 text-muted" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted" />
              )}
            </button>
            {openSection === "validation" && (
              <div className="p-4 border-t border-rule bg-sheet space-y-3">
                <Textarea
                  label="Hasil yang Diharapkan"
                  rows={2}
                  value={draft.expected_result}
                  onChange={(e) => setDraft({ ...draft, expected_result: e.target.value })}
                />
                <Textarea
                  label="Checklist Validasi (Satu poin per baris)"
                  rows={3}
                  value={draft.validation_check_text}
                  onChange={(e) => setDraft({ ...draft, validation_check_text: e.target.value })}
                  placeholder="Aplikasi dapat berjalan tanpa error&#10;Data tersimpan saat aplikasi ditutup…"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

