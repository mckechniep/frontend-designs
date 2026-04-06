import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "node:path";
import { z } from "zod";
import { handleListThemes } from "./tools/list-themes.js";
import { handleGetTheme } from "./tools/get-theme.js";
import { handleListComponents } from "./tools/list-components.js";
import { handleGetDesignRules } from "./tools/get-design-rules.js";
import { handleRecommendTheme } from "./tools/recommend-theme.js";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../");

const server = new McpServer({
  name: "framekit",
  version: "0.1.0",
});

server.tool("list_themes", "List all 8 Framekit themes with mood tags, descriptions, and color palette previews.", {}, () => {
  return handleListThemes(REPO_ROOT);
});

server.tool(
  "get_theme",
  "Get full details for a specific theme: tokens, surfaces, personality rules, and design constraints.",
  { theme_id: z.string().describe("Theme identifier (e.g. 'arctic-mono', 'modern-saas')") },
  ({ theme_id }) => {
    return handleGetTheme(REPO_ROOT, theme_id);
  }
);

server.tool(
  "list_components",
  "List available Framekit components. Optionally filter by theme to see only compatible components.",
  { theme_id: z.string().optional().describe("Optional theme ID to filter compatible components") },
  ({ theme_id }) => {
    return handleListComponents(REPO_ROOT, theme_id);
  }
);

server.tool(
  "get_design_rules",
  "Get universal studio-grade design rules. Optionally filter by category: typography, spacing, color, layout, motion, accessibility.",
  { category: z.string().optional().describe("Optional category filter") },
  ({ category }) => {
    return handleGetDesignRules(category);
  }
);

server.tool(
  "recommend_theme",
  "Given a project description, get ranked theme recommendations with reasoning.",
  { description: z.string().describe("Project or client description (e.g. 'luxury real estate firm')") },
  ({ description }) => {
    return handleRecommendTheme(REPO_ROOT, description);
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
