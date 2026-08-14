import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Create horizontal scroll effect tied to vertical scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);

  return (
    <main className="bg-ocean-900">
      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <span className="text-bioluminescent-blue uppercase tracking-widest text-sm mb-4 block font-sans">Galeri</span>
        <h1 className="heading-lg mb-8">Dokumentasi<br/>Kegiatan Lapangan</h1>
        <p className="max-w-xl text-white/60 mb-20">
          Jejak langkah nyata dalam mengabdi pada lingkungan pesisir dan masyarakat sekitar. Scroll ke bawah untuk melihat galeri.
        </p>
      </div>

      <section ref={targetRef} className="h-[300vh] relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-6">
            {images.map((src, index) => (
              <div 
                key={index}
                className="w-[80vw] sm:w-[60vw] md:w-[40vw] h-[50vh] md:h-[60vh] shrink-0 rounded-2xl overflow-hidden relative group"
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
                    Momen {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
