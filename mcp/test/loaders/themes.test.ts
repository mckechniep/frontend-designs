import { describe, it, expect } from "vitest";
import { loadThemes, type Theme } from "../../src/loaders/themes.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../../");

describe("loadThemes", () => {
  it("returns all 8 themes", () => {
    const themes = loadThemes(REPO_ROOT);
    expect(themes).toHaveLength(8);
  });

  it("each theme has required fields", () => {
    const themes = loadThemes(REPO_ROOT);
    for (const theme of themes) {
      expect(theme.id).toBeTruthy();
      expect(theme.name).toBeTruthy();
      expect(theme.description).toBeTruthy();
      expect(theme.defaultTheme).toMatch(/^(dark|light)$/);
      expect(theme.surfaces).toBeDefined();
      expect(Object.keys(theme.surfaces)).toEqual(
        expect.arrayContaining(["landing", "dashboard", "app-screen"])
      );
      expect(theme.tokens).toBeDefined();
      expect(theme.tokens["--bg"]).toBeTruthy();
      expect(theme.tokens["--accent"]).toBeTruthy();
      expect(theme.tokens["--font"]).toBeTruthy();
    }
  });

  it("can look up a specific theme by id", () => {
    const themes = loadThemes(REPO_ROOT);
    const arctic = themes.find((t) => t.id === "arctic-mono");
    expect(arctic).toBeDefined();
    expect(arctic!.name).toBe("Arctic Mono");
  });
});
