"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { hasImage } from "@/lib/images";
import { canUseWebGL, prefersReducedMotion } from "@/lib/webgl";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/ui/Icon";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Deterministic pseudo-random so server and client markup match. */
const rnd = (i: number, s: number) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function Fallback() {
  return (
    <div data-testid="hero-fallback" aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 70% 62%, rgb(255 90 31 / 0.22), transparent 70%), radial-gradient(40% 30% at 70% 95%, rgb(255 90 31 / 0.35), transparent 70%), linear-gradient(180deg, #0a0a0b 0%, #111113 55%, #0a0a0b 100%)",
        }}
      />
      {/* perspective floor lines */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 90 31 / 0.25) 1px, transparent 1px), linear-gradient(90deg, rgb(255 90 31 / 0.18) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(62deg)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: `${(rnd(i, 1) * 100).toFixed(2)}%`,
              "--dur": `${(5 + rnd(i, 2) * 6).toFixed(2)}s`,
              "--delay": `${(-rnd(i, 3) * 8).toFixed(2)}s`,
              "--dx": `${((rnd(i, 4) - 0.5) * 120).toFixed(0)}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`block ${className ?? ""}`}>
      {text.split(" ").map((w, i, all) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] pr-[0.04em] align-bottom">
            <span data-word className="inline-block will-change-transform">
              {w}
            </span>
          </span>
          {i < all.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"fallback" | "3d">("fallback");
  const photo = hasImage(site.hero.image);

  useEffect(() => {
    if (!prefersReducedMotion() && canUseWebGL()) setMode("3d");
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-eyebrow]", { y: 20, opacity: 0, duration: 0.8 }, 0.15)
        .from("[data-word]", { yPercent: 115, rotate: 5, duration: 1.1, stagger: 0.06 }, 0.2)
        .from("[data-hero-body]", { y: 24, opacity: 0, duration: 0.9 }, 0.7)
        .from("[data-hero-cta] > *", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.85)
        .from("[data-testid=trust-item]", { y: 24, opacity: 0, duration: 0.7, stagger: 0.07 }, 1.0)
        .from("[data-hero-sweep]", { xPercent: -120, duration: 1.8, ease: "power2.inOut" }, 0.3);

      gsap.to("[data-hero-sweep]", {
        keyframes: [{ xPercent: -120, duration: 0 }, { xPercent: 260, duration: 2.2, ease: "power2.inOut" }],
        repeat: -1,
        repeatDelay: 6,
        delay: 2.4,
      });

      gsap.to("[data-hero-content]", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-bg]", {
        scale: 1.08,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-testid="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-bg"
    >
      {/* Background layers */}
      <div data-hero-bg className="absolute inset-0 -z-10 origin-center">
        {photo && (
          <Image src={site.hero.image} alt="" fill priority sizes="100vw" className="object-cover object-[70%_center] opacity-90" />
        )}
        {mode === "3d" ? <HeroScene overlay={photo} /> : <Fallback />}
        {/* Readability gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/75 to-transparent md:via-bg/45" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/80 to-transparent" />
      </div>

      {/* Light sweep */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
        <div
          data-hero-sweep
          className="absolute -inset-y-20 left-0 w-[45%] -skew-x-12 mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, transparent, rgb(255 140 80 / 0.10) 40%, rgb(255 200 160 / 0.16) 50%, rgb(255 140 80 / 0.10) 60%, transparent)",
            transform: "translateX(-120%)",
          }}
        />
      </div>

      <div data-hero-content className="container-x relative flex flex-1 flex-col justify-center pb-10 pt-32 md:pt-36">
        <p data-hero-eyebrow className="eyebrow mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-10 bg-accent" />
          {site.hero.eyebrow}
        </p>
        <h1 id="hero-title" className="font-heading text-[clamp(2.9rem,6.6vw,6.4rem)] leading-[0.9]">
          <SplitWords text={site.hero.line1} />
          <SplitWords text={site.hero.line2} className="text-accent [filter:drop-shadow(0_0_28px_rgb(255_90_31/0.35))]" />
        </h1>
        <p data-hero-body className="mt-6 max-w-xl text-base leading-relaxed text-text/80 md:text-lg">
          {site.hero.body}
        </p>
        <div data-hero-cta className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Magnetic>
            <Button href="/contact" size="lg" icon={<ArrowRight className="size-5" />} className="w-full sm:w-auto">
              Request a Quote
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              href={whatsappUrl(site.whatsapp, "Hi Titan Autoworx, I have a question about my car.")}
              variant="outline"
              size="lg"
              iconLeft={<MessageCircle className="size-5" />}
              className="w-full bg-bg/40 backdrop-blur sm:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </Magnetic>
        </div>
      </div>

      {/* Trust row */}
      <div data-hero-content className="relative border-t border-border/60 bg-bg/50 backdrop-blur-md">
        <ul className="container-x grid grid-cols-3 gap-y-5 py-6 md:grid-cols-6 md:py-7">
          {site.trust.map((t, i) => (
            <li
              key={t.label}
              data-testid="trust-item"
              className={`flex flex-col items-center gap-2 px-2 text-center ${i % 6 !== 0 ? "md:border-l md:border-border/60" : ""}`}
            >
              <Icon name={t.icon} className="size-6 text-text" />
              <span className="font-heading text-[0.78rem] not-italic tracking-[0.08em] text-muted">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-32 right-6 hidden size-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent lg:grid"
      >
        <ChevronDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
