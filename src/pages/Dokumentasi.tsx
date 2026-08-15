import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Background3DSlow from '../components/hero3d/Background3DSlow';

// Mock images for the gallery
const images = [
  'https://picsum.photos/seed/doc1/800/600',
  'https://picsum.photos/seed/doc2/800/600',
  'https://picsum.photos/seed/doc3/800/600',
  'https://picsum.photos/seed/doc4/800/600',
  'https://picsum.photos/seed/doc5/800/600',
  'https://picsum.photos/seed/doc6/800/600',
];

export default function Dokumentasi() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Background3DSlow />
      <main className="min-h-screen bg-white text-neutral-900 relative z-10 shadow-2xl overflow-hidden max-w-6xl mx-auto">
        <div className="pt-32 px-4 md:px-6 w-full text-center md:text-left border-b border-neutral-200 pb-12 mb-16">
          <span className="text-neutral-500 uppercase tracking-widest text-xs font-semibold mb-3 block font-sans">Galeri</span>
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 leading-tight mb-6">Dokumentasi<br/>Kegiatan Lapangan</h1>
          <p className="max-w-xl text-neutral-600 mb-4 text-sm md:text-base md:mx-0 mx-auto">
            Jejak langkah nyata dalam mengabdi pada lingkungan pesisir dan masyarakat sekitar. Scroll ke bawah untuk melihat galeri.
          </p>
        </div>

      <section className="relative pb-24">
        <div className="overflow-hidden w-full">
          <motion.div 
            animate={isDesktop ? { x: ["0%", "-50%"] } : {}} 
            transition={isDesktop ? { repeat: Infinity, duration: 40, ease: "linear" } : {}}
            className="flex flex-col md:flex-row gap-8 px-6 w-full md:w-max"
          >
            {(isDesktop ? [...images, ...images] : images).map((src, index) => (
              <div 
                key={index}
                className="w-full md:w-[40vw] h-[40vh] md:h-[60vh] shrink-0 rounded-2xl overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-ocean-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={src} 
                  alt={`Dokumentasi ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="font-hand text-2xl text-white text-glow opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                    Momen {(index % images.length) + 1}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
    </>
  );
}
