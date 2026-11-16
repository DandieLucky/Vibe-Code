"use client";

import React, { useState } from "react";

const STAGES = [
  {
    id: "alur",
    label: "1. Pikirkan Alur",
    title: "Rancang data sebelum menulis prompt",
    code: `Aplikasi: SakuSiswa (Catatan & Tugas)
User Login: Google Credential Manager -> email siswa
Data Lokal (Room):
  - id: Int (PrimaryKey)
  - userEmail: String
  - mapel: String
  - judulTugas: String
  - tenggat: String
  - selesai: Boolean`,
  },
  {
    id: "prompt",
    label: "2. Prompt 6-Bagian",
    title: "Instruksi presisi ke AI, bukan menebak",
    code: `[TUJUAN] Buat TaskEntity & TaskDao untuk Room Database.
[KONTEKS] Kotlin, Jetpack Compose, KSP, app SakuSiswa.
[INSTRUKSI] Gunakan Flow<List<TaskEntity>> agar daftar tugas
otomatis terbarui saat data ditambah atau dihapus.
[BATASAN] Filter berdasarkan userEmail yang login.
[VALIDASI] Pastikan build sukses tanpa error KSP.`,
  },
  {
    id: "compose",
    label: "3. Hasil Compose",
    title: "Kode Kotlin siap diuji di Android Studio",
    code: `@Entity(tableName = "tasks")
data class TaskEntity(
  @PrimaryKey(autoGenerate = true) val id: Int = 0,
  val userEmail: String,
  val mapel: String,
  val judulTugas: String,
  val selesai: Boolean = false
)`,
  },
] as const;

export function SakuSiswaWorkbench() {
  const [activeId, setActiveId] = useState<(typeof STAGES)[number]["id"]>("alur");
  const active = STAGES.find((s) => s.id === activeId) ?? STAGES[0];

  return (
    <div className="bloom-roll" aria-label="Simulasi alur belajar SakuSiswa">
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
          Room Database (KSP)
        </div>
        <div className="bloom-clip" style={{ ["--lane-color" as string]: "var(--lane-3)" }}>
          Google Login
        </div>
      </div>
    </div>
  );
}
