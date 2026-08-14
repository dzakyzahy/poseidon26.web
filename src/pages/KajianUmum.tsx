import { motion } from 'framer-motion';

export default function KajianUmum() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-bioluminescent-blue uppercase tracking-widest text-sm mb-4 block font-sans">Kajian Umum</span>
        <h1 className="heading-lg mb-12">Ancaman dari Daratan: <br/>Masa Depan Pesisir Kita</h1>
        
        <div className="prose prose-invert prose-lg max-w-none font-sans text-white/80 leading-relaxed">
          <section className="mb-16">
            <h2 className="font-serif text-3xl mb-6 text-white">Signifikansi Kawasan Pantai</h2>
            <p className="mb-4">
              Pantai bukan sekadar batas antara darat dan laut, melainkan garis pertahanan ekologis yang vital. Secara alami, 
              ekosistem pesisir bertindak sebagai pelindung utama daratan dari abrasi gelombang dan badai. Lebih dari itu, 
              pesisir adalah habitat esensial bagi biodiversitas laut, serta tulang punggung ekonomi kerakyatan bagi komunitas 
              nelayan dan sektor pariwisata.
            </p>
          </section>

          <section className="mb-16 glass-dark p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-bioluminescent-blue/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <h2 className="font-serif text-3xl mb-6 text-white relative z-10">Studi Kasus: Pantai Imut Jongor</h2>
            <p className="relative z-10">
              Di pesisir utara Jawa, Pantai Imut Jongor di Cirebon menjadi saksi bisu dari tekanan ekologis yang intens. 
              Kawasan ini menghadapi akumulasi sedimen lumpur dan peningkatan volume sampah plastik harian yang mengancam 
              keberlangsungan ekosistem lokal serta mata pencaharian nelayan pesisir.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-3xl mb-6 text-white">Realita Pencemaran Laut</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <p>
                  Menurut data Program Lingkungan Perserikatan Bangsa-Bangsa (UNEP), sebuah fakta yang mengejutkan mengungkapkan 
                  bahwa <strong>sekitar 80% dari total pencemaran laut berasal dari aktivitas di daratan</strong>. 
                  Ini mematahkan asumsi bahwa polusi laut hanya terjadi karena aktivitas maritim.
                </p>
              </div>
              <div className="w-48 h-48 rounded-full border-4 border-bioluminescent-blue flex flex-col items-center justify-center shrink-0">
                <span className="text-5xl font-serif font-bold text-white">80%</span>
                <span className="text-xs uppercase tracking-widest text-white/60 mt-2">Berasal dari<br/>Darat</span>
              </div>
            </div>
          </section>

          <section className="mb-16 py-12 border-y border-white/10">
            <h2 className="font-serif text-3xl mb-12 text-center text-white">Perjalanan Sampah Plastik</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 hidden md:block -z-10"></div>
              
              <div className="flex flex-col items-center text-center bg-ocean-900 p-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-4 text-2xl">🏙️</div>
                <h4 className="font-bold text-white">Pemukiman</h4>
                <p className="text-sm text-white/50 max-w-[150px]">Limbah domestik tidak terkelola</p>
              </div>

              <div className="text-bioluminescent-blue">→</div>

              <div className="flex flex-col items-center text-center bg-ocean-900 p-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-4 text-2xl">🏞️</div>
                <h4 className="font-bold text-white">Sungai</h4>
                <p className="text-sm text-white/50 max-w-[150px]">Terbawa arus sungai ke hilir</p>
              </div>

              <div className="text-bioluminescent-blue">→</div>

              <div className="flex flex-col items-center text-center bg-ocean-900 p-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-4 text-2xl">🌊</div>
                <h4 className="font-bold text-white">Muara</h4>
                <p className="text-sm text-white/50 max-w-[150px]">Menumpuk di area estuari</p>
              </div>

              <div className="text-bioluminescent-blue">→</div>

              <div className="flex flex-col items-center text-center bg-ocean-900 p-4">
                <div className="w-16 h-16 rounded-full bg-bioluminescent-blue/20 border border-bioluminescent-blue flex items-center justify-center mb-4 text-2xl">🐋</div>
                <h4 className="font-bold text-bioluminescent-blue">Laut Lepas</h4>
                <p className="text-sm text-white/50 max-w-[150px]">Menjadi mikroplastik dan mengancam biota</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl mb-6 text-white">Dampak Multidimensi</h2>
            <p>
              Sampah laut tidak hanya membunuh biota melalui jeratan (entanglement) atau tertelan (ingestion), tetapi juga 
              merusak terumbu karang yang menopang kehidupan laut. Secara sosial-ekonomi, tumpukan sampah menurunkan nilai 
              estetika wisata dan merusak hasil tangkapan nelayan, yang pada akhirnya memicu siklus kemiskinan di kawasan pesisir.
            </p>
          </section>

        </div>
      </motion.div>
    </main>
  );
}
