import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Define the trash geometries we want to instance
const trashTypes = [
  'Can_1_RustyCans_0',
  'GlassBottle_1_GlassBottles_0',
  'CardboardBox_1_CardboardPaper_0',
  'Soda_Cup_FastFoodTrash_0',
  'TrashBag_1_TrashBag_0'
];

interface TrashData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  angularVelocity: THREE.Euler;
  scale: number;
  typeIndex: number;
}

export const TrashSystem = ({ count = 200 }) => {
  // Load the model
  const { nodes } = useGLTF('/models/trash_and_debris.glb') as any;

  // References to InstancedMesh for each type
  const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);

  // Generate trash data
  const trashData = useMemo(() => {
    const data: TrashData[] = [];
    for (let i = 0; i < count; i++) {
      // Random clustered position
      const radius = Math.random() * 3 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const px = radius * Math.sin(phi) * Math.cos(theta);
      const py = radius * Math.sin(phi) * Math.sin(theta);
      const pz = radius * Math.cos(phi) - 5; // clustered around z=-5

      // Random scatter direction
      const vx = (Math.random() - 0.5) * 15;
      const vy = (Math.random() - 0.5) * 15;
      const vz = (Math.random() - 0.5) * 15;

      data.push({
        position: new THREE.Vector3(px, py, pz),
        velocity: new THREE.Vector3(vx, vy, vz),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        angularVelocity: new THREE.Euler((Math.random()-0.5)*0.1, (Math.random()-0.5)*0.1, (Math.random()-0.5)*0.1),
        scale: Math.random() * 0.5 + 0.5,
        typeIndex: Math.floor(Math.random() * trashTypes.length)
      });
    }
    return data;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    // Get scroll progress (0 to 1). Assuming this section is active from 0.5 to 1.0 of the whole page
    // For simplicity, let's use a dummy progress that oscillates for demonstration, 
    // or tie it to window.scrollY.
    // In a real implementation with ScrollControls, scroll.offset gives progress.
    // We'll calculate a scatterFactor from 0 (clustered) to 1 (scattered).
    
    // Fallback to window.scrollY to determine offset since ScrollControls is removed
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const offset = docHeight > 0 ? window.scrollY / docHeight : 0;
    
    // Smooth transition between clustered (0) and scattered (1)
    // Let's say it scatters when offset > 0.4
    let targetScatter = 0;
    if (offset > 0.4) {
      targetScatter = Math.min((offset - 0.4) * 4, 1.0); // 0 to 1
    } else {
      targetScatter = 0;
    }

    // Apply positions to InstancedMesh
    // We update per type
    const countsPerType = new Array(trashTypes.length).fill(0);

    for (let i = 0; i < trashData.length; i++) {
      const data = trashData[i];
      const typeIdx = data.typeIndex;
      const indexInType = countsPerType[typeIdx]++;
      
      const mesh = meshRefs.current[typeIdx];
      if (!mesh) continue;

      // Calculate current position based on scatterFactor
      // p = clusteredPos + velocity * scatterFactor
      dummy.position.copy(data.position).addScaledVector(data.velocity, targetScatter);
      
      // Update rotation
      data.rotation.x += data.angularVelocity.x * targetScatter;
      data.rotation.y += data.angularVelocity.y * targetScatter;
      data.rotation.z += data.angularVelocity.z * targetScatter;
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
  }, [trashData]);

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
