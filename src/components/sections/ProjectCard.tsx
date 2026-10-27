import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function ProjectCard({ p, testId = "project-card", href = "/projects" }: { p: Project; testId?: string; href?: string }) {
  return (
    <Link href={href} data-testid={testId} className="group block overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/60">
      <div className="relative overflow-hidden">
        <ImageSlot src={p.image} alt={p.title} label={p.title} className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
        <span className="absolute right-3 top-3 grid size-9 translate-y-2 place-items-center rounded-full bg-accent text-bg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
        <span className="absolute left-3 top-3 rounded bg-bg/75 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted backdrop-blur">{p.category}</span>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg not-italic tracking-wide">{p.title}</h3>
        <p className="mt-0.5 text-sm text-accent">{p.subtitle}</p>
      </div>
    </Link>
  );
}
