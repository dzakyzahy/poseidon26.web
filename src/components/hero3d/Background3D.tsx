import { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFishSwim } from '../../hooks/useFishSwim';
import { useFishFollow } from '../../hooks/useFishFollow';
import { useFlock } from '../../hooks/useFlock';
import { TrashSystem } from './TrashSystem';

const GreenFish = ({ centerTargetRef }: { centerTargetRef: React.RefObject<THREE.Group | null> }) => {
  const { nodes, materials } = useGLTF('/models/green_fish.glb') as any;
  const { onBeforeCompile } = useFishSwim({ spineAxis: 'z', frequency: 5.0, speed: 6.0, amplitude: 0.1 });
  
  const customMaterial = useMemo(() => {
    const mat = Object.values(materials)[0] as THREE.MeshStandardMaterial;
    if (!mat) return new THREE.MeshStandardMaterial();
    const newMat = mat.clone();
    newMat.onBeforeCompile = onBeforeCompile;
    return newMat;
  }, [materials, onBeforeCompile]);

  useFishFollow(centerTargetRef);

  return (
    <group ref={centerTargetRef}>
      {Object.values(nodes).map((node: any) => {
        if (node.isMesh) {
          return (
            <mesh 
              key={node.uuid} 
              geometry={node.geometry} 
              material={customMaterial} 
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

const OrangeFlock = ({ centerTargetRef }: { centerTargetRef: React.RefObject<THREE.Group | null> }) => {
  const { nodes, materials } = useGLTF('/models/orange_fish.glb') as any;
  const { onBeforeCompile } = useFishSwim({ spineAxis: 'z', frequency: 8.0, speed: 8.0, amplitude: 0.15 });
  
  const customMaterial = useMemo(() => {
    const mat = Object.values(materials)[0] as THREE.MeshStandardMaterial;
    if (!mat) return new THREE.MeshStandardMaterial();
    const newMat = mat.clone();
    newMat.onBeforeCompile = onBeforeCompile;
    return newMat;
  }, [materials, onBeforeCompile]);

  const boids = useFlock(8, centerTargetRef);
  
  return (
    <group>
      {boids.map((boid, i) => (
        <group key={i} ref={boid.meshRef}>
          {Object.values(nodes).map((node: any) => {
            if (node.isMesh) {
              return (
                <mesh 
                  key={node.uuid} 
                  geometry={node.geometry} 
                  material={customMaterial} 
                  scale={0.5}
                />
              );
            }
            return null;
          })}
        </group>
      ))}
    </group>
  );
};

export default function Background3D() {
  const [dpr, setDpr] = useState(1.5);
  const mainFishRef = useRef<THREE.Group>(null);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
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
            <OrangeFlock centerTargetRef={mainFishRef} />
            <TrashSystem count={50} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/green_fish.glb');
useGLTF.preload('/models/orange_fish.glb');
