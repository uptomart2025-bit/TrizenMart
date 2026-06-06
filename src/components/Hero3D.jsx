import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { useRef } from 'react';

function PremiumHardwareModel() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.55) * 0.12;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2.4, 1.4, 2.4]} />
      <meshStandardMaterial color="#141418" roughness={0.15} metalness={0.96} />
      <mesh position={[0, 0, 1.16]}>
        <boxGeometry args={[1.8, 0.75, 0.02]} />
        <meshStandardMaterial color="#e2f0ff" emissive="#e2f0ff" emissiveIntensity={0.95} />
      </mesh>
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <section className="relative w-full h-[75vh] pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />
      <div className="absolute inset-x-0 top-24 z-10 flex flex-col items-center justify-center text-center px-6">
        <span className="text-xs uppercase tracking-[0.32em] text-zinc-500 mb-4">Premium Tech E-Commerce</span>
        <h1 className="text-4xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white">WebGL Retail Matrix</h1>
        <p className="mt-4 max-w-3xl text-sm md:text-base text-zinc-300 leading-7">
          A full-stack commerce platform with AI-driven product ingestion, secure RBAC admin controls, and PostEx logistics automation.
        </p>
      </div>

      <Canvas shadows camera={{ position: [0, 1.5, 8], fov: 42 }} className="w-full h-full">
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 5]} intensity={1.2} castShadow />
        <Stage intensity={0.7} shadows={false} environment="city" adjustCamera={false} preset="rembrandt">
          <PremiumHardwareModel />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate enablePan={false} />
      </Canvas>
    </section>
  );
}
