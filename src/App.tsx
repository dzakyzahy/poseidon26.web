import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import FootNav from './components/layout/FootNav';
import Home from './pages/Home';
import KajianUmum from './pages/KajianUmum';
import KajianKhusus from './pages/KajianKhusus';
import Dokumentasi from './pages/Dokumentasi';
import Tim from './pages/Tim';
import Kontak from './pages/Kontak';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-ocean-900 min-h-screen text-sand-50 selection:bg-bioluminescent-blue selection:text-ocean-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kajian-umum" element={<KajianUmum />} />
          <Route path="/kajian-khusus" element={<KajianKhusus />} />
          <Route path="/dokumentasi" element={<Dokumentasi />} />
          <Route path="/tim" element={<Tim />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
        <FootNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
