import {
  BadgeCheck, Car, CarFront, Clock, Cpu, HardHat, MapPin, Settings, ShieldCheck, SprayCan, Star, Truck, Users, Wrench,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/site";

const map = {
  wrench: Wrench,
  "car-front": CarFront,
  "spray-can": SprayCan,
  car: Car,
  settings: Settings,
  truck: Truck,
  cpu: Cpu,
  "shield-check": ShieldCheck,
  "badge-check": BadgeCheck,
  star: Star,
  users: Users,
  "map-pin": MapPin,
  clock: Clock,
  "hard-hat": HardHat,
} satisfies Record<IconName, unknown>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden="true" strokeWidth={1.6} {...props} />;
}
