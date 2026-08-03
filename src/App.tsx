import { useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { FieldSurvey } from './components/FieldSurvey';
import { SurvivingRHS } from './components/SurvivingRHS';
import { ScientificData } from './components/ScientificData';
import { CoastalEconomy } from './components/CoastalEconomy';
import { PakEko } from './components/PakEko';
import { AboutSponsors } from './components/AboutSponsors';
import Lenis from '@studio-freight/lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-abyss min-h-screen selection:bg-cyan-glow/30 selection:text-cyan-50 font-sans-tech">
      <CustomCursor />
      
      {/* Minimal Glass Navbar */}
      <nav className="fixed top-0 w-full z-40 px-8 py-6 mix-blend-difference flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto cursor-pointer" data-cursor="button">
          <img src="/Logo_ITB.png" alt="ITB Logo" className="h-10 md:h-12 w-auto object-contain" />
          <div className="font-display font-bold text-3xl md:text-4xl tracking-wider text-white">
            POSEIDON<span className="font-sans-tech text-cyan-400">26</span>
          </div>
        </div>
        <div className="hidden md:flex gap-8 font-sans-tech text-sm tracking-widest uppercase text-white pointer-events-auto">
          <a href="#survey" className="hover:text-cyan-glow transition-colors" data-cursor="button">Survey</a>
          <a href="#data" className="hover:text-cyan-glow transition-colors" data-cursor="button">Data</a>
          <a href="#impact" className="hover:text-cyan-glow transition-colors" data-cursor="button">Impact</a>
        </div>
      </nav>

      <main>
        <Hero />
        <FieldSurvey />
        <SurvivingRHS />
        <ScientificData />
        <CoastalEconomy />
        <PakEko />
        <AboutSponsors />
      </main>

      <footer className="w-full py-6 text-center border-t border-slate-900 bg-[#01030a] relative z-10">
        <p className="text-[8px] text-slate-700 opacity-50 uppercase tracking-widest font-mono">
          3D Models: Shark, Fish, Crayfish by Poly by Google [CC-BY] via Poly Pizza | Black Lion Fish, Clownfish by Quaternius
        </p>
      </footer>
    </div>
  );
}

export default App;
