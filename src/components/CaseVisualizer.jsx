import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';

const textureMap = {
  metal: { roughness: 0.18, metalness: 0.85, clearcoat: 0.6, clearcoatRoughness: 0.15 },
  glass: { roughness: 0.05, metalness: 0.12, clearcoat: 1, clearcoatRoughness: 0.08 },
  silicone: { roughness: 0.78, metalness: 0.05, clearcoat: 0.1, clearcoatRoughness: 0.85 },
};

export default function CaseVisualizer({ caseColor = '#111827', textureType = 'metal' }) {
  const materialProps = textureMap[textureType.toLowerCase()] || textureMap.metal;

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-4 bg-black/20 shadow-2xl shadow-black/30">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm text-zinc-300">
        <div>
          <p className="font-semibold text-white">Case Preview</p>
          <p className="text-xs text-zinc-500">Interactive 3D mockup with dynamic finish settings.</p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-300">
          {textureType} finish
        </span>
      </div>

      <div className="h-[420px] w-full overflow-hidden rounded-3xl bg-zinc-950">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.4, 5], fov: 32 }}>
          <ambientLight intensity={0.35} />
          <spotLight
            position={[4, 6, 5]}
            angle={0.25}
            intensity={1.4}
            penumbra={0.4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <spotLight position={[-4, 4, -2]} intensity={0.6} color="#5fd3ff" />

          <group rotation={[-0.18, 0.4, 0]}>
            <RoundedBox args={[3.2, 6.3, 0.34]} radius={0.32} smoothness={14} castShadow receiveShadow>
              <meshStandardMaterial color={caseColor} {...materialProps} />
            </RoundedBox>

            <group position={[0, 1.85, 0.185]}>
              <RoundedBox args={[0.88, 1.78, 0.15]} radius={0.08} smoothness={12}>
                <meshStandardMaterial color="#0d1117" roughness={0.35} metalness={0.1} />
              </RoundedBox>
              <mesh position={[0, 0.55, 0.085]}>
                <boxGeometry args={[0.6, 0.32, 0.07]} />
                <meshStandardMaterial color="#050708" roughness={0.2} metalness={0.1} />
              </mesh>
            </group>

            <mesh position={[0, -2.9, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[12, 12]} />
              <meshStandardMaterial color="#040609" roughness={0.9} metalness={0.05} />
            </mesh>
          </group>

          <OrbitControls maxPolarAngle={Math.PI / 2.2} minDistance={4} maxDistance={9} enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}
