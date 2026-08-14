import { motion } from 'framer-motion';

export const SponsorGrid = () => {
  return (
    <div className="w-full flex flex-col items-center gap-16 py-12">
      <h3 className="text-sm font-sans tracking-[0.3em] uppercase text-white/50 mb-4">Didukung Oleh</h3>
      
      {/* Platinum Tier */}
      <div className="flex flex-col items-center gap-6 w-full">
        <span className="text-xs font-sans text-bioluminescent-blue tracking-[0.2em] uppercase">Platinum</span>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 w-full">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            src="/sponsors/Ikuyo.jpg" 
            alt="PT Ikuyo Indonesia" 
            className="h-24 md:h-36 object-contain mix-blend-screen opacity-90 hover:opacity-100 transition-opacity"
          />
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            src="/sponsors/PLN.png" 
            alt="PT PLN (Persero)" 
            className="h-24 md:h-36 object-contain mix-blend-screen opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Gold Tier */}
      <div className="flex flex-col items-center gap-6 w-full mt-8">
        <span className="text-xs font-sans text-yellow-500 tracking-[0.2em] uppercase">Gold</span>
        <div className="flex flex-wrap justify-center items-center gap-12 w-full">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            src="/sponsors/Sorai.png" 
            alt="PT Sorai Riang Dinamika" 
            className="h-16 md:h-24 object-contain mix-blend-screen opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
};
