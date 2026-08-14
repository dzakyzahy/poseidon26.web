import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference pointer-events-none">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo area */}
        <div className="w-48 h-16 pointer-events-auto">
          <Link to="/" className="w-full h-full block"></Link>
        </div>
        <div className="flex gap-8 text-xs md:text-sm uppercase tracking-[0.2em] font-sans font-medium text-white/80 pointer-events-auto">
          <Link to="/kajian-umum" className="hover:text-bioluminescent-blue transition-colors">Kajian Umum</Link>
          <Link to="/kajian-khusus" className="hover:text-bioluminescent-blue transition-colors">Kajian Khusus</Link>
          <Link to="/dokumentasi" className="hover:text-bioluminescent-blue transition-colors">Dokumentasi</Link>
          <Link to="/tim" className="hover:text-bioluminescent-blue transition-colors">Tim</Link>
          <Link to="/kontak" className="hover:text-bioluminescent-blue transition-colors">Kontak</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
