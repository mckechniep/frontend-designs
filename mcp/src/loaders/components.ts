import { readdirSync, existsSync } from "node:fs";
import path from "node:path";

export interface Component {
  id: string;
  name: string;
  type: "universal" | "exclusive";
  themeId?: string;
  demoPath: string;
  files: string[];
}

const EXCLUSIVE_THEME_MAP: Record<string, string> = {
  "arctic-cryo-gauge": "arctic-mono",
  "blueprint-annotation": "corporate-blueprint",
  "cyber-data-stream": "cyberpunk-neon",
  "cyber-hud-panel": "cyberpunk-neon",
  "noire-dossier-card": "noire-editorial",
  "pastel-mood-board": "pastel-dreamscape",
  "retro-file-tree": "retro-terminal",
  "retro-matrix-rain": "retro-terminal",
  "saas-comparison-table": "modern-saas",
  "sunset-cinematic-quote": "sunset-gradient",
};

function kebabToTitle(kebab: string): string {
  return kebab
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function scanComponentDir(
  dirPath: string,
  type: "universal" | "exclusive"
): Component[] {
  if (!existsSync(dirPath)) return [];

  return readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const compDir = path.join(dirPath, entry.name);
      const files = readdirSync(compDir).filter(
        (f) => f.endsWith(".html") || f.endsWith(".css") || f.endsWith(".js")
      );
      const htmlFile = files.find((f) => f.endsWith(".html"));

      return {
        id: entry.name,
        name: kebabToTitle(entry.name),
        type,
        themeId: type === "exclusive" ? EXCLUSIVE_THEME_MAP[entry.name] : undefined,
        demoPath: htmlFile
          ? `/components/${type}/${entry.name}/${htmlFile}`
          : `/components/${type}/${entry.name}/`,
        files,
      };
    });
}

export function loadComponents(repoRoot: string): Component[] {
  const universalDir = path.join(repoRoot, "components/universal");
  const exclusiveDir = path.join(repoRoot, "components/exclusive");

  return [
    ...scanComponentDir(universalDir, "universal"),
    ...scanComponentDir(exclusiveDir, "exclusive"),
  ];
}
