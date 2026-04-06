import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface DesignRule {
  id: string;
  category: string;
  principle: string;
  rationale: string;
  example: string;
}

let cached: DesignRule[] | null = null;

function loadAll(): DesignRule[] {
  if (cached) return cached;
  const raw = readFileSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/design-rules.json"),
    "utf-8"
  );
  cached = JSON.parse(raw) as DesignRule[];
  return cached;
}

export function loadDesignRules(category?: string): DesignRule[] {
  const all = loadAll();
  if (!category) return all;
  return all.filter((r) => r.category === category);
}
