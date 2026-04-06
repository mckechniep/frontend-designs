import { loadLayoutPatterns } from "../loaders/layouts.js";

export function getLayoutsResource(surface?: string): string {
  const patterns = loadLayoutPatterns(surface);
  return JSON.stringify(patterns, null, 2);
}
