export type UserRole = "student" | "admin" | "instructor";

export type SubmissionStatus = "pending" | "accepted" | "revision_needed" | "rejected";

export type DifficultyLevel = "Pemula" | "Menengah" | "Lanjutan";

export type ProgressStatus = "not_started" | "in_progress" | "completed";

export interface Profile {
  id: string; // references auth.users
  full_name: string;
  email: string;
  whatsapp?: string;
  institution?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover_image?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  module_number: number;
  title: string;
  slug: string;
  description: string;
  estimated_minutes: number;
  difficulty_level: DifficultyLevel;
  is_published: boolean;
  order_index: number;
  created_at: string;
}

export interface AntigravityPromptFormat {
  tujuan: string;
  konteks: string;
  instruksi: string[];
  batasan: string[];
  hasilAkhir: string;
  validasi: string;
  rawPrompt: string; // Clean single-click copy string
}

export interface Lesson {
  id: string;
  module_id: string;
  lesson_number: number;
  title: string;
  slug: string;
  description: string;
  estimated_minutes: number;
  order_index: number;
  is_published: boolean;
  created_at: string;
  // Substantive content fields
  objective?: string;
  prerequisites?: string[];
  concept_explanation?: string;
  preparation?: string[];
  step_instructions?: string[];
  antigravity_prompt?: AntigravityPromptFormat;
  code_snippets?: {
    filename: string;
    language: string;
    code: string;
  }[];
  expected_result?: string;
  validation_check?: string[];
  common_errors?: {
    error: string;
    solution: string;
  }[];
  exercise?: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  references?: {
    title: string;
    url: string;
  }[];
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: ProgressStatus;
  completed_at?: string;
  updated_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  lesson_id: string;
  created_at: string;
}

export interface LearningNote {
  id: string;
  user_id: string;
  lesson_id: string;
  note_text: string;
  created_at: string;
  updated_at: string;
}

export interface WorkSubmission {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  whatsapp: string;
  institution: string;
  project_title: string;
  project_description: string;
  completed_modules: string[];
  github_url: string;
  deployment_url: string;
  screenshot_url?: string;
  attachment_url?: string;
  submission_status: SubmissionStatus;
  score?: number;
  admin_notes?: string;
  submitted_at: string;
  updated_at: string;
}

export interface SubmissionAttachment {
  id: string;
  submission_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

export interface SiteSettings {
  id: string;
  registration_mode: "open" | "invite_only";
  allow_submissions: boolean;
  submission_deadline?: string;
  google_sheets_enabled: boolean;
  google_sheet_id?: string;
  last_sheets_sync?: string;
  site_announcement?: string;
}

export interface IntegrationLog {
  id: string;
  service_name: string;
  event_type: string;
  status: "success" | "failed" | "pending";
  payload?: any;
  error_message?: string;
  created_at: string;
}
