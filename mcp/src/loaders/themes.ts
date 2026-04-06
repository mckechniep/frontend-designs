import { readFileSync } from "node:fs";
import path from "node:path";

export interface ThemeSurface {
  designExample: string;
  liveRuntime: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  defaultTheme: "dark" | "light";
  surfaces: Record<string, ThemeSurface>;
  tokens: Record<string, string>;
  moodTags: string[];
}

interface RegistryEntry {
  id: string;
  name: string;
  description: string;
  file: string;
  defaultTheme: "dark" | "light";
}

interface CoverageProfile {
  id: string;
  label: string;
  defaultTheme: string;
  descriptor: string;
  surfaces: Record<string, { designExample: string; liveRuntime: string }>;
}

const MOOD_TAGS: Record<string, string[]> = {
  "modern-saas": ["dark", "premium", "saas", "warm", "product-marketing"],
  "cyberpunk-neon": ["dark", "technical", "bold", "neon", "command-ui"],
  "arctic-mono": ["light", "research", "minimal", "cold", "editorial"],
  "noire-editorial": ["dark", "luxury", "editorial", "noir", "dossier"],
  "corporate-blueprint": ["dark", "enterprise", "technical", "drafting", "consultancy"],
  "retro-terminal": ["dark", "technical", "retro", "terminal", "crt"],
  "pastel-dreamscape": ["light", "playful", "soft", "collage", "editorial"],
  "sunset-gradient": ["dark", "cinematic", "warm", "gradient", "poster"],
};

// Fallback token aliases for themes that use custom variable names
const TOKEN_ALIASES: Record<string, Record<string, string[]>> = {
  "corporate-blueprint": {
    "--bg": ["--navy-deep", "--navy"],
    "--accent": ["--cyan", "--cyan-bright"],
    "--font": ["--font-body", "--font-display"],
  },
  "retro-terminal": {
    "--accent": ["--green", "--green-bright"],
    "--font": ["--font-terminal", "--font-mono"],
  },
  "pastel-dreamscape": {
    "--bg": ["--cream", "--white"],
    "--accent": ["--rose-deep", "--lavender"],
    "--font": ["--font-body", "--font-display"],
  },
  "sunset-gradient": {
    "--bg": ["--midnight"],
    "--accent": ["--sun-gold", "--ember", "--coral-flame"],
    "--font": ["--font-body", "--font-display"],
  },
};

function extractTokensFromCSS(cssPath: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  let css: string;
  try {
    css = readFileSync(cssPath, "utf-8");
  } catch {
    return tokens;
  }

  // Collect tokens from ALL :root blocks (later ones override earlier ones)
  const rootRegex = /:root\s*\{([^}]+)\}/g;
  let match: RegExpExecArray | null;
  while ((match = rootRegex.exec(css)) !== null) {
    const block = match[1];
    const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
    let varMatch: RegExpExecArray | null;
    while ((varMatch = varRegex.exec(block)) !== null) {
      tokens[`--${varMatch[1]}`] = varMatch[2].trim();
    }
  }
  return tokens;
}

function normalizeTokens(
  tokens: Record<string, string>,
  themeId: string
): Record<string, string> {
  const normalized = { ...tokens };
  const aliases = TOKEN_ALIASES[themeId];
  if (!aliases) return normalized;

  for (const [canonical, fallbacks] of Object.entries(aliases)) {
    if (!normalized[canonical]) {
      for (const alias of fallbacks) {
        if (normalized[alias]) {
          normalized[canonical] = normalized[alias];
          break;
        }
      }
    }
  }
  return normalized;
}

export function loadThemes(repoRoot: string): Theme[] {
  const registryPath = path.join(repoRoot, "themes/shared/theme-registry.json");
  const coveragePath = path.join(repoRoot, "shared/surface-coverage.json");

  const registry: RegistryEntry[] = JSON.parse(readFileSync(registryPath, "utf-8"));
  const coverage = JSON.parse(readFileSync(coveragePath, "utf-8"));
  const coverageProfiles: CoverageProfile[] = coverage.profiles;

  return registry.map((entry) => {
    const profile = coverageProfiles.find((p) => p.id === entry.id);

    const surfaces: Record<string, ThemeSurface> = {};
    if (profile) {
      for (const [surfaceId, surface] of Object.entries(profile.surfaces)) {
        surfaces[surfaceId] = {
          designExample: surface.designExample,
          liveRuntime: surface.liveRuntime,
        };
      }
    }

    const cssPath = path.join(repoRoot, "themes", entry.id, "theme.css");
    const rawTokens = extractTokensFromCSS(cssPath);
    const tokens = normalizeTokens(rawTokens, entry.id);

    return {
      id: entry.id,
      name: entry.name,
      description: entry.description,
      defaultTheme: entry.defaultTheme,
      surfaces,
      tokens,
      moodTags: MOOD_TAGS[entry.id] || [],
    };
  });
}
