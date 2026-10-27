// All site copy lives here. Edit text, add projects, change contact details.
// Images: drop files into /public/images using the paths below (see README).

export type IconName =
  | "wrench"
  | "car-front"
  | "spray-can"
  | "car"
  | "settings"
  | "truck"
  | "cpu"
  | "shield-check"
  | "badge-check"
  | "star"
  | "users"
  | "map-pin"
  | "clock"
  | "hard-hat";

export type Service = {
  slug: string;
  title: string;
  short: string;
  body: string;
  points: string[];
  icon: IconName;
  image: string;
};

export type WorkItem = {
  title: string;
  subtitle: string;
  category: string;
  before: string;
  after: string;
};

export type Project = {
  title: string;
  subtitle: string;
  category: string;
  image: string;
};

const services: Service[] = [
  {
    slug: "mechanical",
    title: "Mechanical Repairs & Servicing",
    short: "Diagnostics, servicing and repairs for every make.",
    body: "From routine servicing to engine and gearbox work, our technicians diagnose properly and fix it right the first time.",
    points: ["Full & interim servicing", "Computer diagnostics", "Engine, clutch & gearbox", "Brakes & suspension"],
    icon: "wrench",
    image: "/images/services/mechanical.jpg",
  },
  {
    slug: "bodywork",
    title: "Bodywork & Accident Repairs",
    short: "Dents, panels and full accident repair.",
    body: "Insurance and private accident repairs, panel replacement and straightening, returned to factory standard.",
    points: ["Insurance repairs", "Panel beating & replacement", "Chassis alignment", "Dent removal"],
    icon: "car-front",
    image: "/images/services/bodywork.jpg",
  },
  {
    slug: "paint",
    title: "Spray Painting & Refinishing",
    short: "Colour-matched paint in a controlled booth.",
    body: "Spot repairs to full resprays, with precise colour matching, clear coat and machine polish.",
    points: ["Full & partial resprays", "Computer colour matching", "Paint correction", "Ceramic protection"],
    icon: "spray-can",
    image: "/images/services/paint.jpg",
  },
  {
    slug: "classic",
    title: "Classic Car Restorations",
    short: "Sympathetic, nut-and-bolt restorations.",
    body: "We bring classics back to life with care for originality, from rust repair to concours-level finish.",
    points: ["Rust & metal fabrication", "Bare-metal respray", "Mechanical rebuilds", "Interior refresh"],
    icon: "car",
    image: "/images/services/classic.jpg",
  },
  {
    slug: "projects",
    title: "Automotive Projects & Modifications",
    short: "Performance builds, campers and off-road.",
    body: "Performance upgrades, camper conversions and expedition builds, planned and built in-house.",
    points: ["Performance upgrades", "Camper conversions", "Off-road & overland builds", "Custom fabrication"],
    icon: "settings",
    image: "/images/services/projects.jpg",
  },
  {
    slug: "towing",
    title: "Towing Services & Vehicle Recovery",
    short: "24/7 recovery across Malta.",
    body: "Fast, safe and reliable transport for cars, classics, 4x4s and project vehicles, day or night.",
    points: ["24/7 response", "Cars, vans & 4x4s", "Local & island coverage", "Professional & insured"],
    icon: "truck",
    image: "/images/services/towing.jpg",
  },
  {
    slug: "parts",
    title: "Automotive Parts & Components",
    short: "Genuine and performance parts sourced fast.",
    body: "OEM, quality aftermarket and performance parts, sourced and fitted by people who know them.",
    points: ["Genuine OEM parts", "Performance components", "Hard-to-find classic parts", "Supply & fit"],
    icon: "cpu",
    image: "/images/services/parts.jpg",
  },
];

const work: WorkItem[] = [
  { title: "Porsche 911", subtitle: "Bodywork & Paint", category: "Accident Repairs", before: "/images/work/porsche-911-before.jpg", after: "/images/work/porsche-911-after.jpg" },
  { title: "Ford Mustang", subtitle: "Full Restoration", category: "Restorations", before: "/images/work/mustang-before.jpg", after: "/images/work/mustang-after.jpg" },
  { title: "BMW 3 Series", subtitle: "Accident Repair & Respray", category: "Accident Repairs", before: "/images/work/bmw-3-before.jpg", after: "/images/work/bmw-3-after.jpg" },
  { title: "Audi RS3", subtitle: "Bodywork & Paint", category: "Paint", before: "/images/work/audi-rs3-before.jpg", after: "/images/work/audi-rs3-after.jpg" },
  { title: "Mercedes C63", subtitle: "Panel Repair & Respray", category: "Bodywork", before: "/images/work/c63-before.jpg", after: "/images/work/c63-after.jpg" },
  { title: "Range Rover", subtitle: "Bodywork & Paint", category: "Bodywork", before: "/images/work/range-rover-before.jpg", after: "/images/work/range-rover-after.jpg" },
];

const projects: Project[] = [
  { title: "VW T6 Camper Conversion", subtitle: "Adventure Ready", category: "Camper Conversions", image: "/images/projects/vw-t6.jpg" },
  { title: "Land Rover Defender 110", subtitle: "Off-Road Build", category: "Off-Road Builds", image: "/images/projects/defender-110.jpg" },
  { title: "Porsche 911 GT3", subtitle: "Performance Build", category: "Performance Builds", image: "/images/projects/911-gt3.jpg" },
  { title: "Classic Mini Cooper", subtitle: "Full Restoration", category: "Classic Restorations", image: "/images/projects/mini-cooper.jpg" },
  { title: "BMW M3", subtitle: "Track Focused Build", category: "Performance Builds", image: "/images/projects/bmw-m3.jpg" },
  { title: "Toyota Land Cruiser", subtitle: "Expedition Build", category: "Off-Road Builds", image: "/images/projects/land-cruiser.jpg" },
];

export const site = {
  name: "Titan Autoworx",
  // VERIFY: final domain
  url: "https://titanautoworx.mt",
  tagline: "Built on passion. Driven by precision.",
  // VERIFY: contact details copied from mockup.
  phone: "+356 7774 2828",
  phone2: "+356 7772 3331",
  whatsapp: "+356 7774 2828",
  email: "info@titanautoworx.mt",
  address: "Triq Ambrozio, Malta",
  hours: [
    { days: "Mon – Fri", time: "08:00 – 17:30" },
    { days: "Saturday", time: "08:00 – 12:30" },
    { days: "Towing", time: "24/7" },
  ],
  // VERIFY: add real profile URLs — empty ones are hidden.
  socials: [
    { label: "Facebook", href: "" },
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/our-work" },
    { label: "Projects", href: "/projects" },
    { label: "Parts", href: "/parts" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  hero: {
    eyebrow: "Specialists in automotive care",
    line1: "Expert automotive",
    line2: "care for every road.",
    body: "From everyday repairs to full restorations and performance builds. Quality workmanship, genuine parts and a passion for all things automotive.",
    image: "/images/hero.jpg",
  },
  trust: [
    { icon: "hard-hat", label: "Expert Technicians" },
    { icon: "shield-check", label: "Quality Workmanship" },
    { icon: "wrench", label: "Genuine Parts" },
    { icon: "star", label: "Cars of All Makes" },
    { icon: "users", label: "Passion Driven" },
    { icon: "map-pin", label: "Local Business in Malta" },
  ] as { icon: IconName; label: string }[],
  services,
  work,
  workCategories: ["All", "Bodywork", "Accident Repairs", "Paint", "Restorations"],
  projects,
  projectCategories: ["All", "Performance Builds", "Classic Restorations", "Camper Conversions", "Off-Road Builds"],
  towing: {
    title: "Vehicle Recovery & Towing Services",
    body: "24/7 recovery across Malta. Fast, safe and reliable transport for cars, classics, 4x4s and project vehicles.",
    features: [
      { icon: "clock", label: "24/7 Response" },
      { icon: "car", label: "Cars, Vans & 4x4s" },
      { icon: "map-pin", label: "Local & Island Coverage" },
      { icon: "shield-check", label: "Professional & Insured" },
    ] as { icon: IconName; label: string }[],
    image: "/images/towing.jpg",
  },
  about: {
    title: "Built on passion. Driven by precision.",
    body: [
      "Titan Autoworx is a Malta-based workshop run by people who love cars. We started with a simple idea: do the job properly, explain it honestly and treat every vehicle like our own.",
      "Today we look after daily drivers, weekend toys, classics and full custom builds under one roof — mechanical, bodywork, paint, restoration, recovery and parts.",
    ],
    // VERIFY: placeholder stats, update with real numbers.
    stats: [
      { value: 15, suffix: "+", label: "Years experience" },
      { value: 2500, suffix: "+", label: "Vehicles serviced" },
      { value: 120, suffix: "+", label: "Restorations & builds" },
      { value: 24, suffix: "/7", label: "Recovery service" },
    ],
    values: [
      { title: "Honest advice", body: "Clear quotes, no surprises, and we only fix what needs fixing." },
      { title: "Craftsmanship", body: "Factory-standard repairs and finishes we are proud to sign off." },
      { title: "Every make", body: "From city cars to classics, 4x4s and performance builds." },
    ],
    image: "/images/about.jpg",
  },
  parts: {
    body: "Genuine OEM, quality aftermarket and performance parts — sourced quickly and fitted by our team, or supplied for your own project.",
    categories: [
      { title: "Service Parts", body: "Filters, fluids, brakes, belts and plugs for every make." },
      { title: "Body & Panels", body: "Panels, lights, bumpers and trim, new or used." },
      { title: "Performance", body: "Intakes, exhausts, suspension and brake upgrades." },
      { title: "Classic Parts", body: "Hard-to-find parts tracked down for restorations." },
      { title: "Off-Road & Overland", body: "Lift kits, protection, recovery gear and lighting." },
      { title: "Electrical", body: "Batteries, sensors, ECUs and lighting components." },
    ],
    image: "/images/parts.jpg",
  },
};

export type Site = typeof site;
