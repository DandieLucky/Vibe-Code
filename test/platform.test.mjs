import test from "node:test";
import assert from "node:assert/strict";

// 1. Test Curriculum Structure Integrity
test("Kurikulum: Harus memiliki tepat 7 modul pembelajaran", async () => {
  const { MODULES_DATA } = await import("../src/lib/data/curriculum-data.ts");
  assert.equal(MODULES_DATA.length, 7, "Jumlah modul harus tepat 7");

  // Every module must have module_number from 1 to 7
  for (let i = 0; i < 7; i++) {
    assert.equal(
      MODULES_DATA[i].module_number,
      i + 1,
      `Modul urutan ${i + 1} harus memiliki nomor modul ${i + 1}`
    );
  }
});

test("Kurikulum: Setiap modul wajib memiliki minimal 4 materi praktik substansial", async () => {
  const { MODULES_DATA } = await import("../src/lib/data/curriculum-data.ts");

  for (const module of MODULES_DATA) {
    assert.ok(
      module.lessons.length >= 4,
      `Modul ${module.module_number} (${module.title}) harus memiliki minimal 4 materi, ditemukan: ${module.lessons.length}`
    );

    // Each lesson must have title, description, and substantive content
    for (const lesson of module.lessons) {
      assert.ok(lesson.title.trim().length > 3, `Judul materi ${lesson.id} tidak boleh kosong`);
      assert.ok(lesson.description.trim().length > 10, `Deskripsi materi ${lesson.id} harus substantif`);
    }
  }
});

test("Sistem Prompt Antigravity: Memenuhi format formula 6-bagian baku", async () => {
  const { MODULES_DATA } = await import("../src/lib/data/curriculum-data.ts");

  let promptCount = 0;
  for (const module of MODULES_DATA) {
    for (const lesson of module.lessons) {
      if (lesson.antigravity_prompt) {
        promptCount++;
        const p = lesson.antigravity_prompt;
        assert.ok(p.tujuan && p.tujuan.length > 5, `Tujuan prompt di ${lesson.title} harus ada`);
        assert.ok(p.konteks && p.konteks.length > 5, `Konteks prompt di ${lesson.title} harus ada`);
        assert.ok(Array.isArray(p.instruksi) && p.instruksi.length > 0, `Instruksi prompt di ${lesson.title} harus array`);
        assert.ok(Array.isArray(p.batasan) && p.batasan.length > 0, `Batasan prompt di ${lesson.title} harus array`);
        assert.ok(p.hasilAkhir && p.hasilAkhir.length > 5, `Hasil akhir prompt di ${lesson.title} harus ada`);
        assert.ok(p.validasi && p.validasi.length > 5, `Validasi prompt di ${lesson.title} harus ada`);
        assert.ok(p.rawPrompt && p.rawPrompt.includes("[TUJUAN]"), `rawPrompt di ${lesson.title} harus siap salin`);
      }
    }
  }

  assert.ok(promptCount >= 28, `Harus ada minimal 28 prompt AI terstruktur, ditemukan: ${promptCount}`);
});

// 2. Test Zod Validation Schemas
test("Validasi: Skema pengumpulan karya menolak input cacat dan meloloskan input valid", async () => {
  const { submissionSchema } = await import("../src/lib/validations.ts");

  // Valid Android submission
  const validData = {
    full_name: "Budi Santoso",
    email: "budi@santoso.com",
    whatsapp: "081234567890",
    institution: "X RPL 1 — SMKN 1 Jakarta",
    project_title: "SakuSiswa — Aplikasi Tugas Siswa",
    project_description: "Aplikasi Android Kotlin & Jetpack Compose dengan Room Database dan Google Login.",
    completed_modules: ["Modul 1", "Modul 5"],
    github_url: "https://github.com/budisantoso/sakusiswa-android",
    apk_url: "https://github.com/budisantoso/sakusiswa-android/releases/tag/v1.0",
    demo_video_url: "",
    screenshot_url: "https://example.com/screenshot.png",
    attachment_url: "",
  };

  const validRes = submissionSchema.safeParse(validData);
  assert.equal(validRes.success, true, "Data valid seharusnya lolos validasi");

  // Invalid: Missing screenshot
  const missingShot = { ...validData, screenshot_url: "" };
  const resShot = submissionSchema.safeParse(missingShot);
  assert.equal(resShot.success, false, "Screenshot kosong harus ditolak");

  // Invalid: Non-GitHub URL
  const invalidGit = { ...validData, github_url: "https://gitlab.com/notgithub" };
  const resGit = submissionSchema.safeParse(invalidGit);
  assert.equal(resGit.success, false, "URL selain GitHub harus ditolak");

  // Invalid: Empty modules
  const invalidMod = { ...validData, completed_modules: [] };
  const resMod = submissionSchema.safeParse(invalidMod);
  assert.equal(resMod.success, false, "Modul kosong harus ditolak");
});

// 3. Test Excel & CSV Generator
test("Ekspor Data: Menghasilkan buffer Excel dan CSV yang valid", async () => {
  const { generateExcelBuffer, generateCsvString } = await import("../src/lib/export/excel-generator.ts");

  const sampleSubmissions = [
    {
      id: "sub-1",
      user_id: "user-1",
      full_name: "Ahmad Fauzi",
      email: "ahmad@gmail.com",
      whatsapp: "081288990011",
      institution: "SMKN 1 Yogyakarta",
      project_title: "Katalog Batik Jogja",
      project_description: "Katalog batik digital.",
      completed_modules: ["Modul 1", "Modul 7"],
      github_url: "https://github.com/ahmad/katalog",
      deployment_url: "https://katalog.vercel.app",
      submission_status: "accepted",
      score: 95,
      admin_notes: "Keren sekali!",
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  // Test Excel
  const excelBuffer = await generateExcelBuffer(sampleSubmissions);
  assert.ok(excelBuffer instanceof Buffer, "Hasil harus berupa Buffer");
  assert.ok(excelBuffer.length > 500, "Ukuran file Excel harus substantif");

  // Test CSV
  const csvString = generateCsvString(sampleSubmissions);
  assert.ok(typeof csvString === "string", "Hasil CSV harus string");
  assert.ok(csvString.includes("Ahmad Fauzi"), "CSV harus memuat nama peserta");
  assert.ok(csvString.includes("https://github.com/ahmad/katalog"), "CSV harus memuat link GitHub");
});

// 4. Test Helper Utilities
test("Utils: Format tanggal dan format mata uang berjalan stabil", async () => {
  const { formatDate, formatTimeAgo } = await import("../src/lib/utils.ts");

  const formatted = formatDate("2026-11-10T09:00:00Z");
  assert.ok(formatted.includes("2026"), "Format tanggal harus memuat tahun 2026");

  const timeAgo = formatTimeAgo(new Date().toISOString());
  assert.equal(timeAgo, "Baru saja", "Waktu baru saja harus menghasilkan 'Baru saja'");
});
