import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Tag className="font-heading text-[clamp(2.1rem,5vw,3.6rem)]">{title}</Tag>
        {subtitle && <p className="mt-3 max-w-xl text-muted md:text-lg">{subtitle}</p>}
      </div>
      {action && (
        <Button href={action.href} variant="outline" size="sm" icon={<ArrowRight className="size-4" />} className="self-start md:self-auto">
          {action.label}
        </Button>
      )}
    </Reveal>
  );
}
