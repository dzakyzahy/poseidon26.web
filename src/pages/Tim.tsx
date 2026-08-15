import { motion } from 'framer-motion';
import { coreTeam, divisions } from '../data/team';
import Background3DSlow from '../components/hero3d/Background3DSlow';

export default function Tim() {
  return (
    <>
      <Background3DSlow />
      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto min-h-screen bg-white text-neutral-900 transition-colors duration-300 relative z-10 shadow-2xl">
      <div className="text-center mb-20">
        <span className="text-neutral-500 uppercase tracking-[0.15em] text-xs font-semibold mb-3 block">Orang-Orang di Balik Layar</span>
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900">Tim POSEIDON ITB 2026</h1>
      </div>

      {/* Core Team */}
      <section className="mb-24 flex justify-center gap-12 md:gap-24 flex-wrap">
        {coreTeam.map((member, idx) => (
          <motion.div 
            key={member.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center group"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border border-neutral-200 group-hover:border-neutral-400 transition-colors bg-neutral-100">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
            </div>
            <h3 className="font-sans font-bold text-xl text-neutral-900 mb-1">{member.name}</h3>
            <span className="font-serif text-lg text-neutral-500 italic">{member.role}</span>
          </motion.div>
        ))}
      </section>

      {/* Divisions */}
      <div className="space-y-20">
        {divisions.map((div) => (
          <section key={div.name} className="border-t border-neutral-200 pt-16">
            <h2 className="font-serif text-3xl mb-12 text-center text-neutral-900">{div.name}</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {div.members.map((member, idx) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group w-36 md:w-44"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden mb-4 border border-neutral-200 group-hover:border-neutral-300 transition-colors bg-neutral-100">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="font-sans font-semibold text-neutral-900 mb-1 text-center text-sm md:text-base">{member.name}</h3>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-500 text-center">{member.role}</span>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
    </>
  );
}
