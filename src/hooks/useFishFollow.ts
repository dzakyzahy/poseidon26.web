import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function useFishFollow(ref: React.RefObject<THREE.Group | null>) {
  const { camera } = useThree();
  const globalMouse = useRef(new THREE.Vector2());
  const targetPosition = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const vector = useRef(new THREE.Vector3()).current;
  const dir = useRef(new THREE.Vector3()).current;
  const force = useRef(new THREE.Vector3()).current;
  const lookAtTarget = useRef(new THREE.Vector3()).current;
  const dummy = useRef(new THREE.Object3D()).current;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;

    // Raycast global mouse position to a virtual plane in front of the camera
    vector.set(globalMouse.current.x, globalMouse.current.y, 0.5);
    vector.unproject(camera);
    dir.copy(vector).sub(camera.position).normalize();
    
    // We want the fish to stay around z = -5
    const distance = (-5 - camera.position.z) / dir.z;
    targetPosition.current.copy(camera.position).add(dir.multiplyScalar(distance));

    // Calculate spring physics for movement
    const stiffness = 2.0;
    const damping = 0.85; // Less than 1 for damping

    // Force = stiffness * (target - current)
    force.subVectors(targetPosition.current, ref.current.position).multiplyScalar(stiffness);
    
    // velocity = (velocity + force * delta) * damping
    velocity.current.add(force.multiplyScalar(delta)).multiplyScalar(damping);
    
    // Update position
    ref.current.position.add(velocity.current);

    // Calculate rotation to face the direction of movement
    if (velocity.current.lengthSq() > 0.001) {
      // Create a target rotation
      // The fish model faces Z, so we look at the velocity direction
      lookAtTarget.copy(ref.current.position).add(velocity.current);
      
      // We need a dummy object to lookAt and get quaternion because Group.lookAt directly snaps
      dummy.position.copy(ref.current.position);
      dummy.lookAt(lookAtTarget);
      
      // Slerp for smooth rotation
      ref.current.quaternion.slerp(dummy.quaternion, 0.1);
    }
  });
}
