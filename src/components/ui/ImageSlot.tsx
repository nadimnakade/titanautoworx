import Image from "next/image";
import { Camera } from "lucide-react";
import { hasImage } from "@/lib/images";

/**
 * Shows the photo if it exists in /public, otherwise a branded placeholder,
 * so a missing file never renders a broken image.
 */
export function ImageSlot({
  src,
  alt,
  label,
  className = "",
  priority,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  tone = "default",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "default" | "before" | "after";
}) {
  if (hasImage(src)) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const glow =
    tone === "before"
      ? "radial-gradient(120% 90% at 30% 20%, rgb(168 162 158 / 0.30), transparent 65%)"
      : "radial-gradient(120% 90% at 70% 15%, rgb(255 90 31 / 0.28), transparent 60%)";
  return (
    <div
      role="img"
      aria-label={alt}
      data-placeholder={src}
      className={`relative overflow-hidden bg-surface-2 ${className}`}
      style={{ backgroundImage: `${glow}, linear-gradient(160deg, #1f1f23 0%, #0e0e10 100%)` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted/85">
        <Camera className="size-6" strokeWidth={1.4} />
        {label && <span className="px-4 text-center font-heading text-sm tracking-wider">{label}</span>}
      </div>
    </div>
  );
}
