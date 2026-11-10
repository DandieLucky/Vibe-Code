import { z } from "zod";

export const submissionSchema = z.object({
  full_name: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  email: z.string().email("Format email tidak valid"),
  whatsapp: z
    .string()
    .min(9, "Nomor WhatsApp minimal 9 digit")
    .max(16, "Nomor WhatsApp maksimal 16 digit")
    .regex(/^[0-9+\s\-]+$/, "Nomor WhatsApp hanya boleh angka, tanda +, spasi atau tanda hubung"),
  institution: z
    .string()
    .min(2, "Nama institusi/sekolah minimal 2 karakter")
    .max(100, "Nama institusi maksimal 100 karakter"),
  project_title: z
    .string()
    .min(3, "Judul proyek minimal 3 karakter")
    .max(120, "Judul proyek maksimal 120 karakter"),
  project_description: z
    .string()
    .min(10, "Deskripsi proyek minimal 10 karakter")
    .max(2000, "Deskripsi proyek maksimal 2000 karakter"),
  completed_modules: z
    .array(z.string())
    .min(1, "Pilih minimal 1 modul yang telah Anda selesaikan"),
  github_url: z
    .string()
    .url("Link GitHub harus berupa URL valid (contoh: https://github.com/username/project)")
    .regex(/^https?:\/\/(www\.)?github\.com\/.+/i, "URL harus mengarah ke repository GitHub publik"),
  deployment_url: z
    .string()
    .url("Link deployment harus berupa URL valid (contoh: https://proyek-anda.vercel.app)"),
  screenshot_url: z.string().optional().or(z.literal("")),
  attachment_url: z.string().optional().or(z.literal("")),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;

export const profileUpdateSchema = z.object({
  full_name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  whatsapp: z.string().max(16).optional().or(z.literal("")),
  institution: z.string().max(100).optional().or(z.literal("")),
  avatar_url: z.string().url("URL avatar tidak valid").optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  full_name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirm_password: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
  institution: z.string().min(2, "Nama institusi minimal 2 karakter"),
  whatsapp: z.string().min(9, "Nomor WhatsApp minimal 9 digit"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Konfirmasi password tidak cocok dengan password",
  path: ["confirm_password"],
});

export const gradingSchema = z.object({
  submission_status: z.enum(["pending", "accepted", "revision_needed", "rejected"]),
  score: z.number().min(0).max(100).optional(),
  admin_notes: z.string().max(2000).optional(),
});
