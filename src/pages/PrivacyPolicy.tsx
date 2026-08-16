import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
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
          <h1 className="font-serif text-4xl md:text-5xl mb-4 font-bold text-ocean-900">Kebijakan Privasi</h1>
          <p className="text-neutral-500 mb-10">Terakhir Diperbarui: 16 Agustus 2026</p>

          <div className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-ocean-900">
            <p>
              POSEIDON ITB ("kami", "milik kami", atau "organisasi kami") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda mengunjungi situs web kami atau berpartisipasi dalam program kami.
            </p>

            <h2>1. Informasi yang Kami Kumpulkan</h2>
            <p>
              Saat Anda menggunakan situs web kami atau menghubungi kami melalui formulir yang tersedia (misalnya formulir Kontak Kami), kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela, termasuk namun tidak terbatas pada:
            </p>
            <ul>
              <li>Nama lengkap</li>
              <li>Alamat email</li>
              <li>Nomor telepon (jika disertakan dalam pesan)</li>
              <li>Pesan atau pertanyaan yang Anda kirimkan</li>
            </ul>

            <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p>
              Informasi yang kami kumpulkan semata-mata digunakan untuk tujuan berikut:
            </p>
            <ul>
              <li>Merespons pertanyaan, tanggapan, atau pesan yang Anda kirimkan melalui formulir kontak.</li>
              <li>Berkomunikasi mengenai kegiatan, program relawan, donasi, atau pembaruan terkait POSEIDON ITB 2026.</li>
              <li>Meningkatkan pengalaman pengunjung situs web kami.</li>
            </ul>

            <h2>3. Perlindungan dan Penyimpanan Data</h2>
            <p>
              Kami tidak akan menjual, menyewakan, atau menukar informasi pribadi Anda (seperti nama dan email) kepada pihak ketiga. Informasi Anda disimpan dengan aman dan hanya dapat diakses oleh panitia atau anggota inti POSEIDON ITB yang membutuhkan informasi tersebut untuk merespons pertanyaan Anda.
            </p>

            <h2>4. Penggunaan Layanan Pihak Ketiga</h2>
            <p>
              Situs web kami mungkin menggunakan layanan analitik anonim pihak ketiga (seperti analisis trafik) untuk memahami bagaimana pengunjung berinteraksi dengan situs kami. Data ini bersifat agregat dan tidak mengidentifikasi Anda secara pribadi.
            </p>

            <h2>5. Tautan ke Situs Eksternal</h2>
            <p>
              Situs web kami mungkin berisi tautan ke situs eksternal (seperti Instagram). Kami tidak bertanggung jawab atas konten atau praktik privasi dari situs-situs tersebut. Kami menyarankan Anda untuk membaca kebijakan privasi mereka sebelum memberikan informasi apa pun.
            </p>

            <h2>6. Perubahan pada Kebijakan Ini</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini secara berkala. Segala perubahan akan diumumkan di halaman ini dengan tanggal "Terakhir Diperbarui" yang baru.
            </p>

            <h2>7. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui halaman <strong>Kontak Kami</strong> atau kirimkan email ke alamat resmi kami.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
