export interface BonusFeature {
  id: string; // e.g. "AND-01", "AND-10"
  title: string;
  category:
    | "Autentikasi & Sesi"
    | "Room Database & CRUD"
    | "UI/UX & Kreasi Mandiri"
    | "Kualitas & Keamanan";
  points: number;
  description: string;
  criteria: string[];
  recommendedPromptTemplate?: string;
}

export const BONUS_FEATURES: BonusFeature[] = [
  // =========================================================================
  // 1. AUTENTIKASI & SESI LOKAL
  // =========================================================================
  {
    id: "AND-01",
    title: "Login Google dengan Credential Manager API",
    category: "Autentikasi & Sesi",
    points: 15,
    description:
      "Siswa dapat masuk ke aplikasi SakuSiswa menggunakan akun Google melalui Android Credential Manager API (androidx.credentials + googleid), bukan GoogleSignInClient yang sudah deprecated.",
    criteria: [
      "Menggunakan CredentialManager.create(context) dan GetGoogleIdOption",
      "Menangkap GetCredentialException dengan try-catch agar tidak crash saat user membatalkan login",
      "Menampilkan nama tampilan (displayName) dan email Google di header aplikasi",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Pastikan SHA-1 debug dan Web Client ID sudah terdaftar di Google Cloud Console.\n[TUJUAN] Membuat GoogleAuthManager.kt menggunakan Android Credential Manager API.\n[KONTEKS] Proyek SakuSiswa Kotlin + Jetpack Compose.\n[INSTRUKSI] Ambil email dan displayName dari GoogleIdTokenCredential, tangani GetCredentialException.\n[BATASAN] Jangan gunakan GoogleSignInClient lama.\n[VALIDASI] Jendela pilih akun Google muncul dan nama siswa tampil setelah login.`,
  },
  {
    id: "AND-02",
    title: "Penyimpanan Sesi Lokal & Fitur Logout Bersih",
    category: "Autentikasi & Sesi",
    points: 10,
    description:
      "Menyimpan email dan nama siswa yang sedang login di SharedPreferences/DataStore lokal serta menyediakan tombol Keluar yang memanggil clearCredentialState().",
    criteria: [
      "Saat aplikasi ditutup dan dibuka ulang, siswa langsung masuk ke HomeScreen tanpa login ulang",
      "Tombol Keluar menghapus sesi lokal dan memanggil clearCredentialState()",
      "Setelah keluar, layar kembali ke LoginScreen",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Data sesi cukup key-value (email & nama), tidak perlu tabel Room.\n[TUJUAN] Menambahkan saveSession(), getSavedSession(), dan signOut() pada GoogleAuthManager.\n[KONTEKS] Kotlin SharedPreferences + CredentialManager.\n[INSTRUKSI] Simpan email & displayName saat login berhasil; bersihkan keduanya dan panggil clearCredentialState() saat Logout.\n[BATASAN] Wajib memanggil .apply() saat menulis SharedPreferences.\n[VALIDASI] Tutup paksa aplikasi lalu buka lagi untuk menguji persistensi sesi.`,
  },

  // =========================================================================
  // 2. ROOM DATABASE & CRUD LENGKAP
  // =========================================================================
  {
    id: "AND-03",
    title: "Konfigurasi Room Database dengan Plugin KSP",
    category: "Room Database & CRUD",
    points: 15,
    description:
      "Menyiapkan @Entity TaskEntity, @Dao TaskDao, dan @Database SakuSiswaDatabase (Singleton) menggunakan KSP (Kotlin Symbol Processing), bukan kapt.",
    criteria: [
      "build.gradle.kts memakai ksp(\"androidx.room:room-compiler:...\")",
      "TaskEntity memiliki @PrimaryKey(autoGenerate = true) dan kolom userEmail",
      "SakuSiswaDatabase memakai pola Singleton (@Volatile + synchronized)",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Tentukan kolom tabel tasks: id, userEmail, subject, title, notes, dueDate, isCompleted.\n[TUJUAN] Membuat TaskEntity.kt, TaskDao.kt, dan SakuSiswaDatabase.kt.\n[KONTEKS] Room 2.6+ dengan KSP dan Kotlin Flow.\n[INSTRUKSI] Buat tabel tasks, DAO untuk CRUD, dan Database Singleton.\n[BATASAN] Dilarang memakai kapt; gunakan KSP.\n[VALIDASI] Build -> Make Project sukses tanpa error SQL dari room-compiler.`,
  },
  {
    id: "AND-04",
    title: "Create — Tambah Tugas Baru dengan Validasi Input",
    category: "Room Database & CRUD",
    points: 15,
    description:
      "Siswa dapat menekan FloatingActionButton '+ Tugas Baru' untuk membuka TaskFormDialog dan menyimpan tugas ke Room Database melalui TaskViewModel.",
    criteria: [
      "Form memiliki input Mata Pelajaran, Judul Tugas, Tenggat Waktu, dan Catatan",
      "Tombol Simpan nonaktif (enabled = false) jika Mata Pelajaran atau Judul kosong",
      "Tugas baru tersimpan dengan userEmail milik akun yang sedang login",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Apa yang terjadi jika user menekan Simpan saat judul masih spasi kosong?\n[TUJUAN] Menghubungkan TaskFormDialog ke viewModel.addTask().\n[KONTEKS] Jetpack Compose Material 3 + TaskViewModel (viewModelScope.launch).\n[INSTRUKSI] Validasi subject.isNotBlank() && title.isNotBlank() sebelum memanggil dao.insertTask().\n[BATASAN] Tutup dialog otomatis setelah simpan.\n[VALIDASI] Tugas baru langsung muncul di urutan atas daftar.`,
  },
  {
    id: "AND-05",
    title: "Read — Daftar Tugas Real-Time (Flow & LazyColumn)",
    category: "Room Database & CRUD",
    points: 15,
    description:
      "Menampilkan daftar tugas milik akun yang login secara reaktif menggunakan Flow<List<TaskEntity>>, collectAsState(), dan LazyColumn lengkap dengan Empty State.",
    criteria: [
      "Query Room memfilter WHERE userEmail = :email",
      "LazyColumn memakai key = { it.id } agar pembaruan item efisien",
      "Empty State tampil ramah ketika daftar tugas kosong",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Mengapa LazyColumn lebih hemat memori daripada Column biasa?\n[TUJUAN] Menampilkan StateFlow<List<TaskEntity>> ke LazyColumn di HomeScreen.\n[KONTEKS] TaskDao mengembalikan Flow, ViewModel mengubahnya menjadi StateFlow dengan flatMapLatest.\n[INSTRUKSI] Amati viewModel.tasks.collectAsState() dan render TaskItemCard di LazyColumn.\n[BATASAN] Pastikan import androidx.compose.foundation.lazy.items terpasang.\n[VALIDASI] Tutup dan buka ulang aplikasi; data tugas tetap tampil dari penyimpanan lokal.`,
  },
  {
    id: "AND-06",
    title: "Update — Edit Isi Tugas & Centang Status Selesai",
    category: "Room Database & CRUD",
    points: 15,
    description:
      "Siswa dapat mengubah detail tugas lewat dialog Edit maupun mencentang Checkbox pada kartu tugas untuk menandai selesai (dengan efek teks dicoret).",
    criteria: [
      "Checkbox memanggil viewModel.toggleTaskCompleted(task) memakai task.copy()",
      "Judul tugas yang selesai otomatis menampilkan TextDecoration.LineThrough",
      "Tombol Edit membuka TaskFormDialog dengan data tugas yang sudah terisi sebelumnya",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Bagaimana Room tahu baris mana yang harus di-update? (Berdasarkan PrimaryKey id).\n[TUJUAN] Mengimplementasikan edit tugas dan toggle status selesai.\n[KONTEKS] TaskViewModel + TaskFormDialog + TaskItemCard.\n[INSTRUKSI] Gunakan task.copy(isCompleted = !task.isCompleted) lalu kirim ke dao.updateTask().\n[BATASAN] Jangan membuat entitas baru (id harus tetap sama).\n[VALIDASI] Efek garis coret bertahan setelah aplikasi dibuka ulang.`,
  },
  {
    id: "AND-07",
    title: "Delete — Hapus Tugas dengan Dialog Konfirmasi",
    category: "Room Database & CRUD",
    points: 10,
    description:
      "Menghapus tugas dari Room Database melalui tombol tempat sampah yang terlebih dahulu memunculkan AlertDialog konfirmasi agar tidak terhapus tidak sengaja.",
    criteria: [
      "Menekan ikon Delete menyimpan state taskToDelete dan menampilkan AlertDialog",
      "Menekan 'Batal' menutup dialog tanpa menghapus data",
      "Menekan 'Hapus' memanggil viewModel.deleteTask() dan daftar langsung terbarui",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Mengapa aksi hapus permanen wajib memakai konfirmasi?\n[TUJUAN] Menambahkan AlertDialog konfirmasi sebelum memanggil viewModel.deleteTask().\n[KONTEKS] HomeScreen.kt Jetpack Compose Material 3.\n[INSTRUKSI] Simpan taskToDelete dalam remember { mutableStateOf<TaskEntity?>(null) }.\n[BATASAN] Set taskToDelete = null di tombol Batal maupun Hapus.\n[VALIDASI] Tugas hilang permanen dari daftar dan tidak muncul lagi saat restart.`,
  },

  // =========================================================================
  // 3. UI/UX & KREASI MANDIRI (HARI 3)
  // =========================================================================
  {
    id: "AND-08",
    title: "Pencarian Real-Time & FilterChip Status Tugas",
    category: "UI/UX & Kreasi Mandiri",
    points: 10,
    description:
      "Siswa dapat mencari tugas berdasarkan judul atau mata pelajaran dan menyaring status (Semua, Aktif, Selesai) menggunakan FilterChip Material 3.",
    criteria: [
      "Pencarian bersifat case-insensitive (ignoreCase = true)",
      "FilterChip menampilkan jumlah item per kategori secara dinamis",
      "Filter tetap berfungsi saat kata kunci pencarian diisi",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Gunakan remember(tasks, searchQuery, filterMode) agar filter efisien.\n[TUJUAN] Menambahkan kotak pencarian dan 3 FilterChip di HomeScreen.\n[KONTEKS] Kotlin List.filter() dan Material 3 FilterChip.\n[INSTRUKSI] Cocokkan filterMode dan teks judul/mapel secara bersamaan.\n[BATASAN] Tidak perlu membuat query SQL baru jika data sudah ada di StateFlow.\n[VALIDASI] Daftar langsung menyusut sesuai kata kunci yang diketik.`,
  },
  {
    id: "AND-09",
    title: "Progress Bar Persentase Ketuntasan Tugas",
    category: "UI/UX & Kreasi Mandiri",
    points: 10,
    description:
      "Menampilkan LinearProgressIndicator di StudentHeaderCard untuk memvisualisasikan persentase tugas yang sudah diselesaikan siswa.",
    criteria: [
      "Menangani kondisi totalTasks == 0 dengan aman (hasil 0f, bebas Divide by Zero / NaN)",
      "Menampilkan teks persentase (contoh: '75% Tugas Selesai')",
      "Progress bar bergerak otomatis saat tugas dicentang",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] Apa hasil 0.0f / 0.0f jika belum dicek totalTasks > 0?\n[TUJUAN] Menambahkan LinearProgressIndicator ke StudentHeaderCard.\n[KONTEKS] Jetpack Compose Material 3.\n[INSTRUKSI] Hitung completionRatio dengan guard if (totalTasks > 0) dan tampilkan persentasenya.\n[BATASAN] Gunakan komponen bawaan Material 3.\n[VALIDASI] Tidak crash saat daftar tugas masih kosong (0 item).`,
  },
  {
    id: "AND-10",
    title: "Label Prioritas Tugas (Tinggi / Sedang / Santai)",
    category: "UI/UX & Kreasi Mandiri",
    points: 15,
    description:
      "Menambahkan kolom priority pada TaskEntity, pemilih prioritas di TaskFormDialog, serta badge warna berbeda di TaskItemCard.",
    criteria: [
      "Kolom priority tersimpan di Room Database (versi database dinaikkan atau app di-reinstall)",
      "Badge warna berbeda antara Tinggi, Sedang, dan Santai",
      "Nilai prioritas lama tetap dapat diubah melalui dialog Edit",
    ],
    recommendedPromptTemplate: `[PIKIRKAN DULU] File apa saja yang terdampak saat menambah kolom baru di TaskEntity? (Entity -> ViewModel -> FormDialog -> ItemCard).\n[TUJUAN] Menambahkan fitur prioritas tugas di SakuSiswa.\n[KONTEKS] Room Database + Jetpack Compose.\n[INSTRUKSI] Tambah properti priority: String = \"Sedang\" pada TaskEntity dan pilihan chip di TaskFormDialog.\n[BATASAN] Naikkan version @Database menjadi 2 agar tidak crash migrasi Room.\n[VALIDASI] Tugas baru menampilkan badge warna sesuai prioritas yang dipilih.`,
  },
  {
    id: "AND-11",
    title: "Tombol Bersihkan Tugas Selesai Sekaligus",
    category: "UI/UX & Kreasi Mandiri",
    points: 10,
    description:
      "Menambahkan query @Query(\"DELETE FROM tasks WHERE userEmail = :email AND isCompleted = 1\") di TaskDao untuk membersihkan arsip tugas yang sudah beres.",
    criteria: [
      "Hanya menghapus tugas milik user yang login dan berstatus isCompleted = true",
      "Dilengkapi dialog konfirmasi sebelum menghapus masal",
    ],
  },
  {
    id: "AND-12",
    title: "Kustomisasi Tema Material 3 (Light & Dark Mode)",
    category: "UI/UX & Kreasi Mandiri",
    points: 10,
    description:
      "Menyesuaikan palet warna Material 3 di ui/theme/Color.kt dan Theme.kt agar aplikasi nyaman dilihat baik di mode terang maupun mode gelap.",
    criteria: [
      "Menggunakan MaterialTheme.colorScheme untuk seluruh warna kartu dan teks (bukan warna hardcoded)",
      "Kontras teks tetap terbaca jelas saat HP berada dalam Dark Mode",
    ],
  },

  // =========================================================================
  // 4. KUALITAS KODE, KEAMANAN & PENGUMPULAN
  // =========================================================================
  {
    id: "AND-13",
    title: "Null-Safety Ketat Tanpa Operator !! & Penanganan Error",
    category: "Kualitas & Keamanan",
    points: 10,
    description:
      "Seluruh kode Kotlin bebas dari operator paksa (!!) yang rawan menyebabkan NullPointerException / Force Close, serta bersih dari logging token sensitif di Logcat.",
    criteria: [
      "Menggunakan Elvis operator (?:) atau safe call (?.) untuk data nullable",
      "Tidak mencetak ID Token Google ke Log.d()",
      "Aplikasi diuji di Logcat dengan filter package:mine level:error tanpa crash",
    ],
  },
  {
    id: "AND-14",
    title: "Build APK, Push GitHub Publik & Dokumentasi README.md",
    category: "Kualitas & Keamanan",
    points: 15,
    description:
      "Menghasilkan file app-debug.apk, mengunggah seluruh proyek ke repository GitHub berstatus Public, dan melengkapi README.md dengan penjelasan arsitektur.",
    criteria: [
      "Repository GitHub berstatus Public dengan struktur folder app/ dan build.gradle.kts lengkap",
      "README.md menjelaskan fitur Login Google, Room Database, CRUD, dan fitur kreasi siswa",
      "Screenshot aplikasi dan link APK/GitHub dikirimkan di halaman Kumpulan Karya",
    ],
  },
];
