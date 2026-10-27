"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { NeonCar } from "./NeonCar";

const ORANGE = new THREE.Color("#ff5a1f");
// Over-bright color so bloom picks up the light bars.
const NEON = new THREE.Color(5, 1.6, 0.45);

/** Embers rising through the bay. Positions updated on the CPU (cheap at ~700 points). */
function Sparks({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 6;
      positions[i * 3 + 2] = -Math.random() * 14 + 3;
      speeds[i] = 0.15 + Math.random() * 0.55;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count]);

  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,220,180,1)");
    grd.addColorStop(0.25, "rgba(255,120,50,0.9)");
    grd.addColorStop(1, "rgba(255,90,31,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((state, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    const d = Math.min(dt, 0.05);
    for (let i = 0; i < count; i++) {
      const iy = i * 3 + 1;
      arr[iy] += speeds[i] * d;
      arr[i * 3] += Math.sin(t * 0.8 + phases[i]) * 0.12 * d;
      if (arr[iy] > 6) {
        arr[iy] = -0.2;
        arr[i * 3] = (Math.random() - 0.5) * 16;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.09}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={new THREE.Color(2.2, 0.9, 0.4)}
        toneMapped={false}
      />
    </points>
  );
}

/** Garage bay: wet reflective floor, neon ceiling strips, pillar light bars, display platform. */
function Bay() {
  const ring = useRef<THREE.Mesh>(null);
  const disc = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ring.current) ring.current.rotation.z += dt * 0.25;
    if (disc.current) disc.current.rotation.y += dt * 0.18;
  });

  const pillars = useMemo(() => {
    const out: [number, number][] = [];
    for (let z = 1; z > -22; z -= 3.2) {
      out.push([-7.4, z]);
      out.push([7.4, z]);
    }
    return out;
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position-y={0}>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[400, 90]}
          resolution={1024}
          mixBlur={1}
          mixStrength={55}
          roughness={0.9}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0d0d0f"
          metalness={0.65}
          mirror={0.6}
        />
      </mesh>

      {/* Ceiling neon strips running into the distance */}
      {[-2.4, 0, 2.4].map((x) => (
        <mesh key={x} position={[x, 5.2, -8]}>
          <boxGeometry args={[0.07, 0.04, 26]} />
          <meshBasicMaterial color={NEON} toneMapped={false} />
        </mesh>
      ))}

      {/* Pillar light bars */}
      {pillars.map(([x, z]) => (
        <group key={`${x}${z}`} position={[x, 0, z]}>
          <mesh position-y={2.6}>
            <boxGeometry args={[0.5, 5.2, 0.5]} />
            <meshBasicMaterial color="#0e0e10" />
          </mesh>
          <mesh position={[x < 0 ? 0.27 : -0.27, 2.6, 0]}>
            <boxGeometry args={[0.03, 4.4, 0.08]} />
            <meshBasicMaterial color={NEON} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Back wall glow */}
      <mesh position={[0, 2.6, -24]}>
        <planeGeometry args={[14, 5.2]} />
        <meshBasicMaterial color="#1a0a04" />
      </mesh>
      <mesh position={[0, 0.9, -23.9]}>
        <planeGeometry args={[9, 0.06]} />
        <meshBasicMaterial color={NEON} toneMapped={false} />
      </mesh>

      {/* Display platform on the right, where the hero car sits */}
      <group ref={disc} position={[3.3, 0.02, -1.6]}>
        <group position-y={0.05} rotation-y={-0.5} scale={0.92}>
          <NeonCar color={NEON} />
        </group>
        <mesh>
          <cylinderGeometry args={[2.3, 2.4, 0.08, 96]} />
          <meshStandardMaterial color="#141416" metalness={0.9} roughness={0.25} />
        </mesh>
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 2.0, 0.045, Math.sin(a) * 2.0]} rotation-y={-a}>
              <boxGeometry args={[0.02, 0.005, 0.22]} />
              <meshBasicMaterial color="#3a3a40" />
            </mesh>
          );
        })}
      </group>
      <mesh ref={ring} position={[3.3, 0.07, -1.6]} rotation-x={-Math.PI / 2}>
        <torusGeometry args={[2.36, 0.018, 8, 160, Math.PI * 1.6]} />
        <meshBasicMaterial color={NEON} toneMapped={false} />
      </mesh>

      {/* Lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[3.3, 3.2, -1.6]} intensity={14} distance={7} color="#ffd2b8" />
      <pointLight position={[-4, 2.5, 0]} intensity={8} distance={10} color={ORANGE} />
      <pointLight position={[5, 2.5, -4]} intensity={10} distance={12} color={ORANGE} />
    </group>
  );
}

function CameraRig() {
  const { camera, pointer, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(1.0, 1.0, -3), []);
  useFrame((state, dt) => {
    const k = 1 - Math.pow(0.02, dt);
    const t = state.clock.elapsedTime;
    // Narrow screens: frame the car (it sits under the copy, softened by gradients).
    const narrow = size.width < 768;
    const baseX = narrow ? 3.0 : 0;
    target.x = narrow ? 3.3 : 1.0;
    camera.position.x += (baseX + pointer.x * 0.9 + Math.sin(t * 0.15) * 0.25 - camera.position.x) * k;
    camera.position.y += ((narrow ? 2.2 : 1.35) + pointer.y * 0.35 - camera.position.y) * k;
    camera.position.z += ((narrow ? 10.5 : 7.5) - camera.position.z) * k;
    camera.lookAt(target);
  });
  return null;
}

/**
 * Hero 3D scene. `overlay` = a hero photo is present: render only sparks + glow
 * on a transparent canvas so the photo stays the star.
 */
export default function HeroScene({ overlay = false }: { overlay?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: overlay, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.35, 7.5], fov: 38, near: 0.1, far: 60 }}
      >
        {!overlay && <color attach="background" args={["#0a0a0b"]} />}
        {!overlay && <fog attach="fog" args={["#0a0a0b", 8, 26]} />}
        {!overlay && <Bay />}
        <Sparks count={overlay ? 380 : 700} />
        <CameraRig />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom mipmapBlur luminanceThreshold={1} intensity={1.15} radius={0.75} />
          <Vignette eskil={false} offset={0.2} darkness={overlay ? 0.4 : 0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
