"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./V2Experience.module.css";

const styles = {
  experience: "experience", scrollStage: "scrollStage", sticky: "sticky", canvas: "canvas",
  grade: "grade", grain: "grain", header: "header", brand: "brand", headerCenter: "headerCenter",
  enquire: "enquire", coordinates: "coordinates", verticalLabel: "verticalLabel", scene: "scene",
  scene1: "scene1", scene2: "scene2", scene3: "scene3", scene4: "scene4", year: "year",
  copyBlock: "copyBlock", kicker: "kicker", annotation: "annotation", target: "target", rule: "rule",
  counter: "counter", rail: "rail", railFill: "railFill", railIntro: "railIntro", steps: "steps",
  scrollCue: "scrollCue", outro: "outro", loader: "loader", loaderMark: "loaderMark",
  loaderLine: "loaderLine",
} as const;

gsap.registerPlugin(ScrollTrigger, useGSAP);

const frameSources = Array.from({ length: 8 }, (_, index) =>
  `/images/ferrari-repair-sequence/${String(index + 1).padStart(2, "0")}.png`,
);

const chapters = [
  { number: "01", kicker: "The arrival", title: "SCARS TELL\nTHE FIRST STORY.", detail: "IMPACT MAPPING", copy: "Every fracture measured before a single line is redrawn." },
  { number: "02", kicker: "Coachwork", title: "FORM, RETURNED\nTO MEMORY.", detail: "FACTORY GEOMETRY", copy: "Metal, composite and tolerance brought back into alignment." },
  { number: "03", kicker: "Surface", title: "COLOUR WITH\nREAL DEPTH.", detail: "ROSSO CORSA", copy: "Layered, levelled and refined until light runs cleanly." },
  { number: "04", kicker: "The reveal", title: "LOOKS FAST.\nSTANDING STILL.", detail: "FINAL INSPECTION", copy: "A restored 488, signed off beneath the light wall." },
] as const;

function drawCover(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, scale = 1, xShift = 0) {
  const ratio = Math.max(width / image.naturalWidth, height / image.naturalHeight) * scale;
  const drawWidth = image.naturalWidth * ratio;
  const drawHeight = image.naturalHeight * ratio;
  context.drawImage(image, (width - drawWidth) / 2 + xShift * width, (height - drawHeight) / 2, drawWidth, drawHeight);
}

export function V2Experience() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const progress = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const paint = (value: number) => {
    const target = canvas.current;
    if (!target || images.current.length !== frameSources.length) return;
    const context = target.getContext("2d");
    if (!context) return;
    const width = target.clientWidth;
    const height = target.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (target.width !== Math.round(width * dpr) || target.height !== Math.round(height * dpr)) {
      target.width = Math.round(width * dpr);
      target.height = Math.round(height * dpr);
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const position = Math.min(frameSources.length - 1, Math.max(0, value * (frameSources.length - 1)));
    const first = Math.floor(position);
    const second = Math.min(frameSources.length - 1, first + 1);
    const blend = position - first;
    const scale = 1.025 + Math.sin(value * Math.PI * 2) * 0.012;
    const drift = Math.sin(value * Math.PI * 3) * 0.008;
    context.globalAlpha = 1;
    drawCover(context, images.current[first], width, height, scale, drift);
    if (second !== first) {
      context.globalAlpha = blend;
      drawCover(context, images.current[second], width, height, scale, drift);
    }
    context.globalAlpha = 1;
  };

  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const loadedImages = frameSources.map((source) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        count += 1;
        if (!cancelled) setLoadProgress(Math.round((count / frameSources.length) * 100));
        if (count === frameSources.length && !cancelled) {
          images.current = loadedImages;
          setLoaded(true);
          requestAnimationFrame(() => paint(progress.current));
        }
      };
      image.src = source;
      return image;
    });
    const resize = () => paint(progress.current);
    window.addEventListener("resize", resize);
    return () => { cancelled = true; window.removeEventListener("resize", resize); };
  }, []);

  useGSAP(() => {
    if (!loaded) return;
    gsap.set("[data-scene]", { autoAlpha: 0 });
    gsap.set("[data-scene='0']", { autoAlpha: 1 });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: ({ progress: next }) => { progress.current = next; paint(next); },
      },
    });
    chapters.forEach((_, index) => {
      const start = index * 0.24;
      if (index > 0) timeline.to(`[data-scene='${index - 1}']`, { autoAlpha: 0, duration: 0.035 }, start);
      if (index > 0) timeline.fromTo(`[data-scene='${index}']`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, start + 0.025);
      if (index < chapters.length - 1) timeline.to(`[data-scene='${index}']`, { autoAlpha: 0, duration: 0.04 }, start + 0.19);
    });
    timeline.to("[data-rail-fill]", { scaleX: 1, ease: "none", duration: 1 }, 0);
  }, { scope: root, dependencies: [loaded] });

  return (
    <main className={`v2-shell ${styles.experience}`}>
      {!loaded && <div className={styles.loader}><div className={styles.loaderMark}>T</div><p>Preparing the reveal</p><div className={styles.loaderLine}><span style={{ width: `${loadProgress}%` }} /></div><b>{String(loadProgress).padStart(3, "0")}</b></div>}
      <section ref={root} className={styles.scrollStage} aria-label="Titan 488 restoration reveal">
        <div className={styles.sticky}>
          <canvas ref={canvas} className={styles.canvas} aria-label="A red Ferrari progressing through a complete restoration" />
          <div className={styles.grade} /><div className={styles.grain} />
          <header className={styles.header}><Link href="/v2" className={styles.brand}>TITAN <span>COACHWORKS</span></Link><div className={styles.headerCenter}>TYPE 488 · SERIES 01</div><Link href="/contact" className={styles.enquire}>ENQUIRE <ArrowUpRight /></Link></header>
          <div className={styles.coordinates}><span>35.9375° N</span><span>14.3754° E</span></div><div className={styles.verticalLabel}>HAND FINISHED IN MALTA · MMXXVI</div>
          {chapters.map((chapter, index) => <article key={chapter.number} data-scene={index} className={`${styles.scene} ${[styles.scene1, styles.scene2, styles.scene3, styles.scene4][index]}`}><div className={styles.year}>{index === 0 ? "2026" : chapter.number}</div><div className={styles.copyBlock}><p className={styles.kicker}>{chapter.kicker}</p><h1>{chapter.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1></div><div className={styles.annotation}><div className={styles.target}><i /></div><div className={styles.rule} /><p><b>{chapter.detail}</b><span>{chapter.copy}</span></p></div><div className={styles.counter}>{chapter.number}<small>/ 04</small></div></article>)}
          <footer className={styles.rail}><span className={styles.railFill} data-rail-fill /><div className={styles.railIntro}>VALMORA STUDY / TITAN 488</div><div className={styles.steps}>{chapters.map((chapter) => <span key={chapter.number}>{chapter.number}</span>)}</div><div className={styles.scrollCue}><ArrowDown /> SCROLL TO REVEAL</div></footer>
        </div>
      </section>
      <section className={styles.outro}><p>Built once. Remembered forever.</p><h2>YOUR CAR.<br /><span>OUR SIGNATURE.</span></h2><Link href="/contact">Begin a commission <ArrowUpRight /></Link></section>
    </main>
  );
}
