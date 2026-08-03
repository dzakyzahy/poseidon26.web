import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const vendors = [
  { id: 1, name: "Ibu Nur", type: "Warung Makan", img: "/images/Gambar1.jpg" },
  { id: 2, name: "Pak Soleh", type: "Penyewaan Perahu", img: "/images/gambar2.jpg" },
  { id: 3, name: "Bu Rina", type: "Kerajinan Kerang", img: "/images/Gambar1.jpg" },
  { id: 4, name: "Kang Yayan", type: "Kopi Nelayan", img: "/images/gambar2.jpg" },
  { id: 5, name: "Teh Nisa", type: "Kios Kelapa", img: "/images/Gambar1.jpg" },
];

export const CoastalEconomy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section id="impact" className="py-32 bg-abyss overflow-hidden" ref={containerRef}>
      
      <div className="max-w-7xl mx-auto px-8 mb-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-6">
          <h3 className="text-4xl md:text-5xl font-display italic text-white mb-6 leading-tight">
            Menghidupkan kembali <span className="text-cyan-glow font-serif">ekonomi lokal.</span>
          </h3>
          <p className="font-sans-tech text-sm text-slate-400 leading-relaxed max-w-md">
            Pembersihan pesisir bukan hanya tentang ekologi, melainkan memutar kembali roda ekonomi masyarakat. Saat lingkungan pulih, kehidupan kembali datang.
          </p>
        </div>
        
        <div className="md:col-span-6 flex items-end md:justify-end">
          <div className="flex items-center gap-6 corner-hud p-4 border-slate-700/50 bg-slate-900/40">
            <div className="text-right">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-1">DULU</span>
              <span className="font-sans-tech text-4xl text-slate-600">0</span>
            </div>
            <div className="w-12 h-[1px] bg-cyan-glow/50 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t border-r border-cyan-glow/50" />
            </div>
            <div>
              <span className="font-mono text-xs text-cyan-glow uppercase tracking-widest block mb-1">SEKARANG</span>
              <span className="font-sans-tech text-4xl text-white">5 <span className="text-sm text-cyan-glow font-mono uppercase tracking-widest">Vendor Aktif</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Carousel */}
      <div className="pl-8 md:pl-[calc((100vw-80rem)/2+2rem)]" data-cursor="drag">
        <motion.div 
          ref={carouselRef}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}
          whileTap={{ cursor: "grabbing" }}
        >
          {vendors.map((vendor, index) => (
            <motion.div 
              key={vendor.id}
              className="min-w-[280px] md:min-w-[350px] aspect-[3/4] relative group border border-slate-800 bg-slate-900"
            >
              {/* Image with amber-to-cyan warmth adjustment */}
              <div className="absolute inset-0 bg-amber-mud/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
              <img 
                src={vendor.img} 
                alt={vendor.name} 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                draggable={false}
              />
              
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-abyss via-abyss/80 to-transparent">
                <span className="font-mono text-[10px] text-cyan-glow uppercase tracking-widest block mb-2">
                  VENDOR {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display italic text-2xl text-white mb-1">{vendor.name}</h4>
                <p className="font-sans-tech text-sm text-slate-400">{vendor.type}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};
