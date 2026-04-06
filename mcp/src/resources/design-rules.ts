import { loadDesignRules } from "../loaders/rules.js";

export function getDesignRulesResource(): string {
  const rules = loadDesignRules();
  return JSON.stringify(rules, null, 2);
}
