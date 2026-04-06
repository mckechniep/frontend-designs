import { describe, it, expect } from "vitest";
import { handleListComponents } from "../../src/tools/list-components.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../../");

describe("handleListComponents", () => {
  it("returns all components when no filter", () => {
    const result = handleListComponents(REPO_ROOT);
    const data = JSON.parse(result.content[0].text);
    expect(data.length).toBeGreaterThan(10);
  });

  it("filters by theme_id", () => {
    const result = handleListComponents(REPO_ROOT, "cyberpunk-neon");
    const data = JSON.parse(result.content[0].text);
    const exclusive = data.filter((c: any) => c.type === "exclusive");
    for (const comp of exclusive) {
      expect(comp.themeId).toBe("cyberpunk-neon");
    }
  });
});
