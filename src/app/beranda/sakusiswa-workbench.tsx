"use client";

import React, { useState } from "react";

const STAGES = [
  {
    id: "alur",
    label: "1. Pikirkan Alur",
    title: "Rancang data sebelum menulis prompt",
    code: `Aplikasi: Catatan & Target Belajar
Layar Utama : LazyColumn / LazyVerticalGrid
Layar Detail: OutlinedTextField + RadioButton + AlertDialog
Data Lokal (Room):
  - id: Long (PrimaryKey autoGenerate)
  - judul: String
  - isi: String
  - kategori: String`,
  },
  {
    id: "prompt",
    label: "2. Prompt Gemini",
    title: "Instruksi terstruktur ke Gemini, bukan menebak",
    code: `[TUJUAN] Buat @Dao dengan query reaktif Flow<List<Catatan>>.
[KONTEKS] Kotlin, Jetpack Compose, Room KSP, ViewModel.
[INSTRUKSI] Gunakan Flow agar daftar catatan otomatis terbarui
saat data ditambah, diubah, atau dihapus.
[BATASAN] Operasi insert/update/delete wajib suspend fun.
[VALIDASI] Build proyek sukses tanpa error KSP.`,
  },
  {
    id: "compose",
    label: "3. Kode Room & UI",
    title: "Kode Kotlin terstruktur siap diuji di Android Studio",
    code: `@Entity(tableName = "catatan")
data class Catatan(
  @PrimaryKey(autoGenerate = true) val id: Long = 0L,
  val judul: String,
  val isi: String,
  val kategori: String
)`,
  },
] as const;

export function SakuSiswaWorkbench() {
  const [activeId, setActiveId] = useState<(typeof STAGES)[number]["id"]>("alur");
  const active = STAGES.find((s) => s.id === activeId) ?? STAGES[0];

  return (
    <div className="bloom-roll" aria-label="Simulasi alur belajar terstruktur">
      <div className="bloom-tabs" role="tablist" aria-label="Tahap merancang aplikasi">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            type="button"
            role="tab"
            aria-selected={activeId === stage.id}
            onClick={() => setActiveId(stage.id)}
            className="bloom-tab"
          >
            {stage.label}
          </button>
        ))}
      </div>

      <div className="bloom-stage-body" role="tabpanel">
        <p className="bloom-stage-title">{active.title}</p>
        <pre className="bloom-stage-code">{active.code}</pre>
      </div>

      <div className="bloom-lane-row">
        <div className="bloom-clip" style={{ ["--lane-color" as string]: "var(--lane-1)" }}>
          Kotlin + Compose
        </div>
        <div className="bloom-clip" style={{ ["--lane-color" as string]: "var(--lane-2)" }}>
          Navigation + ViewModel
        </div>
        <div className="bloom-clip" style={{ ["--lane-color" as string]: "var(--lane-3)" }}>
          Room (KSP) + DataStore
        </div>
      </div>
    </div>
  );
}

