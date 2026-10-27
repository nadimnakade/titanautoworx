import manifest from "@/generated/images.json";

const available = new Set<string>(manifest as string[]);

export function hasImage(path: string): boolean {
  return available.has(path);
}
