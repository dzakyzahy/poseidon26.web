import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useFishPatrol(ref: React.RefObject<THREE.Group | null>, active: boolean = true) {
  const targetPosition = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const force = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3());
  const dummy = useRef(new THREE.Object3D());

  useFrame(({ clock }, delta) => {
    if (!ref.current || !active) return;

    // Slow oscillation left and right
    const time = clock.getElapsedTime() * 0.05; // very slow
    const x = Math.sin(time) * 5; // range -5 to 5
    const z = -5 + Math.cos(time * 1.5) * 1; // slight depth variation
    
    targetPosition.current.set(x, 0, z);

    // Calculate spring physics for movement
    const stiffness = 0.05;
    const damping = 0.95;

    // Force = stiffness * (target - current)
    force.current.subVectors(targetPosition.current, ref.current.position).multiplyScalar(stiffness);
    
    // velocity = (velocity + force * delta) * damping
    velocity.current.add(force.current.multiplyScalar(delta)).multiplyScalar(damping);
    
    // Update position
    ref.current.position.add(velocity.current);

    // Calculate rotation to face the direction of movement
    if (velocity.current.lengthSq() > 0.0001) {
      lookAtTarget.current.copy(ref.current.position).add(velocity.current);
      dummy.current.position.copy(ref.current.position);
      dummy.current.lookAt(lookAtTarget.current);
      ref.current.quaternion.slerp(dummy.current.quaternion, 0.02); // very smooth turning
    }
  });
}
