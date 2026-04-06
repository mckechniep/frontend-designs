import { loadThemes } from "../loaders/themes.js";

export function getProfilesResource(repoRoot: string): string {
  const themes = loadThemes(repoRoot);
  const profiles = themes.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    defaultTheme: t.defaultTheme,
    moodTags: t.moodTags,
    surfaces: Object.keys(t.surfaces),
  }));
  return JSON.stringify(profiles, null, 2);
}
