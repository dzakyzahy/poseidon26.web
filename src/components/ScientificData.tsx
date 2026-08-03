import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { time: '08:00', ntu: 85, depth: 10 },
  { time: '10:00', ntu: 80, depth: 10 },
  { time: '12:00', ntu: 92, depth: 10 },
  { time: '14:00', ntu: 75, depth: 10 },
  { time: '16:00', ntu: 60, depth: 10 },
  { time: '18:00', ntu: 55, depth: 10 },
  { time: '20:00', ntu: 40, depth: 10 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-abyss/90 border border-cyan-glow/50 p-3 backdrop-blur-sm">
        <p className="font-mono text-xs text-slate-400 mb-1">{`TIME: ${label}`}</p>
        <p className="font-mono text-sm text-cyan-glow tracking-wider">
          {`TURBIDITY: ${payload[0].value} NTU`}
        </p>
      </div>
    );
  }
  return null;
};

export const ScientificData: React.FC = () => {
  return (
    <section id="data" className="relative py-24 bg-abyss border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="corner-hud p-4 border-slate-700/50 bg-slate-900/40 inline-block mb-8">
              <h4 className="font-mono text-sm text-slate-300 uppercase tracking-widest mb-4">
                OBSERVATION LOG
              </h4>
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase block">Average Turbidity</span>
                  <span className="font-sans-tech text-3xl font-light text-cyan-glow">69.5 <span className="text-sm text-slate-500">NTU</span></span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase block">Sedimentation Distance</span>
                  <span className="font-sans-tech text-3xl font-light text-white">10 <span className="text-sm text-slate-500">m</span></span>
                </div>
              </div>
            </div>
            
            <p className="font-sans-tech text-sm text-slate-400 leading-relaxed">
              Pengukuran turbiditas dan tingkat sedimentasi harian di sekitar infrastruktur. Penurunan NTU (Nephelometric Turbidity Units) pada sore hari mengindikasikan efektivitas penyaringan parsial saat debit arus stabil.
            </p>
          </div>

          <div className="lg:col-span-8 glass-panel p-6 relative overflow-hidden" data-cursor="view">
            {/* Decorative scanline */}
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-glow/20 blur-sm animate-[scan_4s_ease-in-out_infinite]" />
            
            <div className="flex justify-between items-end mb-6">
              <h5 className="font-mono text-xs text-cyan-glow uppercase tracking-widest">Turbidity Sensor Feed</h5>
              {/* Removed live text */}
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#475569" 
                    tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }}
                    tickMargin={10}
                  />
                  <YAxis 
                    stroke="#475569"
                    tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }}
                    domain={[0, 100]}
                    tickCount={6}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#06b6d4', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Line 
                    type="monotone" 
                    dataKey="ntu" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    dot={{ fill: '#020617', stroke: '#06b6d4', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#06b6d4' }}
                    isAnimationActive={false} // For a more raw instrument feel
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>
        
      </div>
      
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { transform: translateY(300px); }
        }
      `}</style>
    </section>
  );
};
