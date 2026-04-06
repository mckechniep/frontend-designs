import { loadThemes, type Theme } from "../loaders/themes.js";

interface Recommendation {
  themeId: string;
  themeName: string;
  score: number;
  reasoning: string;
}

const KEYWORD_TAGS: Record<string, string[]> = {
  luxury: ["luxury", "premium", "noir", "editorial"],
  dark: ["dark"],
  light: ["light"],
  minimal: ["minimal", "research", "cold"],
  bold: ["bold", "neon", "technical"],
  corporate: ["enterprise", "consultancy", "drafting"],
  startup: ["saas", "product-marketing", "warm"],
  creative: ["playful", "soft", "collage", "editorial"],
  technical: ["technical", "terminal", "command-ui"],
  warm: ["warm", "cinematic", "gradient", "poster"],
  hacker: ["terminal", "retro", "crt", "neon", "command-ui"],
  security: ["terminal", "retro", "crt", "neon", "command-ui"],
  real_estate: ["luxury", "premium", "noir", "editorial", "enterprise"],
  architecture: ["enterprise", "drafting", "consultancy", "noir"],
  biotech: ["research", "cold", "minimal", "editorial"],
  gaming: ["neon", "bold", "dark", "command-ui"],
  fashion: ["luxury", "editorial", "noir", "premium"],
  food: ["warm", "playful", "soft", "gradient"],
  saas: ["saas", "product-marketing", "premium", "warm"],
  agency: ["playful", "collage", "editorial", "bold"],
};

function scoreTheme(theme: Theme, description: string): { score: number; reasons: string[] } {
  const desc = description.toLowerCase();
  const words = desc.split(/\s+/);
  let score = 0;
  const reasons: string[] = [];

  for (const [keyword, matchTags] of Object.entries(KEYWORD_TAGS)) {
    if (desc.includes(keyword)) {
      const overlap = theme.moodTags.filter((tag) => matchTags.includes(tag));
      if (overlap.length > 0) {
        score += overlap.length * 2;
        reasons.push(`"${keyword}" matches mood: ${overlap.join(", ")}`);
      }
    }
  }

  for (const word of words) {
    if (theme.moodTags.includes(word)) {
      score += 3;
      reasons.push(`direct mood match: "${word}"`);
    }
    if (theme.description.toLowerCase().includes(word) && word.length > 3) {
      score += 1;
      reasons.push(`description match: "${word}"`);
    }
  }

  return { score, reasons };
}

export function handleRecommendTheme(repoRoot: string, description: string) {
  const themes = loadThemes(repoRoot);

  const recommendations: Recommendation[] = themes
    .map((theme) => {
      const { score, reasons } = scoreTheme(theme, description);
      return {
        themeId: theme.id,
        themeName: theme.name,
        score,
        reasoning: reasons.length > 0
          ? reasons.join("; ")
          : "No strong keyword matches — review theme description for fit.",
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return {
    content: [{ type: "text" as const, text: JSON.stringify(recommendations, null, 2) }],
  };
}
