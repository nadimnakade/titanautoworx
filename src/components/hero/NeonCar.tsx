"use client";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type P = [number, number];

const WHEEL_X = 1.42;
const WHEEL_Y = 0.36;
const WHEEL_R = 0.36;
const HALF_W = 0.86;

function arc(cx: number, cy: number, r: number, from: number, to: number, steps = 18): P[] {
  const out: P[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = from + ((to - from) * i) / steps;
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return out;
}

/** Generic sports-coupe side profile (not modelled on any specific car). */
function profile(): P[] {
  const archR = WHEEL_R + 0.07;
  return [
    [2.22, 0.24],
    [2.28, 0.5],
    [2.12, 0.66],
    [1.55, 0.78],
    [0.9, 0.86],
    [0.5, 0.92],
    [0.05, 1.22],
    [-0.35, 1.3],
    [-0.85, 1.26],
    [-1.45, 1.02],
    [-1.95, 0.84],
    [-2.24, 0.74],
    [-2.3, 0.44],
    [-2.18, 0.24],
    [-WHEEL_X - archR, 0.24],
    ...arc(-WHEEL_X, WHEEL_Y, archR, Math.PI, 0),
    [WHEEL_X - archR - 1.1, 0.22],
    [WHEEL_X - archR, 0.24],
    ...arc(WHEEL_X, WHEEL_Y, archR, Math.PI, 0),
    [2.22, 0.24],
  ];
}

const windows: P[] = [
  [0.48, 0.94],
  [0.06, 1.18],
  [-0.36, 1.25],
  [-0.84, 1.21],
  [-1.32, 1.0],
  [0.48, 0.94],
];

const at = (pts: P[], z: number) => pts.map(([x, y]) => new THREE.Vector3(x, y, z));

export function NeonCar({ color }: { color: THREE.Color }) {
  const scan = useRef<THREE.Mesh>(null);
  const dim = useMemo(() => color.clone().multiplyScalar(0.35), [color]);

  const { sides, glass, wheels, ribs } = useMemo(() => {
    const prof = profile();
    const sides = [at(prof, HALF_W), at(prof, -HALF_W)];
    const glass = [at(windows, HALF_W - 0.02), at(windows, -HALF_W + 0.02)];
    const wheels: THREE.Vector3[][] = [];
    for (const x of [-WHEEL_X, WHEEL_X])
      for (const z of [HALF_W + 0.02, -HALF_W - 0.02]) {
        wheels.push(at(arc(x, WHEEL_Y, WHEEL_R, 0, Math.PI * 2, 40), z));
        wheels.push(at(arc(x, WHEEL_Y, WHEEL_R * 0.58, 0, Math.PI * 2, 30), z));
      }
    // Cross ribs at key profile points give the body volume.
    const keys: P[] = [[2.28, 0.5], [2.12, 0.66], [1.55, 0.78], [0.5, 0.92], [0.05, 1.22], [-0.85, 1.26], [-1.45, 1.02], [-2.24, 0.74], [-2.3, 0.44]];
    const ribs = keys.map(([x, y]) => {
      const inset = y > 1 ? 0.14 : 0;
      return [new THREE.Vector3(x, y, HALF_W - inset), new THREE.Vector3(x, y, -HALF_W + inset)];
    });
    return { sides, glass, wheels, ribs };
  }, []);

  useFrame((state) => {
    const m = scan.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const phase = (t % 5) / 5; // sweep every 5s
    m.position.x = THREE.MathUtils.lerp(2.6, -2.6, THREE.MathUtils.smootherstep(phase, 0, 1));
    (m.material as THREE.MeshBasicMaterial).opacity = Math.sin(phase * Math.PI) * 0.35;
  });

  const scanTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const h = g.createLinearGradient(0, 0, 128, 0);
    h.addColorStop(0, "rgba(255,90,31,0)");
    h.addColorStop(0.5, "rgba(255,170,120,1)");
    h.addColorStop(1, "rgba(255,90,31,0)");
    g.fillStyle = h;
    g.fillRect(0, 0, 128, 128);
    // fade top and bottom so the beam has no hard edges
    g.globalCompositeOperation = "destination-in";
    const v = g.createLinearGradient(0, 0, 0, 128);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(0.35, "rgba(0,0,0,1)");
    v.addColorStop(0.75, "rgba(0,0,0,1)");
    v.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = v;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <group>
      {sides.map((pts, i) => (
        <Line key={`s${i}`} points={pts} color={color} lineWidth={1.6} toneMapped={false} />
      ))}
      {glass.map((pts, i) => (
        <Line key={`g${i}`} points={pts} color={dim} lineWidth={1} toneMapped={false} />
      ))}
      {wheels.map((pts, i) => (
        <Line key={`w${i}`} points={pts} color={i % 2 ? dim : color} lineWidth={i % 2 ? 1 : 1.5} toneMapped={false} />
      ))}
      {ribs.map((pts, i) => (
        <Line key={`r${i}`} points={pts} color={dim} lineWidth={0.8} toneMapped={false} />
      ))}
      {/* scanning beam */}
      <mesh ref={scan} position={[0, 0.8, 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[2.2, 1.6]} />
        <meshBasicMaterial
          map={scanTex}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
