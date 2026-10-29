import type { Metadata } from "next";
import { V2Experience } from "./V2Experience";

export const metadata: Metadata = {
  title: "Titan V2 — The Art of Restoration",
  description: "A cinematic, scroll-driven Titan Autoworx concept experience.",
};

export default function V2Page() {
  return <V2Experience />;
}
