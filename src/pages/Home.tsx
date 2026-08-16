import { useRef } from 'react';
import VideoScrollSequence from '../components/intro/VideoScrollSequence';
import { SponsorGrid } from '../components/intro/SponsorGrid';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <main className="relative z-10 w-full">
        <VideoScrollSequence />
        
        <div ref={contentRef} id="content-section" className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-6 pt-32 pb-32 flex flex-col gap-12">
          {/* Selamat Datang Section */}
          <section className="w-full text-center max-w-4xl mx-auto">
            <div className="bg-ocean-900/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl">
              <h2 className="heading-lg font-serif text-white tracking-wide flex flex-col items-center">
                <span className="text-2xl md:text-4xl mb-4">Selamat Datang di</span>
                <span className="font-sans text-bioluminescent-blue italic text-4xl md:text-7xl">Website POSEIDON ITB 2026</span>
              </h2>
            </div>
          </section>

          {/* Tentang POSEIDON Section */}
          <section className="w-full text-center max-w-4xl mx-auto">
            <div className="bg-ocean-900/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl">
              <h2 className="heading-lg font-sans font-bold mb-6 text-white">
                TENTANG <span className="text-bioluminescent-blue font-serif italic">POSEIDON ITB</span>
              </h2>
              <p className="body-lg text-white/90 leading-relaxed font-sans font-light">
                POSEIDON ITB 2026 adalah program Pengabdian Masyarakat inovatif yang berfokus pada restorasi ekologi pesisir dan pemberdayaan masyarakat di Pantai Imut Jongor, Cirebon. Kami hadir sebagai solusi berkelanjutan untuk menghadapi tantangan abrasi dan pencemaran laut.
              </p>
            </div>
          </section>

          {/* Sponsor Section */}
          <section className="w-full">
            <div className="bg-ocean-900/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-2xl overflow-hidden">
              <SponsorGrid />
            </div>
          </section>
        </div>

      </main>
    </>
  );
}
