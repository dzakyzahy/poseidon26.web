import { motion } from 'framer-motion';
import Background3D from '../components/hero3d/Background3D';

export default function KajianUmum() {
  return (
    <>
      <Background3D />
      <main className="pt-32 pb-32 px-6 max-w-4xl mx-auto min-h-screen text-neutral-200 font-sans bg-ocean-900/40 backdrop-blur-sm transition-colors duration-300 relative z-10 rounded-[3rem] mt-16 shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className="mb-20 border-b border-white/20 pb-12">

          <h1 className="text-4xl md:text-6xl font-serif font-normal tracking-tight text-white leading-tight mb-8">
            Solusi Pengelolaan Sampah Pesisir: <br />
            <span className="text-white/70 italic">Upaya Umum dan Penerapannya dalam POSEIDON ITB 2026</span>
          </h1>
        </header>
        
        <article className="prose prose-invert prose-lg max-w-none prose-p:text-white/80 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-white prose-headings:font-normal prose-a:text-bioluminescent-blue">
          
          <p className="text-xl md:text-2xl font-serif text-white/90 leading-relaxed mb-12 border-l-2 border-white/30 pl-6">
            Permasalahan sampah di wilayah pesisir tidak dapat diselesaikan hanya melalui kegiatan pembersihan pantai. Sampah dapat terus masuk dan terakumulasi melalui aktivitas masyarakat maupun aliran perairan sehingga diperlukan pengelolaan yang mencakup pencegahan, pemilahan, pengumpulan, pengolahan, dan pemantauan secara berkelanjutan.
          </p>

          <p>
            Dengan demikian, <em>beach clean up</em> menjadi salah satu bentuk penanganan sampah yang sudah berada di lingkungan, tetapi perlu didukung oleh sistem pengelolaan yang mencegah sampah kembali mencemari wilayah pesisir.
          </p>

          <h2 className="text-3xl mt-16 mb-6">Pentingnya Pengetahuan dan Fasilitas</h2>
          <p>
            Salah satu aspek penting dalam pengelolaan sampah adalah peningkatan pengetahuan dan kesadaran masyarakat. Edukasi diperlukan agar masyarakat memahami dampak sampah sekaligus mengetahui tindakan yang dapat dilakukan untuk mengurangi dan mengelolanya. Astuti dkk. (2023) menunjukkan bahwa pengetahuan dan sikap masyarakat merupakan aspek penting dalam memahami perilaku masyarakat pesisir terhadap sampah plastik. Hal ini menunjukkan bahwa perubahan perilaku perlu menjadi bagian dari strategi pengelolaan sampah di wilayah pesisir.
          </p>
          <p>
            Edukasi perlu disertai dengan fasilitas dan sistem yang memungkinkan masyarakat menerapkan perilaku tersebut. Salah satunya adalah pemilahan sampah sejak dari sumber. Pemilahan sampah berdasarkan jenisnya dapat mempermudah proses pengumpulan dan pengolahan pada tahap berikutnya. Putra dkk. (2020) menunjukkan bahwa edukasi pemilahan sampah dapat mendukung kemampuan masyarakat dalam mengelola sampah secara mandiri. Oleh karena itu, penyediaan sarana pemilahan perlu berjalan bersama dengan edukasi agar masyarakat memiliki fasilitas untuk menerapkan pengetahuan yang diperoleh.
          </p>

          <h2 className="text-3xl mt-16 mb-6">Pendekatan Berbasis Masyarakat</h2>
          <p>
            Pengelolaan sampah berbasis masyarakat juga menjadi pendekatan penting dalam menjaga keberlanjutan sistem pengelolaan. Masyarakat tidak hanya berperan sebagai penerima informasi, tetapi juga terlibat dalam proses penyadaran, pemilahan, pengumpulan, dan pengelolaan sampah sesuai dengan kondisi setempat. Ratumakin dkk. (2022) menunjukkan bahwa pendekatan berbasis komunitas dapat membantu masyarakat mengenali permasalahan sampah, kebutuhan fasilitas, serta sistem pengelolaan yang sesuai dengan kondisi lingkungan dan masyarakat.
          </p>
          <p>
            Di sisi lain, sampah yang telah berada di kawasan pesisir tetap perlu ditangani melalui kegiatan pembersihan. <em>Beach clean up</em> dapat mengurangi sampah yang telah terakumulasi sekaligus menjadi sarana untuk meningkatkan keterlibatan masyarakat. Fachruddin dkk. (2020) menunjukkan bahwa sosialisasi yang disertai partisipasi masyarakat dalam kegiatan pembersihan pantai dapat mendukung kesadaran masyarakat terhadap pencemaran laut. Namun, sampah hasil pembersihan tetap perlu masuk ke sistem pengumpulan dan pengelolaan agar tidak kembali mencemari lingkungan.
          </p>

          <h2 className="text-3xl mt-16 mb-6">Integrasi Program POSEIDON ITB 2026</h2>
          <p>
            Berdasarkan pendekatan tersebut, pengelolaan sampah pesisir dapat dipandang sebagai sebuah rangkaian yang saling terhubung: edukasi dan perubahan perilaku, pemilahan dari sumber, pengumpulan dan penanganan sampah, pengolahan, serta monitoring keberlanjutan. Keberadaan fasilitas, pembagian peran antara masyarakat dan pengelola lokal, serta mekanisme pemantauan menjadi penting agar sistem tidak berhenti ketika kegiatan intervensi selesai.
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <div className="bg-ocean-900 p-8">
              <span className="font-mono text-sm text-bioluminescent-green mb-2 block">01 / MITBEN</span>
              <h3 className="font-serif text-xl text-white mb-3 mt-0">Mitigasi dan Pembenahan</h3>
              <p className="text-sm text-white/70 m-0">Berfokus pada peningkatan pengetahuan dan kepedulian masyarakat mengenai lingkungan pesisir dan pengelolaan sampah melalui kegiatan sosialisasi interaktif.</p>
            </div>
            <div className="bg-ocean-900 p-8">
              <span className="font-mono text-sm text-bioluminescent-green mb-2 block">02 / KOMPOS</span>
              <h3 className="font-serif text-xl text-white mb-3 mt-0">Koordinasi Manajemen</h3>
              <p className="text-sm text-white/70 m-0">Penyediaan sarana dan sistem pengelolaan sampah. Sampah dipilah (organik/anorganik) dan disalurkan melalui sistem terstruktur.</p>
            </div>
            <div className="bg-ocean-900 p-8">
              <span className="font-mono text-sm text-bioluminescent-green mb-2 block">03 / ARUS</span>
              <h3 className="font-serif text-xl text-white mb-3 mt-0">Aksi Responsif</h3>
              <p className="text-sm text-white/70 m-0">Kegiatan beach clean up dimana sampah yang dikumpulkan selanjutnya dipilah dan diarahkan ke sistem pengelolaan bersama pihak terkait.</p>
            </div>
            <div className="bg-ocean-900 p-8">
              <span className="font-mono text-sm text-bioluminescent-green mb-2 block">04 / TRANSED & PEMOD</span>
              <h3 className="font-serif text-xl text-white mb-3 mt-0">Transformasi & Monitoring</h3>
              <p className="text-sm text-white/70 m-0">Pengembangan alternatif pengolahan berbasis teknologi sederhana (TRANSED) dan pemantauan kondisi keberlanjutan hasil intervensi (PEMOD).</p>
            </div>
          </div>

          <p>
            Kelima program tersebut membentuk satu rangkaian pengelolaan sampah. MITBEN membangun pengetahuan dan kesadaran, KOMPOS menyediakan sarana dan sistem pemilahan serta pengumpulan, ARUS menangani sampah yang telah berada di kawasan pesisir, TRANSED memberikan alternatif pengolahan, dan PEMOD memantau keberlanjutan hasil program. Dengan keterhubungan tersebut, intervensi POSEIDON tidak hanya berfokus pada pengurangan sampah yang sudah ada, tetapi juga pada pembentukan sistem yang memungkinkan pengelolaan sampah dilanjutkan oleh masyarakat dan pihak terkait di tingkat lokal.
          </p>

          <hr className="my-16 border-white/20" />

          <section className="text-sm text-white/50 font-sans">
            <h3 className="font-serif text-white/70 text-lg mb-6">Daftar Pustaka</h3>
            <ul className="space-y-4 list-none pl-0">
              <li className="pl-6 relative">
                <span className="absolute left-0 top-0">-</span>
                Astuti, A. D., Frimawaty, E., & Dwiyitno. (2023). Karakteristik sampah sungai dan perilaku masyarakat pesisir terhadap sampah plastik: Studi kasus di Sungai Pengarengan, Kabupaten Cirebon. <em>Jurnal Ilmu Lingkungan</em>, 21(1), 76–85.
              </li>
              <li className="pl-6 relative">
                <span className="absolute left-0 top-0">-</span>
                Fachruddin, I., Buswan, B., Malau, A. G., & Ariwibowo, T. (2020). Sosialisasi dan partisipasi penanggulangan pencemaran laut bagi masyarakat pesisir pantai di Desa Tanjung Pakis Kabupaten Karawang Barat. <em>Jurnal Karya Abdi Masyarakat</em>, 4(1), 177–182.
              </li>
              <li className="pl-6 relative">
                <span className="absolute left-0 top-0">-</span>
                Putra, K. D. I. W., Suryantari, N. L. P. M., Larasati, E., & Ariana, I. K. A. (2020). Edukasi pemilahan sampah untuk menjadikan masyarakat mandiri kelola sampah di Desa Kaba-Kaba. <em>LOGISTA – Jurnal Ilmiah Pengabdian kepada Masyarakat</em>, 4(1), 110–115.
              </li>
              <li className="pl-6 relative">
                <span className="absolute left-0 top-0">-</span>
                Ratumakin, P. A. K. L., Hornay, P. M. A., Agnesia, M., Raga, B. D., & Ethelbert, Y. K. (2022). Fasilitasi tata kelola sampah berbasis komunitas masyarakat pesisir. <em>Jurnal Pendidikan dan Konseling</em>, 4(6).
              </li>
            </ul>
          </section>

        </article>
      </motion.div>
    </main>
    </>
  );
}
