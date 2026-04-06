import { loadDesignRules } from "../loaders/rules.js";

export function handleGetDesignRules(category?: string) {
  const rules = loadDesignRules(category);
  return {
    content: [{ type: "text" as const, text: JSON.stringify(rules, null, 2) }],
  };
}
