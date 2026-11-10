# Panduan Environment Variables

Dokumen ini menjelaskan daftar seluruh variabel lingkungan (Environment Variables) yang digunakan oleh aplikasi, fungsi masing-masing variabel, serta aturan keamanannya.

---

## 1. Daftar Variabel Lingkungan

| Nama Variabel | Lingkup | Wajib/Opsional | Deskripsi |
| :--- | :---: | :---: | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser & Server | Wajib | URL proyek Supabase Anda (format: `https://xxxx.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser & Server | Wajib | Kunci anonim publik Supabase untuk query client-side yang dibatasi RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Khusus Server** | Wajib | Kunci admin Supabase dengan hak akses bypass RLS. **Dilarang keras terekspos ke browser!** |
| `NEXT_PUBLIC_APP_ENV` | Browser & Server | Opsional | Nilai: `development` atau `production`. |
| `NEXT_PUBLIC_SITE_URL` | Browser & Server | Opsional | URL domain website (contoh: `http://localhost:3000` atau `https://vibecode.vercel.app`). |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | **Khusus Server** | Opsional | Email Service Account Google Cloud untuk sinkronisasi Google Sheets. |
| `GOOGLE_SHEETS_PRIVATE_KEY` | **Khusus Server** | Opsional | Private Key RSA Service Account Google Cloud. |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | **Khusus Server** | Opsional | ID dokumen Google Spreadsheet tujuan sinkronisasi. |

---

## 2. Aturan Keamanan Krusial (Security Rules)

1. **Awalan `NEXT_PUBLIC_`**:
   Variabel yang diawali dengan `NEXT_PUBLIC_` akan diikutsertakan ke dalam bundel JavaScript yang dikirim ke browser pengguna. Jangan pernah menambahkan awalan ini pada kunci rahasia seperti `SUPABASE_SERVICE_ROLE_KEY` atau `GOOGLE_SHEETS_PRIVATE_KEY`!
2. **Pengecualian Git (`.gitignore`)**:
   Pastikan file `.env.local` selalu tercantum di dalam file `.gitignore` agar tidak pernah terunggah ke repository publik GitHub.
3. **Format Karakter Baris Baru pada Private Key**:
   Saat memasukkan `GOOGLE_SHEETS_PRIVATE_KEY` ke `.env.local`, pastikan tanda petik ganda membungkus seluruh kunci dan karakter baris baru dituliskan sebagai `\n`:
   ```bash
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   ```

---

## 3. Penerapan di Platform Vercel

Ketika melakukan deployment ke Vercel:
1. Buka dashboard Vercel &rarr; pilih proyek Anda &rarr; **Settings** &rarr; **Environment Variables**.
2. Masukkan setiap pasangan Kunci dan Nilai.
3. Centang opsi **Production**, **Preview**, dan **Development**.
4. Lakukan **Redeploy** agar variabel lingkungan baru disuntikkan ke server build.
