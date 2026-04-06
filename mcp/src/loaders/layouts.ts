import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface LayoutPattern {
  id: string;
  name: string;
  surface: string;
  description: string;
  sections: string[];
  responsive: Record<string, string>;
}

let cached: LayoutPattern[] | null = null;

function loadAll(): LayoutPattern[] {
  if (cached) return cached;
  const raw = readFileSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/layout-patterns.json"),
    "utf-8"
  );
  cached = JSON.parse(raw) as LayoutPattern[];
  return cached;
}

export function loadLayoutPatterns(surface?: string): LayoutPattern[] {
  const all = loadAll();
  if (!surface) return all;
  return all.filter((p) => p.surface === surface);
}
