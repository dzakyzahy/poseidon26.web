import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';

interface TrashData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  angularVelocity: THREE.Euler;
  scale: number;
}

export const TrashSystem = ({ count = 3 }) => {
  const { scene } = useGLTF('/models/trash_and_debris.glb') as any;
  
  // References to the wrapper groups for each clone
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  // Generate trash data
  const trashData = useMemo(() => {
    const data: TrashData[] = [];
    if (!scene) return data;

    for (let i = 0; i < count; i++) {
      // Spread them across the screen
      const px = (Math.random() - 0.5) * 12;
      const py = Math.random() * 8 - 4; // Start in view [-4, 4]
      const pz = (Math.random() - 0.5) * 4 - 2; // depth -4 to 0

      // Fall speed
      const vy = -(Math.random() * 0.2 + 0.1);

      data.push({
        position: new THREE.Vector3(px, py, pz),
        velocity: new THREE.Vector3(0, vy, 0),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        angularVelocity: new THREE.Euler((Math.random()-0.5)*0.5, (Math.random()-0.5)*0.5, (Math.random()-0.5)*0.5),
        scale: (Math.random() * 0.4 + 0.6) * 10, // Scaled up to counteract internal geometry scales
      });
    }
    return data;
  }, [count, scene]);

  useFrame((_, delta) => {
    for (let i = 0; i < trashData.length; i++) {
      const data = trashData[i];
      const group = groupRefs.current[i];
      if (!group) continue;

      // Update position falling down
      data.position.y += data.velocity.y * delta;
      
      // Wrap around if it falls below the screen
      if (data.position.y < -5) {
        data.position.y = 5;
        data.position.x = (Math.random() - 0.5) * 12;
      }
      
      // Update rotation
      data.rotation.x += data.angularVelocity.x * delta;
      data.rotation.y += data.angularVelocity.y * delta;
      data.rotation.z += data.angularVelocity.z * delta;
      
      // Apply to group
      group.position.copy(data.position);
      group.rotation.copy(data.rotation);
      group.scale.set(data.scale, data.scale, data.scale);
    }
  });

  if (!scene) return null;

  return (
    <group>
      {trashData.map((_, index) => (
        <group key={index} ref={(el) => (groupRefs.current[index] = el)}>
          <Clone object={scene} castShadow receiveShadow />
        </group>
      ))}
    </group>
  );
};

useGLTF.preload('/models/trash_and_debris.glb');
