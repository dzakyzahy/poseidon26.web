import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Boid {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  meshRef: React.RefObject<THREE.Group | null>;
}

export interface FlockOptions {
  separationRadius?: number;
  maxSpeed?: number;
  maxForce?: number;
}

export function useFlock(count: number, centerTargetRef: React.RefObject<THREE.Group | null>, options?: FlockOptions) {
  // Initialize boids
  const boids = useMemo(() => {
    const list: Boid[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10 - 5
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
        meshRef: { current: null }
      });
    }
    return list;
  }, [count]);

  const separationRadius = options?.separationRadius ?? 2.0;
  const maxSpeed = options?.maxSpeed ?? 3.0;
  const maxForce = options?.maxForce ?? 0.05;

  useFrame((_, delta) => {
    const centerTarget = centerTargetRef.current?.position || new THREE.Vector3(0, 0, -5);

    boids.forEach((boid) => {
      // 1. Separation
      const separation = new THREE.Vector3();
      let separationCount = 0;

      // 2. Alignment
      const alignment = new THREE.Vector3();
      let alignmentCount = 0;

      // 3. Cohesion
      const cohesion = new THREE.Vector3();
      let cohesionCount = 0;

      boids.forEach((otherBoid) => {
        if (boid !== otherBoid) {
          const d = boid.position.distanceTo(otherBoid.position);
          
          if (d > 0 && d < separationRadius) {
            const diff = new THREE.Vector3().subVectors(boid.position, otherBoid.position);
            diff.normalize();
            diff.divideScalar(d);
            separation.add(diff);
            separationCount++;
          }
          
          if (d > 0 && d < separationRadius * 2) {
            alignment.add(otherBoid.velocity);
            alignmentCount++;
            cohesion.add(otherBoid.position);
            cohesionCount++;
          }
        }
      });

      if (separationCount > 0) separation.divideScalar(separationCount);
      if (alignmentCount > 0) alignment.divideScalar(alignmentCount);
      if (cohesionCount > 0) cohesion.divideScalar(cohesionCount);

      if (separation.lengthSq() > 0) {
        separation.normalize().multiplyScalar(maxSpeed).sub(boid.velocity).clampLength(0, maxForce);
      }
      
      if (alignment.lengthSq() > 0) {
        alignment.normalize().multiplyScalar(maxSpeed).sub(boid.velocity).clampLength(0, maxForce);
      }
      
      if (cohesionCount > 0) {
        const desired = new THREE.Vector3().subVectors(cohesion, boid.position);
        desired.normalize().multiplyScalar(maxSpeed);
        cohesion.copy(desired).sub(boid.velocity).clampLength(0, maxForce);
      }

      // 4. Center Follow (Follow the main fish or center)
      const centerFollow = new THREE.Vector3().subVectors(centerTarget, boid.position);
      // add some orbit randomness
      centerFollow.add(new THREE.Vector3(Math.sin(Date.now() * 0.001) * 2, Math.cos(Date.now() * 0.001) * 2, 0));
      centerFollow.normalize().multiplyScalar(maxSpeed).sub(boid.velocity).clampLength(0, maxForce * 1.5);

      // Apply forces
      boid.velocity.add(separation.multiplyScalar(1.5));
      boid.velocity.add(alignment.multiplyScalar(1.0));
      boid.velocity.add(cohesion.multiplyScalar(1.0));
      boid.velocity.add(centerFollow.multiplyScalar(1.2));
      
      boid.velocity.clampLength(0, maxSpeed);
      
      // Update position
      boid.position.add(boid.velocity.clone().multiplyScalar(delta * 10));

      // Update mesh
      if (boid.meshRef.current) {
        boid.meshRef.current.position.copy(boid.position);
        
        if (boid.velocity.lengthSq() > 0.001) {
          const lookAtTarget = new THREE.Vector3().copy(boid.position).add(boid.velocity);
          const dummy = new THREE.Object3D();
          dummy.position.copy(boid.position);
          dummy.lookAt(lookAtTarget);
          boid.meshRef.current.quaternion.slerp(dummy.quaternion, 0.1);
        }
      }
    });
  });

  return boids;
}
