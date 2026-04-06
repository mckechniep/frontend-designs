import { describe, it, expect } from "vitest";
import { handleGetTheme } from "../../src/tools/get-theme.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../../");

describe("handleGetTheme", () => {
  it("returns full theme data for a valid id", () => {
    const result = handleGetTheme(REPO_ROOT, "arctic-mono");
    expect(result.content).toHaveLength(1);
    const data = JSON.parse(result.content[0].text);
    expect(data.id).toBe("arctic-mono");
    expect(data.tokens).toBeDefined();
    expect(data.surfaces).toBeDefined();
    expect(data.personality).toBeDefined();
  });

  it("returns error for invalid theme id", () => {
    const result = handleGetTheme(REPO_ROOT, "nonexistent");
    expect(result.isError).toBe(true);
  });
});
