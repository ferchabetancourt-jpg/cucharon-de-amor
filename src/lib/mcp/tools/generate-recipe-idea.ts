import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "generate_recipe_idea",
  title: "Generate recipe idea",
  description:
    "Generate a new, gentle-on-the-body recipe idea from an ingredient and/or mood using Un Cucharón de Amor's AI chef.",
  inputSchema: {
    ingredient: z.string().optional().describe("Main ingredient available at home."),
    mood: z
      .enum(["liviano", "confort", "rapido", "dulce", "sinculpa", "sorpresa"])
      .optional()
      .describe("How the user's body feels today."),
    prefs: z
      .array(z.string())
      .optional()
      .describe("Dietary preferences: airfryer, rapido, singluten, sinlacteos, proteina, veggie."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async ({ ingredient, mood, prefs }) => {
    const url = `${process.env.SUPABASE_URL}/functions/v1/generate-recipe`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!}`,
      },
      body: JSON.stringify({ ingredient: ingredient ?? "", mood: mood ?? null, prefs: prefs ?? [] }),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok || data?.error) {
      return {
        content: [{ type: "text", text: data?.error ?? `Error ${resp.status}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data.recipe) }],
      structuredContent: { recipe: data.recipe },
    };
  },
});