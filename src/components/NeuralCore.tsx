import { Environment, Float, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CORE = "#69f5e8";
const SIGNAL = "#c9ff5a";
const WARM = "#ff9f43";
const DEEP = "#071010";

function NeuralStructure() {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);
  const nodes = useMemo(() => {
    const positions: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < 42; i += 1) {
      const y = 1 - (i / 41) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions.push([Math.cos(theta) * radius * 2.22, y * 2.22, Math.sin(theta) * radius * 2.22]);
    }
    return positions;
  }, []);

  const lines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    nodes.forEach((node, index) => {
      for (let other = index + 1; other < nodes.length; other += 1) {
        const a = new THREE.Vector3(...node);
        const b = new THREE.Vector3(...nodes[other]);
        if (a.distanceTo(b) < 1.3) points.push(a, b);
      }
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    group.current.rotation.y += delta * 0.09;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * 0.16, 4, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -state.pointer.x * 0.12, 4, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, state.pointer.x * 0.28, 3, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, state.pointer.y * 0.16, 3, delta);
    if (wire.current) wire.current.rotation.y -= delta * 0.11;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.12} floatIntensity={0.28}>
      <group ref={group} rotation={[0.12, -0.28, 0]}>
        <mesh ref={wire}>
          <icosahedronGeometry args={[1.68, 2]} />
          <meshPhysicalMaterial color={CORE} wireframe transparent opacity={0.22} roughness={0.2} metalness={0.68} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.3, 3]} />
          <meshPhysicalMaterial color={DEEP} emissive={CORE} emissiveIntensity={0.16} roughness={0.24} metalness={0.78} clearcoat={1} />
        </mesh>
        <lineSegments geometry={lines}>
          <lineBasicMaterial color={CORE} transparent opacity={0.34} />
        </lineSegments>
        {nodes.map((position, index) => (
          <mesh key={index} position={position} scale={index % 7 === 0 ? 1.55 : 1}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshBasicMaterial color={index % 7 === 0 ? SIGNAL : CORE} />
          </mesh>
        ))}
        <pointLight color={CORE} intensity={17} distance={10} />
        <OrbitRing radius={2.7} tilt={0.35} speed={0.42} color={SIGNAL} />
        <OrbitRing radius={3.05} tilt={-0.8} speed={-0.29} color={WARM} />
      </group>
    </Float>
  );
}

function OrbitRing({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
  const pivot = useRef<THREE.Group>(null);
  useFrame((_, rawDelta) => {
    if (pivot.current) pivot.current.rotation.z += Math.min(rawDelta, 0.05) * speed;
  });
  return (
    <group ref={pivot} rotation={[tilt, 0.2, 0]}>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[radius, 0.008, 6, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.42} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const particles = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(180 * 3);
    let seed = 7391;
    const next = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < data.length; i += 3) {
      data[i] = (next() - 0.5) * 17;
      data[i + 1] = (next() - 0.5) * 11;
      data[i + 2] = (next() - 0.5) * 10;
    }
    return data;
  }, []);
  useFrame((_, rawDelta) => {
    if (particles.current) particles.current.rotation.y += Math.min(rawDelta, 0.05) * 0.012;
  });
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color={CORE} transparent opacity={0.58} sizeAttenuation />
    </points>
  );
}

export function NeuralCore() {
  return (
    <div className="neural-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.2, 8.5], fov: 44 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.38} />
        <directionalLight position={[4, 6, 6]} color={CORE} intensity={2.2} />
        <ParticleField />
        <NeuralStructure />
        <Environment>
          <Lightformer intensity={1.6} color={CORE} position={[0, 5, 2]} scale={[8, 2, 1]} />
          <Lightformer intensity={0.8} color={WARM} position={[-5, 0, -1]} rotation-y={Math.PI / 2} scale={[5, 1, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}