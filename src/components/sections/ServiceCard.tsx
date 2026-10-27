import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Service } from "@/content/site";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Icon } from "@/components/ui/Icon";

export function ServiceCard({ s, className = "" }: { s: Service; className?: string }) {
  return (
    <Link
      href={`/services#${s.slug}`}
      data-testid="service-card"
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_20px_60px_-25px_rgb(255_90_31/0.55)] ${className}`}
    >
      <div className="relative overflow-hidden">
        <ImageSlot src={s.image} alt={s.title} label={s.title} className="aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 items-center gap-3 p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
          <Icon name={s.icon} className="size-5" />
        </span>
        <span className="flex-1 font-heading text-[1.05rem] not-italic leading-tight tracking-wide">{s.title}</span>
        <ChevronRight className="size-5 text-accent transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

/** Compact row used on mobile (matches phone mockup). */
export function ServiceRow({ s }: { s: Service }) {
  return (
    <Link
      href={`/services#${s.slug}`}
      data-testid="service-row"
      className="group flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3.5 transition-colors hover:border-accent/60"
    >
      <Icon name={s.icon} className="size-6 text-text" />
      <span className="flex-1 font-heading text-base not-italic tracking-wide">{s.title}</span>
      <ChevronRight className="size-5 text-accent" />
    </Link>
  );
}
