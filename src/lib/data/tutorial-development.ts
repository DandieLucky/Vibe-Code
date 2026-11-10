
// ============================================================================
// BAGIAN 2 — DEVELOPMENT (15 langkah, dikerjakan saat acara)
// ============================================================================

import type { BagianTutorial } from "./tutorial-persiapan";

export const DEVELOPMENT: BagianTutorial = {
  id: "development",
  judul: "Tutorial development Katalog UMKM",
  pengantar:
    "Ikuti 17 langkah ini berurutan. Jangan lompat langkah. Setelah satu langkah selesai " +
    "dan hasilnya sesuai, tekan tombol Selesai di langkah itu.",
  peringatanAwal:
    "Centang hanya untuk membantumu melacak progres, bukan penilaian. Karyamu dinilai dari link aplikasi yang dikumpulkan.",
  langkah: [
    // ---------- BAGIAN 1: Menyiapkan aplikasi sampai online ----------
    {
      id: "d1-deploy-vercel",
      judul: "Deploy template ke Vercel",
      penjelasan:
        "Vercel adalah tempat aplikasimu disimpan dan ditayangkan di internet. Tombol Deploy " +
        "di bawah otomatis menyalin template ke akun GitHub-mu dan langsung bisa tayang.",
      instruksi: [
        "Klik tombol Deploy di halaman tutorial.",
        "Pilih Continue with GitHub, lalu izinkan akses kalau diminta.",
        "Di kolom Repository Name, isi nama tanpa spasi, misalnya katalog-budi. Pastikan gembok berwarna orange.",
        "Setelah itu klik Create.",
        "Tunggu proses deploy sampai muncul tulisan Congratulations (±1–2 menit).",
        "Klik gambar pratinjau atau tombol Continue to Project, lalu klik link domain yang berakhiran .vercel.app.",
        "Catat link ini, nanti dikumpulkan.",
      ],
      hasilDiharapkan:
        "Halaman Toko Contoh tampil dengan 6 produk contoh dan tulisan \"Masih data contoh\". " +
        "Ini normal: aplikasimu sudah online, tapi belum tersambung ke database.",
      troubleshooting: [
        { masalah: "Muncul \"Build failed\"", solusi: "Panggil pendamping, jangan ulang dari awal." },
        { masalah: "Nama repo sudah dipakai", solusi: "Tambahkan angka, misalnya katalog-budi-2." },
      ],
      gambar: [
        { src: "/panduan/dev-vercel-import.png", alt: "Pilih repositori template lalu klik Import" },
        { src: "/panduan/dev-vercel-deploy.png", alt: "Alamat aplikasi tampil setelah deploy selesai" },
      ],
    },
    {
      id: "d2-supabase-project",
      judul: "Buat proyek Supabase",
      penjelasan: "Supabase adalah tempat menyimpan data produk dan akun admin tokomu.",
      instruksi: [
        "Buka supabase.com, klik Sign in, pilih Continue with GitHub.",
        "Klik New Organization.",
        "Isi Project name (misalnya Discaleup).",
        "Isi Database Password (klik Generate juga boleh). Simpan password ini di catatan HP.",
        "Pilih Region: Southeast Asia (Singapore).",
        "Klik Create new project, lalu tunggu sampai selesai (±2 menit).",
      ],
      hasilDiharapkan:
        "Dashboard proyek terbuka, menu di kiri berisi Table Editor, SQL Editor, Authentication, dan lainnya.",
      gambar: [
        { src: "/panduan/dev-supabase-buat-proyek.png", alt: "Isi nama proyek dan password database" },
      ],
    },
    {
      id: "d3-jalankan-schema",
      judul: "Jalankan skrip database",
      penjelasan:
        "Skrip ini membuat tabel produk, mengisi 6 produk awal, dan memasang aturan keamanan database.",
      instruksi: [
        "Buka repo GitHub-mu (alamatnya github.com/akunmu/nama-repo), masuk ke folder docs, klik file schema.sql.",
        "Klik ikon Copy raw file (ikon dua kotak di kanan atas isi file).",
        "Di Supabase, buka menu SQL Editor di sebelah kiri. Pastikan SQL Editor, BUKAN Table Editor.",
        "Tempel (Ctrl+V / Cmd+V) seluruh isi ke kotak editor.",
        "Klik tombol Run di kanan atas.",
        "Buka menu Table Editor, klik tabel produk.",
      ],
      hasilDiharapkan:
        "Muncul tulisan \"Success. No rows returned\", dan di Table Editor tabel produk berisi 6 baris produk.",
      troubleshooting: [
        { masalah: "Ada pesan error merah", solusi: "Pastikan seluruh isi file tersalin dari baris pertama sampai terakhir, lalu klik Run lagi. Skrip aman dijalankan ulang." },
        { masalah: "Muncul peringatan \"destructive operation\"", solusi: "Klik Run this query. Itu karena skrip menghapus aturan lama sebelum membuat yang baru." },
      ],
      gambar: [
        { src: "/panduan/dev-supabase-jalankan-sql.png", alt: "Tempel skrip di SQL Editor lalu klik Run" },
      ],
    },
    {
      id: "d4-akun-admin",
      judul: "Buat akun admin",
      penjelasan:
        "Akun ini dipakai pemilik toko untuk masuk ke halaman admin. Password bawaannya nanti wajib kamu ganti di Langkah 13.",
      instruksi: [
        "Di Supabase, buka menu Authentication, lalu Users.",
        "Klik Add user, pilih Create new user.",
        "Isi email dan password bawaan yang ditampilkan mentor di layar.",
        "Centang Auto Confirm User, lalu klik Create user.",
        "Masih di Authentication, buka Sign In / Providers. Matikan pilihan Allow new users to sign up, lalu klik Save.",
      ],
      hasilDiharapkan:
        "Ada 1 pengguna di daftar Users, dan pendaftaran akun baru sudah dimatikan " +
        "(supaya orang lain tidak bisa membuat akun admin di tokomu).",
      gambar: [
        { src: "/panduan/dev-supabase-buat-admin.png", alt: "Buat akun admin di Authentication > Users" },
      ],
    },
    {
      id: "d5-env-vercel",
      judul: "Pasang environment variable di Vercel",
      penjelasan:
        "Aplikasi butuh 3 kunci untuk bisa membuka database. Kunci ini rahasia: jangan dibagikan ke siapa pun.",
      instruksi: [
        "Di Supabase, ambil 3 nilai berikut (nama menu bisa sedikit berbeda, tanya pendamping kalau tidak ketemu): Project URL di Project Settings → Data API; Publishable key di Project Settings → API Keys (berawalan sb_publishable_); Secret key di halaman yang sama (berawalan sb_secret_, klik ikon mata untuk menampilkan lalu salin).",
        "Buka dashboard Vercel, klik proyekmu, lalu Settings → Environment Variables.",
        "Tambahkan 3 variabel berikut satu per satu (Key di atas, Value di bawah), lalu klik Save.",
      ],
      kode: [
        "Key:   SUPABASE_URL\nValue: (Project URL)",
        "Key:   SUPABASE_PUBLISHABLE_KEY\nValue: (Publishable key)",
        "Key:   SUPABASE_SECRET_KEY\nValue: (Secret key)",
      ],
      hasilDiharapkan: "Kunci terpasang di Vercel dan siap dipakai.",
      peringatan: {
        judul: "Penting",
        isi: "Nama variabel harus persis sama, huruf besar semua, dan tanpa awalan NEXT_PUBLIC_.",
      },
      troubleshooting: [
        { masalah: "Nilai kunci salah tempel", solusi: "Hapus variabelnya, tambahkan ulang dengan teliti. Setelah itu wajib Redeploy." },
      ],
      gambar: [
        { src: "/panduan/dev-vercel-env.png", alt: "Tambah dua variabel lingkungan di Vercel" },
      ],
    },
    {
      id: "d6-redeploy",
      judul: "Redeploy di Vercel",
      instruksi: [
        "Buka tab Deployments, klik titik tiga (⋯) di deploy paling atas, pilih Redeploy, lalu Redeploy lagi.",
      ],
      hasilDiharapkan:
        "Deploy ulang selesai tanpa error. Halaman aplikasi masih menampilkan data contoh. " +
        "Ini normal: kuncinya sudah terpasang, tapi kodenya baru disambungkan ke database di Langkah 9.",
      gambar: [
        { src: "/panduan/dev-vercel-redeploy.png", alt: "Redeploy supaya variabel baru terbaca" },
      ],
    },
    {
      id: "d7-clone-vscode",
      judul: "Clone proyek ke laptop",
      penjelasan: "Supaya bisa dikerjakan bersama AI di laptopmu.",
      instruksi: [
        "Di halaman repo GitHub-mu, klik tombol hijau Code, salin link HTTPS-nya.",
        "Buka VS Code. Buka terminal lewat menu Terminal → New Terminal.",
        "Ketik perintah berikut satu per satu (ganti link dan nama folder dengan milikmu), tekan Enter setiap baris.",
      ],
      kode: ["cd Documents", "git clone https://github.com/akunmu/katalog-budi.git"],
      gambar: [
        { src: "/panduan/dev-vscode-clone.png", alt: "Clone repositori lewat terminal VS Code" },
      ],
    },
    {
      id: "d8-buka-folder",
      judul: "Buka folder di VS Code & pasang komponen",
      instruksi: [
        "Masukkan foldernya ke VS Code: menu File → Add Folder to Workspace..., pilih folder Documents/katalog-budi, lalu klik Add. Kalau muncul pertanyaan tentang kepercayaan penulis file, pilih Yes, I trust the authors.",
        "Buka terminal baru (Terminal → New Terminal). Terminal baru ini otomatis berada di folder katalog-budi. Kalau VS Code meminta memilih folder, pilih katalog-budi. Lalu pasang komponen aplikasi.",
      ],
      kode: ["npm install"],
      hasilDiharapkan:
        "Di panel Explorer (kiri) VS Code terlihat folder katalog-budi. Klik folder itu untuk " +
        "membukanya kalau isinya belum terlihat: di dalamnya ada folder app, components, docs, " +
        "dan file AGENTS.md. Perintah npm install selesai tanpa tulisan merah ERR!.",
      troubleshooting: [
        { masalah: "\"git is not recognized\" / \"npm is not recognized\"", solusi: "Git atau Node.js belum terpasang. Panggil pendamping." },
        { masalah: "Diminta login GitHub", solusi: "Ikuti jendela login yang muncul." },
        { masalah: "npm install error ENOENT / tidak menemukan package.json", solusi: "Terminal belum berada di folder proyek. Ketik cd katalog-budi (atau cd Documents/katalog-budi), lalu ulangi npm install." },
        { masalah: "Folder tidak muncul di Explorer", solusi: "Ulangi File → Add Folder to Workspace... dan pastikan yang dipilih folder katalog-budi, bukan folder Documents." },
        { masalah: "Saat menutup VS Code ditanya menyimpan workspace", solusi: "Boleh pilih Don't Save, folder proyekmu tetap aman. Saat membuka VS Code lagi, ulangi File → Add Folder to Workspace..." },
      ],
      gambar: [
        { src: "/panduan/dev-npm-install-jalan.png", alt: "npm install lalu npm run dev di terminal" },
      ],
    },
    {
      id: "d9-env-lokal",
      judul: "Isi file .env.local & jalankan aplikasi",
      penjelasan:
        "Aplikasi di laptop butuh 3 kunci yang sama seperti di Vercel, disimpan di file .env.local.",
      instruksi: [
        "Di terminal, buat file .env.local dari contohnya.",
        "Di panel Explorer, buka file .env.local di dalam folder katalog-budi, isi 3 nilai yang sama seperti di Langkah 5 (setelah tanda =, tanpa spasi, tanpa tanda kutip). Simpan (Ctrl+S / Cmd+S).",
        "Jalankan aplikasi.",
        "Buka browser ke http://localhost:3000.",
      ],
      kode: ["cp .env.example .env.local          # macOS / Linux", "copy .env.example .env.local        # Windows", "npm run dev"],
      hasilDiharapkan: "Tampilan sama persis dengan link Vercel-mu: Toko Contoh dengan 6 produk contoh.",
      peringatan: {
        judul: "Ingat",
        isi: "Biarkan terminal npm run dev tetap berjalan selama bekerja. Setiap kali kamu mengubah file .env.local, hentikan dulu (Ctrl+C di terminal), lalu jalankan lagi npm run dev.",
      },
      gambar: [
        { src: "/panduan/dev-env-local.png", alt: "Isi file .env.local dengan alamat dan kunci Supabase" },
        { src: "/panduan/dev-supabase-ambil-kunci.png", alt: "Ambil Project URL dan anon key dari Supabase" },
      ],
    },
    // ---------- BAGIAN 2: Jadikan toko milikmu ----------
    {
      id: "d10-identitas-toko",
      judul: "Ubah identitas toko",
      penjelasan:
        "Sebelum memakai AI, ubah identitas toko sesuai usaha yang kamu pilih, lalu kirim perubahan pertamamu.",
      instruksi: [
        "Buka file lib/toko.js. Ganti isi di dalam tanda kutip: nama toko, tagline, alamat, jam buka.",
        "Ganti nomorWhatsApp dengan nomor usaha, format internasional tanpa tanda + dan tanpa angka 0 di depan. Contoh: 6281234567890.",
        "Simpan, lalu cek localhost:3000: nama toko sudah berubah.",
        "Buka terminal baru (Terminal → New Terminal, biarkan yang lama tetap berjalan), lalu kirim perubahan.",
      ],
      kode: ['git add .', 'git commit -m "Kustomisasi identitas toko"', "git push"],
      hasilDiharapkan:
        "Setelah ±1 menit, link Vercel-mu juga menampilkan nama toko yang baru. Artinya alur " +
        "kerja sudah benar: ubah di laptop → push → Vercel otomatis memperbarui.",
      troubleshooting: [
        { masalah: "\"Please tell me who you are\" saat commit", solusi: 'Jalankan dua perintah ini sekali saja, lalu ulangi commit: git config --global user.name "Nama Kamu" dan git config --global user.email "email@kamu.com"' },
        { masalah: "Link Vercel belum berubah", solusi: "Tunggu 1–2 menit, lalu muat ulang. Cek tab Deployments di Vercel apakah deploy baru sedang berjalan." },
      ],
    },
    // ---------- BAGIAN 3: Fitur bersama AI ----------
    {
      id: "d11-us01-katalog",
      judul: "US-01: Katalog dari database",
      penjelasan:
        "Mulai sekarang kamu memakai AI. Di VS Code, klik ikon Antigravity di Activity Bar untuk " +
        "membuka panel chat agent (selanjutnya disebut Agent). Salin prompt, tempel ke Agent, lalu kirim. " +
        "Tunggu AI selesai sebelum mengecek hasilnya.",
      blokPrompt:
        "Baca AGENTS.md dan docs/user-stories.md bagian US-01.\n\n" +
        "Ubah app/page.jsx supaya daftar produk diambil dari tabel \"produk\" di Supabase, di sisi server, " +
        "memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase " +
        "untuk server di folder lib/supabase.\n\n" +
        "Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. " +
        "Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, " +
        "tampilkan tulisan \"Belum ada produk\". Hapus CatatanBelumAktif dari halaman ini.",
      blokKirim: 'git add .\ngit commit -m "US-01: katalog dari database"\ngit push',
      hasilDiharapkan:
        "Tulisan \"Masih data contoh\" hilang dan 6 kartu produk tetap tampil. Karena isinya mirip data " +
        "contoh, buktikan datanya dari database: buka Supabase Table Editor → produk, klik ganda nama " +
        "satu produk, ubah (misalnya jadi \"Kopi Spesial\"), tekan Enter. Muat ulang localhost:3000. " +
        "Nama produk ikut berubah = berhasil.",
      troubleshooting: [
        { masalah: "Ada pesan error di halaman", solusi: 'Salin pesan itu ke Agent dengan kalimat: "Muncul error ini di halaman katalog: (tempel pesan). Perbaiki tanpa mengubah tampilan."' },
        { masalah: "Halaman kosong tanpa pesan apa pun", solusi: "Cek berurutan: (1) terminal npm run dev ada tulisan merah? (2) .env.local ketiga nilai terisi? (3) Supabase Table Editor tabel produk berisi data? (4) Tekan F12 di browser, tab Console, ada tulisan merah? Kalau semua sudah dicek dan masih gagal, panggil pendamping." },
      ],
    },
    {
      id: "d12-us02-detail",
      judul: "US-02: Halaman detail produk",
      blokPrompt:
        "Baca docs/user-stories.md bagian US-02.\n\n" +
        "Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel \"produk\" di Supabase " +
        "berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. " +
        "Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif " +
        "dari halaman ini, tapi biarkan tombol WhatsApp.",
      blokKirim: 'git add .\ngit commit -m "US-02: detail produk dari database"\ngit push',
      hasilItem: [
        "Klik salah satu kartu produk: halaman detail terbuka dengan foto, harga, dan deskripsi.",
        "Ubah deskripsi produk itu di Supabase, muat ulang: deskripsi ikut berubah.",
        "Buka localhost:3000/produk/9999: tampil halaman \"Halaman tidak ditemukan\".",
      ],
      troubleshooting: [
        { masalah: "Halaman detail error tapi katalog normal", solusi: 'Salin pesan error ke Agent dan sebutkan "halaman detail produk".' },
      ],
    },
    {
      id: "d13-us03-whatsapp",
      judul: "US-03: Tombol pesan WhatsApp",
      blokPrompt:
        "Baca docs/rancangan-teknis.md bagian \"Pesan WhatsApp (US-03)\".\n\n" +
        "Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di " +
        "lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan " +
        "di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. " +
        "Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.",
      blokKirim: 'git add .\ngit commit -m "US-03: tombol pesan WhatsApp"\ngit push',
      hasilDiharapkan:
        "Klik tombol di halaman detail: WhatsApp Web (atau aplikasi WhatsApp) terbuka ke nomor tokomu, " +
        'dengan pesan sudah terisi, misalnya "Halo, saya mau pesan Kopi Bubuk Robusta 250 g (Rp 45.000)".',
      troubleshooting: [
        { masalah: "Nomor salah / \"nomor tidak terdaftar\"", solusi: "Cek format di lib/toko.js: 62 di depan, tanpa +, tanpa 0." },
        { masalah: "Tombol tidak bereaksi", solusi: 'Salin ke Agent: "Tombol WhatsApp tidak membuka apa-apa saat diklik. Periksa components/TombolWhatsApp.jsx."' },
      ],
      peringatan: {
        judul: "Sebelum ISHOMA",
        isi: "Buka link Vercel-mu di HP, coba tombol WhatsApp di sana. Pastikan semua perubahan sudah di-push.",
      },
    },
    // ---------- BAGIAN 4: Mengamankan aplikasi ----------
    {
      id: "d14-us04-login-admin",
      judul: "US-04: Login admin",
      penjelasan:
        "Sekarang katalogmu sudah jalan, tapi halaman admin masih bisa dibuka siapa saja. " +
        "Kita pasang kuncinya. Pastikan npm run dev berjalan lagi setelah ISHOMA.",
      blokPrompt:
        "Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.\n\n" +
        "Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, " +
        "memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di " +
        "app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil " +
        "diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. " +
        "Buat juga tombol \"Keluar\" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali " +
        "ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.",
      blokKirim: 'git add .\ngit commit -m "US-04: login admin"\ngit push',
      hasilItem: [
        "Buka localhost:3000/admin/login, masuk dengan password salah: muncul pesan error.",
        "Masuk dengan email dan password bawaan dari Langkah 4: masuk ke halaman daftar produk admin.",
        "Klik Keluar: kembali ke halaman login.",
      ],
      troubleshooting: [
        { masalah: "Selalu \"email atau password salah\"", solusi: "Cek akun di Supabase → Authentication → Users. Pastikan statusnya sudah dikonfirmasi (Langkah 4, Auto Confirm User)." },
        { masalah: "Error tentang cookies atau \"cookies() should be awaited\"", solusi: "Salin pesan error lengkap ke Agent." },
      ],
    },
    {
      id: "d15-us05-ganti-password",
      judul: "US-05: Ganti password admin",
      blokPrompt:
        "Baca docs/user-stories.md bagian US-05.\n\n" +
        "Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, " +
        "memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama " +
        "dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. " +
        "Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. " +
        "Hapus CatatanBelumAktif dari halaman ini.",
      blokKirim: 'git add .\ngit commit -m "US-05: ganti password admin"\ngit push',
      hasilItem: [
        "Login, buka menu Ganti password, isi password baru (minimal 8 karakter). Catat password barumu.",
        "Muncul pesan berhasil.",
        "Klik Keluar, coba login dengan password bawaan: gagal. Login dengan password baru: berhasil.",
      ],
      peringatan: {
        judul: "Wajib",
        isi: "Ganti password juga untuk aplikasimu yang online: buka link Vercel-mu setelah push, login, lalu ganti password di sana. Password bawaan yang masih bisa dipakai akan mengurangi nilai keamanan.",
      },
    },
    {
      id: "d16-us06-proteksi",
      judul: "US-06: Proteksi halaman admin",
      blokPrompt:
        "Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.\n\n" +
        "Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib " +
        "login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap " +
        "Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.",
      blokKirim: 'git add .\ngit commit -m "US-06: proteksi halaman admin"\ngit push',
      hasilItem: [
        "Buka jendela penyamaran (Ctrl+Shift+N / Cmd+Shift+N), ketik localhost:3000/admin: langsung dialihkan ke halaman login.",
        "Coba juga localhost:3000/admin/password: dialihkan ke login.",
        "Setelah login, halaman admin terbuka normal.",
      ],
      troubleshooting: [
        { masalah: "Halaman admin masih terbuka tanpa login", solusi: "Pastikan file bernama persis proxy.js dan berada di folder utama (sejajar dengan package.json), bukan di dalam app. Hentikan dan jalankan lagi npm run dev." },
        { masalah: "Halaman login ikut terkunci (berputar terus)", solusi: 'Salin ke Agent: "Halaman /admin/login ikut dialihkan terus. Kecualikan /admin/login dari proteksi di proxy.js."' },
      ],
    },
    {
      id: "d17-cek-akhir",
      judul: "Cek akhir & kumpulkan karya",
      penjelasan:
        "Semua cek dilakukan di link Vercel, bukan di localhost. Isi form di bagian Kumpulkan karya.",
      instruksi: [
        "Buka link Vercel-mu di HP dan di laptop.",
        "Pastikan link bisa dibuka tanpa login.",
        "Jalankan semua cek keamanan dan cek fitur.",
        "Isi form kumpulkan karya sebelum batas waktu.",
      ],
      peringatan: {
        judul: "Perbarui Next.js",
        isi: "Next.js 16.3.8 di template punya celah keamanan critical. Di terminal folder proyekmu jalankan npm install next@16.4.3, cek dengan npm run dev, lalu commit dan push. Kerentanan yang baru diumumkan setelah karyamu dikirim tidak mengurangi poin.",
      },
    },
  ],
};
