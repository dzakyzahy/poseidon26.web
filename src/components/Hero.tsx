import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────
// Trash Particles — instanced planes that scatter on scroll
// ─────────────────────────────────────────────
const TrashParticles: React.FC<{ progress: number }> = ({ progress }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const COUNT = 120
  const dummy = useRef(new THREE.Object3D())

  // Static random positions/rotations seeded once
  const seeds = useRef(
    Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 12,
      z: (Math.random() - 0.5) * 4 - 2,
      size: 0.2 + Math.random() * 0.5,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 30,
      driftY: (Math.random() - 0.5) * 20,
      speed: 0.3 + Math.random() * 0.7,
    }))
  )

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    const p = progress

    seeds.current.forEach((s, i) => {
      const dissolve = Math.max(0, p * 1.8 - s.speed * 0.3)
      const scatter = Math.pow(Math.min(1, p * 2), 2)

      dummy.current.position.set(
        s.x + s.driftX * scatter,
        s.y + s.driftY * scatter + Math.sin(t * 0.5 + i) * 0.1,
        s.z
      )
      dummy.current.rotation.set(
        s.rx + t * 0.2,
        s.ry + t * 0.15,
        s.rz + t * 0.1
      )
      const scale = Math.max(0, s.size * (1 - dissolve))
      dummy.current.scale.setScalar(scale)
      dummy.current.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.current.matrix)
    })

    // Color turbid -> clearing
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = Math.max(0, 0.65 - p * 0.7)
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#5c4a32"
        transparent
        opacity={0.65}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

// ─────────────────────────────────────────────
// Fish — loaded GLB, scroll-driven movement + flock scatter
// ─────────────────────────────────────────────
const Fish: React.FC<{ progress: number; mouseX: number; mouseY: number }> = ({
  progress,
  mouseX,
  mouseY,
}) => {
  const { scene } = useGLTF('/models/Fish by Poly by Google - aEyLrUMMoUK.glb')
  const groupRef = useRef<THREE.Group>(null)
  const targetPos = useRef(new THREE.Vector3(0, 0, 0))
  const { viewport } = useThree()

  // Apply bioluminescent material
  const meshScene = useRef<THREE.Group | null>(null)
  if (!meshScene.current) {
    meshScene.current = scene.clone(true)
    meshScene.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh
        m.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x0ea5e9),
          emissive: new THREE.Color(0x06b6d4),
          emissiveIntensity: 0.6,
          roughness: 0.25,
          metalness: 0.1,
        })
      }
    })
  }

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const p = progress

    // Gentle hover idle
    const idleX = Math.sin(t * 0.6) * 0.4
    const idleY = Math.cos(t * 0.45) * 0.25

    // Mouse influence (subtle — fish tilts toward cursor)
    const mx = (mouseX / window.innerWidth - 0.5) * viewport.width * 0.3
    const my = -(mouseY / window.innerHeight - 0.5) * viewport.height * 0.3

    // Scroll-driven: scatter away as trash disappears, then dive
    let tx: number, ty: number
    if (p < 0.4) {
      // Still present — gently swimming
      tx = idleX + mx * 0.3
      ty = idleY + my * 0.3
    } else if (p < 0.7) {
      // Turns and scatters
      const f = (p - 0.4) / 0.3
      tx = idleX - f * 6
      ty = idleY + f * 4
    } else {
      // Dives deep
      const f = (p - 0.7) / 0.3
      tx = -6 - f * 4
      ty = 4 - f * 8
    }

    targetPos.current.set(tx, ty, 0)
    groupRef.current.position.lerp(targetPos.current, 0.06)

    // Rotation
    const targetRotY = p > 0.4 ? -Math.PI * 0.6 : Math.PI * 0.05
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.04
    )
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05

    // Emissive glow intensifies as water clears
    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        mat.emissiveIntensity = THREE.MathUtils.lerp(0.3, 2.5, p)
      }
    })
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={meshScene.current!} scale={0.15} position={[0, 0, 0]} />
      </Center>
    </group>
  )
}

// ─────────────────────────────────────────────
// Water background plane — color shifts turbid → clear
// ─────────────────────────────────────────────
const WaterBackground: React.FC<{ progress: number }> = ({ progress }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const colorA = new THREE.Color(0x3b2f2f) // turbid brown
  const colorB = new THREE.Color(0x020617) // match bg-abyss

  useFrame(() => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.color.lerpColors(colorA, colorB, Math.min(1, progress * 2.5))
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color={colorA} />
    </mesh>
  )
}

// Turbidity haze overlay
const TurbidHaze: React.FC<{ progress: number }> = ({ progress }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = Math.max(0, 0.4 - progress * 1.2)
  })

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#7c5c2a" transparent opacity={0.4} depthWrite={false} />
    </mesh>
  )
}

// ─────────────────────────────────────────────
// Scene wrapper
// ─────────────────────────────────────────────
const OceanScene: React.FC<{ progress: number; mouseX: number; mouseY: number }> = ({
  progress, mouseX, mouseY,
}) => {
  return (
    <>
      <ambientLight intensity={0.3} color="#9be3f0" />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#b0e8f7" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#06b6d4" />
      <WaterBackground progress={progress} />
      <TurbidHaze progress={progress} />
      <TrashParticles progress={progress} />
      <Fish progress={progress} mouseX={mouseX} mouseY={mouseY} />
    </>
  )
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [turbidity, setTurbidity] = useState(80)
  const [depth, setDepth] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress
          setProgress(p)
          setTurbidity(Math.max(0, Math.round(80 - p * 82)))
          setDepth(Math.round(p * 200))
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const titleOpacity = Math.max(0, 1 - progress * 3)
  const midTextOpacity =
    progress > 0.2 && progress < 0.75
      ? Math.sin(((progress - 0.2) / 0.55) * Math.PI)
      : 0

  // Depth zone label
  const depthLabel =
    depth < 30 ? 'SURFACE — 0m' :
    depth < 100 ? `MID-WATER — ${depth}m` :
    depth < 200 ? `DEEP — ${depth}m` :
    `ABYSS — ${depth}m+`

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative', height: '220vh' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#020617',
        }}
      >
        {/* 3D Canvas */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: 'transparent' }}
          >
            <OceanScene progress={progress} mouseX={mousePos.x} mouseY={mousePos.y} />
          </Canvas>
        </div>

        {/* HUD Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '5rem 2.5rem 2.5rem',
          pointerEvents: 'none',
          mixBlendMode: 'difference',
        }}>
          {/* Top row: turbidity + depth zone */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Turbidity HUD */}
            <div className="corner-hud corner-hud-amber" style={{
              background: 'rgba(2, 6, 23, 0.6)',
              backdropFilter: 'blur(8px)',
            }}>
              <p style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: turbidity > 40 ? '#fcd34d' : '#06b6d4',
                transition: 'color 600ms ease',
              }}>
                TURBIDITY · {turbidity} NTU
              </p>
              <div style={{
                marginTop: '0.35rem',
                height: '2px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '1px',
                overflow: 'hidden',
                width: '120px',
              }}>
                <div style={{
                  height: '100%',
                  width: `${turbidity / 80 * 100}%`,
                  background: turbidity > 40 ? '#fcd34d' : '#06b6d4',
                  transition: 'width 300ms ease, background 600ms ease',
                }} />
              </div>
            </div>

            {/* Depth + zone label */}
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(6,182,212,0.5)',
                marginBottom: '0.25rem',
              }}>
                {depthLabel}
              </p>
              <p style={{
                fontFamily: 'var(--font-family-sans-tech)',
                fontSize: '2rem',
                fontWeight: 300,
                color: '#06b6d4',
                lineHeight: 1,
              }}>
                {depth}<span style={{ fontSize: '0.7rem', color: 'rgba(6,182,212,0.5)', marginLeft: '0.2rem' }}>m</span>
              </p>
            </div>
          </div>

          {/* Center: Main title (Left aligned) */}
          <div style={{
            opacity: titleOpacity,
            transform: `translateY(${progress * 60}px)`,
            transition: 'none',
            maxWidth: '900px',
            width: '100%',
            textAlign: 'left',
          }} className="pr-4 md:pr-20 mt-12 md:mt-24">
            <h1 style={{
              fontFamily: 'var(--font-family-sans-tech)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              color: 'rgba(226,232,240,0.85)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}>
              MENJAGA NADI SAMUDRA
            </h1>
            <h2 style={{
              fontFamily: 'var(--font-family-display)',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              color: '#06b6d4',
              lineHeight: 1.1,
              marginTop: '0.5rem',
            }}>
              menumbuhkan pesisir berkelanjutan
            </h2>
          </div>

          {/* Mid-scroll narrative (Bottom Right aligned) */}
          <div style={{
            position: 'absolute',
            bottom: '10%', right: '5%',
            opacity: midTextOpacity,
            width: '100%',
            maxWidth: '700px',
            padding: '0 1rem',
            transition: 'none',
          }} className="text-right md:bottom-24 md:right-16 z-20">
            <p className="text-xl md:text-2xl font-sans-tech font-light tracking-wide text-slate-100 mb-6">
              Persis seperti realita, jebakan sampah kami pernah hancur diterjang arus.
            </p>
            <p className="text-3xl md:text-5xl font-display italic font-semibold text-cyan-300">
              Tapi laut ini masih layak diperjuangkan.
            </p>
          </div>

          {/* Bottom scroll hint */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            opacity: Math.max(0, 1 - progress * 5),
          }}>
            <div style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, rgba(6,182,212,0.6))',
            }} />
            <span style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(6,182,212,0.5)',
            }}>
              SCROLL TO DIVE
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Needed for useGLTF preloading
useGLTF.preload('/models/Fish by Poly by Google - aEyLrUMMoUK.glb')
