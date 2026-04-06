import { loadComponents } from "../loaders/components.js";

export function handleListComponents(repoRoot: string, themeId?: string) {
  let components = loadComponents(repoRoot);

  if (themeId) {
    components = components.filter(
      (c) => c.type === "universal" || c.themeId === themeId
    );
  }

  return {
    content: [{ type: "text" as const, text: JSON.stringify(components, null, 2) }],
  };
}
