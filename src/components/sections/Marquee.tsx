const words = ["Mechanical", "Bodywork", "Spray Painting", "Classic Restorations", "Performance Builds", "Camper Conversions", "Off-Road", "24/7 Recovery", "Genuine Parts"];

export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
      {words.map((w) => (
        <span key={w} className="flex items-center gap-10 font-heading text-3xl text-text/90 md:text-5xl">
          {w}
          <span className="size-2.5 rotate-45 bg-accent" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative flex overflow-hidden border-y border-border bg-bg py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <p className="sr-only">{words.join(", ")}</p>
      <div className="flex animate-[marquee_38s_linear_infinite] motion-reduce:animate-none">
        {row}
        {row}
      </div>
    </div>
  );
}
