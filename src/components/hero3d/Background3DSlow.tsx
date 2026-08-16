import { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFishPhysicsSwim } from '../../hooks/useFishPhysicsSwim';
import { useFishPatrol } from '../../hooks/useFishPatrol';
import { useFlock } from '../../hooks/useFlock';
import { TrashSystem } from './TrashSystem';

const GreenFish = ({ centerTargetRef }: { centerTargetRef: React.RefObject<THREE.Group | null> }) => {
  const { nodes, materials } = useGLTF('/models/green_fish.glb') as any;
  const { onBeforeCompile } = useFishPhysicsSwim(centerTargetRef, { stiffness: 0.05, damping: 0.9, boneNum: 8, boneLen: 0.25 });
  
  const customMaterial = useMemo(() => {
    const mat = Object.values(materials)[0] as THREE.MeshStandardMaterial;
    if (!mat) return new THREE.MeshStandardMaterial();
    const newMat = mat.clone();
    newMat.onBeforeCompile = onBeforeCompile;
    return newMat;
  }, [materials, onBeforeCompile]);

  useFishPatrol(centerTargetRef);

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
  const { onBeforeCompile } = useFishPhysicsSwim(boid.meshRef, { stiffness: 0.05, damping: 0.9, boneNum: 6, boneLen: 0.2 });

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
  const boids = useFlock(4, dummyRef, { separationRadius: 12.0, maxSpeed: 0.8 }); // scattered & very slow
  
  return (
    <group>
      {boids.map((boid, i) => (
        <OrangeFish key={i} boid={boid} />
      ))}
    </group>
  );
};

export default function Background3DSlow() {
  const [dpr, setDpr] = useState(1.5);
  const mainFishRef = useRef<THREE.Group>(null);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none hidden md:block">
      <Canvas frameloop="always"
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        className="pointer-events-auto"
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)}>
          <color attach="background" args={['#061428']} />
          <fog attach="fog" args={['#061428', 5, 25]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          
          <Suspense fallback={null}>
            <GreenFish centerTargetRef={mainFishRef} />
            <OrangeFlock />
            <TrashSystem />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/green_fish.glb');
useGLTF.preload('/models/orange_fish.glb');
