# POSEIDON ITB 2026 - Maintenance Guide

Dokumen ini berisi panduan teknis bagi *developer* atau pengurus IT POSEIDON ITB 2026 dalam mengelola dan memperbarui konten website ini, terutama fitur-fitur dinamis.

## 1. Pembaruan Instagram Slider (Dynamic Updates)

Website ini memiliki *slider* Instagram di halaman Program yang secara otomatis memuat gambar terbaru tanpa perlu mengedit kode React secara manual. Sistem ini memanfaatkan fitur `import.meta.glob` dari Vite.

### Cara Memperbarui Konten:
1. Siapkan gambar sampul (cover) Instagram yang baru (format `.png` atau `.jpg`).
2. Masukkan gambar tersebut ke dalam folder:
   `public/images/instagram/`
3. Beri nama file menggunakan angka yang lebih besar dari file sebelumnya (contoh: jika file terakhir adalah `6.png`, beri nama file baru `7.png`). Sistem otomatis mengurutkan angka terbesar sebagai postingan paling baru di sebelah kiri *slider*.
4. *Commit* dan *Push* perubahan folder `public/images/instagram/` ke repositori GitHub. Vercel akan secara otomatis melakukan proses *build* ulang dan memperbarui website.

> **Catatan:** Saat ini URL *redirect* post masih mengandalkan mekanisme statis atau *fallback*. Untuk menautkan gambar ke URL IG spesifik, sistem sedang dalam pengembangan untuk membaca data tambahan (seperti JSON metadata) pada tahap *handover* selanjutnya.

## 2. Pengelolaan 3D Assets

Website ini menggunakan React Three Fiber untuk *rendering* 3D (ikan, lautan, sampah).
- Model-model (.glb) tersimpan di `public/models/`.
- Komponen Three.js (seperti *Boids flocking*, *Fish swim/undulation shader*, dan *Trash InstancedMesh*) berada di folder `src/components/hero3d/` dan logika animasinya di `src/hooks/`.
- Performa 3D dioptimalkan dengan `PerformanceMonitor` dari `@react-three/drei` yang menurunkan rasio piksel secara dinamis (DPR) jika FPS perangkat menurun.

## 3. Image Sequence Scroll (Landing Page)

Latar belakang pada bagian pertama (*intro*) menggunakan kanvas yang menggambar rentetan gambar (*image sequence*) saat pengguna melakukan *scroll*. 
- Gambar-gambar sequence tersimpan di `public/images/sequence/`.
- Logika pengikatan posisi scroll ke *frame index* diatur menggunakan `GSAP ScrollTrigger` di dalam file `src/components/intro/VideoScrollSequence.tsx`.
- Jika ingin mengganti video/animasinya, ganti gambar-gambar di dalam folder `sequence` tersebut dan sesuaikan variabel `frameCount` di kodenya.

## 4. Pengelolaan Konten Teks

Semua data tekstual statis biasanya diatur di *array* data pada awal komponen atau dalam folder `src/data/`.
- **Tim & Kepanitiaan**: Tersimpan di `src/data/team.ts`. 
- **Program Kerja**: Tersimpan di `src/pages/Program.tsx`.
- **Syarat Ketentuan & Privasi**: Tersimpan di `src/pages/TermsOfService.tsx` dan `src/pages/PrivacyPolicy.tsx`.

## Proses Deployment

Website ini menggunakan CI/CD yang terhubung ke *branch* `main` di GitHub. 
Setiap kali ada instruksi `git push origin main`, baik GitHub Actions maupun layanan *hosting* (Vercel/Cloudflare Pages) akan terpicu secara otomatis untuk melakukan `npm run build` dan mendistribusikan versi terbarunya ke publik.
