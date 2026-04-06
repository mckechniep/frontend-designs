import { loadThemes } from "../loaders/themes.js";

export function getTokensResource(repoRoot: string, themeId: string): string {
  const themes = loadThemes(repoRoot);
  const theme = themes.find((t) => t.id === themeId);
  if (!theme) return JSON.stringify({ error: `Theme "${themeId}" not found` });
  return JSON.stringify(
    { themeId: theme.id, themeName: theme.name, tokens: theme.tokens },
    null,
    2
  );
}
