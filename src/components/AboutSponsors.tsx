import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

const SponsorFishes: React.FC = () => {
  const { scene } = useGLTF('/models/Fish by Poly by Google - aEyLrUMMoUK.glb')
  const group1 = useRef<THREE.Group>(null)
  const group2 = useRef<THREE.Group>(null)

  // Use useMemo to avoid recreating materials every render
  const { mesh1, mesh2 } = React.useMemo(() => {
    const m1 = scene.clone(true)
    const m2 = scene.clone(true)
    const setupMaterial = (mesh: THREE.Group) => {
      mesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh
          m.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x0ea5e9),
            emissive: new THREE.Color(0x06b6d4),
            emissiveIntensity: 1.2,
            roughness: 0.2,
          })
        }
      })
    }
    setupMaterial(m1)
    setupMaterial(m2)
    return { mesh1: m1, mesh2: m2 }
  }, [scene])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group1.current) {
      const x = ((t * 0.8) % 15) - 7.5
      group1.current.position.set(-x, Math.sin(t) * 0.5 + 0.5, 0)
      group1.current.rotation.y = -Math.PI * 0.5
      group1.current.rotation.z = Math.sin(t * 2) * 0.1
    }
    if (group2.current) {
      const x = (((t + 5) * 0.6) % 15) - 7.5
      group2.current.position.set(x, Math.sin(t * 0.8 + 2) * 0.6 - 0.5, -1)
      group2.current.rotation.y = Math.PI * 0.5
      group2.current.rotation.z = Math.sin(t * 1.5 + 1) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} color="#9be3f0" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#06b6d4" />
      <group ref={group1}>
        <Center><primitive object={mesh1} scale={0.06} /></Center>
      </group>
      <group ref={group2}>
        <Center><primitive object={mesh2} scale={0.05} /></Center>
      </group>
    </>
  )
}

export const AboutSponsors: React.FC = () => {
  return (
    <section className="bg-abyss text-slate-300 py-32 border-t border-slate-900">
      
      {/* About Program */}
      <div className="max-w-4xl mx-auto px-8 mb-32 text-center">
        <div className="inline-block border-b border-slate-700 pb-2 mb-8">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block">
            TENTANG PROGRAM
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display italic text-white mb-8">
          Pengabdian Masyarakat <span className="text-cyan-glow">HMO Triton ITB.</span>
        </h2>
        
        <p className="font-sans-tech text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Mengejawantahkan Tri Dharma Perguruan Tinggi melalui intervensi rekayasa laut. POSEIDON ITB 2026 bukan sekadar proyek pembangunan fisik, melainkan observasi jangka panjang mengenai interaksi dinamis antara infrastruktur buatan dengan hidrodinamika pesisir.
        </p>
      </div>

      {/* Sponsors */}
      <div className="max-w-7xl mx-auto px-8 mb-32 relative">
        
        {/* Background Canvas for Fish swimming among sponsors */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
            <SponsorFishes />
          </Canvas>
        </div>

        {/* Content with mix-blend-difference so it changes color when fish passes */}
        <div className="relative z-10 mix-blend-difference">
          <div className="flex justify-center mb-12">
            <span style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(200, 200, 200, 1)' // Lighter color so difference is visible
            }}>
              MENDUKUNG OBSERVASI INI
            </span>
          </div>
        
        <div className="relative w-full overflow-hidden flex items-center h-64 mt-8">
          {/* Using a custom animation class defined in CSS or arbitrary tailwind for marquee */}
          <div className="flex w-max items-center" style={{ animation: 'marquee 20s linear infinite' }}>
            {/* Group 1 */}
              <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
                <img src="/sponsors/PLN.png" alt="PLN" className="h-24 md:h-32 w-48 md:w-64 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0" />
                <img src="/sponsors/Ikuyo.jpg" alt="Ikuyo" className="h-16 md:h-20 w-32 md:w-40 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 rounded-lg shrink-0" />
                <div className="bg-white p-3 rounded-xl transition-all duration-300 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 flex items-center justify-center h-16 md:h-20 w-32 md:w-40 shrink-0">
                  <img src="/sponsors/Sorai.png" alt="Sorai" className="h-full w-full object-contain" />
                </div>
              </div>
              {/* Group 2 (Duplicate for infinite scroll) */}
              <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
                <img src="/sponsors/PLN.png" alt="PLN" className="h-24 md:h-32 w-48 md:w-64 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0" />
                <img src="/sponsors/Ikuyo.jpg" alt="Ikuyo" className="h-16 md:h-20 w-32 md:w-40 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 rounded-lg shrink-0" />
                <div className="bg-white p-3 rounded-xl transition-all duration-300 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 flex items-center justify-center h-16 md:h-20 w-32 md:w-40 shrink-0">
                  <img src="/sponsors/Sorai.png" alt="Sorai" className="h-full w-full object-contain" />
                </div>
              </div>
          </div>
        </div>
        </div>
      </div>

      {/* CTA (Minimalist) */}
      <div className="max-w-4xl mx-auto px-8 text-center pb-20">
        <h2 className="text-5xl md:text-7xl font-display italic text-white mb-12">
          Ambil bagian.
        </h2>
        
        <a 
          href="#join" 
          className="inline-block border border-cyan-glow/50 px-8 py-4 text-cyan-glow hover:bg-cyan-glow hover:text-abyss transition-colors duration-300 font-mono text-xs uppercase tracking-widest"
          data-cursor="button"
        >
          BERGABUNG BERSAMA KAMI
        </a>
      </div>
      
    </section>
  );
};
