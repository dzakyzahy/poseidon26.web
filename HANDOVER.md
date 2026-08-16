# Handover & Catatan Untuk AI Agent Selanjutnya (Phase 7)

Website POSEIDON ITB 2026 telah melewati Phase 6. Sesi ini telah menyelesaikan perbaikan besar terkait bug visual 3D dan transisi *image sequence*. 

Tugas ini merupakan serah terima (handover) agar Agent berikutnya dapat melanjutkan pekerjaan (Phase 7) tanpa kebingungan terkait *state* saat ini.

## Apa Saja yang Baru Diselesaikan (Phase 7)?
1. **Perbaikan *InstancedMesh* (Trash 3D)**: Sampah 3D yang awalnya menyatu karena model glTF di-*clone* satu *scene* utuh telah diperbaiki. Kini sistem mengambil *mesh* anak (*child meshes*) secara terpisah sehingga gelas dan objek lain jatuh masing-masing secara individual tanpa menyatu.
2. **Optimalisasi Memori (Lag Reduction) di Video Sequence**: Ratusan gambar beresolusi tinggi yang sebelumnya membebani memori telah dihapus dari antrian *render*. Sistem kini menggunakan tag `<video>` yang me-*load* `Video_Scroll.mp4` secara utuh. Sinkronisasi *ScrollTrigger* dengan properti `currentTime` pada video telah berjalan mulus, sehingga *framerate* dan kualitas gambar (saat teks "Lautan.." muncul) kembali tinggi dan tidak *lag* di *mobile*.
3. **Kalibrasi Teks Landing Page & Program Card (Mobile View)**: Teks *sequence* sudah responsif. Selain itu, masalah kartu program di halaman *Program* yang *overshoot* dan terlalu besar di perangkat HP juga telah diperkecil dari `320px` menjadi `260px` di layar sempit agar pengunjung menyadari ada lebih banyak program untuk digeser (*slider*).
4. **Rate Limiting Kontak**: Penambahan fitur *rate-limiting* client-side sederhana dengan interval 60 detik menggunakan `localStorage` pada formulir kontak untuk mencegah *spam*.

## Tantangan & Tugas Berikutnya (Next Build & Optimization)
Sebagai referensi (prompt) untuk Agent AI selanjutnya, mohon fokus pada penyempurnaan berikut:

1. **Anti Lag & Optimalisasi Performa**
   - Tetap perhatikan alokasi memori pada halaman yang menggunakan *canvas* 3D (`@react-three/fiber`). Hindari memuat ratusan gambar statis beresolusi tinggi (*image sequence*), selalu utamakan penggunaan tag `<video>` yang di-*scrubbing* menggunakan `currentTime` untuk mempertahankan *frame rate* yang tinggi di *mobile*.
   - Jika model 3D (seperti sampah atau ikan) membebani rendering, pertimbangkan untuk menyederhanakan *geometry* atau menggunakan fitur instancing. Jangan render 3D di halaman utama *(landing page)*.

2. **Optimasi Desain (Anti-AI Slop)**
   - Desain tidak boleh terlihat seperti *template* generik (AI slop) yang biasa ditemukan di repositori *open-source/GitHub*.
   - Tambahkan interaktivitas tingkat lanjut, asimetri tata letak yang berkelas, *micro-interactions* pada tombol/kartu, serta palet warna yang premium (vibrant & high-contrast khas estetika lautan dalam). Gunakan hierarki tipografi yang tajam dan tidak membosankan.

## Status
Semua target Handover untuk Phase 7 telah sukses diselesaikan! Silakan lanjutkan pengembangan ke fase berikutnya!
