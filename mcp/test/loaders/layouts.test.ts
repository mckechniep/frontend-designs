import { describe, it, expect } from "vitest";
import { loadLayoutPatterns, type LayoutPattern } from "../../src/loaders/layouts.js";

describe("loadLayoutPatterns", () => {
  it("returns patterns for all three surface types", () => {
    const patterns = loadLayoutPatterns();
    const surfaces = [...new Set(patterns.map((p) => p.surface))];
    expect(surfaces).toEqual(
      expect.arrayContaining(["landing", "dashboard", "app-screen"])
    );
  });

  it("each pattern has required fields", () => {
    const patterns = loadLayoutPatterns();
    expect(patterns.length).toBeGreaterThanOrEqual(6);
    for (const pattern of patterns) {
      expect(pattern.id).toBeTruthy();
      expect(pattern.name).toBeTruthy();
      expect(pattern.surface).toBeTruthy();
      expect(pattern.sections).toBeDefined();
      expect(pattern.sections.length).toBeGreaterThan(0);
      expect(pattern.responsive).toBeDefined();
    }
  });

  it("can filter by surface", () => {
    const patterns = loadLayoutPatterns("landing");
    expect(patterns.length).toBeGreaterThan(0);
    for (const p of patterns) {
      expect(p.surface).toBe("landing");
    }
  });
});
