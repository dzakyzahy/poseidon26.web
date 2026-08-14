import { motion } from 'framer-motion';
import { coreTeam, divisions } from '../data/team';

export default function Tim() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <span className="text-bioluminescent-blue uppercase tracking-widest text-sm mb-4 block font-sans">Orang-Orang di Balik Layar</span>
        <h1 className="heading-lg">Tim POSEIDON 2026</h1>
      </div>

      {/* Core Team */}
      <section className="mb-24 flex justify-center gap-12 flex-wrap">
        {coreTeam.map((member, idx) => (
          <motion.div 
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center group"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-bioluminescent-blue transition-colors relative">
              <div className="absolute inset-0 bg-bioluminescent-blue/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay z-10" />
              <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
            </div>
            <h3 className="font-serif text-2xl text-white mb-1">{member.name}</h3>
            <span className="font-hand text-xl text-bioluminescent-green">{member.role}</span>
          </motion.div>
        ))}
      </section>

      {/* Divisions */}
      <div className="space-y-24">
        {divisions.map((div) => (
          <section key={div.name} className="border-t border-white/10 pt-16">
            <h2 className="font-serif text-3xl mb-12 text-center text-white/90">{div.name}</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {div.members.map((member, idx) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group w-40 md:w-48"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:border-white/20 transition-colors">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="font-sans font-bold text-white mb-1 text-center">{member.name}</h3>
                  <span className="font-sans text-xs uppercase tracking-widest text-white/50 text-center">{member.role}</span>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
