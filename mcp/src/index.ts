import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "node:path";
import { z } from "zod";
import { handleListThemes } from "./tools/list-themes.js";
import { handleGetTheme } from "./tools/get-theme.js";
import { handleListComponents } from "./tools/list-components.js";
import { handleGetDesignRules } from "./tools/get-design-rules.js";
import { handleRecommendTheme } from "./tools/recommend-theme.js";
import { loadThemes } from "./loaders/themes.js";
import { getProfilesResource } from "./resources/profiles.js";
import { getTokensResource } from "./resources/tokens.js";
import { getDesignRulesResource } from "./resources/design-rules.js";
import { getLayoutsResource } from "./resources/layouts.js";

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

server.resource("profiles", "framekit://profiles", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getProfilesResource(REPO_ROOT) }],
}));

server.resource("design-rules", "framekit://design-rules", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getDesignRulesResource() }],
}));

server.resource("layouts-landing", "framekit://layouts/landing", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getLayoutsResource("landing") }],
}));

server.resource("layouts-dashboard", "framekit://layouts/dashboard", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getLayoutsResource("dashboard") }],
}));

server.resource("layouts-app-screen", "framekit://layouts/app-screen", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getLayoutsResource("app-screen") }],
}));

server.resource(
  "tokens",
  new ResourceTemplate("framekit://tokens/{theme_id}", {
    list: async () => {
      const themes = loadThemes(REPO_ROOT);
      return {
        resources: themes.map((t) => ({
          uri: `framekit://tokens/${t.id}`,
          name: `${t.name} tokens`,
          description: `CSS design tokens for the ${t.name} theme`,
        })),
      };
    },
  }),
  async (uri, { theme_id }) => ({
    contents: [{ uri: uri.href, mimeType: "application/json", text: getTokensResource(REPO_ROOT, theme_id as string) }],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
