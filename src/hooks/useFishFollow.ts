import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function useFishFollow(ref: React.RefObject<THREE.Group | null>) {
  const { viewport, camera, mouse } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const currentPosition = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!ref.current) return;

    // Raycast mouse position to a virtual plane in front of the camera
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    
    // We want the fish to stay around z = -5
    const distance = (-5 - camera.position.z) / dir.z;
    targetPosition.current.copy(camera.position).add(dir.multiplyScalar(distance));

    // Calculate spring physics for movement
    const stiffness = 2.0;
    const damping = 0.85; // Less than 1 for damping

    // Force = stiffness * (target - current)
    const force = new THREE.Vector3().subVectors(targetPosition.current, ref.current.position).multiplyScalar(stiffness);
    
    // velocity = (velocity + force * delta) * damping
    velocity.current.add(force.multiplyScalar(delta)).multiplyScalar(damping);
    
    // Update position
    ref.current.position.add(velocity.current);

    // Calculate rotation to face the direction of movement
    if (velocity.current.lengthSq() > 0.001) {
      // Create a target rotation
      // The fish model faces Z, so we look at the velocity direction
      const lookAtTarget = new THREE.Vector3().copy(ref.current.position).add(velocity.current);
      
      // We need a dummy object to lookAt and get quaternion because Group.lookAt directly snaps
      const dummy = new THREE.Object3D();
      dummy.position.copy(ref.current.position);
      dummy.lookAt(lookAtTarget);
      
      // Slerp for smooth rotation
      ref.current.quaternion.slerp(dummy.quaternion, 0.1);
    }
  });
}
