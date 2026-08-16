# Handover & Catatan Untuk AI Agent Selanjutnya (Phase 7)

Website POSEIDON ITB 2026 telah melewati Phase 6. Sesi ini telah menyelesaikan perbaikan besar terkait bug visual 3D dan transisi *image sequence*. 

Tugas ini merupakan serah terima (handover) agar Agent berikutnya dapat melanjutkan pekerjaan (Phase 7) tanpa kebingungan terkait *state* saat ini.

## Apa Saja yang Baru Diselesaikan?
1. **Perbaikan *InstancedMesh* (Trash 3D)**: File `trash_and_debris.glb` memiliki skala geometri mikroskopis. Penggunaan *InstancedMesh* sebelumnya menghilangkan rasio skalanya. Telah diganti menggunakan `<Clone>` dari *drei* di dalam `TrashSystem.tsx`, dan sekarang sampah sukses muncul secara dinamis di layar jatuh dari atas ke bawah.
2. **Pengurangan Jumlah Sampah**: Sesuai masukan terakhir, jumlah objek sampah yang di-*render* dikurangi secara drastis menjadi hanya 2 buah agar layar tidak penuh (`count={2}` di `Background3D.tsx`).
3. **Pembaruan *Image Sequence* Baru**: Aset gambar sekuensial di `public/images/sequence` telah diganti ke dataset gambar `.jpg` terbaru yang berjumlah 246 *frame* (*ImageOceanScroll*). Logika *ScrollTrigger* di `VideoScrollSequence.tsx` telah disesuaikan agar cocok dengan durasi 246 frame, beserta proporsi kemunculan teks ("Lautan...", "Sampah...", "Selamat Datang...").

## Tantangan & Tugas Berikutnya (Next Build & Optimization)

Sebagai AI berikutnya, fokuslah pada hal-hal berikut:

1. **Optimalisasi Memori (Lag Reduction)**
   - Saat ini kita me-load 246 frame gambar (resolusi tinggi) sekaligus di `VideoScrollSequence.tsx` ke dalam array memori. Ini dapat membebani RAM *browser* atau perangkat *mobile* kelas menengah ke bawah.
   - **Tugas**: Terapkan metode *lazy loading* dinamis, melepaskan gambar yang sudah dilewati dari memori, atau menggunakan elemen `<video>` dengan kontrol *currentTime* (*scrubbing*) sebagai pengganti array gambar, yang jauh lebih ramah memori.
   
2. **Kalibrasi Teks Landing Page (*Mobile View*)**
   - Pastikan teks animasi di `VideoScrollSequence` yang baru disesuaikan penempatannya (Frame 125, Frame 180, dsb) muncul dengan responsif dan rapi di semua rasio layar.

3. **Uji Coba Formulir Kontak (Secara Produksi)**
   - Sistem HCaptcha dan Web3Forms pada `Kontak.tsx` telah selesai. Jika ada permintaan penguatan, mungkin menambahkan sistem validasi limitasi (*rate-limiting*) statis sederhana dari sisi *client* sebelum *deploy* akhir.

Silakan pelajari *codebase* dan pastikan *build* sukses pada pekerjaan selanjutnya!
