import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SurvivingRHS: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] bg-abyss flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Background ambient glow - shifting to cyan */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-teal-deep/10 to-abyss pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full px-8 relative z-10 flex flex-col items-center">
        
        <motion.div 
          style={{ opacity }}
          className="text-center mb-16 max-w-2xl"
        >
          <div className="inline-block border-b border-cyan-glow/30 pb-2 mb-6">
            <span className="font-mono text-xs text-cyan-glow uppercase tracking-widest block">
              INFRASTRUKTUR BERTAHAN
            </span>
          </div>
          <h3 className="text-4xl md:text-6xl font-display italic text-white mb-6 leading-tight">
            Napas lega <span className="text-cyan-glow font-serif">di pesisir utara.</span>
          </h3>
          <p className="font-sans-tech text-sm text-slate-300 leading-relaxed">
            Meski jebakan awal hancur, desain RHS (Rotary Hydro Screen) generasi selanjutnya membuktikan bahwa ketahanan struktural di lingkungan laut dinamis adalah mungkin. Infrastruktur ini tetap berdiri, fungsional, dan menahan laju sampah.
          </p>
        </motion.div>

        <motion.div 
          style={{ scale, opacity }}
          className="w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] relative border border-slate-700 p-2 glass-panel"
          data-cursor="view"
        >
          <div className="w-full h-full relative overflow-hidden bg-slate-900">
            {/* Clearer, brighter image to contrast the previous section */}
            <div className="absolute inset-0 bg-cyan-glow opacity-10 mix-blend-screen" />
            <img 
              src="/images/gambar2.jpg" 
              alt="RHS yang bertahan di pesisir" 
              className="object-cover w-full h-full"
            />
            
            {/* UI Overlays */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2 bg-abyss/80 backdrop-blur-md px-3 py-1.5 border border-cyan-glow/30">
                <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                <span className="font-mono text-[10px] text-cyan-50 tracking-widest uppercase">
                  STATUS: OPERATIONAL
                </span>
              </div>
              <div className="bg-abyss/80 backdrop-blur-md px-3 py-1.5 border border-slate-700/50">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                  INTEGRITY: 94%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
