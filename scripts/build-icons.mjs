import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import icons from "./icons.config.mjs";

const ICONS_DIR = resolve("node_modules/@tabler/icons/icons/outline");
const OUT_PATH = resolve("assets/icons/tabler.svg");

const symbols = [];
const missing = [];

for (const [partial, name] of Object.entries(icons)) {
  const file = resolve(ICONS_DIR, `${name}.svg`);
  if (!existsSync(file)) {
    missing.push(name);
    continue;
  }
  const svg = readFileSync(file, "utf8");
  const inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
  symbols.push(
    `<symbol id="tabler-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`,
  );
}

if (missing.length) {
  throw new Error(`Missing icon file: ${missing.join(", ")}`);
}

const out = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none;">${symbols.join("")}</svg>`;
mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, out);
console.log(`OK: ${symbols.length} icons → ${OUT_PATH}`);
