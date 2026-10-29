"use client";

import { forwardRef, Suspense, useImperativeHandle, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL = "/models/spectral-gt-rs.glb";

export type FinalTurntable3DHandle = { draw: (progress: number) => void };

function Car({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const fit = 5.2 / Math.max(size.x, size.y, size.z);
    clone.position.sub(center);
    clone.scale.setScalar(fit);
    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      node.castShadow = true;
      node.receiveShadow = true;
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => {
        if (!(material instanceof THREE.MeshStandardMaterial)) return;
        material.envMapIntensity = 1.45;
        material.roughness = Math.min(material.roughness, 0.34);
      });
    });
    return clone;
  }, [scene]);

  useFrame(() => {
    if (!group.current) return;
    const p = THREE.MathUtils.clamp(progress.current ?? 0, 0, 1);
    // Valmora-style choreography: a complete orbit with a gentle detail push
    // near the end, always reversible and directly attached to the scrollbar.
    group.current.rotation.y = -0.58 + p * Math.PI * 2;
    group.current.rotation.x = Math.sin(p * Math.PI * 2) * 0.025;
    group.current.position.x = Math.sin(p * Math.PI * 2) * 0.28;
    group.current.position.y = -0.48 + Math.sin(p * Math.PI) * 0.06;
    const detailPush = THREE.MathUtils.smoothstep(p, 0.78, 1);
    group.current.scale.setScalar(1 + detailPush * 0.16);
  });

  return <group ref={group}><primitive object={model} /></group>;
}

export const FinalTurntable3D = forwardRef<FinalTurntable3DHandle>(function FinalTurntable3D(_, ref) {
  const progress = useRef(0);
  useImperativeHandle(ref, () => ({ draw(value) { progress.current = value; } }), []);

  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [7.5, 2.55, 8.5], fov: 34, near: 0.1, far: 60 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={4.8} color="#fff8f2" castShadow />
      <spotLight position={[-5, 5, 2]} intensity={68} angle={0.5} penumbra={0.9} color="#e10606" />
      <spotLight position={[5, 3, -4]} intensity={46} angle={0.55} penumbra={0.9} color="#ffffff" />
      <Suspense fallback={null}><Car progress={progress} /><Environment preset="warehouse" /></Suspense>
      <ContactShadows position={[0, -0.55, 0]} opacity={0.68} scale={11} blur={2.6} far={5} />
    </Canvas>
  );
});

useGLTF.preload(MODEL);
