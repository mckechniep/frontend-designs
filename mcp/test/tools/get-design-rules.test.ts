import { describe, it, expect } from "vitest";
import { handleGetDesignRules } from "../../src/tools/get-design-rules.js";

describe("handleGetDesignRules", () => {
  it("returns all rules when no category", () => {
    const result = handleGetDesignRules();
    const data = JSON.parse(result.content[0].text);
    expect(data.length).toBeGreaterThanOrEqual(20);
  });

  it("filters by category", () => {
    const result = handleGetDesignRules("typography");
    const data = JSON.parse(result.content[0].text);
    expect(data.length).toBeGreaterThan(0);
    for (const rule of data) {
      expect(rule.category).toBe("typography");
    }
  });
});
