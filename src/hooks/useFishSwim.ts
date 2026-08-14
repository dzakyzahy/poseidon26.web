import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';


interface SwimConfig {
  speed?: number;
  amplitude?: number;
  frequency?: number;
  // Axis along which the fish swims (usually Z axis for models facing forward)
  spineAxis?: 'x' | 'y' | 'z';
}

export function useFishSwim(config: SwimConfig = {}) {
  const {
    speed = 5.0,
    amplitude = 0.2,
    frequency = 3.0,
    spineAxis = 'z'
  } = config;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uAmplitude: { value: amplitude },
    uFrequency: { value: frequency },
  }), [speed, amplitude, frequency]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uSpeed = uniforms.uSpeed;
    shader.uniforms.uAmplitude = uniforms.uAmplitude;
    shader.uniforms.uFrequency = uniforms.uFrequency;

    // Inject uniforms
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
      #include <common>
      uniform float uTime;
      uniform float uSpeed;
      uniform float uAmplitude;
      uniform float uFrequency;
      `
    );

    // Inject vertex deformation
    // Assuming spine is along the chosen axis (e.g. z) and tail swings along x
    const positionAxis = spineAxis === 'z' ? 'z' : spineAxis === 'x' ? 'x' : 'y';
    const swingAxis = spineAxis === 'z' ? 'x' : spineAxis === 'x' ? 'z' : 'x';

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      
      // Calculate wave offset based on spine position
      float wave = sin(position.${positionAxis} * uFrequency - uTime * uSpeed) * uAmplitude;
      
      // Attenuate wave towards the head (assuming head is at positive positionAxis and tail at negative)
      // We map the object coordinates roughly. If we assume origin is center, 
      // tail is negative z. So we increase amplitude towards negative z.
      float attenuation = clamp(0.5 - position.${positionAxis}, 0.0, 1.0);
      
      transformed.${swingAxis} += wave * attenuation;
      `
    );
  };

  return { uniforms, onBeforeCompile };
}
