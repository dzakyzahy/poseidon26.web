import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const locations = [
  {
    name: 'Kampus ITB Ganesha',
    city: 'Bandung',
    image: 'https://picsum.photos/seed/itb-ganesha/400/300'
  },
  {
    name: 'Kampus ITB Cirebon',
    city: 'Cirebon',
    image: 'https://picsum.photos/seed/itb-cirebon/400/300'
  },
  {
    name: 'Lokasi Pengmas',
    city: 'Dusun Kalijaga, Cirebon',
    image: 'https://picsum.photos/seed/jongor/400/300'
  }
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Kontak() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus('error');
      setMessage('Silakan selesaikan captcha terlebih dahulu');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
    formData.append('h-captcha-response', captchaToken);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Pesan Anda telah terkirim! Terima kasih.');
        (e.target as HTMLFormElement).reset();
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Gagal mengirim pesan. Silakan coba lagi.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <span className="text-bioluminescent-blue uppercase tracking-widest text-sm mb-4 block font-sans">Sapa Kami</span>
        <h1 className="heading-lg">Hubungi POSEIDON</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="glass p-8 rounded-3xl border border-white/10"
        >
          <h2 className="font-serif text-3xl mb-8">Kirim Pesan</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-sans uppercase tracking-widest text-white/50 ml-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 outline-none focus:border-bioluminescent-blue/50 focus:bg-white/10 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-sans uppercase tracking-widest text-white/50 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="email@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 outline-none focus:border-bioluminescent-blue/50 focus:bg-white/10 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-sans uppercase tracking-widest text-white/50 ml-1">Pesan</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-white/40" />
                <textarea 
                  name="message"
                  rows={4}
                  required
                  placeholder="Apa yang ingin Anda sampaikan?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 outline-none focus:border-bioluminescent-blue/50 focus:bg-white/10 transition-all font-sans resize-none"
                />
              </div>
            </div>

            <div className="flex justify-center py-2">
              <HCaptcha
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                reCaptchaCompat={false}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                ref={captchaRef}
                theme="dark"
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-bioluminescent-blue/20 hover:bg-bioluminescent-blue/30 text-bioluminescent-blue border border-bioluminescent-blue/50 rounded-xl py-4 font-sans font-bold tracking-widest uppercase disabled:opacity-50 flex items-center justify-center gap-3 transition-colors"
            >
              {status === 'loading' ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-bioluminescent-blue/30 border-t-bioluminescent-blue rounded-full"
                  />
                  Mengirim...
                </>
              ) : (
                <>
                  Kirim Pesan
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-bioluminescent-green text-sm font-medium bg-bioluminescent-green/10 p-4 rounded-xl border border-bioluminescent-green/20"
              >
                <CheckCircle className="w-5 h-5" />
                {message}
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm font-medium bg-red-400/10 p-4 rounded-xl border border-red-400/20"
              >
                <AlertCircle className="w-5 h-5" />
                {message}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Locations */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-serif text-3xl mb-8">Lokasi Kami</h2>
          <div className="space-y-6">
            {locations.map((loc) => (
              <div key={loc.name} className="glass flex items-center gap-6 p-4 rounded-2xl group border border-white/5 hover:border-white/20 transition-colors">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={loc.image} 
                    alt={loc.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-lg mb-1">{loc.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-white/50 font-sans">
                    <MapPin className="w-4 h-4 text-bioluminescent-blue" />
                    {loc.city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
