import { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFishPhysicsSwim } from '../../hooks/useFishPhysicsSwim';
import { useFishFollow } from '../../hooks/useFishFollow';
import { useFishPatrol } from '../../hooks/useFishPatrol';
import { useFlock } from '../../hooks/useFlock';
import { TrashSystem } from './TrashSystem';

const GreenFish = ({ centerTargetRef, isFree = false, patrolOffsetX = 0 }: { centerTargetRef: React.RefObject<THREE.Group | null>, isFree?: boolean, patrolOffsetX?: number }) => {
  const { nodes, materials } = useGLTF('/models/green_fish.glb') as any;
  const { onBeforeCompile } = useFishPhysicsSwim(centerTargetRef, { stiffness: 0.05, damping: 0.9, boneNum: 8, boneLen: 0.25 });
  
  const customMaterial = useMemo(() => {
    const mat = Object.values(materials)[0] as THREE.MeshStandardMaterial;
    if (!mat) return new THREE.MeshStandardMaterial();
    const newMat = mat.clone();
    newMat.onBeforeCompile = onBeforeCompile;
    return newMat;
  }, [materials, onBeforeCompile]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Use patrol on mobile, follow on desktop (unless isFree is true)
  useFishFollow(centerTargetRef, !isMobile && !isFree);
  useFishPatrol(centerTargetRef, isMobile || isFree, patrolOffsetX);

  return (
    <group ref={centerTargetRef}>
      {Object.values(nodes).map((node: any) => {
        if (node.isMesh) {
          return (
            <mesh 
              key={node.uuid} 
              geometry={node.geometry} 
              material={customMaterial} 
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
              castShadow 
              receiveShadow 
            />
          );
        }
        return null;
      })}
    </group>
  );
};

const OrangeFish = ({ boid }: { boid: any }) => {
  const { nodes, materials } = useGLTF('/models/orange_fish.glb') as any;
  const { onBeforeCompile } = useFishPhysicsSwim(boid.meshRef, { stiffness: 0.02, damping: 0.95, boneNum: 8, boneLen: 0.25 });

  const customMaterial = useMemo(() => {
    const mat = Object.values(materials)[0] as THREE.MeshStandardMaterial;
    if (!mat) return new THREE.MeshStandardMaterial();
    const newMat = mat.clone();
    newMat.onBeforeCompile = onBeforeCompile;
    return newMat;
  }, [materials, onBeforeCompile]);

  return (
    <group ref={boid.meshRef}>
      {Object.values(nodes).map((node: any) => {
        if (node.isMesh) {
          return (
            <mesh 
              key={node.uuid} 
              geometry={node.geometry} 
              material={customMaterial} 
              position={node.position}
              rotation={node.rotation}
              scale={node.scale ? [node.scale.x * 0.5, node.scale.y * 0.5, node.scale.z * 0.5] : 0.5}
            />
          );
        }
        return null;
      })}
    </group>
  );
};

const OrangeFlock = () => {
  const dummyRef = useRef(null);
  const boids = useFlock(2, dummyRef, { separationRadius: 10.0, maxSpeed: 1.0 });
  
  return (
    <group>
      {boids.map((boid, i) => (
        <OrangeFish key={i} boid={boid} />
      ))}
    </group>
  );
};

export default function Background3D({ active = true }: { active?: boolean }) {
  const [dpr, setDpr] = useState(1.5);
  const mainFishRef = useRef<THREE.Group>(null);
  const dummyFreeFishRef = useRef<THREE.Group>(null);
  // Random offset between -6 and 6, but excluding -3 to 3 (so it's not strictly center)
  const freeFishOffsetX = useMemo(() => {
    const isLeft = Math.random() > 0.5;
    return isLeft ? -4 - Math.random() * 2 : 4 + Math.random() * 2;
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        className="pointer-events-auto"
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          
          <Suspense fallback={null}>
            <GreenFish centerTargetRef={mainFishRef} />
            <GreenFish centerTargetRef={dummyFreeFishRef} isFree={true} patrolOffsetX={freeFishOffsetX} />
            <GreenFish centerTargetRef={useRef<THREE.Group>(null)} isFree={true} patrolOffsetX={-freeFishOffsetX} />
            <OrangeFlock />
            <TrashSystem count={15} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/green_fish.glb');
useGLTF.preload('/models/orange_fish.glb');
