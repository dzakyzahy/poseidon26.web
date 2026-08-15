import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar if scrolled down more than 100px OR if not on home page
      if (!isHome || window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 pointer-events-none ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
    } ${
      isHome 
        ? 'top-0 left-0 p-6 mix-blend-difference' 
        : 'top-4 left-0 px-4 md:px-8 pointer-events-auto opacity-100 translate-y-0'
    }`}>
      <div className={`mx-auto transition-all duration-300 ${
        isHome 
          ? 'max-w-7xl flex items-center justify-between'
          : 'max-w-5xl flex items-center justify-between bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl py-3 px-6'
      }`}>
        {/* Logo area */}
        <div className="flex items-center gap-4 h-12 pointer-events-auto">
          <Link to="/" className="flex items-center gap-3 h-full">
            <img src="/Logo_ITB.png" alt="ITB Logo" className="h-8 md:h-10 w-auto object-contain" />
            <img src="/logos/logoPOSEIDON.png" alt="POSEIDON Logo" className="h-10 md:h-12 w-auto object-contain" />
            <span className={`font-sans font-bold tracking-tight ${isHome ? 'text-white' : 'text-white/90'}`}>
              POSEIDON ITB 2026
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex gap-6 text-xs uppercase tracking-[0.2em] font-sans font-medium pointer-events-auto ${isHome ? 'text-white/80' : 'text-white/70'}`}>
          <Link to="/program" className="hover:text-bioluminescent-blue transition-colors">Program</Link>
          <Link to="/kajian-umum" className="hover:text-bioluminescent-blue transition-colors">Kajian Umum</Link>
          <Link to="/kajian-khusus" className="hover:text-bioluminescent-blue transition-colors">Kajian Khusus</Link>
          <Link to="/dokumentasi" className="hover:text-bioluminescent-blue transition-colors">Dokumentasi</Link>
          <Link to="/tim" className="hover:text-bioluminescent-blue transition-colors">Tim</Link>
          <Link to="/kontak" className="hover:text-bioluminescent-blue transition-colors">Kontak</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden pointer-events-auto p-2 text-white/80 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full mt-2 px-4 md:hidden pointer-events-auto">
          <div className="bg-ocean-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-4 text-sm font-sans font-medium uppercase tracking-widest text-white/80">
            <Link to="/program" onClick={() => setIsMenuOpen(false)} className="hover:text-bioluminescent-blue transition-colors py-2 border-b border-white/5">Program</Link>
            <Link to="/kajian-umum" onClick={() => setIsMenuOpen(false)} className="hover:text-bioluminescent-blue transition-colors py-2 border-b border-white/5">Kajian Umum</Link>
            <Link to="/kajian-khusus" onClick={() => setIsMenuOpen(false)} className="hover:text-bioluminescent-blue transition-colors py-2 border-b border-white/5">Kajian Khusus</Link>
            <Link to="/dokumentasi" onClick={() => setIsMenuOpen(false)} className="hover:text-bioluminescent-blue transition-colors py-2 border-b border-white/5">Dokumentasi</Link>
            <Link to="/tim" onClick={() => setIsMenuOpen(false)} className="hover:text-bioluminescent-blue transition-colors py-2 border-b border-white/5">Tim</Link>
            <Link to="/kontak" onClick={() => setIsMenuOpen(false)} className="hover:text-bioluminescent-blue transition-colors py-2">Kontak</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
