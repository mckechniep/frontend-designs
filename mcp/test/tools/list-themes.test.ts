import { describe, it, expect } from "vitest";
import { handleListThemes } from "../../src/tools/list-themes.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../../");

describe("handleListThemes", () => {
  it("returns a content array with theme summaries", () => {
    const result = handleListThemes(REPO_ROOT);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
    const data = JSON.parse(result.content[0].text);
    expect(data).toHaveLength(8);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("name");
    expect(data[0]).toHaveProperty("moodTags");
    expect(data[0]).toHaveProperty("palette");
    expect(data[0]).not.toHaveProperty("tokens");
  });
});
