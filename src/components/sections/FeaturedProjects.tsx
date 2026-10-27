import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const featured = [0, 1, 2, 3].map((i) => site.projects[i]);
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Builds & restorations"
          title="Featured projects"
          subtitle="Custom builds, restorations and unique vehicles from our workshop."
          action={{ label: "View All Projects", href: "/projects" }}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <ProjectCard p={p} testId="featured-project" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
