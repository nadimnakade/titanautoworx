import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { TowingBand } from "@/components/sections/TowingBand";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Projects",
  description: "Custom builds, performance upgrades, camper conversions and off-road adventures from Titan Autoworx.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Builds & restorations" title="Our Projects" intro="Custom builds, performance upgrades, camper conversions and off-road adventures. Bringing unique visions to life." />
      <section className="container-x py-14 md:py-20">
        <ProjectGrid />
      </section>
      <TowingBand compact />
      <CtaBand title="Got a build in mind?" body="Tell us what you’re dreaming of — we’ll help plan it, price it and build it." />
    </>
  );
}
