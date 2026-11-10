import { redirect } from "next/navigation";

/**
 * Halaman ini digantikan oleh /tutorial/development yang memuat 17 langkah
 * lengkap dengan gambar panduan. Dialihkan agar tautan lama tetap bekerja.
 */
export default function PanduanDeploy() {
  redirect("/tutorial/development");
}
