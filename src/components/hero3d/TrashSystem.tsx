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
  const { scene } = useGLTF('/models/trash_and_debris.glb') as any;

  // References to InstancedMesh for each type
  const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);

  // Extract actual mesh types from scene
  const trashMeshes = useMemo(() => {
    const meshes: THREE.Mesh[] = [];
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.geometry && child.material) {
          meshes.push(child);
        }
      });
    }
    return meshes;
  }, [scene]);

  // Generate trash data
  const trashData = useMemo(() => {
    const data: TrashData[] = [];
    if (trashMeshes.length === 0) return data;

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
        typeIndex: Math.floor(Math.random() * trashMeshes.length)
      });
    }
    return data;
  }, [count, trashMeshes]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    const countsPerType = new Array(trashMeshes.length).fill(0);

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
    const c = new Array(trashMeshes.length).fill(0);
    trashData.forEach(d => c[d.typeIndex]++);
    return c;
  }, [trashData, trashMeshes]);

  // Pre-load geometries and materials
  return (
    <group>
      {trashMeshes.map((mesh, index) => {
        return (
          <instancedMesh 
            key={index}
            ref={(el) => (meshRefs.current[index] = el)}
            args={[mesh.geometry, mesh.material, counts[index]]}
            castShadow
            receiveShadow
          />
        );
      })}
    </group>
  );
};

useGLTF.preload('/models/trash_and_debris.glb');
