import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getInstagramUpdates } from '../utils/getInstagramUpdates';

const programs = [
  {
    id: 'MANPES',
    title: 'Manajemen Pesisir',
    status: 'Sedang Berjalan',
    progress: 45,
    date: 'Okt 2025 - Mar 2026',
    description: 'Pemetaan partisipatif dan perencanaan tata ruang pesisir desa berbasis data oseanografi.'
  },
  {
    id: 'KOMPOS',
    title: 'Komposter & Pemilah',
    status: 'Belum Mulai',
    progress: 0,
    date: 'Nov 2025',
    description: 'Penyediaan sarana infrastruktur komposter organik dan tong sampah terpilah untuk warga pesisir.'
  },
  {
    id: 'KULAP',
    title: 'Kuliah Lapangan',
    status: 'Selesai',
    progress: 100,
    date: 'Sep 2025',
    description: 'Observasi pendahuluan dan pengambilan data oseanografi fisik, kimia, dan biologi di perairan Cirebon.'
  },
  {
    id: 'SELAM',
    title: 'Selam & Restorasi Coral',
    status: 'Sedang Berjalan',
    progress: 30,
    date: 'Des 2025 - Feb 2026',
    description: 'Rehabilitasi terumbu karang melalui metode transplantasi spider web di area perairan dangkal.'
  },
  {
    id: 'MITBEN',
    title: 'Mitigasi Bencana',
    status: 'Sedang Berjalan',
    progress: 60,
    date: 'Okt 2025',
    description: 'Edukasi dan simulasi kebencanaan pesisir (rob, abrasi) untuk sekolah dasar dan menengah setempat.'
  },
  {
    id: 'ARUS',
    title: 'Aksi Bersih Sampah',
    status: 'Belum Mulai',
    progress: 0,
    date: 'Jan 2026',
    description: 'Pembersihan massal area pantai Jongor yang melibatkan himpunan, komunitas lokal, dan pemerintah.'
  },
  {
    id: 'ETER',
    title: 'Edukasi Terpadu',
    status: 'Selesai',
    progress: 100,
    date: 'Okt 2025',
    description: 'Penyuluhan sadar iklim dan literasi laut (ocean literacy) kepada masyarakat pesisir.'
  },
  {
    id: 'TRANSED',
    title: 'Transformasi Sampah',
    status: 'Sedang Berjalan',
    progress: 25,
    date: 'Nov 2025 - Mar 2026',
    description: 'Pelatihan daur ulang limbah plastik bernilai rendah menjadi produk paving block ekonomis.'
  },
  {
    id: 'PEMOD',
    title: 'Pemodelan Data',
    status: 'Sedang Berjalan',
    progress: 75,
    date: 'Sep 2025 - Jan 2026',
    description: 'Analisis numerik hidrodinamika dan sebaran polutan untuk mengevaluasi dampak jangka panjang program.'
  }
];

export default function Program() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <span className="text-bioluminescent-blue uppercase tracking-widest text-sm mb-4 block font-sans">Produk & Capaian</span>
        <h1 className="heading-lg mb-6 text-white">Program & <br/>Progress POSEIDON</h1>
        <p className="max-w-2xl text-white/60 font-sans leading-relaxed">
          Pemantauan real-time status pelaksanaan 9 program utama POSEIDON ITB 2026. 
          Komitmen kami terukur melalui progres kerja di setiap inisiatif restorasi pesisir dan pemberdayaan masyarakat.
        </p>
      </div>

      <div className="flex flex-col gap-6 overflow-hidden w-full relative -mx-6 px-6 md:mx-0 md:px-0">
        {/* Row 1: Top to Left (default) */}
        <div className="flex w-full overflow-hidden group">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...programs.slice(0, 5), ...programs.slice(0, 5)].map((prog, idx) => (
              <ProgramCard key={`row1-${prog.id}-${idx}`} prog={prog} idx={idx} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Bottom to Right */}
        <div className="flex w-full overflow-hidden group">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          >
            {[...programs.slice(5, 9), ...programs.slice(5, 9), ...programs.slice(5, 9)].map((prog, idx) => (
              <ProgramCard key={`row2-${prog.id}-${idx}`} prog={prog} idx={idx} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Latest Updates Section (Instagram Feed) */}
      <section className="mt-32">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-bioluminescent-blue uppercase tracking-widest text-sm mb-4 block font-sans">Latest Updates</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white flex items-center gap-3">
              <img src="/images/LogoIG.png" alt="Instagram" className="w-8 h-8 object-contain filter brightness-0 sepia hue-rotate-180 saturate-200" />
              @poseidonitb
            </h2>
          </div>
          <a href="https://www.instagram.com/poseidonitb/" target="_blank" rel="noreferrer" className="text-sm font-sans font-bold text-ocean-900 bg-white hover:bg-neutral-200 px-6 py-3 rounded-full transition-colors self-start md:self-auto flex items-center gap-2">
            Ikuti Kami
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* IG Feed Slider (Manual / Auto Generated) */}
        <div className="w-full overflow-x-auto pb-8 snap-x snap-mandatory flex gap-6 hide-scrollbar">
          {getInstagramUpdates().map((post, i) => (
            <a 
              key={i} 
              href={post.link} 
              target="_blank" 
              rel="noreferrer"
              className="snap-start shrink-0 w-[280px] md:w-[320px] aspect-square rounded-2xl overflow-hidden relative group border border-white/10"
            >
              <img src={post.img} alt={`IG Post ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-neutral-900" />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <img src="/images/LogoIG.png" alt="Instagram" className="w-8 h-8 object-contain mb-3 drop-shadow-md" />
                <p className="text-white font-sans text-sm font-medium">Buka di Instagram</p>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs text-white font-sans font-medium">
                {post.date}
              </div>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}

function ProgramCard({ prog, idx }: { prog: typeof programs[0], idx: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (idx % 5) * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={`group flex flex-col p-6 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors w-[320px] md:w-[380px] shrink-0 ${
        prog.status === 'Selesai' ? 'border-l-4 border-l-emerald-500' :
        prog.status === 'Sedang Berjalan' ? 'border-l-4 border-l-amber-500' :
        'border-l-4 border-l-white/20'
      }`}
    >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="font-mono text-bioluminescent-green text-sm tracking-wider mb-1">{prog.id}</span>
                <h3 className="font-sans font-bold text-lg text-white leading-tight">{prog.title}</h3>
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-full border ${
                prog.status === 'Selesai' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' :
                prog.status === 'Sedang Berjalan' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                'text-white/40 border-white/10 bg-white/5'
              }`}>
                {prog.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-8 flex-grow font-sans">
              {prog.description}
            </p>

            {/* Footer / Progress */}
            <div className="mt-auto">
              <div className="flex justify-between text-xs font-mono text-white/40 mb-2">
                <span>{prog.date}</span>
                <span>{prog.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${prog.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`h-full rounded-full ${
                    prog.status === 'Selesai' ? 'bg-emerald-400' :
                    prog.status === 'Sedang Berjalan' ? 'bg-amber-400' :
                    'bg-white/20'
                  }`}
                />
              </div>
            </div>
    </motion.div>
  );
}
