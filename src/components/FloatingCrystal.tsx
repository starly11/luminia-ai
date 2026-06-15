import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { crystalVertexShader, crystalFragmentShader } from '../shaders/shaders';

interface FloatingCrystalProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color?: string;
}

export function FloatingCrystal({
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.2,
  color = '#D4AF37',
}: FloatingCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const crystalColor = useMemo(() => {
    return new THREE.Color(color);
  }, [color]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.2;
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * rotationSpeed * 0.5) * 0.1;
      
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
        material.uniforms.uColor.value = crystalColor;
      }
    }
  });
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: crystalColor },
    }),
    [crystalColor]
  );
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <shaderMaterial
        vertexShader={crystalVertexShader}
        fragmentShader={crystalFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface CrystalFormationProps {
  count?: number;
  spread?: number;
}

export function CrystalFormation({ count = 7, spread = 8 }: CrystalFormationProps) {
  const crystals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        Math.cos((i / count) * Math.PI * 2) * spread,
        (Math.random() - 0.5) * 4,
        Math.sin((i / count) * Math.PI * 2) * spread,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.8,
      rotationSpeed: 0.1 + Math.random() * 0.3,
      color: i % 2 === 0 ? '#D4AF37' : '#F4D06F',
    }));
  }, [count, spread]);
  
  return (
    <group>
      {crystals.map((crystal, i) => (
        <FloatingCrystal
          key={i}
          position={crystal.position}
          scale={crystal.scale}
          rotationSpeed={crystal.rotationSpeed}
          color={crystal.color}
        />
      ))}
    </group>
  );
}
