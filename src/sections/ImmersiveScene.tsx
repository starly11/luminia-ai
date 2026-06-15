import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ParticleNebula } from '../components/ParticleNebula';
import { CrystalFormation } from '../components/FloatingCrystal';

export function ImmersiveScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-midnight">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {/* Particle nebula with custom shaders */}
        <ParticleNebula count={4000} />
        
        {/* Floating crystal formation */}
        <CrystalFormation count={7} spread={8} />
        
        {/* Post-processing bloom for luxury glow */}
        <EffectComposer disableNormalPass>
          <Bloom
            mipmapBlur
            luminanceThreshold={0.8}
            luminanceSmoothing={0.9}
            intensity={1.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
