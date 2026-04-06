import { describe, it, expect } from "vitest";
import { loadComponents, type Component } from "../../src/loaders/components.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../../");

describe("loadComponents", () => {
  it("returns universal and exclusive components", () => {
    const components = loadComponents(REPO_ROOT);
    const universal = components.filter((c) => c.type === "universal");
    const exclusive = components.filter((c) => c.type === "exclusive");
    expect(universal.length).toBeGreaterThan(0);
    expect(exclusive.length).toBeGreaterThan(0);
  });

  it("each component has required fields", () => {
    const components = loadComponents(REPO_ROOT);
    for (const comp of components) {
      expect(comp.id).toBeTruthy();
      expect(comp.name).toBeTruthy();
      expect(comp.type).toMatch(/^(universal|exclusive)$/);
      expect(comp.demoPath).toBeTruthy();
    }
  });

  it("exclusive components have a themeId", () => {
    const components = loadComponents(REPO_ROOT);
    const exclusive = components.filter((c) => c.type === "exclusive");
    for (const comp of exclusive) {
      expect(comp.themeId).toBeTruthy();
    }
  });
});
