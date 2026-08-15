import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Background3DSlow from '../components/hero3d/Background3DSlow';

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
    formData.append('access_key', '812dd852-7910-4043-9f3d-44326c19056b');
    formData.set('h-captcha-response', captchaToken);

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
    <>
      <Background3DSlow />
      <main className="pt-32 pb-24 px-4 md:px-6 max-w-6xl mx-auto min-h-screen bg-white text-neutral-900 transition-colors duration-300 relative z-10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-200 pb-12 mb-16 gap-8">
          <div className="w-full text-center md:text-left">
            <span className="text-neutral-500 uppercase tracking-[0.15em] text-xs font-semibold mb-3 block">Sapa Kami</span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 leading-tight">
              Kontak Tim kami
            </h1>
          </div>
          <img src="/logos/trident_small.png" alt="Trident" className="hidden md:block w-24 h-24 object-contain opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>

        <div className="grid lg:grid-cols-5 gap-16 overflow-hidden">
        {/* Contact Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 space-y-12"
        >
          <div>
            <h2 className="font-serif text-2xl mb-6 text-neutral-900">Hubungi Langsung</h2>
            <div className="bg-neutral-50 border border-neutral-200 p-4 md:p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-neutral-700" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1 truncate">CP (Contact Person)</p>
                <p className="text-lg md:text-xl font-sans font-medium text-neutral-900 truncate">- (belum tersedia)</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl mb-6 text-neutral-900">Lokasi Kami</h2>
            <div className="space-y-4">
              {locations.map((loc) => (
                <div key={loc.name} className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                    <img 
                      src={loc.image} 
                      alt={loc.name} 
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-neutral-900 text-sm mb-1">{loc.name}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {loc.city}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 bg-neutral-50 p-8 md:p-10 rounded-2xl border border-neutral-200"
        >
          <h2 className="font-serif text-2xl mb-8 text-neutral-900">Kirim Pesan</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-sans uppercase tracking-[0.1em] font-semibold text-neutral-500 ml-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3.5 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-sans uppercase tracking-[0.1em] font-semibold text-neutral-500 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="email@example.com"
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3.5 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-sans uppercase tracking-[0.1em] font-semibold text-neutral-500 ml-1">Pesan</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
                <textarea 
                  name="message"
                  rows={4}
                  required
                  placeholder="Apa yang ingin Anda sampaikan?"
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3.5 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all font-sans resize-none"
                />
              </div>
            </div>

            <div className="flex justify-start py-2">
              <HCaptcha
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                reCaptchaCompat={false}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                ref={captchaRef}
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-neutral-900 hover:bg-black text-white rounded-xl py-4 font-sans font-bold tracking-[0.15em] uppercase text-sm disabled:opacity-50 flex items-center justify-center gap-3 transition-colors"
            >
              {status === 'loading' ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Mengirim...
                </>
              ) : (
                <>
                  Kirim Pesan
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-emerald-700 text-sm font-medium bg-emerald-50 p-4 rounded-xl border border-emerald-200"
              >
                <CheckCircle className="w-5 h-5" />
                {message}
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-700 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-200"
              >
                <AlertCircle className="w-5 h-5" />
                {message}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </main>
    </>
  );
}
