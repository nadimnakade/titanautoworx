// Lists files in public/images so components know which photos exist.
import { readdirSync, mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = "public/images";
const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp|avif)$/i.test(name)) files.push("/" + relative("public", p).replaceAll("\\", "/"));
  }
}
if (existsSync(root)) walk(root);
mkdirSync("src/generated", { recursive: true });
writeFileSync("src/generated/images.json", JSON.stringify(files.sort(), null, 2) + "\n");
console.log(`image manifest: ${files.length} file(s)`);
