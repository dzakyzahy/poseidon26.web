import { motion } from 'framer-motion';
import Background3D from '../components/hero3d/Background3D';

export default function KajianKhusus() {
  return (
    <>
      <Background3D />
      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen relative z-10 bg-ocean-900/40 backdrop-blur-sm mt-16 rounded-[3rem] shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-bioluminescent-green uppercase tracking-widest text-sm mb-4 block font-sans">Kajian Khusus</span>
        <h1 className="heading-lg mb-12">Data Lapangan & <br/>Siklus Intervensi POSEIDON</h1>
        
        <div className="prose prose-invert prose-lg max-w-none font-sans text-white/80 leading-relaxed">
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <section className="bg-ocean-900/80 p-8 rounded-2xl border border-white/10">
              <h2 className="font-serif text-2xl mb-4 text-white">Geologi & Sedimentasi</h2>
              <p className="text-base text-white/70">
                Pesisir utara Cirebon memiliki karakteristik sedimen yang didominasi oleh endapan lumpur (mud) dan pasir halus. 
                Data batimetri dan stratigrafi lokal menunjukkan adanya lapisan lumpur setebal 4-6 meter di sekitar perairan dangkal.
                Kondisi hidrodinamika arus dan gelombang yang relatif tenang menyebabkan tingkat pengendapan polutan sangat tinggi.
              </p>
            </section>

            <section className="bg-ocean-900/80 p-8 rounded-2xl border border-white/10">
              <h2 className="font-serif text-2xl mb-4 text-white">Dominasi Plastik Tipis</h2>
              <p className="text-base text-white/70">
                Survei lapangan pada muara sungai dan garis pantai mengindikasikan bahwa sampah anorganik mendominasi profil 
                cemaran. Menariknya, <strong>47% dari total puing (debris) adalah sampah plastik tipis (soft plastics/wrappers)</strong>, 
                diikuti oleh botol PET dan styrofoam. Ini menunjukkan perlunya intervensi spesifik untuk jenis sampah residu.
              </p>
            </section>
          </div>

          <section className="mb-16">
            <h2 className="font-serif text-4xl mb-6 text-center text-white">5 Pilar Program POSEIDON</h2>
            <p className="text-center max-w-2xl mx-auto mb-16">
              Pendekatan kami tidak bersifat parsial, melainkan sebuah siklus intervensi berkelanjutan yang terintegrasi dari hulu ke hilir.
            </p>

            {/* Cycle Diagram Layout */}
            <div className="relative w-full max-w-4xl mx-auto py-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                
                {/* MITBEN */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-ocean-800 border border-white/20 flex items-center justify-center mb-4 text-sm font-bold text-white group-hover:border-bioluminescent-green transition-colors">
                    1
                  </div>
                  <h4 className="font-bold text-white mb-2">MITBEN</h4>
                  <span className="text-xs text-bioluminescent-green mb-2 uppercase tracking-widest">Edukasi</span>
                  <p className="text-xs text-white/60">Penyadartahuan mitigasi bencana & pemilahan di sekolah.</p>
                </div>

                {/* KOMPOS */}
                <div className="flex flex-col items-center text-center group mt-8 md:mt-0">
                  <div className="w-16 h-16 rounded-2xl bg-ocean-800 border border-white/20 flex items-center justify-center mb-4 text-sm font-bold text-white group-hover:border-bioluminescent-green transition-colors">
                    2
                  </div>
                  <h4 className="font-bold text-white mb-2">KOMPOS</h4>
                  <span className="text-xs text-bioluminescent-green mb-2 uppercase tracking-widest">Sarana</span>
                  <p className="text-xs text-white/60">Penyediaan infrastruktur tong komposter dan pemilah sampah.</p>
                </div>

                {/* ARUS */}
                <div className="flex flex-col items-center text-center group mt-8 md:mt-0">
                  <div className="w-16 h-16 rounded-2xl bg-ocean-800 border border-white/20 flex items-center justify-center mb-4 text-sm font-bold text-white group-hover:border-bioluminescent-green transition-colors">
                    3
                  </div>
                  <h4 className="font-bold text-white mb-2">ARUS</h4>
                  <span className="text-xs text-bioluminescent-green mb-2 uppercase tracking-widest">Aksi</span>
                  <p className="text-xs text-white/60">Beach clean up massal berbasis data bersama komunitas.</p>
                </div>

                {/* TRANSED */}
                <div className="flex flex-col items-center text-center group mt-8 md:mt-0">
                  <div className="w-16 h-16 rounded-2xl bg-ocean-800 border border-white/20 flex items-center justify-center mb-4 text-sm font-bold text-white group-hover:border-bioluminescent-green transition-colors">
                    4
                  </div>
                  <h4 className="font-bold text-white mb-2">TRANSED</h4>
                  <span className="text-xs text-bioluminescent-green mb-2 uppercase tracking-widest">Pengolahan</span>
                  <p className="text-xs text-white/60">Transformasi sampah terkumpul menjadi produk guna ekonomi.</p>
                </div>

                {/* PEMOD */}
                <div className="flex flex-col items-center text-center group mt-8 md:mt-0">
                  <div className="w-16 h-16 rounded-2xl bg-ocean-800 border border-white/20 flex items-center justify-center mb-4 text-sm font-bold text-white group-hover:border-bioluminescent-green transition-colors">
                    5
                  </div>
                  <h4 className="font-bold text-white mb-2">PEMOD</h4>
                  <span className="text-xs text-bioluminescent-green mb-2 uppercase tracking-widest">Monitoring</span>
                  <p className="text-xs text-white/60">Pemodelan sebaran & evaluasi berkala dampak program.</p>
                </div>

              </div>
              
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"></div>
            </div>
          </section>

          <section className="pt-12 mt-16 border-t border-white/10 text-sm text-white/40">
            <h4 className="font-serif text-white/60 mb-4">Sitasi & Referensi:</h4>
            <ol className="list-decimal pl-4 space-y-2">
              <li>UNEP (2021). From Pollution to Solution: A global assessment of marine litter and plastic pollution.</li>
              <li>Husrin, S., dkk. (2017). Kondisi Sedimen dan Laju Sedimentasi di Perairan Cirebon.</li>
              <li>Purba, N. P., dkk. (2018). Sebaran Sampah Makro di Perairan Utara Jawa Barat.</li>
            </ol>
          </section>

        </div>
      </motion.div>
      </main>
    </>
  );
}
