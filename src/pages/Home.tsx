import { useEffect, useState, useRef } from 'react';
import VideoScrollSequence from '../components/intro/VideoScrollSequence';
import { SponsorGrid } from '../components/intro/SponsorGrid';
import Background3D from '../components/hero3d/Background3D';

export default function Home() {
  const [show3D, setShow3D] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow3D(true);
        } else if (window.scrollY < window.innerHeight * 3) {
          setShow3D(false);
        }
      },
      { threshold: 0.1 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`transition-opacity duration-1000 ${show3D ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* We use opacity and conditionally pause frameloop inside Background3D if possible, or just keep it mounted.
            Using display:none (hidden) can sometimes break R3F sizing, so opacity 0 is safer for now. */}
        <Background3D active={show3D} />
      </div>
      <main className="relative z-10 w-full overflow-x-clip">
        <VideoScrollSequence />
        
        <div ref={contentRef} id="content-section" className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-6 pt-32 pb-32 flex flex-col gap-12">
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

        {/* Extra space to enjoy the 3D scene */}
        <div className="h-[50vh] w-full pointer-events-none" />
      </main>
    </>
  );
}
