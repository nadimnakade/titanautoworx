"use client";

import Image from "next/image";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

const FRAME_COUNT = 117;

export type ExplodedCarCanvasHandle = {
  draw: (progress: number) => void;
};

export const ExplodedCarCanvas = forwardRef<ExplodedCarCanvasHandle, { enabled: boolean }>(function ExplodedCarCanvas({ enabled }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const progress = useRef(0);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);

  const paint = useCallback((scrollProgress: number) => {
    progress.current = scrollProgress;
    const el = canvas.current;
    if (!el || frames.current.length !== FRAME_COUNT) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    // Disassemble through 58% of the scroll, pause at full expansion, then
    // play the exact frame sequence backward for a seamless reassembly.
    const sequenceProgress = scrollProgress <= 0.58
      ? Math.min(1, scrollProgress / 0.55)
      : Math.max(0, (1 - scrollProgress) / 0.42);
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(sequenceProgress * (FRAME_COUNT - 1))));
    const image = frames.current[index];
    if (!image?.complete) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = el.clientWidth;
    const height = el.clientHeight;
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    if (el.width !== pixelWidth || el.height !== pixelHeight) {
      el.width = pixelWidth;
      el.height = pixelHeight;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const x = -(drawWidth - width) * (width < 700 ? 0.67 : 0.5);
    const y = -(drawHeight - height) * 0.5;
    ctx.drawImage(image, x, y, drawWidth, drawHeight);
  }, []);

  useImperativeHandle(ref, () => ({ draw: paint }), [paint]);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = `/images/explosion/frames-120/titan_${String(index + 1).padStart(3, "0")}.webp`;
      image.onload = async () => {
        try {
          await image.decode();
        } catch {
          // Loaded images remain drawable when explicit decoding is unavailable.
        }
        if (!active) return;
        setLoaded((count) => {
          const next = count + 1;
          if (next === FRAME_COUNT) {
            setReady(true);
            requestAnimationFrame(() => paint(progress.current));
          }
          return next;
        });
      };
      return image;
    });
    frames.current = images;

    const observer = new ResizeObserver(() => paint(progress.current));
    if (canvas.current) observer.observe(canvas.current);
    return () => {
      active = false;
      observer.disconnect();
      frames.current = [];
    };
  }, [enabled, paint]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/images/explosion/keyframes/00-assembled.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[68%_center] transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-90"}`}
      />
      {enabled && <canvas
        ref={canvas}
        className={`absolute inset-0 size-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />}
      {enabled && !ready && (
        <div className="absolute bottom-36 right-8 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/60">
          <span className="size-3 animate-spin rounded-full border border-white/25 border-t-accent" />
          Loading sequence {Math.round((loaded / FRAME_COUNT) * 100)}%
        </div>
      )}
    </div>
  );
});
