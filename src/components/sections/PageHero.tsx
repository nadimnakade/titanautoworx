import type { ReactNode } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";

/** Inner-page header band: title, intro, optional photo + extra content. */
export function PageHero({ eyebrow, title, intro, image, children }: { eyebrow: string; title: string; intro: string; image?: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border pb-14 pt-36 md:pb-20 md:pt-44">
      {image && <ImageSlot src={image} alt="" className="absolute inset-0 -z-20 opacity-60" priority />}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/90 to-bg/40" />
      <div aria-hidden="true" className="absolute -right-32 top-10 -z-10 size-[480px] rounded-full bg-accent/15 blur-[120px]" />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10 opacity-50" />
      <div className="container-x">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-10 bg-accent" />
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-heading text-[clamp(2.8rem,7vw,6rem)] [animation:rise_.9s_cubic-bezier(.16,1,.3,1)_both]">{title}</h1>
        <p className="mt-5 max-w-2xl text-base text-text/80 md:text-lg [animation:rise_.9s_.12s_cubic-bezier(.16,1,.3,1)_both]">{intro}</p>
        {children}
      </div>
    </section>
  );
}
