import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Points } from '@react-three/drei';

function NeuralCore() {
  const groupRef = useRef(null);
  const ringARef = useRef(null);
  const ringBRef = useRef(null);
  const shellRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }

    if (ringARef.current) {
      ringARef.current.rotation.x += delta * 0.5;
      ringARef.current.rotation.y += delta * 0.2;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.y -= delta * 0.4;
      ringBRef.current.rotation.z += delta * 0.25;
    }

    if (shellRef.current) {
      shellRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh ref={shellRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial
            color="#4cc9f0"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
            distort={0.35}
            speed={2.3}
            roughness={0.18}
            metalness={0.55}
            transparent
            opacity={0.92}
          />
        </mesh>
      </Float>

      <mesh scale={0.38}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#f8fafc"
          emissive="#a855f7"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={ringARef} rotation={[0.7, 0, 0]} scale={1.65}>
        <torusGeometry args={[1, 0.03, 16, 120]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.8}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={ringBRef} rotation={[1.1, 0.8, 0.6]} scale={1.28}>
        <torusGeometry args={[1, 0.045, 16, 120]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={1.5}
          transparent
          opacity={0.75}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function DataPoints() {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const array = new Float32Array(900);

    for (let i = 0; i < array.length; i += 3) {
      const radius = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      array[i] = radius * Math.sin(phi) * Math.cos(theta);
      array[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[i + 2] = radius * Math.cos(phi);
    }

    return array;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x -= delta * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <pointsMaterial
        color="#93c5fd"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </Points>
  );
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.35),_transparent_58%),radial-gradient(circle_at_30%_30%,_rgba(168,85,247,0.25),_transparent_45%)]" />
  );
}

export default function AboutScene() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_45%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.7))]" />
      <div className="absolute inset-[18%] rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute inset-0 rounded-[28px] border border-cyan-400/20" />

      <Suspense fallback={<SceneFallback />}>
        <Canvas camera={{ position: [0, 0, 5.8], fov: 42 }} dpr={[1, 1.5]}>
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 5, 9]} />
          <ambientLight intensity={0.7} />
          <pointLight position={[3, 2, 4]} intensity={14} color="#38bdf8" />
          <pointLight position={[-3, -2, 3]} intensity={11} color="#a855f7" />
          <spotLight position={[0, 5, 0]} angle={0.45} penumbra={1} intensity={12} color="#e0f2fe" />

          <DataPoints />
          <NeuralCore />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.55}
            maxPolarAngle={Math.PI * 0.65}
            minPolarAngle={Math.PI * 0.35}
          />
        </Canvas>
      </Suspense>

      <div className="pointer-events-none absolute inset-x-6 bottom-5 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 backdrop-blur">
        <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-300/80">
          AI Signal Matrix
        </p>
        <p className="mt-1 text-sm text-slate-300">
          Adaptive systems, neural ideas, and full-stack execution.
        </p>
      </div>
    </div>
  );
}
