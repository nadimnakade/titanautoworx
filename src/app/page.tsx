import { PrecisionShowcase } from "@/components/sections/PrecisionShowcase";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { BeforeAfterCarousel } from "@/components/sections/BeforeAfterCarousel";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TowingBand } from "@/components/sections/TowingBand";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <PrecisionShowcase />
      <ServicesGrid />
      <BeforeAfterCarousel />
      <FeaturedProjects />
      <TowingBand />
      <CtaBand />
    </>
  );
}
