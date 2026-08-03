import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FieldSurvey: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="survey" 
      ref={containerRef}
      className="relative min-h-screen bg-abyss flex items-center py-32 px-8 overflow-hidden border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Text & Data Column (Asymmetric 4 cols) */}
        <motion.div 
          style={{ y: y2, opacity }}
          className="col-span-1 md:col-span-5 md:col-start-2 z-10"
        >
          <div className="inline-block corner-hud p-3 mb-8 border-slate-700/50 bg-slate-900/40">
            <span className="font-mono text-xs text-amber-mud uppercase tracking-widest block">
              STATUS LAPANGAN · H+90
            </span>
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mt-1">
              KOORDINAT: 06°01' S, 106°49' E
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-display italic text-slate-300 mb-6 leading-tight">
            Arus <span className="text-amber-mud opacity-80">membawa realita</span> yang lebih keras dari prediksi.
          </h3>
          
          <div className="space-y-4 font-sans-tech text-sm text-slate-400 leading-relaxed max-w-sm">
            <p>
              Dua hingga tiga bulan setelah pemasangan, jebakan sampah pertama kami hancur diterjang arus deras saat musim penghujan.
            </p>
            <p>
              Tidak ada desain korporat yang manis di sini. Beban sampah plastik bercampur sedimentasi lumpur membuktikan bahwa teori seringkali patah di lapangan.
            </p>
          </div>
        </motion.div>

        {/* Image Column (Asymmetric 6 cols) */}
        <motion.div 
          style={{ y: y1 }}
          className="col-span-1 md:col-span-6 relative"
          data-cursor="view"
        >
          {/* Subtle amber glow behind image */}
          <div className="absolute -inset-10 bg-amber-mud/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden border border-slate-800/50 bg-slate-900">
            {/* Placeholder for the actual field survey photo */}
            <div className="absolute inset-0 bg-turbid-water opacity-30 mix-blend-multiply" />
            <img 
              src="/images/Gambar1.jpg" 
              alt="Kondisi jebakan sampah rusak di lapangan" 
              className="object-cover w-full h-full opacity-60 grayscale-[50%] sepia-[20%] transition-transform duration-1000 hover:scale-105"
            />
            
            {/* Data Overlay on Image */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="font-mono text-[10px] text-slate-300 tracking-widest uppercase bg-abyss/80 backdrop-blur-sm px-2 py-1 border border-slate-700/50">
                LOG: STRUCTURAL_FAILURE
              </div>
              <div className="font-mono text-[10px] text-amber-mud tracking-widest uppercase bg-abyss/80 backdrop-blur-sm px-2 py-1 border border-amber-900/50">
                DEBRIS LOAD: CRITICAL
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
