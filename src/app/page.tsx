import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { BeforeAfterCarousel } from "@/components/sections/BeforeAfterCarousel";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TowingBand } from "@/components/sections/TowingBand";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesGrid />
      <BeforeAfterCarousel />
      <FeaturedProjects />
      <TowingBand />
      <CtaBand />
    </>
  );
}
