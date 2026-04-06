import { readFileSync } from "node:fs";
import path from "node:path";
import { loadThemes } from "../loaders/themes.js";

function loadPersonality(repoRoot: string, themeId: string): string {
  const profilePath = path.join(repoRoot, `design/profiles/profile.${themeId}.md`);
  try {
    return readFileSync(profilePath, "utf-8");
  } catch {
    return "";
  }
}

export function handleGetTheme(repoRoot: string, themeId: string) {
  const themes = loadThemes(repoRoot);
  const theme = themes.find((t) => t.id === themeId);

  if (!theme) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Theme "${themeId}" not found. Valid IDs: ${themes.map((t) => t.id).join(", ")}` }],
    };
  }

  const personality = loadPersonality(repoRoot, themeId);

  const result = {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    defaultTheme: theme.defaultTheme,
    moodTags: theme.moodTags,
    tokens: theme.tokens,
    surfaces: theme.surfaces,
    personality,
  };

  return {
    content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
  };
}
