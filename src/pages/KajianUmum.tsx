import { motion } from 'framer-motion';

export default function KajianUmum() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-screen bg-white text-neutral-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <span className="text-neutral-500 uppercase tracking-[0.15em] text-xs font-semibold mb-3 block">Kajian Umum</span>
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 leading-tight">
            Ancaman dari Daratan: <br/>Masa Depan Pesisir Kita
          </h1>
        </div>
        
        <div className="prose prose-neutral prose-lg max-w-none font-sans text-neutral-700 leading-relaxed">
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4 text-neutral-900">Signifikansi Kawasan Pantai</h2>
            <p className="mb-4">
              Pantai bukan sekadar batas antara darat dan laut, melainkan garis pertahanan ekologis yang vital. Secara alami, 
              ekosistem pesisir bertindak sebagai pelindung utama daratan dari abrasi gelombang dan badai. Lebih dari itu, 
              pesisir adalah habitat esensial bagi biodiversitas laut, serta tulang punggung ekonomi kerakyatan bagi komunitas 
              nelayan dan sektor pariwisata.
            </p>
          </section>

          <section className="mb-12 bg-neutral-50 p-8 rounded-xl border border-neutral-200">
            <h2 className="font-serif text-2xl mb-4 text-neutral-900">Studi Kasus: Pantai Imut Jongor</h2>
            <p>
              Di pesisir utara Jawa, Pantai Imut Jongor di Cirebon menjadi saksi bisu dari tekanan ekologis yang intens. 
              Kawasan ini menghadapi akumulasi sedimen lumpur dan peningkatan volume sampah plastik harian yang mengancam 
              keberlangsungan ekosistem lokal serta mata pencaharian nelayan pesisir.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4 text-neutral-900">Realita Pencemaran Laut</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p>
                  Menurut data Program Lingkungan Perserikatan Bangsa-Bangsa (UNEP), sebuah fakta yang mengejutkan mengungkapkan 
                  bahwa <strong>sekitar 80% dari total pencemaran laut berasal dari aktivitas di daratan</strong>. 
                  Ini mematahkan asumsi bahwa polusi laut hanya terjadi karena aktivitas maritim.
                </p>
              </div>
              <div className="w-32 h-32 rounded-full bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl font-serif font-semibold text-neutral-900">80%</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 mt-1 text-center leading-tight">Berasal dari<br/>Darat</span>
              </div>
            </div>
          </section>

          <section className="mb-12 py-8 border-y border-neutral-200">
            <h2 className="font-serif text-2xl mb-8 text-neutral-900 text-center">Perjalanan Sampah Plastik</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 text-xl border border-neutral-200">🏙️</div>
                <h4 className="font-semibold text-neutral-900 text-sm">Pemukiman</h4>
                <p className="text-xs text-neutral-500 mt-1">Limbah domestik tak terkelola</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 text-xl border border-neutral-200">🏞️</div>
                <h4 className="font-semibold text-neutral-900 text-sm">Sungai</h4>
                <p className="text-xs text-neutral-500 mt-1">Terbawa arus ke hilir</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 text-xl border border-neutral-200">🌊</div>
                <h4 className="font-semibold text-neutral-900 text-sm">Muara</h4>
                <p className="text-xs text-neutral-500 mt-1">Menumpuk di estuari</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-xl border border-blue-100">🐋</div>
                <h4 className="font-semibold text-blue-700 text-sm">Laut Lepas</h4>
                <p className="text-xs text-neutral-500 mt-1">Mengancam biota</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4 text-neutral-900">Dampak Multidimensi</h2>
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
