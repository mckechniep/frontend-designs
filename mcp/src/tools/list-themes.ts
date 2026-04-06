import { loadThemes } from "../loaders/themes.js";

export function handleListThemes(repoRoot: string) {
  const themes = loadThemes(repoRoot);
  const summaries = themes.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    defaultTheme: t.defaultTheme,
    moodTags: t.moodTags,
    palette: {
      bg: t.tokens["--bg"] || "",
      accent: t.tokens["--accent"] || "",
      text: t.tokens["--text"] || "",
    },
  }));

  return {
    content: [{ type: "text" as const, text: JSON.stringify(summaries, null, 2) }],
  };
}
