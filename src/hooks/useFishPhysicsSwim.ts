import { useMemo, useRef, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PhysicsSwimConfig {
  boneNum?: number;
  boneLen?: number;
  stiffness?: number;
  damping?: number;
  maxOffset?: number;
  headZ?: number;
}

export function useFishPhysicsSwim(ref: React.RefObject<THREE.Group | null>, config: PhysicsSwimConfig = {}) {
  const {
    boneNum = 6,
    boneLen = 0.3,
    stiffness = 0.15,
    damping = 0.8,
    maxOffset = 2.0,
    headZ = 0.5 // Estimated Z coordinate of the head in local space
  } = config;

  const uniforms = useMemo(() => ({
    uWaveOffsets: { value: new Float32Array(boneNum) },
    uBoneNum: { value: boneNum },
    uBoneLen: { value: boneLen },
    uHeadZ: { value: headZ }
  }), [boneNum, boneLen, headZ]);

  const simTips = useRef<THREE.Vector3[]>([]);
  const simVels = useRef<THREE.Vector3[]>([]);
  
  if (simTips.current.length === 0) {
    for (let i = 0; i < boneNum; i++) {
      simTips.current.push(new THREE.Vector3(0, 0, -i * boneLen));
      simVels.current.push(new THREE.Vector3());
    }
  }

  useFrame(() => {
    if (!ref.current) return;
    
    const rootPos = ref.current.position;
    const rootQuat = ref.current.quaternion;

    // Head follows exactly
    simTips.current[0].copy(rootPos);
    
    const offsets = uniforms.uWaveOffsets.value;
    offsets[0] = 0;

    for (let i = 1; i < boneNum; i++) {
      // The fish's tail extends along the negative Z axis
      const localRigidPos = new THREE.Vector3(0, 0, -i * boneLen);
      const rigidTip = localRigidPos.applyQuaternion(rootQuat).add(rootPos);

      // Spring-Damper simulation
      const diff = new THREE.Vector3().subVectors(rigidTip, simTips.current[i]);
      simVels.current[i].add(diff.multiplyScalar(stiffness));
      simVels.current[i].multiplyScalar(damping);
      simTips.current[i].add(simVels.current[i]);

      // Constrain length to keep bone chain from stretching
      const dir = new THREE.Vector3().subVectors(simTips.current[i], simTips.current[i-1]);
      dir.normalize();
      simTips.current[i].copy(simTips.current[i-1]).add(dir.multiplyScalar(boneLen));

      // Calculate local lateral offset to deform the shader
      const localSimTip = simTips.current[i].clone().sub(rootPos).applyQuaternion(rootQuat.clone().invert());
      
      // X axis is the lateral swing
      offsets[i] = THREE.MathUtils.clamp(localSimTip.x, -maxOffset, maxOffset);
    }
    
    // Ensure reactivity
    uniforms.uWaveOffsets.value = offsets;
  });

  const onBeforeCompile = useCallback((shader: any) => {
    shader.uniforms.uWaveOffsets = uniforms.uWaveOffsets;
    shader.uniforms.uBoneNum = uniforms.uBoneNum;
    shader.uniforms.uBoneLen = uniforms.uBoneLen;
    shader.uniforms.uHeadZ = uniforms.uHeadZ;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
      #include <common>
      uniform float uWaveOffsets[12]; // Buffer capacity
      uniform float uBoneNum;
      uniform float uBoneLen;
      uniform float uHeadZ;
      `
    );

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      
      // Calculate distance from the head (along Z)
      float dist = max(0.0, uHeadZ - position.z);
      
      // Map this distance to our virtual bone chain
      float t = dist / uBoneLen;
      float maxIndex = uBoneNum - 1.0;
      t = clamp(t, 0.0, maxIndex);
      
      int index0 = int(floor(t));
      int index1 = int(min(ceil(t), maxIndex));
      float fractT = fract(t);
      
      // Since GLSL ES doesn't allow dynamic indexing with variables directly in some old hardware, 
      // we do a simple loop or if-else chain. But for WebGL2 arrays are fine.
      float offset0 = uWaveOffsets[index0];
      float offset1 = uWaveOffsets[index1];
      
      float finalOffset = mix(offset0, offset1, fractT);
      
      transformed.x += finalOffset;
      `
    );
  }, [uniforms]);

  return { onBeforeCompile };
}
