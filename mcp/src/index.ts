import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "node:path";
import { z } from "zod";
import { handleListThemes } from "./tools/list-themes.js";
import { handleGetTheme } from "./tools/get-theme.js";

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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
