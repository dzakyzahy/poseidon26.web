import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const PakEko: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section className="py-32 bg-abyss relative overflow-hidden" ref={containerRef}>
      
      {/* Background illustration/texture for mangrove growth */}
      <motion.div 
        className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at center, #06b6d4 0%, transparent 70%)',
          scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2])
        }}
      />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Large Portrait (Asymmetric, spans 5 cols) */}
        <motion.div 
          style={{ y: imageY }}
          className="md:col-span-5 md:col-start-2 relative aspect-[3/4] border border-slate-800 p-2 glass-panel"
        >
          <div className="w-full h-full relative overflow-hidden bg-slate-900">
            {/* Dark, serious tone */}
            <img 
              src="/images/Gambar1.jpg" 
              alt="Pak Eko merawat bibit mangrove" 
              className="object-cover w-full h-full grayscale-[40%] contrast-125"
            />
            
            <div className="absolute top-4 left-4">
              <span className="font-mono text-[10px] text-cyan-glow uppercase tracking-widest bg-abyss/90 backdrop-blur-sm px-2 py-1 border border-cyan-glow/30">
                LOKAL HERO
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Text Content (Spans 5 cols) */}
        <motion.div 
          style={{ y: textY }}
          className="md:col-span-5 md:col-start-8 flex flex-col justify-center"
        >
          <h3 className="text-4xl md:text-6xl font-display italic text-white mb-8 leading-tight relative">
            <span className="absolute -left-8 top-0 text-cyan-glow/20 text-8xl font-serif">"</span>
            Harapan yang<br/>
            <span className="text-cyan-glow">baru tumbuh.</span>
          </h3>
          
          <div className="space-y-6 font-sans-tech text-sm text-slate-400 leading-relaxed pl-6 border-l border-cyan-glow/30">
            <p>
              "Dulu lumpur di sini isinya plastik semua. Susah cari ikan, apalagi tanam bakau," cerita Pak Eko, salah satu warga penggerak restorasi pesisir.
            </p>
            <p>
              Setelah infrastruktur penahan sampah mulai bekerja dan memfilter area pesisir, inisiatif penanaman mangrove yang sempat mati suri, kini bisa dilanjutkan kembali. Akar-akar muda mulai menemukan tanah yang bersih.
            </p>
          </div>
          
          <div className="mt-10 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-cyan-glow/50 flex items-center justify-center bg-cyan-glow/10">
                <span className="font-mono text-xs text-cyan-glow">3K+</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block">Bibit Mangrove</span>
                <span className="font-sans-tech text-sm text-slate-300">Berhasil ditanam & bertahan</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
