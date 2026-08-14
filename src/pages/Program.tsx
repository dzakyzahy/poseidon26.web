import { motion } from 'framer-motion';

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((prog, idx) => (
          <motion.div 
            key={prog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group flex flex-col p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
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
        ))}
      </div>
    </main>
  );
}
