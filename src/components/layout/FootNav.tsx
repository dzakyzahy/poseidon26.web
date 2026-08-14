import { Globe } from 'lucide-react';

export const FootNav = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 glass-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-serif font-bold text-2xl tracking-tighter">
                POSEIDON <span className="text-bioluminescent-blue">2026</span>
              </span>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed font-sans text-sm">
              Program pengabdian masyarakat berkelanjutan oleh Himpunan Mahasiswa Oseanografi "TRITON" ITB. 
              Melindungi laut dari ancaman sampah plastik.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 font-sans">Tautan Cepat</h4>
            <ul className="space-y-4 text-sm text-white/60 font-sans">
              <li><a href="#" className="hover:text-bioluminescent-blue transition-colors">Kajian Umum</a></li>
              <li><a href="#" className="hover:text-bioluminescent-blue transition-colors">Kajian Khusus</a></li>
              <li><a href="#" className="hover:text-bioluminescent-blue transition-colors">Dokumentasi</a></li>
              <li><a href="#" className="hover:text-bioluminescent-blue transition-colors">Tim POSEIDON</a></li>
              <li><a href="#" className="hover:text-bioluminescent-blue transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 font-sans">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="p-3 glass rounded-xl hover:bg-bioluminescent-blue hover:text-ocean-900 transition-colors">
                Ig
              </a>
              <a href="#" className="p-3 glass rounded-xl hover:bg-bioluminescent-blue hover:text-ocean-900 transition-colors">
                Tw
              </a>
              <a href="#" className="p-3 glass rounded-xl hover:bg-bioluminescent-blue hover:text-ocean-900 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 uppercase tracking-widest font-sans">
          <p>© 2026 POSEIDON ITB. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FootNav;
