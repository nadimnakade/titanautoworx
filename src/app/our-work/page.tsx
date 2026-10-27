import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Before and after: accident repairs, bodywork, paint and restorations by Titan Autoworx.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero eyebrow="Before & after" title="Our Work" intro="Real cars. Real results. From accident repairs to full restorations, explore some of our latest transformations." />
      <section className="container-x py-14 md:py-20">
        <WorkGrid />
      </section>
      <CtaBand title="Your car could be next." />
    </>
  );
}
