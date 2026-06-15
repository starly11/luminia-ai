import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { particleVertexShader, particleFragmentShader } from '../shaders/shaders';

interface ParticleNebulaProps {
  count?: number;
}

export function ParticleNebula({ count = 4000 }: ParticleNebulaProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();
  
  // Generate particle data
  const { positions, randoms, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spiral distribution
      const i3 = i * 3;
      const angle = (i / count) * Math.PI * 2 * 8; // 8 rotations
      const radius = (i / count) * 15 + Math.random() * 2;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = Math.sin(angle) * radius;
      
      randoms[i3] = Math.random();
      randoms[i3 + 1] = Math.random();
      randoms[i3 + 2] = Math.random();
      
      scales[i] = Math.random() * 1.5 + 0.5;
    }
    
    return { positions, randoms, scales };
  }, [count]);
  
  // Mouse position uniform
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  
  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
    mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
  };
  
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove);
  }
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
        material.uniforms.uMouse.value = mouseRef.current;
        material.uniforms.uScroll.value = state.scroll ?? 0;
      }
    }
  });
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    return geo;
  }, [positions, randoms, scales]);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    []
  );
  
  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
