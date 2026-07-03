import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

function sb() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export default defineTool({
  name: "search_recipes",
  title: "Search recipes",
  description:
    "Search published recipes in Un Cucharón de Amor by name, ingredient, or category. Returns up to 20 matches.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Text to match against recipe name or ingredients."),
    category: z.string().optional().describe("Optional category filter."),
    limit: z.number().int().min(1).max(20).optional().describe("Max results (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, category, limit }) => {
    let q = sb()
      .from("recipes_staging")
      .select("id,name,category,time,servings,image_url")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);
    if (category) q = q.ilike("category", `%${category}%`);
    if (query) q = q.or(`name.ilike.%${query}%,ingredients.ilike.%${query}%`);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { recipes: data ?? [] },
    };
  },
});