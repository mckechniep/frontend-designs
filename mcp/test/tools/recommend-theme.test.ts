import { describe, it, expect } from "vitest";
import { handleRecommendTheme } from "../../src/tools/recommend-theme.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../../");

describe("handleRecommendTheme", () => {
  it("returns ranked recommendations", () => {
    const result = handleRecommendTheme(REPO_ROOT, "luxury real estate firm");
    const data = JSON.parse(result.content[0].text);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("themeId");
    expect(data[0]).toHaveProperty("score");
    expect(data[0]).toHaveProperty("reasoning");
  });

  it("ranks dark technical themes higher for hacker description", () => {
    const result = handleRecommendTheme(REPO_ROOT, "hacker security tool");
    const data = JSON.parse(result.content[0].text);
    const topTheme = data[0].themeId;
    expect(["cyberpunk-neon", "retro-terminal"]).toContain(topTheme);
  });
});
