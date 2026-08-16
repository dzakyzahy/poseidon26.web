# Handover & Task List untuk Agent Selanjutnya

Dokumen ini berisi konteks dan daftar perbaikan (bug fixes & fitur) yang harus dieksekusi oleh agent selanjutnya. **Mohon jadikan daftar ini sebagai prioritas eksekusi utama Anda.**

## Konteks Saat Ini
Website POSEIDON ITB 2026 telah mencapai Phase 6. Implementasi *Image Sequence* untuk animasi scroll, integrasi model 3D, serta slider Instagram dinamis yang memuat foto dari folder `public/images/instagram` beserta *mapping JSON* sudah berjalan dengan baik. Semua visual *bug* dan isu performa render 3D dari Phase 5 beserta `prompt6.txt` telah diperbaiki.

## Daftar Tugas yang Telah Diselesaikan (Sesi Ini)

1. **Perbaikan Image Sequence (Stuck di atas)**
   - *Status*: Selesai. Dihapus `overflow-x-clip` di komponen `Home.tsx` agar kanvas `VideoScrollSequence` mengikuti layar selama pengguna melakukan *scroll*. Waktu durasi teks juga telah disesuaikan agar tidak terlalu cepat.

2. **Hapus Background Biru Gelap di Landing Page**
   - *Status*: Selesai. Komponen `<color>` dan `<fog>` pada `Background3D.tsx` telah dihapus sehingga 3D canvas transparan.

3. **Perbaikan Rendering 3D Trash**
   - *Status*: Selesai. Koordinat Y spawn 3D Trash telah direndahkan agar langsung muncul dalam *viewport* kamera. Jumlah sampah ditingkatkan menjadi 15.

4. **Trajektori Ikan & Pelambatan (Boids/Flocking & Patrol)**
   - *Status*: Selesai. Radius sebaran ditingkatkan pada `OrangeFlock`. Kecepatan maksimal, gaya, serta stiffness pada *hooks* `useFlock`, `useFishPatrol`, dan `useFishFollow` diturunkan drastis agar pergerakan tidak "pusing" dan lebih organik. Ditambahkan 1 *GreenFish* berenang bebas.

5. **Penyesuaian Visual dan UI (Prompt 6)**
   - *Status*: Selesai. Ukuran logo Instagram pada navigasi diperbesar. Teks *Persembahan Oseanografi untuk Indonesia* telah dikecilkan. Bug pembekuan (*freeze*) frame 3D saat *scroll up* telah ditangani dengan menonaktifkan transisi durasi panjang. Teks jabatan kepanitiaan "Wakil Ketua" diganti menjadi "Sekretaris Jendral".

## Rencana Fase Lanjutan (Jika Ada)



### Fitur Tambahan & Pembaruan (Phase 5 Lanjutan):
1. **Perbaikan Build & Deploy**: Mengatasi kesalahan impor `useEffect` dan sisa variabel tidak terpakai yang memicu `npm run build` gagal di Cloudflare Pages.
2. **Hapus FixFish**: Seluruh komponen 3D yang lamban memori, termasuk `<FixFish>`, telah dihapus agar rendering tidak ngelag.
3. **Migrasi Animasi Fisika**: `OrangeFish` di migrasi ke `useFishPhysicsSwim` tanpa fungsi *sine wave* manual (yang menyebabkan gerak goyang pusing).
4. **Perbaikan Scroll Bar**: Penambahan *Progress Bar* vertikal lucu di sebelah kiri layar pada `<VideoScrollSequence>` beserta ikan yang berenang ke bawah.
5. **Pop-up Instagram**: Mengubah tautan langsung Instagram di `Program.tsx` menjadi *modal pop-up* preview.
6. **Perbaikan 3D Lag Scroll-up**: Mengganti `IntersectionObserver` yang cacat dengan pendekatan *event listener* `window.scrollY` di `Home.tsx` agar 3D seketika hilang saat kembali ke *image sequence*.
7. **Pencarian Mesh Otomatis**: Mengganti akses dictionary manual pada `TrashSystem.tsx` dengan `scene.traverse()` untuk menelusuri semua komponen `isMesh` secara aman tanpa bergantung pada nama *node*.
8. **Catatan Penting**: Model 3D sampah (`trash_and_debris.glb`) saat ini masih belum ter-render dengan sempurna. Silakan cari tahu apakah masalahnya ada di skala model, posisi koordinat kamera, *lighting*, atau di `instancedMesh` materialnya.

## Rencana Fase Lanjutan (Jika Ada)
- Memeriksa kembali opsi lazy-loading gambar urutan untuk meminimalkan beban memori lebih lanjut, meskipun saat ini performa rendering sudah ditingkatkan secara drastis melalui metode kontrol GPU.
- Pengujian lebih lanjut terkait bounce di sisi mobile untuk melihat apakah IntersectionObserver 100% mulus saat di-scroll dengan cepat.

## Teknologi Terkait (Phase 5)
- **Framer Motion**: Digunakan untuk modal detail Program (animasi popup).
- **React Three Fiber (R3F) & Drei**: 
  - `Canvas` diubah dengan `frameloop="never"` secara dinamis untuk menghentikan kalkulasi 3D saat tertutup objek/saat sequence berjalan.
  - *Custom Shader Material*: Ikan tidak lagi menggunakan gelombang trigonometri (sinus) untuk GreenFish, melainkan membaca data array fisika *real-time*.
- **Tailwind CSS**: Desain UI *glassmorphism* disempurnakan.
