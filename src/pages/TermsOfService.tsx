import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pt-24 pb-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-500 hover:text-ocean-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Beranda</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-200"
        >
          <h1 className="font-serif text-4xl md:text-5xl mb-4 font-bold text-ocean-900">Syarat dan Ketentuan</h1>
          <p className="text-neutral-500 mb-10">Terakhir Diperbarui: 16 Agustus 2026</p>

          <div className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-ocean-900">
            <p>
              Selamat datang di situs web resmi POSEIDON ITB 2026. Dengan mengakses dan menggunakan situs web ini, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan situs web ini.
            </p>

            <h2>1. Penggunaan Situs Web</h2>
            <p>
              Situs web ini disediakan sebagai platform informasi resmi mengenai program Pengabdian Masyarakat POSEIDON ITB 2026. Anda setuju untuk menggunakan situs ini hanya untuk tujuan yang sah dan dengan cara yang tidak melanggar hak-hak, membatasi, atau menghambat penggunaan situs ini oleh pihak lain.
            </p>

            <h2>2. Hak Kekayaan Intelektual</h2>
            <p>
              Seluruh konten yang terdapat di situs web ini, termasuk namun tidak terbatas pada teks, grafis, logo, ikon, gambar, model 3D, dan klip video, adalah milik POSEIDON ITB atau pihak pemberi lisensinya dan dilindungi oleh undang-undang hak cipta. Anda tidak diizinkan untuk menyalin, mereproduksi, memodifikasi, atau mendistribusikan konten tanpa izin tertulis dari pihak berwenang POSEIDON ITB.
            </p>

            <h2>3. Informasi Organisasi dan Acara</h2>
            <p>
              Kami berusaha menyajikan informasi yang seakurat mungkin mengenai tanggal acara, struktur organisasi, dan program kerja. Namun, kami berhak mengubah, memperbarui, atau menghapus informasi tersebut sewaktu-waktu tanpa pemberitahuan sebelumnya, sesuai dengan dinamika kegiatan.
            </p>

            <h2>4. Tautan Pihak Ketiga</h2>
            <p>
              Situs web ini mungkin menyertakan tautan ke situs web pihak ketiga (seperti media sosial atau mitra sponsor) untuk kenyamanan Anda. Tautan ini tidak menandakan dukungan atau tanggung jawab kami atas konten situs pihak ketiga tersebut.
            </p>

            <h2>5. Batasan Tanggung Jawab</h2>
            <p>
              POSEIDON ITB tidak bertanggung jawab atas kerugian atau kerusakan langsung maupun tidak langsung yang timbul dari penggunaan atau ketidakmampuan menggunakan situs web ini, termasuk namun tidak terbatas pada kerusakan sistem komputer akibat virus atau kesalahan server.
            </p>

            <h2>6. Perubahan Syarat dan Ketentuan</h2>
            <p>
              Kami berhak untuk mengubah, memodifikasi, atau merevisi Syarat dan Ketentuan ini kapan saja. Perubahan akan segera berlaku setelah dipublikasikan di halaman ini. Penggunaan berkelanjutan atas situs ini setelah perubahan menandakan penerimaan Anda terhadap ketentuan yang baru.
            </p>

            <h2>7. Hukum yang Berlaku</h2>
            <p>
              Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia.
            </p>

            <h2>8. Kontak</h2>
            <p>
              Untuk pertanyaan lebih lanjut mengenai Syarat dan Ketentuan ini, Anda dapat menghubungi panitia melalui halaman <strong>Kontak Kami</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
