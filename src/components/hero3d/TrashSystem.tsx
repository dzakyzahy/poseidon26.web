import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Define the trash geometries we want to instance dynamically
// The list will be populated inside the component

interface TrashData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  angularVelocity: THREE.Euler;
  scale: number;
  typeIndex: number;
}

export const TrashSystem = ({ count = 3 }) => {
  // Load the model
  const { nodes } = useGLTF('/models/trash_and_debris.glb') as any;

  // References to InstancedMesh for each type
  const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);

  // Extract actual mesh types from nodes
  const trashTypes = useMemo(() => {
    return Object.keys(nodes).filter(key => nodes[key].isMesh);
  }, [nodes]);

  // Generate trash data
  const trashData = useMemo(() => {
    const data: TrashData[] = [];
    if (trashTypes.length === 0) return data;

    for (let i = 0; i < count; i++) {
      // Random position across the screen
      const px = (Math.random() - 0.5) * 12;
      const py = Math.random() * 10 + 5; // Start slightly above the screen [5, 15]
      const pz = (Math.random() - 0.5) * 4 - 3; // depth -5 to -1

      // Fall speed
      const vy = -(Math.random() * 0.2 + 0.1); // slower fall

      data.push({
        position: new THREE.Vector3(px, py, pz),
        velocity: new THREE.Vector3(0, vy, 0),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        angularVelocity: new THREE.Euler((Math.random()-0.5)*0.5, (Math.random()-0.5)*0.5, (Math.random()-0.5)*0.5),
        scale: Math.random() * 0.4 + 0.6,
        typeIndex: Math.floor(Math.random() * trashTypes.length)
      });
    }
    return data;
  }, [count, trashTypes]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    const countsPerType = new Array(trashTypes.length).fill(0);

    for (let i = 0; i < trashData.length; i++) {
      const data = trashData[i];
      const typeIdx = data.typeIndex;
      const indexInType = countsPerType[typeIdx]++;
      
      const mesh = meshRefs.current[typeIdx];
      if (!mesh) continue;

      // Update position falling down
      data.position.y += data.velocity.y * delta;
      
      // Wrap around if it falls below the screen
      if (data.position.y < -10) {
        data.position.y = 10;
        data.position.x = (Math.random() - 0.5) * 12;
      }

      dummy.position.copy(data.position);
      
      // Update rotation
      data.rotation.x += data.angularVelocity.x * delta;
      data.rotation.y += data.angularVelocity.y * delta;
      data.rotation.z += data.angularVelocity.z * delta;
      dummy.rotation.copy(data.rotation);
      
      dummy.scale.set(data.scale, data.scale, data.scale);
      dummy.updateMatrix();
      
      mesh.setMatrixAt(indexInType, dummy.matrix);
    }

    // Mark as needing update
    meshRefs.current.forEach(mesh => {
      if (mesh) mesh.instanceMatrix.needsUpdate = true;
    });
  });

  // Calculate instance counts per type
  const counts = useMemo(() => {
    const c = new Array(trashTypes.length).fill(0);
    trashData.forEach(d => c[d.typeIndex]++);
    return c;
  }, [trashData, trashTypes]);

  // Pre-load geometries and materials
  return (
    <group>
      {trashTypes.map((type, index) => {
        const node = nodes[type];
        if (!node) return null; // Fallback if node doesn't exist
        
        return (
          <instancedMesh 
            key={type}
            ref={(el) => (meshRefs.current[index] = el)}
            args={[node.geometry, node.material, counts[index]]}
            castShadow
            receiveShadow
          />
        );
      })}
    </group>
  );
};

useGLTF.preload('/models/trash_and_debris.glb');
