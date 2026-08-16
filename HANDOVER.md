# Handover & Task List untuk Agent Selanjutnya

Dokumen ini berisi konteks dan daftar perbaikan (bug fixes & fitur) yang harus dieksekusi oleh agent selanjutnya. **Mohon jadikan daftar ini sebagai prioritas eksekusi utama Anda.**

## Konteks Saat Ini
Website POSEIDON ITB 2026 telah mencapai Phase 5 dengan implementasi *Image Sequence* untuk animasi scroll, integrasi model 3D (Green Fish, Orange Fish, FIX_fish, dan Trash), serta slider Instagram dinamis yang memuat foto dari folder `public/images/instagram`.

Namun, masih terdapat beberapa *bug* visual dan penyesuaian logika yang perlu diperbaiki.

## Daftar Tugas (To-Do List)

1. **Perbaikan Image Sequence (Stuck di atas)**
   - *Issue*: Frame *image sequence* pada landing page saat ini *stuck* di atas dan tidak mengikuti *scroll* ke bawah secara mulus.
   - *Action*: Perbaiki CSS (misalnya `sticky`, `fixed`, atau `absolute`) atau logika `ScrollTrigger` di komponen `VideoScrollSequence.tsx` agar kanvas/gambar mengikuti layar (terkunci di *viewport*) selama pengguna melakukan *scroll*.

2. **Hapus Background Biru Gelap di Landing Page**
   - *Action*: Cari elemen pembungkus (kemungkinan di `VideoScrollSequence.tsx` atau `Home.tsx`) yang memiliki warna background tersebut dan hapus agar transisi ke halaman bawah lebih bersih.

3. **Periksa Rendering 3D Trash**
   - *Issue*: Sistem *Trash* (sampah) mungkin masih belum ter-render dengan sempurna atau posisinya salah.
   - *Action*: Periksa komponen `TrashSystem.tsx`. Pastikan titik awal (*spawn point*) sampah berada dalam jangkauan kamera dan objek jatuh (*fall speed*) terkalibrasi dengan baik sehingga terlihat di layar.

4. **Trajektori Ikan (Boids/Flocking)**
   - *Issue*: Saat ini trajektori/pergerakan semua ikan hampir sama sehingga terlihat monoton.
   - *Action*: Bedakan logika pergerakan atau kecepatan dasar antara `GreenFish`, `OrangeFlock`, dan `FixFish`. Khususnya untuk `OrangeFlock` (ikan oranye), buat agar mereka lebih menyebar (*scattered*) dan tidak terlalu menumpuk. Anda bisa menyesuaikan parameter boids di `useFlock.ts` atau `useFishPatrol.ts`.

5. **Pelambatan Kecepatan Ikan**
   - *Issue*: Kecepatan ikan masih dirasa terlalu cepat, baik yang berada di belakang layar (`Background3DSlow.tsx`) maupun yang mengikuti *cursor* (`Background3D.tsx` / `useFishFollow.ts`).
   - *Action*: Turunkan drastis parameter *speed*, *velocity*, dan *stiffness* pada semua *hooks* pergerakan ikan agar ikan berenang jauh lebih lambat dan santai.

6. **Perubahan Teks Struktur Organisasi**
   - *Issue*: Jabatan "Wakil Ketua" perlu direvisi.
   - *Action*: Ubah teks "Wakil Ketua" menjadi "Sekretaris Jendral" di dalam file data kepanitiaan (kemungkinan di `team.ts` atau `Tim.tsx`).

7. **Sistem Link Dinamis untuk IG Slider**
   - *Issue*: Saat ini otomatisasi Instagram hanya membaca gambar dari folder `public/images/instagram`, namun *link* (URL) menuju post aslinya masih statis atau menggunakan *mapping* manual di kode.
   - *Action*: Buat mekanisme agar *developer* juga dapat memasukkan/meng-update *link* IG terkait untuk masing-masing gambar. (Saran: developer dapat meletakkan file `.json` berdampingan dengan gambar, atau mengadopsi format penamaan file tertentu seperti `1___https-link.png`, atau membaca dari sebuah file `data/ig_posts.json` yang mudah diedit).

### Fitur Tambahan & Pembaruan (Phase 5 Lanjutan):
1. **Perbaikan Build & Deploy**: Mengatasi kesalahan impor `useEffect` dan sisa variabel tidak terpakai yang memicu `npm run build` gagal di Cloudflare Pages.
2. **Animasi Undulasi Berbasis Fisika (Spring-Damper)**: 
   - Komponen **GreenFish** dan **OrangeFish** kini menggunakan *hook* khusus `useFishPhysicsSwim`.
   - Menggunakan pendekatan rantai tulang virtual (*virtual bone chain*) di JavaScript yang menghitung posisi/kecepatan di koordinat lokal ikan menggunakan mekanisme *Spring-Damper* (meniru kelambatan nyata momentum ayunan ekor, bukan sekadar perulangan gelombang Sinus). Ikan terlihat mengayun jauh lebih mulus karena *stiffness* telah diturunkan.
   - Simpangan posisi ini dilempar ke *Vertex Shader* melalui array konstan/uniform `uWaveOffsets`.
3. **Flock Berenang Bebas & Disebar (Scattered)**: Ikan perbaikan (`FixFish`) telah dihapus secara permanen untuk menghemat performa. Ikan oren kawanan (`OrangeFlock`) tidak lagi mengekor ke arah kursor. Mereka menyebar secara natural (*high separation*) dan sesekali membentuk kelompok kecil (*schooling*) secara periodik.
4. **Sinkronisasi Teks & Scroll Progress**: Teks narasi diatur agar muncul tepat pada *frame* gambar tertentu (Frame 96 untuk "Lautan", Frame 138 untuk "Sampah"). Selain itu, sebuah *loading bar* ditambahkan di bagian atas layar untuk memandu interaksi *scroll*.
5. **Perbaikan Lag 3D saat Scroll Up**: Transisi mengaktifkan/menonaktifkan kanvas 3D tidak lagi menggunakan `IntersectionObserver` yang lambat respons, melainkan menggunakan pembacaan `window.scrollY` secara presisi.

## Rencana Fase Lanjutan (Jika Ada)
- Memeriksa kembali opsi lazy-loading gambar urutan untuk meminimalkan beban memori lebih lanjut, meskipun saat ini performa rendering sudah ditingkatkan secara drastis melalui metode kontrol GPU.
- Pengujian lebih lanjut terkait bounce di sisi mobile untuk melihat apakah IntersectionObserver 100% mulus saat di-scroll dengan cepat.

## Teknologi Terkait (Phase 5)
- **Framer Motion**: Digunakan untuk modal detail Program (animasi popup).
- **React Three Fiber (R3F) & Drei**: 
  - `Canvas` diubah dengan `frameloop="never"` secara dinamis untuk menghentikan kalkulasi 3D saat tertutup objek/saat sequence berjalan.
  - *Custom Shader Material*: Ikan tidak lagi menggunakan gelombang trigonometri (sinus) untuk GreenFish, melainkan membaca data array fisika *real-time*.
- **Tailwind CSS**: Desain UI *glassmorphism* disempurnakan.
