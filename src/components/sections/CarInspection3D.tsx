"use client";

import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";

const frames = [
  { src: "/images/ferrari-repair-sequence/01.png", alt: "A collision-damaged red Ferrari arriving at the Titan workshop" },
  { src: "/images/ferrari-repair-sequence/02.png", alt: "The Ferrari after its first bodywork assessment" },
  { src: "/images/ferrari-repair-sequence/03.png", alt: "The Ferrari stripped for precision front-end repair" },
  { src: "/images/ferrari-repair-sequence/04.png", alt: "The Ferrari with aligned replacement panels in primer" },
  { src: "/images/ferrari-repair-sequence/05.png", alt: "The repaired Ferrari wearing its matte base coat" },
  { src: "/images/ferrari-repair-sequence/06.png", alt: "The Ferrari after its first gloss finish" },
  { src: "/images/ferrari-repair-sequence/07.png", alt: "The restored Ferrari during final detailing" },
  { src: "/images/ferrari-repair-sequence/08.png", alt: "The fully restored red Ferrari under final inspection lights" },
] as const;

export type CarInspection3DHandle = { draw: (progress: number) => void };

export const CarInspection3D = forwardRef<CarInspection3DHandle, { enabled: boolean }>(
  function CarInspection3D({ enabled }, ref) {
    const layers = useRef<Array<HTMLDivElement | null>>([]);
    const lightSweep = useRef<HTMLDivElement>(null);

    const sample = (values: readonly number[], progress: number) => {
      const position = progress * (values.length - 1);
      const index = Math.min(values.length - 2, Math.floor(position));
      const amount = position - index;
      return values[index] + (values[index + 1] - values[index]) * amount;
    };

    useImperativeHandle(ref, () => ({
      draw(nextProgress) {
        const progress = Math.min(1, Math.max(0, nextProgress));
        const position = progress * (frames.length - 1);
        const active = Math.floor(position);
        const blend = position - active;

        // Deliberately asymmetric movement makes the sequence feel like a
        // moving camera rather than static dissolves: drift through the repair
        // stages, reverse subtly through paint, then settle hero-centre.
        const x = sample([-2.2, -0.8, 0.9, 0.25, -0.45, 0.35, 0, 0.2], progress);
        const y = sample([0.8, 0.3, -0.25, 0.15, -0.2, 0.1, -0.15, -0.3], progress);
        const scale = sample([1.045, 1.035, 1.055, 1.04, 1.03, 1.045, 1.035, 1.055], progress);
        const yaw = sample([-0.8, -0.35, 0.45, 0.15, -0.25, 0.2, 0, 0.15], progress);
        const roll = sample([-0.08, -0.03, 0.04, 0.02, -0.03, 0.02, 0, 0], progress);

        layers.current.forEach((layer, index) => {
          if (!layer) return;
          const opacity = index === active ? 1 - blend : index === active + 1 ? blend : 0;
          layer.style.opacity = String(opacity);
          layer.style.transform = `perspective(1400px) translate3d(${x}%, ${y}%, 0) rotateY(${yaw}deg) rotateZ(${roll}deg) scale(${scale})`;
        });
        if (lightSweep.current) {
          const reveal = Math.max(0, (progress - 0.72) / 0.28);
          lightSweep.current.style.opacity = String(reveal * 0.7);
          lightSweep.current.style.transform = `translate3d(${-130 + reveal * 260}%, 0, 0) skewX(-18deg)`;
        }
      },
    }), []);

    return (
      <div className="absolute inset-0 overflow-hidden bg-[#050506]" aria-live="off">
        {frames.map((frame, index) => (
          <div
            key={frame.src}
            ref={(node) => { layers.current[index] = node; }}
            className="absolute inset-0 origin-center will-change-[opacity,transform]"
            style={{ opacity: index === (enabled ? 0 : frames.length - 1) ? 1 : 0, transform: "scale(1.035)" }}
          >
            <Image
              src={frame.src}
              alt={index === (enabled ? 0 : frames.length - 1) ? frame.alt : ""}
              fill
              priority={index < 2}
              sizes="100vw"
              className="object-cover object-center"
              quality={88}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,transparent_28%,rgba(0,0,0,.08)_62%,rgba(0,0,0,.72)_100%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            ref={lightSweep}
            className="absolute -inset-y-16 left-0 w-[32%] opacity-0 mix-blend-screen will-change-[transform,opacity]"
            style={{ background: "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.28), rgb(225 6 6 / 0.11), transparent)", transform: "translate3d(-130%,0,0) skewX(-18deg)" }}
          />
        </div>
        {!enabled && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />}
      </div>
    );
  },
);
