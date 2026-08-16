import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FootNav = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 glass-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Tentang */}
          <div>
            <h4 className="font-bold mb-6 font-sans text-white">Tentang</h4>
            <p className="text-white/60 leading-relaxed font-sans text-sm">
              POSEIDON 2026 merupakan program pengabdian masyarakat berkelanjutan oleh Himpunan Mahasiswa Oseanografi "TRITON" ITB. 
              Berdedikasi untuk melindungi ekosistem laut nusantara dari ancaman sampah plastik.
            </p>
          </div>
          
          {/* Alamat */}
          <div>
            <h4 className="font-bold mb-6 font-sans text-white">Alamat</h4>
            <p className="text-white/60 leading-relaxed font-sans text-sm mb-2">
              <strong>Kampus ITB Ganesha</strong><br/>
              Jl. Ganesa No.10, Lb. Siliwangi,<br/>
              Coblong, Kota Bandung 40132
            </p>
            <p className="text-white/60 leading-relaxed font-sans text-sm">
              <strong>Lokasi Pengmas</strong><br/>
              Dusun Kalijaga,<br/>
              Cirebon, Jawa Barat
            </p>
          </div>

          {/* Kontak & Tautan */}
          <div>
            <h4 className="font-bold mb-6 font-sans text-white">Kontak & Navigasi</h4>
            <ul className="space-y-4 text-sm text-white/60 font-sans">
              <li><Link to="/program" className="hover:text-bioluminescent-blue transition-colors">Program & Progress</Link></li>
              <li><Link to="/kajian-umum" className="hover:text-bioluminescent-blue transition-colors">Kajian Umum</Link></li>
              <li><Link to="/tim" className="hover:text-bioluminescent-blue transition-colors">Tim POSEIDON</Link></li>
              <li><Link to="/kontak" className="hover:text-bioluminescent-blue transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div>
            <h4 className="font-bold mb-6 font-sans text-white">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/poseidonitb/" target="_blank" rel="noreferrer" className="p-3 glass rounded-xl hover:bg-bioluminescent-blue hover:text-ocean-900 transition-colors flex items-center justify-center">
                <img src="/images/LogoIG.png" alt="Instagram" className="w-7 h-7 object-contain" />
              </a>
              <a href="#" className="p-3 glass rounded-xl hover:bg-bioluminescent-blue hover:text-ocean-900 transition-colors flex items-center justify-center">
                <Globe className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 uppercase tracking-widest font-sans">
          <p>© 2026 POSEIDON ITB. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <Link to="/privacy-policy" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FootNav;
