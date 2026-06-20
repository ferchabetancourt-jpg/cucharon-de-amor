const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres un chef experto en cocina saludable y accesible. Tus recetas deben ser:

PRIORIDADES:
- Fáciles en el cuerpo (considerar fibromialgia, intestino sensible, inflamación)
- Buen sabor sin complejidad
- Rápidas y prácticas

EVITAR:
- Grasas pesadas o exceso de fritura
- Ajo crudo (usar cocido o en polvo)
- Ingredientes que causen inflamación

FAVORECER:
- Air fryer cuando sea posible
- Texturas ligeras
- Sustituciones inteligentes
- Cocciones simples

FILOSOFÍA:
"Rico... pero tu cuerpo dice gracias, no queja"
"Intención sobre perfección"

IMPORTANTE: Usa SIEMPRE TUTEO neutral (tú/mezclas/agregas), NUNCA voseo (vos/mezclás/agregás).
Genera una receta NUEVA, CREATIVA y DIFERENTE cada vez. No repitas plantillas.`;

const MOOD_HINTS: Record<string, string> = {
  liviano: "Receta ligera, fresca, sin pesadez. Ensaladas, bowls, cocciones simples.",
  confort: "Receta reconfortante. Guisos, sopas cremosas, platos calientes que abrazan.",
  rapido: "Preparación máximo 20 minutos, mínimos pasos.",
  dulce: "Postre o antojo dulce, equilibrado y noble.",
  sinculpa: "Bajo en calorías, alto en nutrientes, satisface sin culpa.",
  sorpresa: "Algo creativo e inesperado, que sorprenda con sabores y combinaciones.",
};

const PREF_HINTS: Record<string, string> = {
  airfryer: "Usa Air Fryer como método principal.",
  rapido: "Tiempo total ≤ 20 minutos.",
  singluten: "Sin gluten (nada de trigo, cebada, centeno).",
  sinlacteos: "Sin lácteos (usa alternativas vegetales).",
  proteina: "Alta en proteína magra.",
  veggie: "100% vegetariano (sin carne ni pescado).",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { ingredient, mood, prefs } = await req.json();

    const ingredientClean = ingredient ? String(ingredient).trim() : "";
    if (!ingredientClean && !mood) {
      return new Response(
        JSON.stringify({ error: "Cuéntame qué ingrediente tienes o elige un estado" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY no configurada");

    const moodHint = mood && MOOD_HINTS[mood] ? `Estado del cuerpo: ${MOOD_HINTS[mood]}` : "";
    const prefList = (prefs ?? [])
      .map((p: string) => PREF_HINTS[p])
      .filter(Boolean)
      .join("\n- ");
    const prefHint = prefList ? `Restricciones / preferencias:\n- ${prefList}` : "";

    const ingredientLine = ingredientClean
      ? `Crea UNA receta nueva y única usando como ingrediente principal: ${ingredientClean}.`
      : `Crea UNA receta nueva, creativa y sorprendente. El usuario no especificó ingrediente: elige tú una combinación rica y accesible que encaje con su estado.`;

    const userPrompt = `${ingredientLine}

${moodHint}
${prefHint}

Devuelve SOLO el resultado llamando a la función return_recipe. No agregues texto extra.`;

    const seed = Math.floor(Math.random() * 1_000_000);

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `${userPrompt}\n\n[variación #${seed}]` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_recipe",
              description: "Devuelve la receta generada en formato estructurado.",
              parameters: {
                type: "object",
                properties: {
                  nombre: { type: "string", description: "Nombre creativo de la receta" },
                  categoria: {
                    type: "string",
                    enum: ["CREATIVO", "LIBRE", "DIVERTIDO", "RECONFORTANTE", "SALUDABLE"],
                  },
                  ingredientes: {
                    type: "array",
                    items: { type: "string" },
                    description: "Cada ingrediente con cantidad",
                  },
                  preparacion: {
                    type: "array",
                    items: { type: "string" },
                    description: "Pasos numerados, en tuteo",
                  },
                  secreto_cucharon: { type: "string" },
                  sentimiento: { type: "string" },
                },
                required: [
                  "nombre",
                  "categoria",
                  "ingredientes",
                  "preparacion",
                  "secreto_cucharon",
                  "sentimiento",
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_recipe" } },
      }),
    });

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas recetas seguidas. Espera un momento 💛" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "Se acabaron los créditos de IA. Recarga en Settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const txt = await aiResp.text();
      console.error("AI error", aiResp.status, txt);
      throw new Error(`AI gateway ${aiResp.status}`);
    }

    const data = await aiResp.json();
    const call = data?.choices?.[0]?.message?.tool_calls?.[0];
    const args = call?.function?.arguments;
    if (!args) throw new Error("Sin tool_call");

    const recipe = typeof args === "string" ? JSON.parse(args) : args;

    return new Response(JSON.stringify({ recipe }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-recipe error", e);
    return new Response(
      JSON.stringify({ error: "No pude crear la receta ahora. Intenta de nuevo en un momento 💛" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
