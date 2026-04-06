import { describe, it, expect } from "vitest";
import { loadDesignRules, type DesignRule } from "../../src/loaders/rules.js";

describe("loadDesignRules", () => {
  it("returns rules across all categories", () => {
    const rules = loadDesignRules();
    const categories = [...new Set(rules.map((r) => r.category))];
    expect(categories).toEqual(
      expect.arrayContaining([
        "typography",
        "spacing",
        "color",
        "layout",
        "motion",
        "accessibility",
      ])
    );
  });

  it("each rule has required fields", () => {
    const rules = loadDesignRules();
    expect(rules.length).toBeGreaterThanOrEqual(20);
    for (const rule of rules) {
      expect(rule.id).toBeTruthy();
      expect(rule.principle).toBeTruthy();
      expect(rule.rationale).toBeTruthy();
      expect(rule.example).toBeTruthy();
      expect(rule.category).toBeTruthy();
    }
  });

  it("can filter by category", () => {
    const rules = loadDesignRules("typography");
    expect(rules.length).toBeGreaterThan(0);
    for (const rule of rules) {
      expect(rule.category).toBe("typography");
    }
  });
});
