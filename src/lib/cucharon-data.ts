// Curated content for Cucharón de Amor

export type MoodKey = "liviano" | "confort" | "rapido" | "dulce" | "sinculpa" | "sorpresa";

export const MOODS: { key: MoodKey; emoji: string; label: string }[] = [
  { key: "liviano", emoji: "🌱", label: "Quiero algo liviano" },
  { key: "confort", emoji: "🤗", label: "Necesito comfort" },
  { key: "rapido", emoji: "⚡", label: "Rápido y rico" },
  { key: "dulce", emoji: "🍮", label: "Tengo antojo dulce" },
  { key: "sinculpa", emoji: "✨", label: "Algo equilibrado" },
  { key: "sorpresa", emoji: "🎲", label: "Sorpréndeme" },
];

export const PREFERENCES = [
  { key: "airfryer", label: "🔥 Air Fryer" },
  { key: "rapido", label: "⏱ -20 min" },
  { key: "singluten", label: "🌾 Sin gluten" },
  { key: "sinlacteos", label: "🥛 Sin lácteos" },
  { key: "proteina", label: "💪 Proteínas" },
  { key: "veggie", label: "🥦 Veggie" },
];

export const CATEGORIES = [
  { key: "all", label: "Todas" },
  { key: "sopas", label: "🍲 Sopas, cremas y guisos" },
  { key: "rapido", label: "⚡ Rápido sin pensar" },
  { key: "cuerpo", label: "🌱 Cuerpo agradecido" },
  { key: "plan", label: "🥘 Plan con tiempo" },
  { key: "dulce", label: "🍮 Antojo dulce" },
  { key: "colombiano", label: "🇨🇴 Sabor colombiano" },
  { key: "bases", label: "🧂 Bases que salvan" },
  { key: "especiales", label: "📌 Especiales" },
];

// Color por categoría: bar = bloque superior; chipBg/chipText = pastilla
export const CATEGORY_STYLES: Record<string, { bar: string; chipBg: string; chipText: string }> = {
  sopas:      { bar: "#E85D2F", chipBg: "#F8D8CB", chipText: "#7A2E12" },
  rapido:     { bar: "#F2A93B", chipBg: "#F8E3C8", chipText: "#7A4E0E" },
  cuerpo:     { bar: "#5E8C4A", chipBg: "#E2EDD8", chipText: "#2F4A1F" },
  plan:       { bar: "#F8E3C8", chipBg: "#F8E3C8", chipText: "#7A4E0E" },
  dulce:      { bar: "#F8D8CB", chipBg: "#F8D8CB", chipText: "#7A2E12" },
  colombiano: { bar: "#E85D2F", chipBg: "#F8D8CB", chipText: "#7A2E12" },
  bases:      { bar: "#E2EDD8", chipBg: "#E2EDD8", chipText: "#2F4A1F" },
  especiales: { bar: "#F2A93B", chipBg: "#F8E3C8", chipText: "#7A4E0E" },
};

export function getCategoryStyle(key?: string) {
  return CATEGORY_STYLES[key ?? "especiales"] ?? CATEGORY_STYLES.especiales;
}

export const COOKING_METHODS = [
  { key: "airfryer", label: "🔥 Air Fryer" },
  { key: "sarten", label: "🍳 Sartén" },
  { key: "horno", label: "🌡️ Horno" },
  { key: "ollapresion", label: "💨 Olla de Presión Eléctrica" },
  { key: "olla", label: "🍲 Olla tradicional" },
  { key: "sincoccion", label: "❄️ Sin cocción" },
  { key: "licuadora", label: "🥣 Licuadora" },
];

export const QUOTES = [
  { text: "Cocinar con intención es el acto más generoso que puedes hacer por ti misma. No importa si es perfecto — importa que lo hiciste con amor." },
  { text: "La cocina no se trata de seguir reglas, se trata de escuchar lo que tu cuerpo te pide y responderle con cariño." },
  { text: "Un plato simple hecho con presencia vale más que diez recetas perfectas hechas con prisa." },
  { text: "Cuando cocinas para ti misma, le dices a tu cuerpo: 'te veo, te escucho, te cuido'." },
  { text: "Sabor sobre complejidad. Intención sobre perfección. Amor sobre todo." },
  { text: "No tienes que cocinar bonito todos los días. Tienes que cocinar con cariño los días que puedas." },
  { text: "Tu cocina es el lugar donde te cuidas en silencio. Hazlo despacio, hazlo con gusto." },
  { text: "Comer bien no es un premio: es la forma más simple de decirte que te quieres." },
  { text: "Una receta repetida con amor se vuelve memoria. Y la memoria también alimenta." },
  { text: "Lo que cocinas con calma sabe distinto. El cuerpo lo nota antes que el paladar." },
  { text: "No hay plato pequeño cuando lo haces para alguien que te importa, incluso si esa persona eres tú." },
  { text: "Probar mientras cocinas no es trampa: es conversación con la comida." },
  { text: "La mejor receta es la que cabe en tu día real, no la que se ve linda en la pantalla." },
  { text: "Cocinar te enseña algo que pocas cosas enseñan: a esperar, a confiar y a soltar." },
];

export const INSPIRATIONS = [
  {
    title: "El frasco que todo lo sabe",
    body: "Mezcla yogur griego con un toque de miel, ralladura de limón y cardamomo. Déjalo reposar 10 minutos en un frasquito y tendrás una crema que convierte cualquier fruta en postre.",
  },
  {
    title: "Caldo de domingo",
    body: "Hervir verduras tristes con un diente de ajo y una hoja de laurel transforma sobras en oro líquido. Tu próximo arroz, sopa o risotto te lo va a agradecer.",
  },
  {
    title: "Air Fryer mágica",
    body: "Garbanzos escurridos + pizca de pimentón + spray de oliva, 12 min a 190°. Crujientes para picar o coronar ensaladas. Crujen como si supieran tu secreto.",
  },
  {
    title: "Una cucharada cambia todo",
    body: "Tahini sobre verduras asadas. Miso en la sopa. Limón al final del guiso. Cucharadas pequeñas, transformaciones grandes.",
  },
  {
    title: "El truco del huevo",
    body: "Un huevo pochado encima de cualquier cosa la convierte en cena. Lentejas, ensalada, tostada, sopa. La yema es la salsa que tu plato necesitaba.",
  },
  {
    title: "Dulce sin culpa",
    body: "Banana congelada + cucharada de cacao + chorrito de leche, todo a la procesadora. Nice cream cremoso en 60 segundos. Tu cuerpo te lo regala.",
  },
  {
    title: "Hierbas frescas siempre",
    body: "Albahaca, perejil, cilantro picados a último momento. No son adorno: son lo que separa una receta correcta de una receta que recuerdas.",
  },
  {
    title: "Limón al final",
    body: "Una pizca de ralladura sobre el plato terminado despierta todos los sabores. Es el truco de los chefs que nadie te cuenta.",
  },
  {
    title: "Sal en dos tiempos",
    body: "Sazona al empezar para que penetre y termina con escamas para que cruja. La textura cambia, el bocado se vuelve memoria.",
  },
  {
    title: "El descanso del bocado",
    body: "Deja reposar carnes y guisos 5 minutos antes de servir. Los jugos se reparten y cada bocado queda jugoso, no seco.",
  },
];

// Recipe template generator. Builds from inputs without needing AI.
export function generateRecipe(opts: {
  ingredients: string;
  mood: MoodKey | null;
  prefs: string[];
}): { title: string; body: string } {
  const ing = opts.ingredients.trim() || "lo que tengas en la nevera";

  const isAirfryer = opts.prefs.includes("airfryer");
  const isFast = opts.prefs.includes("rapido");
  const isVeggie = opts.prefs.includes("veggie");
  const noLact = opts.prefs.includes("sinlacteos");
  const noGluten = opts.prefs.includes("singluten");
  const protein = opts.prefs.includes("proteina");

  const tips = [
    isAirfryer && "🔥 Air fryer 180-200°, según corte (12-18 min).",
    isFast && "⏱ Mise en place primero: corta todo antes de prender el fuego.",
    isVeggie && "🥦 Reemplaza cualquier proteína animal por garbanzos, tofu o lentejas.",
    noLact && "🥛 Usa yogur de coco o leche de almendras donde diga lácteo.",
    noGluten && "🌾 Si usas cereal, ve a quinoa, arroz o trigo sarraceno.",
    protein && "💪 Suma un huevo encima o una porción de proteína magra.",
  ].filter(Boolean) as string[];

  const pools: Record<MoodKey, { name: string; vibe: string; steps: string[]; secret: string }[]> = {
    liviano: [
      {
        name: "Bowl verde de la nevera honesta",
        vibe: "fresco, crujiente, sin pesadez",
        steps: [
          "Lava y corta hojas verdes y vegetales crudos en bocados parejos.",
          "Sazona con sal, pimienta, oliva y jugo de limón.",
          "Suma semillas tostadas o nueces para dar textura.",
          "Mezcla con las manos para que cada hoja brille.",
          "Sirve frío y come despacio: el primer bocado define el resto.",
        ],
        secret: "Una pizca de sal en escamas al final levanta los vegetales sin necesidad de salsa.",
      },
      {
        name: "Sopa ligera del mediodía",
        vibe: "tibia, clara, reconfortante sin pesar",
        steps: [
          "Pica cebolla y ajo finos y sofríe con un hilo de oliva.",
          "Suma vegetales en cubos pequeños y dora 2 minutos.",
          "Cubre con agua o caldo y cocina hasta que estén tiernos.",
          "Salpimenta y termina con limón y hierbas frescas.",
          "Sirve en tu taza favorita.",
        ],
        secret: "Una hoja de laurel desde el inicio cambia el caldo entero.",
      },
      {
        name: "Plato crudo y crujiente",
        vibe: "ligero, vibrante, lleno de color",
        steps: [
          "Ralla zanahoria, pepino o remolacha cruda.",
          "Mezcla con limón, sal y un chorrito de oliva.",
          "Suma semillas y hierbas picadas.",
          "Deja reposar 5 minutos para que los sabores se asienten.",
          "Sirve fresco como entrada o plato principal liviano.",
        ],
        secret: "Si rallas grueso queda crujiente, fino se vuelve ensalada cremosa.",
      },
    ],
    confort: [
      {
        name: "Cazuelita de abrazo",
        vibe: "tibio, cremoso, reconfortante",
        steps: [
          "Sofríe cebolla y ajo en mantequilla u oliva hasta dorar.",
          "Suma los ingredientes y dora 2-3 minutos.",
          "Cubre con caldo o leche y cocina a fuego bajo 20 minutos.",
          "Ajusta sal y pimienta. Si quieres más cuerpo, suma una cucharada de queso o crema.",
          "Sirve en cazuela honda y come despacio.",
        ],
        secret: "Cocción lenta = sabor profundo. No tengas prisa.",
      },
      {
        name: "Guiso lento del corazón",
        vibe: "denso, sabroso, abrazador",
        steps: [
          "Dora muy bien los ingredientes principales en una olla pesada.",
          "Suma cebolla, ajo, tomate y especias y cocina hasta que se rompan.",
          "Cubre con caldo y cocina tapado a fuego bajo 40-60 minutos.",
          "Prueba y corrige sal al final.",
          "Sirve con pan o arroz para mojar la salsa.",
        ],
        secret: "El guiso del segundo día siempre sabe mejor. Hazlo con tiempo.",
      },
      {
        name: "Crema reconfortante",
        vibe: "suave, cálida, como un abrazo",
        steps: [
          "Cocina los vegetales en caldo hasta que estén muy blandos.",
          "Licúa hasta obtener una crema sedosa.",
          "Devuelve a la olla y suma un toque de leche o crema vegetal.",
          "Calienta sin hervir, salpimenta y prueba.",
          "Sirve con un hilo de oliva y semillas tostadas encima.",
        ],
        secret: "Licuar caliente con cuidado: deja salir vapor por la tapa.",
      },
    ],
    rapido: [
      {
        name: "Sartén exprés con amor",
        vibe: "rápido, sabroso, sin vueltas",
        steps: [
          "Calienta una sartén grande con un hilo de oliva.",
          "Suma los ingredientes empezando por los más duros (3 min) y luego los blandos (2 min).",
          "Salpimenta y suma ajo picado al final para que no se queme.",
          "Termina con limón y hierbas frescas.",
          "Sirve directo de la sartén en un plato hondo.",
        ],
        secret: "Sartén bien caliente antes de echar nada: ese es el secreto.",
      },
      {
        name: "Bowl de 15 minutos",
        vibe: "rápido, completo, satisfactorio",
        steps: [
          "Cocina una base de arroz, quinoa o pasta corta.",
          "Mientras tanto, saltea proteína y vegetales en una sartén.",
          "Arma el bowl: base, proteína, vegetales y un toque crujiente.",
          "Suma una salsa rápida (yogur con limón, tahini con agua, soja con miel).",
          "Mezcla justo antes de comer.",
        ],
        secret: "Tener bases cocidas en la nevera convierte cualquier sobra en cena en 10 minutos.",
      },
      {
        name: "Plato de una sola sartén",
        vibe: "ágil, sabroso, mínimo lavado",
        steps: [
          "Calienta la sartén con oliva y suma cebolla y ajo.",
          "Suma proteína y dora 3 minutos.",
          "Suma vegetales y un chorrito de caldo o agua.",
          "Tapa 5 minutos para que todo se cocine al vapor.",
          "Destapa, ajusta sal y sirve directo.",
        ],
        secret: "Tapar 5 minutos cocina al vapor sin perder sabor ni jugos.",
      },
    ],
    dulce: [
      {
        name: "Postrecito sin culpa",
        vibe: "dulce justo, suave, mimoso",
        steps: [
          "Mezcla yogur natural con un toque de miel y vainilla.",
          "Suma fruta picada o congelada.",
          "Espolvorea semillas, granola o cacao puro.",
          "Deja reposar 5 minutos en la nevera.",
          "Sirve en un frasco o copa pequeña.",
        ],
        secret: "El frío realza el dulce natural de la fruta. No necesitas más azúcar.",
      },
      {
        name: "Nice cream express",
        vibe: "cremoso, frío, dulce sin culpa",
        steps: [
          "Congela banana en rodajas la noche anterior.",
          "Procesa con un chorrito de leche y una cucharada de cacao.",
          "Procesa hasta que quede cremoso (1-2 minutos).",
          "Sirve inmediatamente con frutas o nueces encima.",
          "Si quieres, añade un toque de mantequilla de maní.",
        ],
        secret: "Banana bien congelada = textura de helado. Sin trucos.",
      },
      {
        name: "Frutas asadas con miel",
        vibe: "tibio, dorado, dulce noble",
        steps: [
          "Corta frutas firmes (manzana, pera, durazno) en mitades.",
          "Acomoda en una bandeja con un hilo de miel y canela.",
          "Hornea a 180° por 15-20 minutos hasta que doren.",
          "Sirve tibio con yogur frío encima.",
          "Suma nueces tostadas para crujir.",
        ],
        secret: "El contraste tibio-frío hace magia. No te saltes el yogur frío.",
      },
    ],
    sinculpa: [
      {
        name: "Plato consciente",
        vibe: "ligero, nutritivo, pleno",
        steps: [
          "Elige una base de hojas verdes o granos integrales.",
          "Suma proteína magra (huevo, pollo, legumbres o tofu).",
          "Añade vegetales de colores variados.",
          "Termina con grasas buenas: aguacate, semillas, oliva.",
          "Mastica despacio, presta atención al primer bocado.",
        ],
        secret: "Tres colores diferentes en el plato = nutrientes variados sin pensarlo.",
      },
      {
        name: "Bowl arcoíris",
        vibe: "colorido, vivo, equilibrado",
        steps: [
          "Cocina una base de quinoa o arroz integral.",
          "Asa o saltea vegetales de 3 colores diferentes.",
          "Suma una proteína vegetal o animal magra.",
          "Termina con semillas y un aderezo de tahini con limón.",
          "Disfruta sin distracciones.",
        ],
        secret: "Comer con los ojos ayuda al cuerpo a recibir mejor lo que entra.",
      },
    ],
    sorpresa: [
      {
        name: "Invento del cucharón",
        vibe: "creativo, libre, divertido",
        steps: [
          "Mira lo que tienes y elige tres ingredientes que se hablen.",
          "Define la técnica: sartén, horno, crudo o sopa.",
          "Empieza por dorar lo que dé sabor (cebolla, ajo, especias).",
          "Suma el resto en orden de dureza.",
          "Termina con algo ácido (limón) y algo fresco (hierbas).",
        ],
        secret: "Las mejores recetas nacen de no tener miedo. Confía en tu nariz.",
      },
      {
        name: "Mezcla del azar",
        vibe: "improvisado, sabroso, único",
        steps: [
          "Abre la nevera y elige los 4 ingredientes que más te llamen.",
          "Decide si va frío o caliente según tu antojo.",
          "Combina con una grasa (oliva, mantequilla, yogur).",
          "Ajusta con sal, ácido y un toque dulce si hace falta.",
          "Prueba, corrige y disfruta tu invento.",
        ],
        secret: "La cocina del azar es la que te enseña a cocinar de verdad.",
      },
    ],
  };

  const moodKey: MoodKey = opts.mood ?? "sorpresa";
  const pool = pools[moodKey];
  const pick = pool[Math.floor(Math.random() * pool.length)];

  const proteinLine = protein ? "• 1 huevo o porción de proteína de tu elección\n" : "";
  const stepsText = pick.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");

  const body =
`✦ ${pick.vibe.toUpperCase()} ✦

🛒 Lo que vas a usar
• ${ing}
• Aceite de oliva, sal en escamas, pimienta
• 1 limón (la magia del final)
• Hierbas frescas a mano (perejil, cilantro o albahaca)
${proteinLine}
🔪 Preparación (con cariño)
${stepsText}

💛 Secreto Cucharón
${tips.length ? tips.join("\n") : pick.secret}

🌿 Cómo te va a hacer sentir
${pick.vibe.charAt(0).toUpperCase() + pick.vibe.slice(1)}. Tu cuerpo va a decir gracias, no queja.`;

  return { title: pick.name, body };
}
