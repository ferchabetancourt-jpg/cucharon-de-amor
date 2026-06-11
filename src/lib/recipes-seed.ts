import type { SavedRecipe } from "./recipes-store";

// Recetas semilla: siempre presentes al abrir la app.
// id con prefijo "seed-" para identificarlas y no duplicarlas.
export const SEED_RECIPES: SavedRecipe[] = [
  {
    id: "seed-crema-apio",
    name: "Crema de apio",
    category: "sopas",
    methods: ["olla"],
    time: "30 min",
    ingredients: `- 2 tazas de apio picado
- ½ taza de cebolla cabezona picada
- 2 cucharadas de margarina
- 2 tazas de leche
- ½ taza de harina
- 2 cubos de gallina o 2 tazas de caldo de pollo o base de pollo casera
- 2 litros de agua
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Dora el apio y la cebolla en la margarina hasta que estén suaves.
2. Agrega el agua y los cubos de gallina, o el caldo de pollo o base de pollo casera, y deja hervir hasta que el apio esté tierno.
3. Disuelve la harina en la leche y agrégala poco a poco.
4. Cocina a fuego medio hasta que espese.
5. Ajusta la sal y la pimienta.`,
    createdAt: 1,
  },
  {
    id: "seed-crema-tomate",
    name: "Crema de tomate",
    category: "sopas",
    methods: ["olla"],
    time: "25 min",
    ingredients: `- 2 cubos de gallina o 2 tazas de caldo de pollo o base de pollo casera
- 1 taza de pasta de tomate
- ¼ taza de harina
- 1 cucharadita de azúcar
- ½ cucharadita de pimienta
- 1 cucharada de mantequilla
- ½ taza de leche
- 1½ litros de agua
- 1 cucharadita de sal`,
    preparation: `1. Hierve el agua con los cubos de gallina, o usa el caldo de pollo o base de pollo casera para preparar el caldo.
2. Agrega la pasta de tomate, el azúcar, la pimienta y la sal.
3. Disuelve la harina en la leche y agrégala poco a poco.
4. Agrega la mantequilla y cocina a fuego medio hasta que espese.
5. Sirve caliente.`,
    createdAt: 2,
  },
  {
    id: "seed-salsa-bbq",
    name: "Salsa BBQ",
    category: "bases",
    methods: ["sincoccion"],
    time: "5 min",
    ingredients: `- 1½ tazas de ketchup
- 1 cucharadita de ajo molido
- 1 cucharada de jugo de limón
- 1 cucharada de miel
- 2 cucharaditas de rábano picante
- 4 cucharadas de salsa inglesa
- 1 cucharada de vinagre blanco
- 1 cucharadita de sal
- ½ cucharadita de pimienta
- 1 cucharada de salsa de soya`,
    preparation: `1. Mezcla todos los ingredientes hasta integrar bien.
2. Usa para untar carnes antes o durante la cocción.`,
    createdAt: 3,
  },
  {
    id: "seed-salsa-bechamel",
    name: "Salsa bechamel",
    category: "bases",
    methods: ["olla"],
    time: "15 min",
    ingredients: `- 6 cucharadas de margarina
- 3 tazas de leche
- ½ taza de cebolla cabezona finamente picada
- 3 cucharadas de harina de trigo
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Dora la cebolla en la margarina hasta que esté transparente.
2. Agrega la leche y calienta sin dejar hervir fuerte.
3. Disuelve la harina en ½ taza de leche o agua y agrégala poco a poco.
4. Cocina revolviendo constantemente hasta que espese.
5. Retira del fuego.`,
    createdAt: 4,
  },
  {
    id: "seed-chimichurri",
    name: "Chimichurri",
    category: "bases",
    methods: ["licuadora"],
    time: "10 min",
    ingredients: `- 6 dientes de ajo
- 1 cebolla cabezona grande
- 1 taza de vinagre
- 1 taza de perejil picado
- 1 taza de aceite
- 1 cucharadita de sal`,
    preparation: `1. Licua el ajo, el vinagre, el perejil y el aceite.
2. Agrega la cebolla finamente picada.
3. Mezcla y ajusta la sal.
4. Sirve para acompañar carnes.`,
    createdAt: 5,
  },
  {
    id: "seed-salsa-ajo",
    name: "Salsa de ajo",
    category: "bases",
    methods: ["licuadora"],
    time: "10 min",
    ingredients: `- 8 dientes de ajo
- 1 taza de aceite
- 2 cucharadas de vinagre
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Licua los ajos con el aceite hasta obtener una mezcla cremosa.
2. Agrega el vinagre, la sal y la pimienta.
3. Ajusta la textura si es necesario.
4. Guarda en un frasco limpio y bien tapado.`,
    createdAt: 6,
  },
  {
    id: "seed-salsa-yogurt-ensaladas",
    name: "Salsa de yogurt para ensaladas",
    category: "bases",
    methods: ["sincoccion"],
    time: "5 min",
    ingredients: `- 1 taza de yogurt
- ½ taza de mayonesa
- 1 cucharadita de mostaza
- 1 cucharadita de jugo de limón
- ½ cucharadita de sal`,
    preparation: `1. Mezcla todos los ingredientes hasta integrar bien.
2. Guarda en la nevera.`,
    createdAt: 7,
  },
  {
    id: "seed-salsa-verde-ensaladas",
    name: "Salsa verde para ensaladas",
    category: "bases",
    methods: ["licuadora"],
    time: "10 min",
    ingredients: `- 1 taza de perejil
- 1 diente de ajo
- ¼ taza de vinagre
- 1 cucharada de azúcar
- 1 cucharadita de sal
- 1 huevo crudo
- ½ cucharadita de pimienta
- ½ taza de aceite`,
    preparation: `1. Licua todos los ingredientes excepto el aceite.
2. Agrega el aceite poco a poco mientras licúas hasta emulsionar.
3. Ajusta la textura si es necesario.
4. Deja reposar en frío antes de servir.`,
    createdAt: 8,
  },
  {
    id: "seed-salsa-golf",
    name: "Salsa golf o rosada",
    category: "bases",
    methods: ["sincoccion"],
    time: "5 min",
    ingredients: `- 2 cucharadas de salsa de tomate
- 2 cucharadas de mayonesa
- 2 cucharadas de crema de leche
- 1 cucharada de licor, como brandy, coñac o ron
- 1 cucharadita de salsa negra
- ½ cucharadita de sal
- ¼ cucharadita de pimienta
- ¼ cucharadita de ají`,
    preparation: `1. Bate la mayonesa hasta que esté cremosa.
2. Agrega el resto de los ingredientes y mezcla bien.`,
    createdAt: 9,
  },
  {
    id: "seed-mayonesa-casera",
    name: "Mayonesa casera",
    category: "bases",
    methods: ["licuadora"],
    time: "5 min",
    ingredients: `- 1 huevo
- 1 cucharada de jugo de limón
- 1 taza de aceite
- ¼ taza de cebolla cabezona picada
- ¼ cucharadita de pimienta
- ½ cucharadita de sal`,
    preparation: `1. Agrega el huevo en la licuadora y bate bien.
2. Agrega la cebolla y mezcla.
3. Agrega el aceite poco a poco sin dejar de batir.
4. Agrega el limón, la pimienta y la sal.`,
    createdAt: 10,
  },
  {
    id: "seed-mayonesa-ajo",
    name: "Mayonesa de ajo",
    category: "bases",
    methods: ["licuadora"],
    time: "10 min",
    ingredients: `- 2 huevos
- ½ taza de cilantro
- ¼ taza de vinagre
- 1 cucharadita de sal
- 1 cucharada de azúcar
- 1 cucharadita de mostaza
- 1 cucharada de alcaparras (opcional)
- 1½ tazas de aceite
- 4 dientes de ajo`,
    preparation: `1. Mezcla todos los ingredientes en la licuadora.
2. Licua hasta que la mezcla emulsione y espese.`,
    createdAt: 11,
  },
  {
    id: "seed-salsa-mil-islas",
    name: "Salsa mil islas",
    category: "bases",
    methods: ["sincoccion"],
    time: "10 min",
    ingredients: `- 1 taza de mayonesa
- ½ taza de salsa chili
- 3 huevos duros picados
- ½ taza de pepinos encurtidos picados
- ⅓ taza de apio picado
- ½ taza de pimentón verde picado
- ¼ taza de cebolla cabezona picada`,
    preparation: `1. Mezcla todos los ingredientes hasta integrar bien.
2. Lleva a la nevera antes de servir.`,
    createdAt: 12,
  },
  {
    id: "seed-salsa-tartara",
    name: "Salsa tártara",
    category: "bases",
    methods: ["sincoccion"],
    time: "10 min",
    ingredients: `- 1½ tazas de mayonesa
- 3 cucharadas de pepino cohombro encurtido picado
- 3 cucharadas de alcaparras picadas
- 1 cucharada de perejil picado
- 1 cucharada de cebolla cabezona picada
- 1 cucharadita de mostaza`,
    preparation: `1. Pica finamente todos los ingredientes.
2. Mezcla con la mayonesa hasta integrar.`,
    createdAt: 13,
  },
  {
    id: "seed-vinagreta",
    name: "Vinagreta",
    category: "bases",
    methods: ["sincoccion"],
    time: "5 min",
    ingredients: `- 1 cucharada de mostaza
- 1 diente de ajo
- 1 cucharada de mayonesa
- ¼ taza de cebolla cabezona picada
- ¼ taza de pimentón picado
- ¼ taza de vinagre
- 1 cucharadita de azúcar
- ½ cucharadita de sal
- ¼ taza de perejil picado`,
    preparation: `1. Pica finamente todos los ingredientes.
2. Mezcla hasta integrar bien.
3. Sirve con ensaladas.`,
    createdAt: 14,
  },
  {
    id: "seed-dip-queso",
    name: "Dip de queso",
    category: "bases",
    methods: ["sincoccion"],
    time: "5 min",
    ingredients: `- 1 taza de queso crema
- 1 cucharada de mayonesa
- ¼ cucharadita de pimienta
- 1 cucharadita de curry`,
    preparation: `1. Mezcla todos los ingredientes hasta obtener una mezcla uniforme.`,
    createdAt: 15,
  },
  {
    id: "seed-dip-queso-cheddar",
    name: "Dip de queso cheddar",
    category: "bases",
    methods: ["olla"],
    time: "15 min",
    ingredients: `- 2 cucharadas de mantequilla
- 2 cucharadas de harina
- ¾ cucharadita de sal
- 1/8 cucharadita de pimienta
- ¼ cucharadita de mostaza
- 1½ tazas de leche
- 2 tazas de queso Cheddar rallado`,
    preparation: `1. Derrite la mantequilla a fuego medio.
2. Agrega la harina, la sal, la pimienta y la mostaza.
3. Cocina mezclando hasta que espese.
4. Agrega la leche poco a poco sin dejar de revolver.
5. Incorpora el queso y mezcla hasta que se derrita.
6. Sirve caliente.`,
    createdAt: 16,
  },
  {
    id: "seed-pate-atun",
    name: "Paté de atún",
    category: "especiales",
    methods: ["licuadora"],
    time: "10 min",
    ingredients: `- 1 lata de atún
- ¼ taza de cebolla cabezona
- 2 cucharadas de mayonesa
- 1 cucharada de pimentón`,
    preparation: `1. Licua todos los ingredientes.
2. Lleva a la nevera antes de servir.`,
    createdAt: 17,
  },
  {
    id: "seed-pate-higados-pollo",
    name: "Paté de hígados de pollo",
    category: "especiales",
    methods: ["olla", "licuadora"],
    time: "25 min",
    ingredients: `- 1½ tazas de caldo de pollo
- 250 g de hígados de pollo
- 2 dientes de ajo
- ¼ taza de vino blanco
- 2 cucharadas de brandy
- 1 cucharada de mantequilla
- 1 hoja de laurel
- ½ taza de cebolla cabezona
- 1 cucharadita de pimienta
- 1 cucharadita de curry
- 1 cucharadita de sal`,
    preparation: `1. Cocina los hígados con el caldo, el ajo, el laurel, el curry, la cebolla y la pimienta durante 10 minutos.
2. Licua con un poco del caldo.
3. Agrega la mantequilla, el brandy y el vino.
4. Lleva a la nevera hasta que espese.`,
    createdAt: 18,
  },
  {
    id: "seed-hummus",
    name: "Hummus (crema de garbanzos)",
    category: "bases",
    methods: ["olla", "licuadora"],
    time: "1 hora 30 min (más remojo)",
    ingredients: `- 1½ tazas de garbanzos secos
- 1 hoja de laurel
- 1 cucharadita de sal
- 3 dientes de ajo
- Jugo de 1 limón
- ¼ taza de aceite de oliva
- ½ cucharadita de pimienta`,
    preparation: `1. Remoja los garbanzos en agua toda la noche.
2. Cocina con agua fresca, laurel y sal hasta que estén tiernos.
3. Escurre y guarda ½ taza del líquido.
4. Licua los garbanzos con el ajo, el jugo de limón y el líquido reservado.
5. Agrega el aceite poco a poco hasta lograr una textura cremosa.
6. Ajusta la sal y la pimienta.
7. Sirve con pan.`,
    createdAt: 19,
  },
  {
    id: "seed-queso-curry",
    name: "Queso al curry",
    category: "bases",
    methods: ["sincoccion", "licuadora"],
    time: "15 min",
    ingredients: `- 80 gramos de leche tibia
- 1 cucharadita de curry
- 250 gramos de queso crema`,
    preparation: `1. Calienta la leche hasta que esté tibia (no hirviendo).
2. Agrega el curry a la leche tibia.
3. Bate durante 2-3 minutos.
4. Cuela para eliminar grumos.
5. Agrega la mezcla colada al queso crema.
6. Bate hasta que quede bien integrado y cremoso.
7. Sirve como dip con vegetales crudos, crackers o como salsa para pollo y pescado.`,
    createdAt: 20,
  },
  {
    id: "seed-salsa-verde",
    name: "Salsa verde",
    category: "bases",
    methods: ["licuadora", "sincoccion"],
    time: "10 min",
    ingredients: `- 2 tazas de cilantro fresco bien compactado (hojas y tallos tiernos)
- ½ taza de cebolla larga picada (parte blanca y verde)
- 3 dientes de ajo
- ½ taza de aceite de oliva o aceite vegetal
- 3 cucharadas de vinagre blanco o jugo de limón
- 1 cucharadita de sal
- ½ cucharadita de pimienta negra
- 1 ají (opcional, para picante)
- 2 cucharadas de agua (para ajustar consistencia)`,
    preparation: `1. Lava muy bien el cilantro y escurre.
2. Corta la cebolla larga en trozos.
3. Pela los dientes de ajo.
4. Pon todos los ingredientes en la licuadora.
5. Licua a velocidad alta hasta obtener una salsa verde brillante y homogénea.
6. Prueba y ajusta sal, vinagre o picante según tu gusto.
7. Si queda muy espesa agrega agua de a cucharadas hasta la consistencia deseada.
8. Transfiere a un frasco de vidrio con tapa.
9. Refrigera hasta usar.`,
    createdAt: 21,
  },
  {
    id: "seed-ensalada-tornillos",
    name: "Ensalada de tornillos",
    category: "cuerpo",
    methods: ["olla", "sincoccion"],
    time: "30 min",
    ingredients: `- 500 g de pasta de tornillos de colores
- 1 pechuga de pollo cocida y cortada en cubos
- 1 naranja en gajos
- 1 taza de piña en cuadritos
- 1 taza de uvas
- 1 manzana en cuadritos
- 1 taza de mayonesa
- ¼ taza de leche
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Cocina la pasta según las instrucciones y deja enfriar en la nevera.
2. Mezcla la pasta con el pollo, la naranja, la piña, las uvas y la manzana.
3. Mezcla la mayonesa con la leche para aligerar la textura y agrega la sal y la pimienta.
4. Incorpora todo y mezcla bien.`,
    createdAt: 22,
  },
  {
    id: "seed-ensalada-pollo",
    name: "Ensalada de pollo",
    category: "cuerpo",
    methods: ["olla"],
    time: "45 min",
    ingredients: `- 2 pechugas grandes cocidas y desmechadas
- 1 taza de arvejas cocidas
- 1 taza de habichuelas cocidas y picadas
- 1 taza de zanahoria cocida y picada
- 1 taza de cebolla cabezona picada
- ½ taza de alcaparras
- ½ taza de encurtidos picados
- 1 taza de mayonesa
- 1 taza de crema de leche
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Cocina las pechugas y desméchalas.
2. Mezcla el pollo con las arvejas, las habichuelas, la zanahoria, la cebolla, las alcaparras y los encurtidos.
3. Agrega la mayonesa, la crema de leche, la sal y la pimienta.
4. Mezcla bien y sirve.`,
    createdAt: 23,
  },
  {
    id: "seed-ensalada-griega",
    name: "Ensalada griega",
    category: "cuerpo",
    methods: ["sincoccion"],
    time: "15 min",
    ingredients: `- 4 tazas de lechuga
- 2 tomates rebanados
- 1 pepino rebanado
- ½ taza de aceitunas negras
- 1 taza de yogurt natural sin azúcar
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Coloca la lechuga, los tomates, el pepino y las aceitunas en una bandeja.
2. Mezcla el yogurt con la sal y la pimienta.
3. Baña la ensalada con la mezcla y sirve.`,
    createdAt: 24,
  },
  {
    id: "seed-ensalada-papa",
    name: "Ensalada de papa",
    category: "cuerpo",
    methods: ["olla"],
    time: "40 min",
    ingredients: `- 2 kilos de papas
- 1 cucharadita de sal
- ½ taza de pimentón verde picado
- ¼ taza de pimentón rojo picado
- ½ manzana picada
- ½ taza de cebolla picada
- 5 huevos duros picados
- 1½ tazas de mayonesa`,
    preparation: `1. Hierve las papas hasta que estén blandas.
2. Escúrrelas y córtalas en pedazos.
3. Mezcla con el pimentón, la manzana, la cebolla y los huevos.
4. Agrega la mayonesa y mezcla bien.
5. Sirve.`,
    createdAt: 25,
  },
  {
    id: "seed-ensalada-repollo-pina",
    name: "Ensalada de repollo y piña",
    category: "cuerpo",
    methods: ["sincoccion"],
    time: "15 min",
    ingredients: `- 1 taza de piña en cuadritos
- 1 repollo mediano finamente picado
- ½ taza de apio picado
- 1 taza de crema de leche`,
    preparation: `1. Mezcla la piña, el repollo y el apio.
2. Agrega la crema de leche y mezcla bien.`,
    createdAt: 26,
  },
  {
    id: "seed-ensalada-waldorf",
    name: "Ensalada Waldorf",
    category: "cuerpo",
    methods: ["sincoccion", "licuadora"],
    time: "20 min",
    ingredients: `- 1 taza de apio picado
- 1 manzana verde en cubos
- 1 manzana roja en cubos
- ½ taza de uvas pasas
- ½ taza de nueces picadas
- 1 taza de crema de leche
- 2 cucharadas de azúcar
- 4 tazas de lechuga
- ½ taza de melocotones picados
- ¼ taza de cerezas`,
    preparation: `1. Bate la crema de leche con el azúcar hasta que espese.
2. Agrega el apio y las manzanas.
3. Incorpora las uvas pasas previamente hidratadas.
4. Agrega las nueces y mezcla.`,
    createdAt: 27,
  },
  {
    id: "seed-ensalada-papa-atun-carbonara",
    name: "Ensalada de papa con atún a la carbonara",
    category: "cuerpo",
    methods: ["olla", "sarten"],
    time: "40 min",
    ingredients: `- 1 taza de crema de leche
- 1 cucharadita de mostaza
- 100 g de tocino frito picado
- 1 kilo de papa blanca cocida en cuadros
- 2 tazas de brócoli cocido
- ½ taza de zanahoria rallada
- ¾ taza de apio picado
- ½ taza de pimiento picado
- 2 cucharadas de perejil picado
- 1 taza de arvejas cocidas
- 2 cucharadas de cebolla picada
- 2 latas de atún escurrido
- 4 hojas de lechuga
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Mezcla la crema de leche con el tocino.
2. Agrega la mostaza, la sal y la pimienta.
3. Incorpora el resto de los ingredientes y mezcla bien.
4. Sirve sobre las hojas de lechuga.`,
    createdAt: 28,
  },
  {
    id: "seed-tabule",
    name: "Tabule",
    category: "cuerpo",
    methods: ["sincoccion"],
    time: "30 min (más reposo)",
    ingredients: `- 4 tazas de perejil picado
- ¼ taza de hierbabuena picada
- 10 cebollines picados
- 5 tomates picados
- 2 cucharadas de cebolla cabezona picada
- 2 cucharadas de pimentón rojo picado
- 2 cucharadas de pimentón verde picado
- 2 cucharadas de apio picado
- 1 cucharada de pasta de tomate
- 4 cucharadas de salsa de tomate
- 1 taza de aceite de oliva
- 1 cucharada de trigo bulgur
- ¼ taza de cebolla larga picada
- Jugo de 3 limones
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Remoja el trigo en agua desde el día anterior.
2. Pica finamente todos los ingredientes y mezcla.
3. Agrega el perejil y el jugo de limón al final.
4. Mezcla bien y sirve.`,
    createdAt: 29,
  },
  {
    id: "seed-antipasto",
    name: "Antipasto",
    category: "especiales",
    methods: ["sarten"],
    time: "30 min",
    ingredients: `- 1 kilo de cebolla cabezona en tiras
- 5 pimentones rojos y verdes en tiras
- 1 taza de aceite de oliva
- 2 tazas de salsa de tomate
- 1 taza de encurtidos picados
- ½ taza de aceitunas rellenas
- 1 cucharada de azúcar
- 1 cucharadita de sal
- 4 latas de atún
- ½ cucharadita de ají`,
    preparation: `1. Sofríe la cebolla y el pimentón en el aceite hasta que estén suaves.
2. Agrega la salsa de tomate, el ají, el azúcar, la sal, las aceitunas y los encurtidos.
3. Incorpora el atún sin desmenuzar demasiado.
4. Cocina por unos minutos y retira del fuego.`,
    createdAt: 30,
  },
  {
    id: "seed-cazuela-hawaiana",
    name: "Cazuela hawaiana",
    category: "especiales",
    methods: ["olla", "sarten"],
    time: "30 min",
    ingredients: `- 500 g de salchichas tipo vienesa
- 250 g de tocineta
- ½ taza de pimentón picado
- ¼ taza de cebolla cabezona picada
- 1 cubo de caldo o 1 taza de caldo de pollo casero
- 1 taza de pasta de tomate
- 1 taza de piña en cuadritos con su jugo
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Hierve las salchichas durante 5 minutos.
2. Córtalas en tiras.
3. Sofríe la tocineta, el pimentón y la cebolla.
4. Agrega las salchichas, la pasta de tomate y el jugo de la piña.
5. Incorpora la piña, el caldo, la sal y la pimienta y cocina hasta que hierva.`,
    createdAt: 31,
  },
  {
    id: "seed-arroz-almendras",
    name: "Arroz con almendras",
    category: "plan",
    methods: ["olla", "sarten"],
    time: "1 hora",
    ingredients: `- 1 libra de arroz
- ½ libra de punta gorda picada
- 1 pechuga o 2 perniles de pollo
- ½ taza de cebolla cabezona picada
- 1 rama de apio picada
- 2 dientes de ajo picados
- 1 taza de almendras
- 1 cubo de pollo o 1 taza de caldo de pollo casero o base de pollo
- 1 cucharadita de sal
- ½ cucharadita de pimienta
- 2 cucharadas de mantequilla
- 4 tazas de agua`,
    preparation: `1. Cocina el pollo en el agua con la sal, la pimienta, la cebolla, el apio y el cubo de pollo, o con el caldo de pollo casero o base de pollo.
2. Cuando el pollo esté listo, sácalo y córtalo en trozos pequeños.
3. Sofríe la punta gorda en la mantequilla.
4. Agrega el ajo y un poco de cebolla y cocina hasta que empiece a dorar.
5. Incorpora el arroz y mezcla bien.
6. Agrega el caldo de cocción del pollo, completando con agua si hace falta, y cocina hasta que el arroz seque.
7. Dora las almendras aparte.
8. Sofríe un poco de cebolla adicional y agrega el pollo hasta que dore ligeramente.
9. Sirve el arroz cubierto con el pollo y las almendras.`,
    createdAt: 32,
  },
  {
    id: "seed-arroz-cilantro",
    name: "Arroz con cilantro",
    category: "cuerpo",
    methods: ["olla", "licuadora"],
    time: "30 min",
    ingredients: `- 200 g de arroz de grano largo
- 400 ml de caldo de ave o verduras, o ½ cubito de caldo disuelto en 400 ml de agua
- 2 cucharadas de aceite de oliva
- 1 manojo de cilantro, hojas y tallos
- 1 cebolla pequeña
- 1 diente de ajo
- 1 cucharadita de sal`,
    preparation: `1. Lava el arroz bajo agua corriente hasta que salga clara.
2. Escúrrelo bien.
3. Licua el cilantro con el caldo.
4. Sofríe la cebolla finamente picada en el aceite hasta que esté brillante.
5. Agrega el ajo triturado y cocina unos segundos.
6. Añade el arroz y mezcla bien.
7. Agrega el caldo con cilantro.
8. Cuando hierva, baja el fuego al mínimo.
9. Tapa y cocina durante 10 minutos.
10. Retira del fuego y deja reposar 10 minutos.
11. Airea el arroz con un tenedor antes de servir.`,
    createdAt: 33,
  },
  {
    id: "seed-arroz-coco",
    name: "Arroz con coco",
    category: "colombiano",
    methods: ["olla"],
    time: "45 min",
    ingredients: `- 1½ tazas de arroz
- 2 tazas de crema de coco
- 2 cucharadas de panela raspada
- ½ taza de pasas
- 1 cucharadita de sal
- 2 tazas de agua`,
    preparation: `1. Cocina la crema de coco sola hasta que tome un color oscuro.
2. Agrega el arroz, la panela, las pasas, la sal y el agua.
3. Cocina hasta que el líquido se reduzca.
4. Tapa y baja el fuego hasta que el arroz esté listo.`,
    createdAt: 34,
  },
  {
    id: "seed-arroz-coco-cocacola",
    name: "Arroz con coco y Coca Cola",
    category: "colombiano",
    methods: ["olla"],
    time: "1 hora",
    ingredients: `- 3 tazas de leche de coco, enlatada o fresca
- 2 tazas de arroz blanco de grano largo
- 1 cucharadita de sal
- 2 cucharadas de azúcar morena o blanca
- ⅓ taza de uvas pasas
- 2 tazas de agua
- 1 taza de bebida de cola`,
    preparation: `1. Vierte la leche de coco en una sartén o caldero grande y deja hervir a fuego alto.
2. Cuando hierva, reduce el calor a medio bajo y cocina revolviendo frecuentemente hasta que el líquido se reduzca y el coco tome color caramelo.
3. Agrega el arroz y revuelve bien con el coco.
4. Incorpora la sal, el azúcar y las uvas pasas.
5. Agrega el agua y la bebida de cola y deja hervir a fuego medio hasta que se evapore la mayor parte del líquido.
6. Tapa y cocina a fuego bajo durante 15 a 20 minutos, o hasta que el arroz esté listo.
7. Sirve caliente.`,
    createdAt: 35,
  },
  {
    id: "seed-arroz-chino",
    name: "Arroz chino",
    category: "plan",
    methods: ["olla", "sarten"],
    time: "1 hora 30 min",
    ingredients: `- 3 tazas de arroz
- 1½ tazas de salsa de soya china
- 4 pechugas de pollo cocidas y picadas
- 3 libras de carne de cerdo cocida y picada
- 2 libras de jamón picado
- 1 libra de tocineta picada
- 4 cucharadas de margarina
- ½ libra de fideos delgados
- ½ libra de pasas
- 1 apio grande picado
- 3 pimentones verdes picados
- 3 pimentones rojos picados
- 2 cebollas cabezonas blancas picadas
- 2 cebollas largas picadas
- 1 cucharada de sal
- 1 cucharadita de pimienta
- 1 cucharadita de adobo completo
- 6 tazas de agua`,
    preparation: `1. Cocina el arroz con el agua y resérvalo.
2. Cocina por separado el pollo y la carne de cerdo hasta que estén blandos y córtalos en trozos pequeños.
3. Fríe la tocineta hasta que esté dorada y resérvala.
4. Cocina los fideos en agua caliente, escúrrelos y córtalos en trozos si es necesario.
5. En una sartén grande o wok derrite la margarina.
6. Sofríe la cebolla cabezona, la cebolla larga, el apio y los pimentones hasta que estén suaves.
7. Agrega el pollo, la carne de cerdo, el jamón y la tocineta.
8. Incorpora los fideos y las pasas.
9. Agrega el arroz poco a poco, revolviendo bien.
10. Añade la salsa de soya, la sal, la pimienta y el adobo completo.
11. Mezcla hasta que todo quede bien integrado y caliente.`,
    createdAt: 36,
  },
  {
    id: "seed-arroz-lentejas",
    name: "Arroz de lentejas",
    category: "cuerpo",
    methods: ["olla", "sarten"],
    time: "1 hora",
    ingredients: `- 2 tazas de lentejas
- 2 cebollas cabezonas
- 1½ tazas de arroz
- 1 taza de fideos tostados en aceite
- 2 dientes de ajo
- 1 cucharadita de sal
- 3 tazas de agua
- 2 cucharadas de aceite`,
    preparation: `1. Cocina las lentejas hasta que estén blandas.
2. Agrega el arroz y los fideos tostados.
3. Sofríe 1 cebolla con el ajo en el aceite.
4. Agrega este sofrito a la olla junto con la sal y el agua.
5. Cocina hasta que el arroz seque.
6. Sofríe la cebolla restante con un poco de ajo y ponla por encima al servir.`,
    createdAt: 37,
  },
  {
    id: "seed-arroz-negro",
    name: "Arroz negro",
    category: "colombiano",
    methods: ["olla"],
    time: "30 min",
    ingredients: `- 2 tazas de arroz
- 3 tazas de Coca Cola
- 1 taza de agua
- 1 cucharada de sal
- 2 cucharadas de aceite
- ½ taza de pasas
- 2 cucharadas de quemado de panela`,
    preparation: `1. Sofríe el arroz en el aceite caliente.
2. Agrega el agua, la Coca Cola, la sal y el quemado de panela.
3. Cuando el arroz esté secando, agrega las pasas y mezcla.
4. Tapa y cocina hasta que el arroz abra.`,
    createdAt: 38,
  },
  {
    id: "seed-arroz-salvaje",
    name: "Arroz salvaje",
    category: "especiales",
    methods: ["olla", "sarten"],
    time: "40 min",
    ingredients: `- 1 taza de arroz salvaje
- 1 taza de arroz blanco
- ½ taza de cebolla blanca finamente picada
- 4 rebanadas de tocineta picada
- ½ taza de almendras trituradas
- 2 cucharadas de aceite de oliva
- 2½ tazas de agua
- 1 cucharadita de sal
- ½ cucharadita de pimienta`,
    preparation: `1. Cocina el arroz salvaje y el arroz blanco con el agua, la sal y la pimienta.
2. Sofríe la cebolla en el aceite de oliva hasta que esté suave.
3. Agrega la tocineta y cocina hasta que dore.
4. Incorpora el arroz cocido poco a poco, revolviendo para que no se pegue.
5. Dora las almendras aparte, sin dejar que se quemen.
6. Agrega las almendras al final y mezcla bien.`,
    createdAt: 39,
  },
  {
    id: "seed-molde-arroz-pollo",
    name: "Molde arroz con pollo",
    category: "plan",
    methods: ["olla", "horno"],
    time: "1 hora",
    ingredients: `- 3 cucharadas de aceite
- 3 tazas de arroz
- 6 cubos de caldo de gallina o 6 tazas de caldo de pollo casero o base de pollo
- 5 tazas de agua
- 1 taza de arveja verde desgranada
- ½ taza de pimentón picado
- 1 pollo adobado, cocido y cortado en trocitos
- 1 taza de queso parmesano
- 2 cucharadas de mantequilla`,
    preparation: `1. Sofríe en el aceite el arroz, la arveja y el pimentón.
2. Agrega el agua y los cubos de caldo, o el caldo de pollo casero o base de pollo.
3. Cocina como cualquier arroz seco.
4. Mezcla el arroz cocido con la mitad del queso.
5. En un refractario engrasado coloca una capa con la mitad del arroz.
6. Agrega una capa con la mitad del pollo y cúbrela con el resto del arroz.
7. Añade el resto del pollo y cubre con el queso restante.
8. Pon trocitos de mantequilla por encima.
9. Lleva al horno precalentado a 180°C (350°F) durante 20 minutos.`,
    createdAt: 40,
  },
  {
    id: "seed-paella-casera",
    name: "Paella casera",
    category: "plan",
    methods: ["olla", "sarten"],
    time: "1 hora 30 min",
    ingredients: `- 4 tazas de arroz
- 2 pechugas medianas
- 2 libras de costilla de cerdo
- 1 libra de langostinos
- 1 libra de almejas
- 1 libra de calamares
- ½ libra de chorizo cortado en rodajas
- 4 dientes de ajo machacados
- 1½ tazas de aceite
- 2 cebollas cabezonas picadas
- 1 pimentón rojo picado
- 2 cubos de caldo o 7 tazas de caldo casero
- 1 lata de arvejas
- 2 cucharaditas de sal
- 1 cucharadita de pimienta
- 2 cucharaditas de azafrán
- 3 hojas de laurel
- 1 ramita de tomillo
- 2 zanahorias ralladas
- ½ taza de jerez`,
    preparation: `1. Sofríe en el aceite las costillas de cerdo, el pollo y el chorizo.
2. Agrega la cebolla, el pimentón y el ajo.
3. Incorpora el arroz sin lavar.
4. Agrega los calamares y las almejas.
5. Prepara 7 tazas de caldo con los cubos, o usa caldo casero, y agrégalo.
6. Incorpora la sal, la pimienta, el azafrán, el laurel, el tomillo y la zanahoria.
7. Tapa y cocina durante 20 minutos.
8. Agrega los langostinos.
9. Añade el jerez y las arvejas.
10. Tapa nuevamente y cocina 10 minutos más.
11. Sirve caliente.`,
    createdAt: 41,
  },
  {
    id: "seed-frijoles",
    name: "Frijoles",
    category: "colombiano",
    methods: ["olla"],
    time: "2 horas",
    ingredients: `- 1 libra de fríjoles
- 2 cucharadas de ogao
- 1 plátano verde
- 1 zanahoria
- 1 papa
- 1 tomate
- Sal`,
    preparation: `1. Pon los fríjoles remojados desde la noche anterior en una olla con agua que los cubra.
2. Cuando hiervan agrega el plátano verde pelado y partido.
3. Cuando estén medio blandos agrega el ogao, la zanahoria rallada, la papa picada en cuadritos y el tomate picado.
4. Agrega sal y deja cocinar hasta que estén completamente blandos.`,
    createdAt: 42,
  },
  {
    id: "seed-garbanzos",
    name: "Garbanzos",
    category: "cuerpo",
    methods: ["olla"],
    time: "2 horas",
    ingredients: `- 1 libra de garbanzos
- 1 cucharada de bicarbonato
- 2 cucharadas de ogao
- Sal`,
    preparation: `1. Remoja los garbanzos desde la noche anterior con el bicarbonato.
2. Al día siguiente lávalos bien y ponlos a cocinar con agua que los cubra.
3. Cuando hiervan agrega el ogao y la sal.
4. Cocina hasta que estén blandos.`,
    createdAt: 43,
  },
  {
    id: "seed-lentejas",
    name: "Lentejas",
    category: "cuerpo",
    methods: ["olla"],
    time: "1 hora",
    ingredients: `- 1 libra de lentejas
- 2 cucharadas de ogao
- 1 zanahoria
- 1 papa
- 1 plátano verde
- Sal`,
    preparation: `1. Pon las lentejas en agua que las cubra.
2. Cuando hiervan agrega el plátano verde pelado y partido.
3. Cuando estén medio blandas agrega el ogao, la zanahoria rallada y la papa picada en cuadritos.
4. Agrega sal y cocina hasta que estén completamente blandas.`,
    createdAt: 44,
  },
  {
    id: "seed-albondigas-napolitanas",
    name: "Albóndigas napolitanas",
    category: "plan",
    methods: ["sarten", "olla"],
    time: "1 hora",
    ingredients: `- 1 libra de carne molida de ternera
- Perejil
- Sal y pimienta
- Salsa napolitana

Para la salsa napolitana:
- 2 cebollas cabezonas
- 2 dientes de ajo
- 1 cebolla larga
- 6 tomates maduros picados
- 2 cucharadas de pasta de tomate
- Sal y pimienta`,
    preparation: `1. Aliña la carne con sal, pimienta y perejil.
2. Arma albóndigas y fríelas.
3. Para la salsa sofríe la cebolla, agrega el ajo y el tomate.
4. Cocina con el resto de ingredientes.
5. Cocina las albóndigas con la salsa napolitana.`,
    createdAt: 45,
  },
  {
    id: "seed-carne-brasa",
    name: "Carne a la brasa",
    category: "plan",
    methods: ["olla"],
    time: "1 hora 30 min",
    ingredients: `- 1 kilo de carne
- 1 cebolla cabezona grande rayada
- 1 taza de tomates licuados
- ½ taza de apio picado
- ½ pimentón verde
- 1 taza de salsa de tomate
- 2 cucharadas de azúcar morena o panela raspada
- 3 gotas de ají
- ½ cucharadita de mostaza
- 3 tazas de caldo de cubo
- ¼ cucharadita de pimienta`,
    preparation: `1. En un recipiente grande dora la cebolla en aceite, preferiblemente de oliva.
2. Agrega el resto de ingredientes mezclando bien.
3. Tapa la olla y deja hervir.
4. Baja el fuego y deja 1 hora.
5. Agrega la mezcla a la carne.`,
    createdAt: 46,
  },
  {
    id: "seed-cerdo-agridulce",
    name: "Cerdo agridulce",
    category: "plan",
    methods: ["sarten"],
    time: "45 min",
    ingredients: `- Solomillo de cerdo en cubos de 2.5 cm
- Ajo prensado
- Raíz de jengibre
- Pimientos cortados
- Piña en cubitos
- Salsa de soja amarilla
- Salsa de soja regular
- Azúcar
- Zumo de lima
- Cebolleta picada fina
- Aceite`,
    preparation: `1. Corta la carne en cubos.
2. Prepara 5 tazoncitos: (1) ajo, jengibre y pimientos, (2) piña, (3) las dos salsas de soja, (4) azúcar, salsa soja y jugo de lima, (5) cebolleta.
3. Calienta el sartén o wok hasta que gotas de agua perleen.
4. Echa aceite y carne en 2-3 porciones para que no sude.
5. Cuando dore agrega el tazón 1 y saltea 2 minutos revolviendo vigorosamente.
6. Integra el tazón 2, después 30 segundos el tazón 3.
7. Mantén el calor fuerte y revuelve 1 minuto.
8. A los primeros signos de evaporación incorpora el tazón 4 y retira del fuego.
9. Sirve con fideos asiáticos o arroz Basmati.`,
    createdAt: 47,
  },
  {
    id: "seed-lengua-salsa",
    name: "Lengua en salsa",
    category: "plan",
    methods: ["olla", "sarten"],
    time: "3 horas",
    ingredients: `- 1 lengua de res
- 1 taza de ogao
- 1½ botella de cerveza
- 3 hojas de laurel
- 1 cucharada de tomillo
- 3 cucharadas de mantequilla
- 3 cucharadas de aceite
- 2 cucharadas de harina de trigo
- 2 cucharadas de cilantro picado finamente`,
    preparation: `1. Golpea un poco la lengua y cocina con ogao, cerveza, laurel, tomillo, sal y pimienta en olla a presión 45 minutos (o olla corriente 2½ horas).
2. Saca y pela.
3. Corta en rebanadas y cubre con harina.
4. Fríe en mezcla de aceite y mantequilla hasta dorar.
5. Lleva a sartén honda y cubre con la salsa.
6. Lleva al fuego 10-15 minutos.
7. Sirve rociada con cilantro y acompañada con arroz blanco o papas al vapor.`,
    createdAt: 48,
  },
  {
    id: "seed-lomo-cerdo-acaramelado",
    name: "Lomo de cerdo acaramelado",
    category: "plan",
    methods: ["horno"],
    time: "2 horas (con marinado víspera)",
    ingredients: `- 1 lomo de cerdo
- Panela raspada
- Coca Cola
- Ajos
- Sal y pimienta`,
    preparation: `1. Limpia bien el lomo y aliña la víspera con ajo, sal, pimienta y Coca Cola.
2. Cubre con panela raspada y lleva al horno a calor moderado.
3. Remoja periódicamente con Coca Cola.`,
    createdAt: 49,
  },
  {
    id: "seed-lomo-cerdo-duraznos",
    name: "Lomo de cerdo con duraznos",
    category: "plan",
    methods: ["olla", "horno"],
    time: "1 hora 30 min (con marinado víspera)",
    ingredients: `- 1 lomo de cerdo de 3 libras
- Cebolla cabezona
- 1 lata de crema de leche
- 1 lata de duraznos
- 1 cubo de caldo de gallina
- 1 cucharada de quemado de panela
- 3 cucharadas de maicena
- Mostaza
- Sal y pimienta al gusto`,
    preparation: `1. Adoba el lomo la víspera con cebolla cabezona, suficiente mostaza y aliños.
2. Al otro día sofríe y pon a cocinar con 1 taza de caldo, jugo de duraznos, quemado de panela, crema de leche y maicena hasta cocer.
3. Antes de bajarlo agrega sal.
4. Una vez cocido parte en rebanadas y coloca en molde para horno.
5. Dora bañado en la salsa.
6. Sirve adornado con rebanadas de durazno.
7. Se puede preparar con piña en lugar de duraznos.`,
    createdAt: 50,
  },
  {
    id: "seed-muchacho-relleno",
    name: "Muchacho relleno",
    category: "plan",
    methods: ["olla"],
    time: "3 horas (con marinado víspera)",
    ingredients: `- 1 muchacho de 6 libras
- ½ libra de tocineta
- 2 zanahorias grandes
- 2 gajos de cebolla larga
- ¼ libra de habichuelas
- 1 frasco de aceitunas sin semilla
- 6 dientes de ajo
- 1 nuez moscada
- 2 cucharaditas de sal de nitro
- 1 cucharadita de pimienta
- 1 cucharadita de cominos
- 6 cucharadas de sal
- 3 litros de agua
- 1 cebolla cabezona
- 1 hoja de laurel
- 1 rama de tomillo grande`,
    preparation: `1. Lava y limpia bien el muchacho.
2. Muele aliños y revuelve en pocillo de vinagre con sales.
3. Frota el muchacho.
4. Con el resto revuelve tocineta tajada, cebolla pelada, zanahoria partida, habichuelas y demás relleno.
5. Con cuchillo abre huecos a lo largo del muchacho sin partirlo e introduce el relleno.
6. Reposa hasta el día siguiente.
7. Cocina en olla grande con 3 litros de agua, laurel, tomillo y cebolla en cuatro.
8. Hierve hasta ablandar.
9. Sirve así o dora al horno.`,
    createdAt: 51,
  },
  {
    id: "seed-osso-buco",
    name: "Osso Buco",
    category: "plan",
    methods: ["olla"],
    time: "2 horas (con marinado víspera)",
    ingredients: `- 1 pierna de ternera pequeña u osso bucos cortados
- 6 cucharadas de aceite
- 3 cucharadas de mantequilla
- 1 copa de vino blanco
- 6 tomates grandes pelados
- 1 cebolla cabezona en rodajas
- 2 dientes de ajo finamente picados
- 3 cucharadas de extracto de tomate disuelto en 1 taza de caldo
- ½ cucharadita de orégano
- Sal y pimienta`,
    preparation: `1. La víspera adoba los osso bucos con cebolla en rodajas, ajo, pimienta y orégano.
2. En cacerola pon aceite y mantequilla.
3. Enharina ligeramente los osso bucos y fríe.
4. Cuando estén dorados agrega copa de vino blanco.
5. Antes de servir espolvorea perejil picado.`,
    createdAt: 52,
  },
  {
    id: "seed-pernil-cerdo",
    name: "Pernil de Cerdo",
    category: "plan",
    methods: ["horno"],
    time: "4 horas (con marinado víspera)",
    ingredients: `- 1 pernil de cerdo
- Aliños enteros
- Nuez moscada
- Ajos
- Sal
- Clavos de olor`,
    preparation: `1. Limpia bien el pernil y moja 2 horas en agua fría.
2. Seca y aliña.
3. Corta la piel en cuadritos y pon un clavo de olor en el centro de cada cuadro.
4. Chuza bien para que penetre el aliño.
5. Reposa toda la noche en nevera.
6. Al día siguiente asa en horno a calor moderado hasta que al chuzarlo no salga sangre.
7. Sube el calor para dorar.
8. Mientras se cocina rocía con jugo de piña y la grasa que suelta.
9. Sirve con salsa de pasas o higos.`,
    createdAt: 53,
  },
  {
    id: "seed-posta-negra",
    name: "Posta Negra",
    category: "plan",
    methods: ["olla"],
    time: "1 hora 30 min (con marinado noche anterior)",
    ingredients: `- 2 libras de muchacho
- 2 cebollas cabezonas rojas
- 2 cucharadas de aceite
- 2 cucharadas de salsa negra
- Sal y pimienta al gusto
- Clavos de olor al gusto
- 2 pimentones
- 3 cucharadas de panela raspada`,
    preparation: `1. Noche anterior adoba el muchacho con sal, pimienta, salsa negra y entierra 6 clavos de olor.
2. Al momento de prepararlo maja los ajos y corta cebolla a juliana.
3. Calienta aceite en olla a presión y sofríe a fuego medio ajo, cebolla y ají.
4. Incorpora el muchacho hasta dorar por todos sus lados.
5. Agrega panela raspada y agua hasta cubrir.
6. Tapa la olla y desde que coge presión cocina 40 minutos.
7. Cuando esté blanda saca y parte en rodajas no muy gruesas.
8. Baña con la salsa que queda en la olla.
9. Acompaña con arroz con coco y ensalada.`,
    createdAt: 54,
  },
  {
    id: "seed-sobrebarriga",
    name: "Sobrebarriga",
    category: "plan",
    methods: ["olla", "horno"],
    time: "2 horas 30 min",
    ingredients: `- 2 libras de sobrebarriga
- 2 cebollas cabezonas
- 4 tomates
- 1 pimentón
- 2 zanahorias
- Cerveza
- Sal, pimienta, comino
- Hogao`,
    preparation: `1. Cocina la sobrebarriga en olla a presión con sal, pimienta y comino hasta que esté blanda (aproximadamente 1 hora).
2. Saca y corta en tajadas delgadas.
3. Pica las cebollas, los tomates, el pimentón y las zanahorias.
4. En un refractario coloca una capa de sobrebarriga, una de las verduras picadas y así sucesivamente.
5. Agrega cerveza y hogao.
6. Lleva al horno a 175°C (350°F) por 1 hora.
7. Sirve con papas saladas y ensalada.`,
    createdAt: 55,
  },
  {
    id: "seed-lomo-cerdo-airfryer",
    name: "Lomo de Cerdo",
    category: "plan",
    methods: ["airfryer"],
    time: "1 hora",
    ingredients: `- 1 lomo de cerdo de 1 a 1.5 libras
- 1 cucharadita de aceite
- Sal al gusto
- Pimienta al gusto
- Ajo en polvo al gusto
- 1 cucharadita de miel o salsa BBQ (opcional)`,
    preparation: `1. Saca el lomo de la nevera y deja reposar 20 minutos antes de cocinar.
2. Seca bien con papel de cocina.
3. Unta con el aceite y sazona con sal, pimienta y ajo en polvo.
4. Si quieres ese toque especial agrega una capa ligera de miel o BBQ.
5. Coloca en la rejilla del Air Fryer (no en molde).
6. Cocina a 180°C (360°F) durante 12 minutos.
7. Abre, voltea con cuidado.
8. Cocina 10-13 minutos más.
9. Para dorar mejor sube a 200°C (400°F) por 3-4 minutos finales.
10. Retira y deja reposar 5-7 minutos antes de cortar.`,
    createdAt: 56,
  },
  {
    id: "seed-lomo-cerdo-cerezas",
    name: "Lomo de Cerdo en Salsa de Cerezas",
    category: "plan",
    methods: ["sarten", "olla"],
    time: "2 horas 30 min (incluye marinado)",
    ingredients: `Para el lomo:
- 4 filetes de lomo de cerdo (o 1 lomo completo de 600 gramos)
- 2 naranjas
- 1 limón
- 5 cucharadas de miel
- 1 cucharadita de aceite de oliva
- Sal y pimienta al gusto

Para la salsa de cerezas:
- 300 gramos de cerezas frescas o congeladas (sin hueso)
- 2 cucharadas de whisky (opcional)
- Hojas de perejil fresco para decorar`,
    preparation: `Marinado:
1. Exprime 1 naranja completa y medio limón en un cazo.
2. Agrega 4 cucharadas de miel.
3. Lleva a ebullición y apaga el fuego.
4. Deja enfriar el aliño.
5. Con una brocha de silicona pinta los filetes de lomo con el aliño.
6. Refrigera durante 2 horas.

Salsa de cerezas:
7. Lava las cerezas, córtalas por la mitad y retira los huesos.
8. En un cazo pequeño exprime la naranja restante y el medio limón que queda.
9. Agrega las cerezas, 1 cucharada de miel y el whisky si lo usas.
10. Cocina a fuego lento durante 5-7 minutos hasta que las cerezas se ablanden.
11. Reserva la salsa caliente.

Cocción del lomo:
12. Calienta el aceite de oliva en un sartén a fuego medio-alto.
13. Saca los filetes del marinado (reserva el marinado).
14. Cocina los filetes 2-3 minutos por lado hasta dorar.
15. Sazona con sal y pimienta.
16. Baja el fuego, agrega el marinado reservado.
17. Cocina 2-3 minutos más hasta que el lomo esté cocido pero jugoso.

Emplatado:
18. Coloca los filetes en un plato.
19. Baña con la salsa de cerezas.
20. Decora con cerezas enteras y hojas de perejil fresco.`,
    createdAt: 57,
  },
  {
    id: "seed-pollo-naranja",
    name: "Pollo a la Naranja",
    category: "plan",
    methods: ["horno"],
    time: "1 hora 30 min",
    ingredients: `- 1 pollo entero
- 4 naranjas
- 2 cucharadas de miel
- 2 cucharadas de mostaza
- Sal y pimienta
- Mantequilla`,
    preparation: `1. Aliña el pollo con sal, pimienta y el jugo de 2 naranjas.
2. Deja marinar 1 hora.
3. Mezcla la miel con la mostaza y el jugo de las otras 2 naranjas.
4. Unta el pollo con mantequilla y coloca en refractario.
5. Baña con la mezcla de miel y naranja.
6. Hornea a 175°C (350°F) por 1 hora bañando constantemente con su jugo.
7. Sirve decorado con rodajas de naranja.`,
    createdAt: 58,
  },
  {
    id: "seed-pollo-ajillo",
    name: "Pollo al Ajillo",
    category: "plan",
    methods: ["sarten"],
    time: "45 min",
    ingredients: `- 8 presas de pollo
- 1 cabeza de ajo
- ½ taza de aceite de oliva
- 1 taza de vino blanco
- Perejil picado
- Sal y pimienta`,
    preparation: `1. Aliña las presas con sal y pimienta.
2. Pela y lamina los dientes de ajo.
3. En un sartén grande calienta el aceite de oliva.
4. Dora las presas de pollo por ambos lados.
5. Agrega los ajos laminados y sofríe hasta que estén dorados.
6. Agrega el vino blanco y deja reducir a fuego medio.
7. Cocina 20 minutos hasta que el pollo esté cocido.
8. Espolvorea con perejil picado antes de servir.`,
    createdAt: 59,
  },
  {
    id: "seed-pollo-asado",
    name: "Pollo Asado",
    category: "plan",
    methods: ["horno"],
    time: "1 hora 30 min (con marinado víspera)",
    ingredients: `- 1 pollo entero
- Jugo de 2 limones
- 4 dientes de ajo machacados
- 1 cucharada de orégano
- 1 cucharada de tomillo
- Sal y pimienta
- Aceite de oliva`,
    preparation: `1. Mezcla el jugo de limón, ajo, orégano, tomillo, sal, pimienta y aceite.
2. Adoba el pollo por dentro y por fuera.
3. Deja marinar en la nevera toda la noche.
4. Coloca el pollo en refractario.
5. Hornea a 190°C (375°F) por 1 hora y 15 minutos.
6. Baña con sus jugos cada 20 minutos.
7. Sirve cuando esté dorado y la piel crujiente.`,
    createdAt: 60,
  },
  {
    id: "seed-pollo-champinones",
    name: "Pollo con Champiñones",
    category: "plan",
    methods: ["sarten", "olla"],
    time: "1 hora",
    ingredients: `- 6 presas de pollo
- 1 libra de champiñones frescos
- 1 cebolla cabezona
- 2 dientes de ajo
- 1 taza de crema de leche
- ½ taza de vino blanco
- 2 cucharadas de mantequilla
- Sal y pimienta`,
    preparation: `1. Aliña las presas con sal y pimienta.
2. Dora en mantequilla hasta sellar.
3. Retira y reserva.
4. En la misma sartén sofríe la cebolla y el ajo picados.
5. Agrega los champiñones laminados.
6. Regresa el pollo a la sartén.
7. Agrega el vino blanco y deja reducir.
8. Agrega la crema de leche.
9. Cocina a fuego lento 30 minutos.
10. Sirve con arroz blanco.`,
    createdAt: 61,
  },
  {
    id: "seed-pollo-mostaza",
    name: "Pollo en Salsa de Mostaza",
    category: "plan",
    methods: ["sarten"],
    time: "45 min",
    ingredients: `- 8 presas de pollo
- 3 cucharadas de mostaza Dijon
- 1 taza de crema de leche
- ½ taza de caldo de pollo
- 1 cebolla cabezona
- 2 cucharadas de mantequilla
- Sal y pimienta`,
    preparation: `1. Aliña las presas con sal y pimienta.
2. Dora en mantequilla hasta sellar.
3. Retira y reserva.
4. Sofríe la cebolla picada en la misma sartén.
5. Agrega la mostaza y mezcla bien.
6. Agrega el caldo y la crema de leche.
7. Regresa el pollo a la sartén.
8. Cocina a fuego lento 25 minutos.
9. Sirve con pasta o arroz.`,
    createdAt: 62,
  },
  {
    id: "seed-pollo-vino",
    name: "Pollo al Vino",
    category: "plan",
    methods: ["olla"],
    time: "1 hora",
    ingredients: `- 4 cuartos traseros de pollo
- 3 cebollas
- 4 dientes de ajo
- ¼ pimiento verde
- 250 ml de vino tinto
- 300 ml de caldo de pollo
- 1 cucharadita de hierbas provenzales
- 1 cucharadita de pimentón dulce
- 1 hoja de laurel
- 50 ml de aceite de oliva virgen
- Sal al gusto
- Pimienta al gusto`,
    preparation: `1. Sazona con sal y pimienta los cuartos traseros de pollo.
2. Calienta el aceite en una cazuela con fondo antiadherente.
3. Dora los cuartos traseros de pollo por fuera durante 2-3 minutos por lado para sellarlos.
4. Retira el pollo de la cazuela y reserva.
5. Tritura los ajos y parte en trozos finos el pimiento verde y las cebollas.
6. Deposita todas las verduras en un recipiente y combina con el pimentón y las hierbas provenzales.
7. En la misma cazuela donde doraste el pollo agrega las verduras preparadas.
8. Saltea durante 2 minutos hasta que las cebollas se pongan transparentes.
9. Si queda muy seco agrega 2 cucharadas de caldo de pollo.
10. Vierte el vino tinto, el resto del caldo de pollo y la hoja de laurel.
11. Regresa los cuartos traseros de pollo a la cazuela.
12. Baja el fuego y cocina tapado durante 20 minutos.
13. Retira del fuego y deja reposar 5 minutos antes de servir.`,
    createdAt: 63,
  },
  {
    id: "seed-pollo-pina-miel",
    name: "Pollo con Salsa de Piña y Miel",
    category: "plan",
    methods: ["sarten"],
    time: "45 min",
    ingredients: `- 4 pechugas de pollo (600-800 gramos total)
- 250 gramos de piña natural
- 3 dientes de ajo
- 15-20 gramos de jengibre fresco
- 60 gramos de miel
- 90 ml de salsa de soja
- 4 ramitas de cilantro fresco
- 1 guindilla (opcional)
- 1 cucharada de aceite de sésamo (opcional)
- ½ cucharadita de sal
- Pimienta negra al gusto
- Aceite de oliva virgen extra`,
    preparation: `Salsa:
1. Corta la piña en trozos muy pequeños.
2. Pela y pica muy pequeños los dientes de ajo y el jengibre.
3. Pon la piña, el ajo y el jengibre en un cuenco.
4. Agrega la miel y la salsa de soja.
5. Pica el cilantro finamente e incorpóralo.
6. Agrega la guindilla (entera si quieres sabor suave, picada si quieres más picante).
7. Agrega el aceite de sésamo si lo usas.
8. Sazona con sal y pimienta negra.
9. Mezcla bien y prueba para rectificar sabores.
10. Reserva la salsa.

Pollo:
11. Retira la posible grasa de las pechugas.
12. Unta las pechugas con aceite de oliva.
13. Calienta un sartén grande a fuego medio.
14. Cocina las pechugas 6-7 minutos por lado hasta que estén doradas por fuera y cocidas por dentro.
15. Cuando falten 5 minutos incorpora toda la salsa de piña al sartén.
16. Sube el fuego para que la salsa reduzca y caramelice.
17. Voltea las pechugas en la salsa para que se cubran bien.
18. Retira la guindilla si la pusiste entera.
19. Sirve inmediatamente.`,
    createdAt: 64,
  },
  {
    id: "seed-pollo-thai",
    name: "Pollo Thai",
    category: "plan",
    methods: ["olla", "sarten"],
    time: "1 hora",
    ingredients: `Para el pollo:
- 1.5 kilos de muslos de pollo deshuesados y sin piel
- 4 dientes de ajo pelados
- 5 centímetros de jengibre fresco (30 gramos) cortado en pedazos
- 1 cebolla cabezona pequeña pelada y cortada
- 1 cucharada de aceite de oliva
- 2 cucharadas de mantequilla
- 2 latas de leche de coco (400 ml cada una) sin agitar
- 2 cucharadas de maicena
- 1 lata de mazorcas de maíz baby
- 1 taza de guisantes o vegetales congelados

Para la mezcla de especias:
- ½ cucharadita de pimienta molida
- 1 cucharadita de comino molido
- 1 cucharadita de cilantro molido
- 1½ cucharadita de cúrcuma molida
- 1 cucharadita de sal`,
    preparation: `1. Combina todos los ingredientes de la mezcla de especias y reserva.
2. En procesador de alimentos o licuadora mezcla el ajo, el jengibre y la cebolla hasta formar una pasta.
3. En un sartén o una olla grande calienta el aceite de oliva y derrite la mantequilla.
4. Agrega la pasta de ajo, jengibre y cebolla y revuelve bien.
5. Cocina 2-3 minutos revolviendo constantemente.
6. Agrega la mezcla de especias y cocina 2-3 minutos más.
7. Corta los muslos de pollo en 4 partes cada uno.
8. Agrega el pollo y sella ligeramente por todos lados cubriendo con la mezcla de especias.
9. Abre las latas de leche de coco sin agitar.
10. Retira con cuchara la crema espesa que está arriba (aproximadamente 1 taza) y reserva.
11. Vierte la leche de coco restante sobre el pollo (debe apenas cubrirlo).
12. Escurre las mazorcas de maíz y agrégalas.
13. Cocina a fuego medio 20 minutos hasta que el pollo esté tierno.
14. Disuelve la maicena en la crema de coco reservada y agrega a la olla.
15. Incorpora los guisantes o vegetales congelados.
16. Cocina 5 minutos más revolviendo hasta que la salsa espese.
17. Sirve con arroz jazmín o basmati.`,
    createdAt: 65,
  },
  {
    id: "seed-pollo-vegetales",
    name: "Pollo con Vegetales",
    category: "cuerpo",
    methods: ["sarten"],
    time: "30 min",
    ingredients: `- 500 gramos de pechugas de pollo sin hueso y sin piel
- 1 cebolla mediana cortada en juliana
- 2 dientes de ajo finamente picados
- 1 taza de pimiento cortado en juliana (mezcla de colores)
- ½ taza de brócoli en floretes pequeños
- ½ taza de coliflor en floretes pequeños
- 1 taza de zanahorias cortadas en julianas finas
- 2 cucharaditas de jengibre rallado
- ½ taza de caldo de pollo
- 1 cucharada de salsa de soja
- 1 cucharadita de maicena
- 2 cucharadas de aceite
- Sal y pimienta al gusto`,
    preparation: `1. Corta las pechugas de pollo en tiras.
2. Sazona las tiras con sal y pimienta.
3. Calienta el aceite en un wok o sartén grande a fuego alto.
4. Agrega las tiras de pollo y cocina removiendo constantemente hasta que se doren por completo (5-6 minutos).
5. Retira el pollo del sartén y reserva.
6. En el mismo sartén agrega la cebolla y el ajo.
7. Saltea 2 minutos.
8. Agrega los pimientos, el brócoli, la coliflor y las zanahorias.
9. Cocina 8-10 minutos removiendo frecuentemente hasta que los vegetales estén tiernos pero crujientes.
10. En un recipiente aparte mezcla la salsa de soja, el caldo de pollo, la maicena y el jengibre rallado.
11. Vierte esta mezcla sobre las verduras.
12. Remueve constantemente hasta que la salsa hierva y espese (2-3 minutos).
13. Regresa las tiras de pollo al sartén con los vegetales.
14. Cocina 3 minutos más removiendo para integrar todo.
15. Sirve inmediatamente con arroz blanco o arroz frito.`,
    createdAt: 66,
  },
  {
    id: "seed-chicharrones-pollo",
    name: "Chicharrones de Pollo",
    category: "rapido",
    methods: ["airfryer"],
    time: "25 min",
    ingredients: `- 600 gramos de pollo (pechuga o contramuslo) cortado en trozos pequeños
- 1 huevo
- ½ taza de harina de trigo
- ¼ taza de maicena
- 1 cucharadita de sal
- ½ cucharadita de pimienta
- 1 cucharadita de ajo en polvo
- ½ cucharadita de paprika (opcional)
- Spray de aceite (opcional)`,
    preparation: `1. Corta el pollo en trozos tipo bocado.
2. Sazona los trozos con sal, pimienta, ajo en polvo y paprika.
3. Bate el huevo en un recipiente.
4. En otro recipiente mezcla la harina con la maicena.
5. Pasa cada trozo de pollo por el huevo batido.
6. Luego cúbrelo con la mezcla de harina y maicena.
7. Sacude el exceso de harina (importante para que queden crujientes).
8. Coloca los trozos en la rejilla del Air Fryer sin amontonar.
9. Si deseas aplica un spray ligero de aceite para mejor dorado.
10. Cocina a 190°C (375°F) durante 7-8 minutos.
11. Abre y voltea los trozos con cuidado.
12. Cocina 5-7 minutos más.
13. Si los quieres más crujientes sube a 200°C (400°F) por 2-3 minutos finales.
14. Retira cuando estén dorados y crujientes.
15. Sirve inmediatamente con limón, salsa o solos.`,
    createdAt: 67,
  },
  {
    id: "seed-chicken-shawarma",
    name: "Chicken Shawarma",
    category: "plan",
    methods: ["sarten"],
    time: "1 hora (incluye marinado)",
    ingredients: `- 1 pechuga de pollo
- 200 gramos de lechuga romana
- 100 gramos de cilantro
- 3 tomates
- 1 cebolla
- 2 dientes de ajo
- 1 cucharada de curry
- ½ cucharada de comino
- Zumo de ½ limón
- Pan de pita
- Salsa tahini
- Aceite de oliva
- Sal`,
    preparation: `1. Corta en rodajas finas los tomates, la lechuga romana y la cebolla.
2. Pica finamente los ajos y el cilantro.
3. Corta la pechuga de pollo en tiras.
4. En un recipiente agrega el pollo con el zumo de limón, el curry, 2 cucharadas de aceite de oliva, el comino, los ajos y sal al gusto.
5. Mezcla bien y deja reposar 30 minutos (ideal 2 horas).
6. Cocina el pollo sazonado en una parrillera o plancha bien caliente hasta dorar en ambos lados.
7. Pasa los panes de pita por la parrillera solo hasta calentar y dorar ligeramente.
8. En cada pan agrega el pollo, la lechuga romana, los tomates, la cebolla y el cilantro picado.
9. Agrega salsa tahini al gusto.
10. Enrolla y sirve.`,
    createdAt: 68,
  },
  {
    id: "seed-lo-mein-pollo",
    name: "Lo Mein de Pollo",
    category: "plan",
    methods: ["olla", "sarten"],
    time: "1 hora 30 min (incluye marinado)",
    ingredients: `- 4 pechugas de pollo
- 125 ml de salsa de soja (60 ml para marinado + 65 ml para salsa)
- 3 cucharadas de vinagre de arroz
- 310 ml de caldo de pollo
- 250 ml de agua
- 1 cucharadita de azúcar
- 2 cucharadas de maicena
- 350 gramos de fideos noodles
- 1 cucharadita de jengibre rallado
- 1 diente de ajo picado
- 3 cebollas verdes
- 1 cucharada de aceite de sésamo o girasol
- 1 cucharadita de curry en polvo
- Pimienta negra al gusto`,
    preparation: `Marinado:
1. Corta el pollo en trozos medianos.
2. Mezcla 60 ml de salsa de soja con 1½ cucharada de vinagre y ½ cucharadita de azúcar.
3. Baña el pollo con esta mezcla y deja reposar en la nevera 1 hora.

Salsa:
4. En un recipiente combina el caldo de pollo, el agua, el aceite de sésamo, el curry, la pimienta negra, el resto del azúcar, el resto del vinagre y los 65 ml restantes de salsa de soja.
5. Disuelve 1 cucharada de maicena en 2 cucharadas de agua y agrega a la mezcla anterior.
6. Reserva.

Cocción:
7. Hierve agua en una olla y cocina los fideos noodles 6 minutos.
8. Escurre y reserva.
9. En un wok o sartén grande calienta un poco de aceite de sésamo.
10. Dora el pollo marinado por todos lados.
11. Agrega el jengibre rallado, el ajo y las cebollas verdes picadas.
12. Saltea 1 minuto.
13. Agrega la mezcla de salsa.
14. Cocina 2-3 minutos revolviendo hasta que espese ligeramente.
15. Agrega los fideos escurridos y mezcla bien.
16. Sirve caliente.`,
    createdAt: 69,
  },
  {
    id: "seed-pavo-relleno",
    name: "Pavo Relleno",
    category: "especiales",
    methods: ["horno"],
    time: "4 horas (con marinado víspera)",
    ingredients: `- 1 pavo de 12 libras
- 2 tazas de pan tajado en cuadritos
- 1 libra de carne molida
- 1 taza de pasas
- 1 taza de ciruelas pasas
- 1 taza de almendras
- 2 manzanas picadas
- 2 cebollas cabezonas
- Apio picado
- Mantequilla
- Sal, pimienta, orégano, tomillo`,
    preparation: `1. Aliña el pavo por dentro y por fuera la víspera con sal, pimienta, orégano y tomillo.
2. Sofríe la cebolla y el apio en mantequilla.
3. Agrega la carne molida y cocina.
4. Agrega el pan, las pasas, las ciruelas, las almendras y las manzanas.
5. Mezcla bien y rellena el pavo.
6. Cierra con palillos o hilo.
7. Unta con mantequilla.
8. Hornea a 165°C (325°F) calculando 20 minutos por libra.
9. Baña constantemente con sus jugos.`,
    createdAt: 70,
  },
  {
    id: "seed-pechuga-rellena",
    name: "Pechuga Rellena",
    category: "plan",
    methods: ["horno"],
    time: "1 hora",
    ingredients: `- 4 pechugas de pollo aplastadas
- 4 lonjas de jamón
- 4 lonjas de queso
- Espinacas cocidas
- Pan rallado
- 2 huevos batidos
- Sal y pimienta`,
    preparation: `1. Aplasta las pechugas hasta dejarlas delgadas.
2. Aliña con sal y pimienta.
3. Coloca sobre cada pechuga una lonja de jamón, una de queso y espinacas.
4. Enrolla y asegura con palillos.
5. Pasa por huevo batido y pan rallado.
6. Coloca en refractario engrasado.
7. Hornea a 175°C (350°F) por 45 minutos.
8. Sirve con ensalada.`,
    createdAt: 71,
  },
  {
    id: "seed-pavo-arandanos",
    name: "Pavo en Salsa de Arándanos",
    category: "especiales",
    methods: ["horno", "olla"],
    time: "3 horas",
    ingredients: `- 1 pechuga de pavo de 8 libras
- 2 tazas de salsa de arándanos
- 1 taza de jugo de naranja
- 3 cucharadas de miel
- 2 cucharadas de mostaza
- Sal y pimienta
- Mantequilla`,
    preparation: `1. Aliña la pechuga con sal y pimienta.
2. Mezcla la salsa de arándanos, el jugo de naranja, la miel y la mostaza.
3. Unta la pechuga con mantequilla.
4. Coloca en refractario y baña con la mezcla.
5. Hornea a 175°C (350°F) por 2 horas y 30 minutos.
6. Baña cada 20 minutos con la salsa.
7. Sirve con el resto de la salsa caliente.`,
    createdAt: 72,
  },
  {
    id: "seed-corvina-horno",
    name: "Corvina al Horno",
    category: "cuerpo",
    methods: ["horno"],
    time: "45 min",
    ingredients: `- 4 filetes de corvina
- Jugo de 2 limones
- 3 dientes de ajo machacados
- Perejil picado
- Aceite de oliva
- Sal y pimienta`,
    preparation: `1. Aliña los filetes con sal, pimienta, ajo, limón y perejil.
2. Deja marinar 15 minutos.
3. Coloca en refractario engrasado.
4. Rocía con aceite de oliva.
5. Hornea a 190°C (375°F) por 25 minutos.
6. Sirve con ensalada y limón.`,
    createdAt: 73,
  },
  {
    id: "seed-mojarra-frita",
    name: "Mojarra Frita",
    category: "colombiano",
    methods: ["sarten"],
    time: "30 min",
    ingredients: `- 4 mojarras enteras limpias
- Jugo de 2 limones
- 4 dientes de ajo machacados
- Comino
- Sal y pimienta
- Aceite para freír`,
    preparation: `1. Haz cortes diagonales en ambos lados de las mojarras.
2. Aliña con limón, ajo, comino, sal y pimienta.
3. Deja reposar 20 minutos.
4. Calienta abundante aceite.
5. Fríe las mojarras hasta que estén doradas y crujientes.
6. Escurre sobre papel absorbente.
7. Sirve con patacones y ensalada.`,
    createdAt: 74,
  },
  {
    id: "seed-pescado-coco",
    name: "Pescado en Salsa de Coco",
    category: "colombiano",
    methods: ["olla"],
    time: "40 min",
    ingredients: `- 6 filetes de pescado blanco
- 2 tazas de leche de coco
- 1 cebolla cabezona
- 2 tomates
- 1 pimentón
- 2 dientes de ajo
- Cilantro
- Sal y pimienta`,
    preparation: `1. Aliña los filetes con sal, pimienta y limón.
2. Sofríe la cebolla, el tomate y el pimentón picados.
3. Agrega el ajo machacado.
4. Agrega la leche de coco y deja hervir.
5. Agrega los filetes y cocina 15 minutos.
6. Espolvorea con cilantro picado.
7. Sirve con arroz con coco y patacones.`,
    createdAt: 75,
  },
  {
    id: "seed-salmon-plancha",
    name: "Salmón a la Plancha",
    category: "cuerpo",
    methods: ["sarten"],
    time: "20 min",
    ingredients: `- 4 filetes de salmón
- Jugo de 1 limón
- 2 cucharadas de aceite de oliva
- Eneldo fresco
- Sal y pimienta`,
    preparation: `1. Aliña los filetes con sal, pimienta, limón y eneldo.
2. Deja reposar 10 minutos.
3. Calienta una plancha o sartén con el aceite de oliva.
4. Cocina los filetes 4 minutos por lado.
5. Sirve inmediatamente con vegetales al vapor.`,
    createdAt: 76,
  },
  {
    id: "seed-tilapia-alcaparras",
    name: "Tilapia en Salsa de Alcaparras",
    category: "cuerpo",
    methods: ["sarten"],
    time: "30 min",
    ingredients: `- 4 filetes de tilapia
- 3 cucharadas de alcaparras
- ½ taza de vino blanco
- 3 cucharadas de mantequilla
- Jugo de 1 limón
- Perejil picado
- Sal y pimienta`,
    preparation: `1. Aliña los filetes con sal y pimienta.
2. Dora en mantequilla por ambos lados.
3. Retira y reserva.
4. En la misma sartén agrega el vino, las alcaparras y el limón.
5. Deja reducir 5 minutos.
6. Regresa los filetes a la sartén.
7. Cocina 5 minutos más.
8. Espolvorea con perejil y sirve.`,
    createdAt: 77,
  },
  {
    id: "seed-trucha-ajillo",
    name: "Trucha al Ajillo",
    category: "cuerpo",
    methods: ["sarten"],
    time: "25 min",
    ingredients: `- 2 truchas enteras limpias
- 6 dientes de ajo laminados
- ¼ taza de aceite de oliva
- Perejil picado
- Jugo de 1 limón
- Sal y pimienta`,
    preparation: `1. Aliña las truchas con sal y pimienta.
2. Calienta el aceite de oliva.
3. Dora los ajos laminados sin quemar.
4. Retira los ajos y reserva.
5. Fríe las truchas en el aceite de ajo hasta dorar.
6. Regresa los ajos a la sartén.
7. Agrega el limón y el perejil.
8. Sirve inmediatamente.`,
    createdAt: 78,
  },
  {
    id: "seed-lasana-carne",
    name: "Lasaña de Carne",
    category: "plan",
    methods: ["olla", "horno"],
    time: "1 hora 30 min",
    ingredients: `- 1 paquete de pasta para lasaña
- 1 libra de carne molida
- 1 cebolla cabezona
- 2 dientes de ajo
- 1 tarro de salsa de tomate
- 2 tazas de salsa bechamel
- 2 tazas de queso mozarella rallado
- Queso parmesano
- Orégano
- Sal y pimienta`,
    preparation: `1. Cocina la pasta según las instrucciones del paquete.
2. Sofríe la cebolla y el ajo picados.
3. Agrega la carne molida y cocina hasta dorar.
4. Agrega la salsa de tomate, orégano, sal y pimienta.
5. Cocina 20 minutos.
6. En un refractario engrasado arma capas: pasta, carne, bechamel, queso.
7. Repite hasta terminar con queso.
8. Espolvorea con parmesano.
9. Hornea a 175°C (350°F) por 30 minutos.
10. Deja reposar 10 minutos antes de servir.`,
    createdAt: 79,
  },
  {
    id: "seed-pasta-carbonara",
    name: "Pasta a la Carbonara",
    category: "rapido",
    methods: ["olla", "sarten"],
    time: "25 min",
    ingredients: `- 1 libra de pasta (espagueti o fettuccine)
- 200 gramos de tocineta
- 3 yemas de huevo
- 1 taza de queso parmesano rallado
- 1 taza de crema de leche
- Pimienta negra
- Sal`,
    preparation: `1. Cocina la pasta según las instrucciones.
2. Corta la tocineta en cuadritos y fríe hasta que esté crujiente.
3. En un recipiente bate las yemas con la crema de leche y el queso.
4. Agrega pimienta negra.
5. Escurre la pasta y mezcla con la tocineta.
6. Retira del fuego y agrega la mezcla de huevo.
7. Mezcla rápidamente para que el calor de la pasta cocine ligeramente las yemas.
8. Sirve inmediatamente con más queso parmesano.`,
    createdAt: 80,
  },
  {
    id: "seed-pasta-alfredo",
    name: "Pasta Alfredo",
    category: "rapido",
    methods: ["olla", "sarten"],
    time: "20 min",
    ingredients: `- 1 libra de fettuccine
- 1 taza de crema de leche
- ½ taza de mantequilla
- 1 taza de queso parmesano rallado
- Nuez moscada
- Sal y pimienta`,
    preparation: `1. Cocina la pasta según las instrucciones.
2. En un sartén derrite la mantequilla.
3. Agrega la crema de leche y mezcla.
4. Agrega el queso parmesano y revuelve hasta derretir.
5. Sazona con sal, pimienta y una pizca de nuez moscada.
6. Escurre la pasta y mezcla con la salsa.
7. Sirve inmediatamente.`,
    createdAt: 81,
  },
  {
    id: "seed-pasta-pesto",
    name: "Pasta con Pesto",
    category: "rapido",
    methods: ["olla", "licuadora"],
    time: "20 min",
    ingredients: `- 1 libra de pasta (linguini o espagueti)
- 2 tazas de albahaca fresca
- ½ taza de piñones o nueces
- 3 dientes de ajo
- ½ taza de queso parmesano rallado
- ½ taza de aceite de oliva
- Sal y pimienta`,
    preparation: `1. Cocina la pasta según las instrucciones.
2. En la licuadora pon la albahaca, los piñones, el ajo, el queso, sal y pimienta.
3. Licua mientras agregas el aceite de oliva poco a poco.
4. Escurre la pasta reservando ½ taza del agua de cocción.
5. Mezcla la pasta con el pesto.
6. Si está muy espeso agrega un poco del agua reservada.
7. Sirve con más queso parmesano.`,
    createdAt: 82,
  },
  {
    id: "seed-ravioles-ricotta",
    name: "Ravioles de Ricotta",
    category: "plan",
    methods: ["olla"],
    time: "1 hora",
    ingredients: `- 2 paquetes de ravioles de ricotta
- 1 tarro de salsa de tomate
- 1 cebolla cabezona
- 2 dientes de ajo
- Albahaca fresca
- Queso parmesano
- Aceite de oliva
- Sal y pimienta`,
    preparation: `1. Sofríe la cebolla y el ajo picados en aceite de oliva.
2. Agrega la salsa de tomate y la albahaca.
3. Sazona con sal y pimienta.
4. Cocina 20 minutos a fuego lento.
5. Cocina los ravioles según las instrucciones del paquete.
6. Escurre y mezcla con la salsa.
7. Sirve con queso parmesano rallado.`,
    createdAt: 83,
  },
  {
    id: "seed-espagueti-bolonesa",
    name: "Espagueti a la Boloñesa",
    category: "plan",
    methods: ["olla"],
    time: "1 hora",
    ingredients: `- 1 libra de espagueti
- 1 libra de carne molida
- 1 cebolla cabezona
- 2 dientes de ajo
- 1 zanahoria
- 1 rama de apio
- 1 tarro de salsa de tomate
- ½ taza de vino tinto
- Orégano
- Queso parmesano
- Sal y pimienta`,
    preparation: `1. Sofríe la cebolla, el ajo, la zanahoria y el apio finamente picados.
2. Agrega la carne molida y cocina hasta dorar.
3. Agrega el vino tinto y deja evaporar.
4. Agrega la salsa de tomate y el orégano.
5. Sazona con sal y pimienta.
6. Cocina a fuego lento 40 minutos.
7. Cocina el espagueti según las instrucciones.
8. Sirve la pasta con la salsa y queso parmesano.`,
    createdAt: 84,
  },
  {
    id: "seed-anillos-cebolla",
    name: "Anillos de Cebolla",
    category: "rapido",
    methods: ["sarten"],
    time: "20 min",
    ingredients: `- 2 cebollas cabezonas grandes
- 1 taza de cerveza
- 180 g de harina
- 1 clara de huevo
- 1 cucharadita de sal
- ½ cucharadita de pimienta
- Aceite suficiente para freír`,
    preparation: `1. Mezcla la cerveza con la harina, la sal y la pimienta.
2. Bate la clara a punto de nieve y agrégala con movimientos envolventes.
3. Corta las cebollas en anillos no muy delgados.
4. Pon los anillos en agua caliente con ½ cucharadita de sal durante 1 minuto.
5. Escúrrelos y pásalos por la mezcla.
6. Fríelos en aceite caliente hasta que estén dorados.`,
    createdAt: 85,
  },
  {
    id: "seed-crepes-pollo",
    name: "Crepes de Pollo",
    category: "plan",
    methods: ["olla", "horno"],
    time: "1 hora",
    ingredients: `- 2 pechugas de pollo
- 1 cubo de pollo o 1 taza de caldo de pollo casero o base de pollo
- 1 sobre de crema de champiñones
- ½ taza de cebolla cabezona finamente picada
- 2 tazas de queso mozarella rallado
- 1 taza de crema de leche
- 12 crepes`,
    preparation: `1. Cocina las pechugas en agua con el cubo de pollo, o con el caldo de pollo casero o base de pollo, hasta que estén blandas.
2. Desmecha el pollo.
3. Prepara la crema de champiñones según las instrucciones del sobre.
4. Dora la cebolla en un poco de mantequilla.
5. Agrega a la mitad de la crema el pollo desmechado y la cebolla dorada.
6. Rellena los crepes con esta mezcla.
7. Báñalos con el resto de la crema, el queso mozarella y la crema de leche.
8. Lleva al horno hasta gratinar.
9. Sirve caliente.`,
    createdAt: 86,
  },
  {
    id: "seed-tortilla-espanola",
    name: "Tortilla Española",
    category: "rapido",
    methods: ["sarten"],
    time: "30 min",
    ingredients: `- 4 papas medianas
- 3 huevos
- 1 cebolla cabezona grande
- 1 cucharadita de sal
- ½ cucharadita de pimienta
- ½ taza de aceite`,
    preparation: `1. Pela las papas y córtalas en rebanadas no muy delgadas.
2. Fríelas en el aceite caliente hasta que estén blandas, sin dejar que se doren demasiado.
3. Escúrrelas y resérvalas.
4. Corta la cebolla en rebanadas y cocínala en el mismo aceite hasta que esté brillante.
5. Bate los huevos con la sal y la pimienta.
6. Engrasa un sartén con 2 cucharadas de aceite.
7. Vierte una capa del huevo batido, luego una capa de papa y otra de cebolla.
8. Repite hasta terminar y cubre con el resto del huevo.
9. Cocina a fuego medio hasta que cuaje por debajo.
10. Dale la vuelta y cocina por el otro lado hasta que esté firme.`,
    createdAt: 87,
  },
  {
    id: "seed-pancakes",
    name: "Pancakes",
    category: "rapido",
    methods: ["sarten", "licuadora"],
    time: "15 min",
    ingredients: `- 1 taza de leche
- 6 cucharadas de harina
- 1 huevo
- 2 cucharadas de azúcar
- 1 cucharada de aceite
- 1 cucharadita de mantequilla para engrasar el sartén`,
    preparation: `1. Licua todos los ingredientes hasta obtener una mezcla homogénea.
2. Engrasa ligeramente un sartén con la mantequilla.
3. Cocina porciones de la mezcla a fuego medio hasta que doren por ambos lados.`,
    createdAt: 88,
  },
  {
    id: "seed-tostada-francesa",
    name: "Tostada Francesa con Huevo",
    category: "rapido",
    methods: ["sarten"],
    time: "15 min",
    ingredients: `- 2 rebanadas de pan
- 1 huevo
- 2 cucharadas de mantequilla
- Sal y pimienta al gusto
- Miel o jarabe de arce para servir (opcional)`,
    preparation: `1. Rompe el huevo en un tazón y bate bien con un tenedor.
2. Agrega una pizca de sal y pimienta si lo deseas.
3. Sumerge las rebanadas de pan en el huevo batido asegurándote de que ambos lados estén bien cubiertos.
4. Calienta una sartén a fuego medio y añade una cucharada de mantequilla.
5. Cuando la mantequilla esté derretida y burbujeando coloca las rebanadas de pan en la sartén.
6. Cocina cada lado durante 2-3 minutos o hasta que estén dorados y crujientes.
7. Retira las tostadas de la sartén y úntalas con la mantequilla restante mientras estén calientes.
8. Añade miel o jarabe de arce si lo deseas.`,
    createdAt: 89,
  },
  {
    id: "seed-wrap-atun",
    name: "Wrap de Atún",
    category: "rapido",
    methods: ["sincoccion"],
    time: "10 min",
    ingredients: `- 1 lata de atún en agua
- 1 huevo duro
- ¼ taza de apio finamente picado
- ¼ taza de pimentón finamente picado
- 2 rodajas de tomate
- 2 hojas de lechuga
- 1 cucharada de mayonesa light
- 1 cucharadita de jugo de limón
- 2 wraps`,
    preparation: `1. Desmenuza el atún en un recipiente sin aplastarlo demasiado.
2. Agrega el limón, el apio, el pimentón y la mayonesa.
3. Mezcla bien.
4. Arma los wraps con la lechuga, el tomate, la mezcla de atún y el huevo duro en láminas.`,
    createdAt: 90,
  },
  {
    id: "seed-arroz-con-leche",
    name: "Arroz con Leche",
    category: "dulce",
    methods: ["olla"],
    time: "1 hora",
    ingredients: `- 1 taza de arroz
- 4 tazas de leche
- 1 taza de azúcar
- 1 astilla de canela
- Cáscara de limón
- Pasas
- Canela en polvo`,
    preparation: `1. Cocina el arroz en 2 tazas de agua con la canela y la cáscara de limón.
2. Cuando el agua se haya absorbido agrega la leche poco a poco.
3. Cocina a fuego lento revolviendo constantemente.
4. Agrega el azúcar y las pasas.
5. Cocina hasta que esté cremoso (aproximadamente 40 minutos).
6. Retira del fuego y deja enfriar.
7. Sirve frío espolvoreado con canela.`,
    createdAt: 91,
  },
  {
    id: "seed-brownies",
    name: "Brownies",
    category: "dulce",
    methods: ["horno"],
    time: "45 min",
    ingredients: `- ¼ libra de margarina
- 8 cuadritos de chocolate amargo
- ¾ taza de harina
- ½ cucharadita de sal
- 2 huevos
- 1 taza de azúcar
- ½ cucharadita de bicarbonato
- ½ cucharadita de polvo Royal
- 1 cucharadita de vainilla
- 1 taza de nueces`,
    preparation: `1. Derrite la margarina con el chocolate al baño María.
2. Deja enfriar.
3. Cierne la harina, el bicarbonato y la sal.
4. Bate los huevos hasta que queden claros.
5. Agrega el chocolate y los ingredientes secos.
6. Agrega el azúcar, la vainilla y las nueces molidas.
7. Vierte en lata engrasada.
8. Hornea a 175°C (350°F) por 30-35 minutos.
9. Cuando enfríe corta en cuadritos y espolvorea con azúcar pulverizada.`,
    createdAt: 92,
  },
  {
    id: "seed-flan-caramelo",
    name: "Flan de Caramelo",
    category: "dulce",
    methods: ["horno", "licuadora"],
    time: "1 hora 30 min",
    ingredients: `- 1 taza de azúcar para el caramelo
- 6 huevos
- 1 lata de leche condensada
- 1 lata de leche evaporada
- 1 cucharadita de vainilla`,
    preparation: `1. En un molde para flan derrite 1 taza de azúcar hasta hacer caramelo.
2. Mueve el molde para cubrir el fondo y los lados.
3. Licua los huevos, la leche condensada, la leche evaporada y la vainilla.
4. Vierte la mezcla en el molde caramelizado.
5. Coloca el molde en baño María.
6. Hornea a 175°C (350°F) por 1 hora o hasta que al insertar un cuchillo salga limpio.
7. Deja enfriar completamente.
8. Refrigera por lo menos 4 horas.
9. Voltea sobre un plato y sirve.`,
    createdAt: 93,
  },
  {
    id: "seed-natilla",
    name: "Natilla",
    category: "colombiano",
    methods: ["olla"],
    time: "45 min",
    ingredients: `- 1 libra de fécula de maíz
- 1 panela
- 1 astilla de canela
- 6 tazas de leche
- ½ taza de coco rallado
- Pasas`,
    preparation: `1. Disuelve la panela en 2 tazas de agua con la canela.
2. Cuela y reserva.
3. Disuelve la fécula de maíz en la leche fría.
4. Agrega el agua de panela.
5. Cocina a fuego medio revolviendo constantemente con cuchara de palo.
6. Cuando espese agrega el coco y las pasas.
7. Cocina 5 minutos más sin dejar de revolver.
8. Vierte en moldes húmedos.
9. Deja enfriar y refrigera.`,
    createdAt: 94,
  },
  {
    id: "seed-postre-natas",
    name: "Postre de Natas",
    category: "colombiano",
    methods: ["olla"],
    time: "2 horas",
    ingredients: `- 8 tazas de leche entera
- 2 tazas de azúcar
- 1 astilla de canela
- Brevas en almíbar`,
    preparation: `1. Pon la leche en una olla grande con la canela.
2. Hierve a fuego medio.
3. Cuando se forme nata en la superficie retírala con cuidado y reserva.
4. Repite hasta formar varias capas de nata.
5. En la leche restante agrega el azúcar.
6. Hierve hasta reducir a la mitad.
7. En una fuente arma capas de nata, brevas y miel de leche.
8. Refrigera antes de servir.`,
    createdAt: 95,
  },
  {
    id: "seed-tres-leches",
    name: "Tres Leches",
    category: "dulce",
    methods: ["horno"],
    time: "1 hora",
    ingredients: `- 1 taza de harina
- 1½ cucharadita de polvo Royal
- 5 huevos
- 1 taza de azúcar
- 1 cucharadita de vainilla
- 1 lata de leche condensada
- 1 lata de leche evaporada
- 1 taza de crema de leche
- Merengue para decorar`,
    preparation: `1. Bate las yemas con ¾ taza de azúcar hasta que estén cremosas.
2. Agrega la vainilla.
3. Cierne la harina con el polvo Royal y agrega a las yemas.
4. Bate las claras a punto de nieve.
5. Agrega el resto del azúcar poco a poco.
6. Incorpora las claras a la mezcla con movimientos envolventes.
7. Vierte en molde engrasado.
8. Hornea a 175°C (350°F) por 30 minutos.
9. Deja enfriar y desmolda.
10. Mezcla las tres leches y baña el bizcocho.
11. Refrigera 4 horas.
12. Decora con merengue.`,
    createdAt: 96,
  },
  {
    id: "seed-tiramisu",
    name: "Tiramisú",
    category: "dulce",
    methods: ["sincoccion"],
    time: "30 min (más refrigeración)",
    ingredients: `- 2 paquetes de galletas de champán
- 2 tazas de café negro fuerte
- 3 cucharadas de licor de café
- 500 gramos de queso mascarpone
- 3 huevos
- ½ taza de azúcar
- Cacao en polvo`,
    preparation: `1. Mezcla el café con el licor y deja enfriar.
2. Separa las yemas de las claras.
3. Bate las yemas con el azúcar hasta que estén cremosas.
4. Agrega el queso mascarpone y mezcla.
5. Bate las claras a punto de nieve.
6. Incorpora las claras a la mezcla con movimientos envolventes.
7. En un molde pon una capa de galletas mojadas en café.
8. Cubre con una capa de crema.
9. Repite hasta terminar con crema.
10. Refrigera 4 horas.
11. Espolvorea con cacao antes de servir.`,
    createdAt: 97,
  },
  {
    id: "seed-flan-panela-fercha",
    name: "Flan de Panela Fercha",
    category: "dulce",
    methods: ["horno", "licuadora"],
    time: "1 hora 30 min",
    ingredients: `- 1 panela mediana
- 6 huevos
- 1 lata de leche evaporada
- 1 cucharadita de vainilla
- ½ taza de agua`,
    preparation: `1. Derrite ½ panela con ½ taza de agua hasta hacer caramelo.
2. Vierte en el molde y cubre el fondo.
3. Ralla la otra ½ panela.
4. Licua los huevos, la leche evaporada, la panela rallada y la vainilla.
5. Vierte en el molde caramelizado.
6. Coloca en baño María.
7. Hornea a 175°C (350°F) por 1 hora.
8. Deja enfriar completamente.
9. Refrigera por lo menos 4 horas.
10. Voltea y sirve.`,
    createdAt: 98,
  },
  {
    id: "seed-arequipe",
    name: "Arequipe",
    category: "dulce",
    methods: ["olla"],
    time: "2 horas 30 min",
    ingredients: `- 4 litros de leche entera
- 2 kilos de azúcar
- 2 astillas de canela
- 1 cucharadita de bicarbonato
- 1 pizca de sal`,
    preparation: `1. Agrega en una olla grande todos los ingredientes: la leche, el azúcar, el bicarbonato, la sal y la canela.
2. Pon la olla a fuego medio.
3. Remueve constantemente para que se mezclen bien los ingredientes.
4. Continúa removiendo cada 2-3 minutos durante aproximadamente 1.5 a 2 horas.
5. Cuando veas que adquiere un tono amarillo baja el fuego a bajo.
6. Sigue removiendo constantemente para evitar que se pegue.
7. Cuando al pasar la cuchara veas el fondo de la olla y el color sea caramelo oscuro apaga el fuego.
8. Pasa inmediatamente a otro recipiente.
9. Deja reposar y enfriar a temperatura ambiente.
10. Refrigera en recipientes de vidrio con tapa.`,
    createdAt: 99,
  },
  {
    id: "seed-manjar-blanco",
    name: "Manjar Blanco",
    category: "colombiano",
    methods: ["olla"],
    time: "4 horas (incluye remojo)",
    ingredients: `- 2 litros de leche
- 250 gramos de panela o azúcar moreno
- 5 cucharadas soperas de arroz
- 1 cucharadita de canela
- 1 pizca de sal
- 2-3 cucharadas de azúcar blanca (para ajustar dulzor al final)`,
    preparation: `1. Pon el arroz a remojo durante 3 horas.
2. Escurre y cocina el arroz con una pizca de sal hasta que se ablande completamente.
3. Escurre el agua y reserva el arroz.
4. Vierte la leche en una olla grande.
5. Agrega la canela y la panela.
6. Cocina a fuego medio hasta que comience a hervir.
7. Agrega el arroz reservado.
8. Comienza a remover constantemente con cuchara de madera.
9. Continúa removiendo cada 2-3 minutos durante aproximadamente 45 minutos a 1 hora.
10. Cuando al remover veas el fondo de la olla habrá alcanzado el punto deseado.
11. Prueba y agrega azúcar blanca si deseas más dulce.
12. Reduce el fuego a bajo.
13. Deposita el manjar en un recipiente que soporte bien el calor.
14. Deja enfriar a temperatura ambiente.
15. Refrigera en recipientes de vidrio con tapa.`,
    createdAt: 100,
  },
  {
    id: "seed-galletas-avena",
    name: "Galletas de Avena",
    category: "dulce",
    methods: ["horno"],
    time: "30 min",
    ingredients: `- 1 taza de harina
- 1 taza de avena en hojuelas
- ½ taza de azúcar morena
- ½ taza de mantequilla
- 1 huevo
- ½ cucharadita de bicarbonato
- 1 cucharadita de vainilla
- Pasas`,
    preparation: `1. Mezcla la mantequilla con el azúcar hasta cremar.
2. Agrega el huevo y la vainilla.
3. Cierne la harina con el bicarbonato.
4. Agrega a la mezcla anterior.
5. Incorpora la avena y las pasas.
6. Forma bolitas y aplasta ligeramente.
7. Coloca en lata engrasada.
8. Hornea a 175°C (350°F) por 12-15 minutos.
9. Deja enfriar sobre una rejilla.`,
    createdAt: 101,
  },
  {
    id: "seed-galletas-mantequilla",
    name: "Galletas de Mantequilla",
    category: "dulce",
    methods: ["horno"],
    time: "25 min",
    ingredients: `- 2 tazas de harina
- ½ taza de azúcar
- 1 taza de mantequilla
- 1 yema de huevo
- 1 cucharadita de vainilla
- Pizca de sal`,
    preparation: `1. Mezcla la mantequilla con el azúcar.
2. Agrega la yema y la vainilla.
3. Cierne la harina con la sal.
4. Agrega a la mezcla y forma una masa.
5. Refrigera 30 minutos.
6. Estira la masa y corta con moldes.
7. Coloca en lata engrasada.
8. Hornea a 175°C (350°F) por 10-12 minutos.
9. Deja enfriar.`,
    createdAt: 102,
  },
  {
    id: "seed-galletas-chocolate",
    name: "Galletas de Chocolate",
    category: "dulce",
    methods: ["horno"],
    time: "30 min",
    ingredients: `- 1½ taza de harina
- ½ taza de cocoa en polvo
- ½ cucharadita de bicarbonato
- ½ taza de mantequilla
- ¾ taza de azúcar
- 1 huevo
- 1 cucharadita de vainilla
- Chispas de chocolate`,
    preparation: `1. Cierne la harina, la cocoa y el bicarbonato.
2. Bate la mantequilla con el azúcar.
3. Agrega el huevo y la vainilla.
4. Incorpora los ingredientes secos.
5. Agrega las chispas de chocolate.
6. Forma bolitas y coloca en lata engrasada.
7. Hornea a 175°C (350°F) por 10-12 minutos.
8. Deja enfriar.`,
    createdAt: 103,
  },
  {
    id: "seed-galletas-coco",
    name: "Galletas de Coco",
    category: "dulce",
    methods: ["horno"],
    time: "25 min",
    ingredients: `- 2 tazas de coco rallado
- 1 taza de azúcar
- 4 claras de huevo
- 1 cucharadita de vainilla
- Pizca de sal`,
    preparation: `1. Bate las claras a punto de nieve con la sal.
2. Agrega el azúcar poco a poco.
3. Incorpora el coco rallado y la vainilla.
4. Forma montoncitos sobre lata engrasada.
5. Hornea a 165°C (325°F) por 15-18 minutos.
6. Deja enfriar completamente.`,
    createdAt: 104,
  },
  {
    id: "seed-galletas-limon",
    name: "Galletas de Limón",
    category: "dulce",
    methods: ["horno"],
    time: "30 min",
    ingredients: `- 2 tazas de harina
- ½ cucharadita de polvo Royal
- ½ taza de mantequilla
- ¾ taza de azúcar
- 1 huevo
- Ralladura de 2 limones
- 2 cucharadas de jugo de limón`,
    preparation: `1. Bate la mantequilla con el azúcar.
2. Agrega el huevo, la ralladura y el jugo de limón.
3. Cierne la harina con el polvo Royal.
4. Agrega a la mezcla.
5. Forma bolitas y aplasta ligeramente.
6. Coloca en lata engrasada.
7. Hornea a 175°C (350°F) por 12 minutos.
8. Deja enfriar.`,
    createdAt: 105,
  },
  {
    id: "seed-galletas-canela",
    name: "Galletas de Canela",
    category: "dulce",
    methods: ["horno"],
    time: "25 min",
    ingredients: `- 2 tazas de harina
- 1 cucharadita de canela
- ½ cucharadita de bicarbonato
- ½ taza de mantequilla
- 1 taza de azúcar morena
- 1 huevo
- 1 cucharadita de vainilla`,
    preparation: `1. Cierne la harina, la canela y el bicarbonato.
2. Bate la mantequilla con el azúcar morena.
3. Agrega el huevo y la vainilla.
4. Incorpora los ingredientes secos.
5. Forma bolitas y rueda en azúcar con canela.
6. Coloca en lata engrasada.
7. Hornea a 175°C (350°F) por 10-12 minutos.
8. Deja enfriar.`,
    createdAt: 106,
  },
  {
    id: "seed-alfajores",
    name: "Alfajores",
    category: "dulce",
    methods: ["horno"],
    time: "40 min",
    ingredients: `- 2 tazas de fécula de maíz
- 1 taza de harina
- ½ taza de mantequilla
- ½ taza de azúcar
- 2 yemas
- 1 cucharadita de polvo Royal
- Ralladura de limón
- Dulce de leche
- Coco rallado`,
    preparation: `1. Mezcla la mantequilla con el azúcar.
2. Agrega las yemas y la ralladura.
3. Cierne la fécula, la harina y el polvo Royal.
4. Agrega a la mezcla y forma masa.
5. Refrigera 30 minutos.
6. Estira y corta círculos.
7. Hornea a 175°C (350°F) por 8-10 minutos.
8. Deja enfriar y une con dulce de leche.
9. Pasa los bordes por coco rallado.`,
    createdAt: 107,
  },
  {
    id: "seed-polvorones",
    name: "Polvorones",
    category: "dulce",
    methods: ["horno"],
    time: "30 min",
    ingredients: `- 2 tazas de harina
- 1 taza de mantequilla
- ½ taza de azúcar pulverizada
- 1 cucharadita de vainilla
- Azúcar pulverizada para decorar`,
    preparation: `1. Mezcla la mantequilla con el azúcar pulverizada.
2. Agrega la vainilla.
3. Incorpora la harina poco a poco.
4. Forma bolitas y coloca en lata engrasada.
5. Hornea a 165°C (325°F) por 15-18 minutos.
6. Deja enfriar ligeramente.
7. Rueda en azúcar pulverizada mientras están tibios.`,
    createdAt: 108,
  },
  {
    id: "seed-yogurt-griego",
    name: "Yogurt Griego Casero",
    category: "cuerpo",
    methods: ["ollapresion"],
    time: "9-10 horas (incluye reposo)",
    ingredients: `- ½ galón (1.9 litros) de leche entera
- 3-4 cucharadas de yogurt natural sin sabor
- 1 lata de leche condensada azucarada de 14 oz (opcional, para yogurt más dulce)`,
    preparation: `1. Vierte la leche en la olla de presión eléctrica.
2. Si deseas yogurt dulce agrega la leche condensada ahora.
3. Cierra la tapa y sella bien.
4. Presiona el botón "mantener caliente" y deja 40-45 minutos.
5. Abre la tapa y bate la leche tibia.
6. Configura la olla en "saltear" para calentar la leche a 85°C (185°F).
7. Una vez caliente retira la olla interior con agarraderas y deja enfriar hasta 43°C (110°F).
8. Agrega 3-4 cucharadas de yogurt natural a la leche enfriada y bate bien.
9. Vuelve a colocar la olla interior en la base.
10. Cierra la tapa con sello cerrado.
11. La olla debe estar apagada en este punto.
12. Envuelve la olla en una toalla gruesa.
13. Deja reposar 8 horas sin abrir.
14. Retira el yogurt y coloca en recipientes de vidrio.
15. Refrigera mínimo 4 horas antes de usar.
16. Si deseas puedes agregar miel, vainilla o mermelada al servir.`,
    createdAt: 109,
  },
  {
    id: "seed-pie-manzana",
    name: "Pie de Manzana",
    category: "dulce",
    methods: ["airfryer", "sarten"],
    time: "1 hora 15 min (incluye refrigeración)",
    ingredients: `Para la masa:
- ½ libra de harina
- 1 cucharada de azúcar
- 1 huevo
- 1 cucharadita de sal
- ¼ libra de mantequilla fría
- 2 cucharadas de agua fría

Para el relleno:
- 3 manzanas verdes (Granny Smith)
- 2 cucharadas de azúcar morena
- 1 cucharadita de jugo de limón
- 1 cucharadita de canela
- 1 cucharada de maicena
- 1 pizca de sal
- 1 cucharada de mantequilla`,
    preparation: `Masa:
1. Mezcla la harina con la mantequilla hasta obtener textura arenosa.
2. Agrega el azúcar y la sal.
3. Incorpora el huevo.
4. Añade el agua poco a poco hasta formar una masa suave.
5. Amasa ligeramente por 2-3 minutos.
6. Refrigera por 20-30 minutos.

Relleno:
1. Pela y corta las manzanas en cubos medianos.
2. Calienta 1 cucharada de mantequilla en un sartén.
3. Saltea las manzanas 5 minutos.
4. Agrega el azúcar morena, la canela, el limón y la sal.
5. Cuando suelten líquido disuelve la maicena en 1 cucharada de agua.
6. Agrega la maicena disuelta al sartén.
7. Cocina 2 minutos más hasta que espese.
8. Retira del fuego y deja enfriar completamente.

Armado:
1. Engrasa el molde con mantequilla.
2. Estira la masa y coloca en el molde.
3. Ajusta los bordes y pincha con un tenedor.
4. Pre-cocina la base vacía en Air Fryer a 160°C (320°F) por 8-10 minutos.
5. Retira y deja enfriar 5 minutos.
6. Coloca el relleno de manzana enfriado sobre la base.
7. Distribuye parejo.
8. Cocina en Air Fryer a 150°C (300°F) por 12-15 minutos.
9. La base debe estar dorada y el relleno burbujeante.
10. Deja reposar 10 minutos antes de cortar.`,
    createdAt: 110,
  },
  {
    id: "seed-pan-cuchara",
    name: "Pan Cuchara",
    category: "rapido",
    methods: ["horno"],
    time: "1 hora (incluye levado)",
    ingredients: `- 1½ taza de leche tibia
- 2 huevos
- 3 cucharadas de azúcar
- 1 cucharada de levadura seca
- 3 cucharadas de aceite
- 500 gramos de harina de trigo
- 1 cucharadita de sal`,
    preparation: `1. En un recipiente grande mezcla la leche tibia, los huevos, el azúcar, la levadura y el aceite.
2. Bate 1 minuto hasta integrar.
3. Agrega la mitad de la harina (250 gramos).
4. Mezcla bien con cuchara hasta incorporar.
5. Agrega la sal.
6. Agrega el resto de la harina (250 gramos).
7. Mezcla bien hasta obtener una masa pegajosa.
8. Pasa dos cucharas por aceite.
9. Forma bolitas de masa con las cucharas aceitadas y coloca en molde engrasado.
10. Deja reposar en lugar tibio 30-40 minutos hasta que duplique tamaño.
11. Hornea a 175°C (350°F) por 25-30 minutos hasta dorar.
12. Retira y deja enfriar ligeramente antes de servir.`,
    createdAt: 111,
  },
  {
    id: "seed-bizcocho-vainilla",
    name: "Bizcocho de Vainilla",
    category: "dulce",
    methods: ["horno"],
    time: "45 min",
    ingredients: `- 1 huevo
- 4 cucharadas de azúcar
- 4 cucharadas de leche
- 4 cucharadas de harina
- ½ cucharadita de esencia de vainilla`,
    preparation: `1. Precalienta el horno a 180°C (355°F).
2. En un bol mediano bate el huevo con el azúcar durante 5 minutos hasta que la mezcla esté espumosa y caiga en forma de listón (punto cinta).
3. Añade la leche y la esencia de vainilla y mezcla bien.
4. Tamiza la harina.
5. Incorpora la harina en 2-3 veces con movimientos envolventes suaves para no perder el aire.
6. Vierte la mezcla en dos moldes pequeños previamente engrasados y enharinados.
7. Hornea durante 20-25 minutos o hasta que al insertar un palillo en el centro salga limpio.
8. Deja enfriar en el molde durante 5 minutos.
9. Desmolda y deja enfriar completamente sobre una rejilla.`,
    createdAt: 112,
  },
  {
    id: "seed-pan-dulce-enrollado",
    name: "Pan Dulce Enrollado",
    category: "dulce",
    methods: ["horno"],
    time: "3 horas (incluye levados)",
    ingredients: `- 200 ml de agua tibia
- 200 ml de leche tibia
- 50 gramos de azúcar (total)
- 10 gramos de levadura seca
- 3 cucharadas de aceite
- 2 huevos
- 1 cucharadita de sal
- 750-800 gramos de harina
- 150 gramos de mantequilla blanda`,
    preparation: `Masa:
1. Mezcla el agua, la leche, 15 gramos de azúcar y la levadura.
2. Mezcla bien y deja reposar 10 minutos.
3. Agrega el aceite, 1 huevo, los 35 gramos restantes de azúcar y la sal.
4. Mezcla bien.
5. Agrega la harina poco a poco.
6. Amasa por 10-15 minutos hasta obtener masa suave y elástica.
7. Redondea la masa y pon en un molde engrasado.
8. Tapa con un trapo.
9. Deja reposar en lugar tibio por 1 hora y media o hasta que duplique tamaño.

Armado:
10. Enharina la mesa de trabajo.
11. Divide la masa en 10 partes iguales.
12. Extiende cada parte con rodillo formando un círculo de 3 mm de espesor.
13. Unta el primer círculo con mantequilla blanda.
14. Coloca el segundo círculo encima y unta con mantequilla.
15. Repite hasta terminar las 10 capas.
16. Pasa el rodillo nuevamente hasta alcanzar 5-6 mm de espesor.
17. Corta en 16-18 triángulos como pizza.
18. Enrolla cada triángulo desde la base hacia la punta.
19. Coloca en lata forrada con papel pergamino.
20. Deja crecer 30 minutos más cubiertos con trapo.

Horneado:
21. Bate 1 huevo con 1 cucharada de agua.
22. Pinta cada pan con una brocha.
23. Hornea a 190°C (375°F) por 20-25 minutos o hasta dorar.
24. Retira y deja enfriar ligeramente antes de servir.`,
    createdAt: 113,
  },
  {
    id: "seed-pandebono",
    name: "Pandebono",
    category: "colombiano",
    methods: ["horno"],
    time: "35 min",
    ingredients: `- 2 tazas de almidón de yuca
- 1 taza de queso costeño rallado
- 1 huevo
- 2 cucharadas de mantequilla
- Sal`,
    preparation: `1. Mezcla el almidón con el queso rallado.
2. Agrega el huevo, la mantequilla y una pizca de sal.
3. Amasa hasta formar una masa suave.
4. Forma bolitas.
5. Coloca en lata engrasada.
6. Hornea a 190°C (375°F) por 20-25 minutos.
7. Sirve tibios.`,
    createdAt: 114,
  },
  {
    id: "seed-pandebonos-receta-2",
    name: "Pandebonos (Receta 2)",
    category: "colombiano",
    methods: ["horno"],
    time: "45 min",
    ingredients: `- 2 tazas (240 gramos) de almidón de yuca (también llamado yucarina, tapioca, mandioca o cassava)
- 2 cucharadas de harina de maíz precocida (harina PAN o masarepa)
- 1 cucharadita de polvo para hornear
- 2 cucharadas de azúcar
- 1 cucharadita de sal
- 2 tazas (200 gramos) de queso fresco rallado
- ½ taza (50 gramos) de queso feta rallado
- 3 cucharadas de mantequilla ablandada
- 1 huevo grande
- Leche según sea necesario`,
    preparation: `1. Precalienta el horno a 220°C (425°F).
2. En un procesador de alimentos agrega el almidón de yuca, la harina de maíz, el polvo para hornear, el azúcar y la sal.
3. Pulsa varias veces para mezclar bien todos los ingredientes.
4. Agrega el queso fresco, el queso feta, la mantequilla y el huevo.
5. Mezcla por unos segundos para incorporar bien con los ingredientes secos.
6. Agrega la leche lentamente y poco a poco hasta obtener una masa suave.
7. Forma bolitas medianas del tamaño de una pelota de golf.
8. Coloca en un molde para galletas cubierto con papel pergamino.
9. También puedes enrollar las bolas para hacer un lazo pequeño de 1 cm de grueso y unir las puntas para terminar con un pandebono en forma de rosquilla.
10. Hornea por 20-25 minutos o hasta que doren.
11. Sirve inmediatamente tibios.`,
    createdAt: 115,
  },
  {
    id: "seed-masa-madre",
    name: "Masa Madre",
    category: "especiales",
    methods: ["sincoccion"],
    time: "5 días (proceso completo)",
    ingredients: `- 400 ml de agua preferentemente mineral a temperatura ambiente
- 400 gramos de harina de trigo integral
- 1 cucharadita de pasas (opcional, acelera proceso)
- 1 cucharadita de yogurt natural desnatado o un chorrito de limón o vinagre (opcional, protege acidez inicial)`,
    preparation: `Día 1:
1. Mezcla en el tarro de cristal 50 gramos de harina y 50 ml de agua.
2. Si usas aceleradores agrega las pasas y el yogurt, limón o vinagre ahora.
3. No cierres el tarro completamente (los gases deben escapar).
4. Deja reposar 24 horas a temperatura ambiente 20-25°C o en rincón cálido.

Día 2:
5. Observa si hay burbujillas (puede que aún no se note nada).
6. Agrega 50 gramos de harina y 50 ml de agua.
7. Marca con rotulador el nivel de la mezcla en el tarro.
8. Deja reposar 24 horas.

Día 3:
9. Busca señales de vida: burbujas, líquido marrón arriba, olor característico.
10. Retira y descarta la mitad de la mezcla (o guarda para panqueques).
11. Si usaste pasas recupéralas ahora.
12. Agrega 100 gramos de harina y 100 ml de agua.
13. Marca el nuevo nivel.
14. Deja reposar 24 horas.

Día 4:
15. Los signos de vida deben ser evidentes ahora.
16. Retira y descarta dos tercios de la masa.
17. Agrega 100 gramos de harina y 100 ml de agua.
18. Marca el nivel.
19. Deja reposar 24 horas.

Día 5:
20. La masa debe haber crecido espectacularmente.
21. Retira mezcla hasta quedarte solo con 100 gramos.
22. Agrega 100 gramos de harina y 100 ml de agua.
23. Deja reposar 24 horas.

Está lista cuando:
24. Duplica su tamaño en 4-6 horas después de alimentar.
25. Está llena de burbujas.
26. Huele ácido y fermentado.
27. Tiene textura esponjosa.`,
    createdAt: 116,
  },
  {
    id: "seed-ajiaco",
    name: "Ajiaco",
    category: "colombiano",
    methods: ["olla"],
    time: "1 hora 30 min",
    ingredients: `- Pechugas de pollo desmechado
- 1 tarro de arvejas
- 1 papa amarilla por plato
- 1 papa colorada por plato
- 1 papa guata por plato
- Alcaparras
- Cebolla larga
- Cilantro, laurel, tomillo
- Mazorca tierna
- Guascas
- Crema de leche`,
    preparation: `1. Mide agua según número de personas más 5 tazas.
2. Cuando hierva agrega la papa guata en rebanadas.
3. Cuando hierva de nuevo agrega el pollo, la cebolla, el laurel y el tomillo.
4. Hierve 15 minutos.
5. Agrega sal y papa colorada cortada gruesa.
6. Hierve 15 minutos más.
7. Agrega las arvejas y hierve 10 minutos.
8. Agrega las guascas y la mazorca.
9. Hierve 10 minutos más.
10. Desmecha el pollo.
11. Sirve la crema de leche y las alcaparras aparte.`,
    createdAt: 117,
  },
  {
    id: "seed-sancocho",
    name: "Sancocho",
    category: "colombiano",
    methods: ["olla"],
    time: "1 hora 30 min",
    ingredients: `- 1 libra de costilla (carne, pollo o espinazo de cerdo)
- 4 litros de agua
- 3-4 plátanos verdes
- 1 yuca
- 2 papas guatas
- Cilantro
- Cimarrón
- 1 gajo de cebolla larga
- Mazorca tierna
- 2 cucharadas de sal`,
    preparation: `1. Pon agua en olla amplia con la carne, cebolla, cimarrón y sal.
2. Cuando hierva y la carne esté blanda (1 hora) pela los plátanos con la mano.
3. Pica las papas en rodajas gruesas y la yuca en trozos.
4. Agrega a la olla hirviendo junto con la mazorca.
5. Cocina a fuego lento hasta que todo esté blando.
6. Agrega 1 cucharada de hogao y hierve 10 minutos más.
7. Pica cilantro y cebolla finamente y pon por encima.`,
    createdAt: 118,
  },
  {
    id: "seed-mondongo",
    name: "Mondongo",
    category: "colombiano",
    methods: ["olla"],
    time: "2 horas",
    ingredients: `- 1 libra de mondongo
- 2 cubos de gallina
- 2 chorizos
- ½ taza de arroz
- 1 zanahoria
- 4 papas coloradas
- 1 rama de apio
- 1 rama de cebolla
- 2 cucharadas de hogao
- Sal, cilantro y perejil`,
    preparation: `1. Ablanda el mondongo bien limpio con cebolla y hierbas.
2. Parte en trozos y completa el caldo con agua hasta 4 litros.
3. Agrega el arroz, la zanahoria rallada, el apio y los chorizos picados.
4. Cocina a fuego lento.
5. Agrega las papas en rodajas y el hogao.
6. Retira del fuego y agrega cilantro picado por encima.`,
    createdAt: 119,
  },
  {
    id: "seed-tamales",
    name: "Tamales",
    category: "colombiano",
    methods: ["olla"],
    time: "3 horas",
    ingredients: `- 2 libras de masa de maíz
- 1 libra de carne de cerdo
- 1 libra de pollo
- 6 huevos duros
- 2 zanahorias
- Arvejas
- Hojas de plátano
- Pita
- Sal, color y aliños`,
    preparation: `1. Cocina las carnes con aliños hasta que estén blandas.
2. Reserva el caldo.
3. Prepara la masa con el caldo hasta que esté suave.
4. Agrega color y sal.
5. Corta las hojas de plátano en rectángulos.
6. Pasa las hojas por agua caliente.
7. Pon masa en el centro de cada hoja.
8. Agrega carne, pollo, zanahoria, arvejas y medio huevo.
9. Envuelve y amarra con pita.
10. Cocina en agua hirviendo por 1 hora.`,
    createdAt: 120,
  },
  {
    id: "seed-empanadas",
    name: "Empanadas",
    category: "colombiano",
    methods: ["sarten"],
    time: "1 hora",
    ingredients: `- 2 tazas de harina de maíz precocida
- 1 libra de carne molida
- 2 papas cocidas
- 1 cebolla cabezona
- 1 tomate
- Color, comino, sal y pimienta
- Aceite para freír`,
    preparation: `1. Sofríe la cebolla y el tomate picados.
2. Agrega la carne molida y los aliños.
3. Cocina hasta que esté lista.
4. Agrega las papas en cuadritos.
5. Prepara la masa con agua tibia y sal hasta que esté manejable.
6. Forma bolitas y aplasta.
7. Rellena con el guiso.
8. Cierra en forma de media luna.
9. Fríe en aceite caliente hasta dorar.
10. Escurre sobre papel absorbente.`,
    createdAt: 121,
  },
  {
    id: "seed-bunuelos",
    name: "Buñuelos",
    category: "colombiano",
    methods: ["sarten"],
    time: "45 min",
    ingredients: `- 1 libra de queso costeño rallado
- 2 tazas de fécula de maíz
- 2 huevos
- 1 cucharadita de polvo Royal
- Aceite para freír`,
    preparation: `1. Mezcla el queso rallado con la fécula.
2. Agrega los huevos y el polvo Royal.
3. Amasa hasta formar una masa suave.
4. Forma bolitas del tamaño deseado.
5. Calienta abundante aceite.
6. Fríe los buñuelos hasta que estén dorados.
7. Voltea para que doren parejo.
8. Escurre sobre papel absorbente.
9. Sirve tibios.`,
    createdAt: 122,
  },
  {
    id: "seed-arepa-chocolo",
    name: "Arepa de Chócolo",
    category: "colombiano",
    methods: ["sarten", "horno"],
    time: "1 hora",
    ingredients: `- 6 mazorcas tiernas
- ½ taza de queso costeño rallado
- 2 cucharadas de mantequilla
- 2 cucharadas de azúcar
- Sal`,
    preparation: `1. Desgrana las mazorcas.
2. Muele en la licuadora con un poco de leche.
3. Cuela para quitar los grumos.
4. Agrega el queso, la mantequilla, el azúcar y la sal.
5. Forma arepas.
6. Cocina en sartén engrasado hasta dorar por ambos lados.
7. O lleva al horno a 190°C (375°F) por 25 minutos.
8. Sirve tibias.`,
    createdAt: 123,
  },
  {
    id: "seed-arroz-atollado",
    name: "Arroz Atollado",
    category: "colombiano",
    methods: ["olla"],
    time: "1 hora 30 min",
    ingredients: `- 3 tazas de arroz
- 1 libra de carne de cerdo en trozos
- 1 pollo en presas
- 3 chorizos
- 2 papas guatas
- 1 cebolla cabezona
- 3 tomates
- Color, comino, sal y pimienta
- Cilantro`,
    preparation: `1. Sofríe la cebolla y los tomates picados.
2. Agrega las carnes y dora.
3. Agrega agua suficiente para cocinar las carnes.
4. Cuando estén blandas agrega las papas en cuadritos.
5. Agrega los chorizos partidos.
6. Agrega el arroz con color, comino, sal y pimienta.
7. Cocina revolviendo constantemente hasta que el arroz esté cremoso.
8. Sirve con cilantro picado por encima.`,
    createdAt: 124,
  },
  {
    id: "seed-escalope-ternera-cordon-blue",
    name: "Escalope de Ternera a la Cordon Blue",
    category: "plan",
    methods: ["sarten"],
    time: "30 minutos",
    ingredients: `- 4 escalopes de ternera
- Jamón en lonjas
- Queso amarillo en tajadas
- 2 huevos batidos
- Harina de trigo
- Miga de pan
- Sal y pimienta al gusto
- Aceite para freír`,
    preparation: `1. Adobar la ternera con sal y pimienta.
2. Batir los dos huevos enteros.
3. Armar una tajada de ternera, una de jamón, una de queso y enrollar.
4. Pasar por el huevo batido, luego por la harina de trigo, y finalmente por la miga de pan.
5. Freír en aceite caliente hasta dorar.`,
    notes: `Porciones: 4 porciones`,
    createdAt: 126,
  },
  {
    id: "seed-pechugas-salsa-mandarina",
    name: "Pechugas con Salsa de Mandarina",
    category: "plan",
    methods: ["sarten"],
    time: "25 minutos",
    ingredients: `- 2 pechugas en filete
- 2 mandarinas
- 2 cucharadas de maizena
- ½ taza de crema de leche
- 2 cucharadas de azúcar
- ¼ taza de vino blanco
- 1 cucharada de mostaza
- 2 cucharadas de brandy
- Sal y pimienta al gusto
- Aceite para dorar`,
    preparation: `1. Sazonar las pechugas con mostaza, sal y pimienta.
2. Dorar las pechugas en aceite y reservar.
3. Exprimir las mandarinas y colar el jugo.
4. Poner el jugo al fuego y agregar el azúcar, vino, brandy, sal y pimienta.
5. Espesar la salsa con maizena disuelta en un poco de agua.
6. Bañar las pechugas con la salsa y servir con puré de papas.`,
    notes: `Porciones: 2 porciones

Secreto del cucharón: La combinación de cítrico con brandy da un toque elegante. Si no tienes brandy, puedes usar más vino blanco.`,
    createdAt: 127,
  },
  {
    id: "seed-pollo-paprika",
    name: "Pollo a la Paprika",
    category: "plan",
    methods: ["sarten"],
    time: "50 minutos",
    ingredients: `- 1 pollo cortado en presas
- 3 cucharadas de margarina
- 4 cebollas cabezonas cortadas en trozos
- 4 zanahorias en rebanadas
- 1 cubo de caldo de pollo
- 1 taza de agua
- ¼ cucharadita de páprika (pimentón dulce)
- 2 tazas de crema agria
- Sal, pimienta y ajo en polvo al gusto
- Perejil para adornar`,
    preparation: `1. Espolvorear el pollo con ajo en polvo, sal y pimienta.
2. Dorar las presas en margarina caliente y retirar del sartén.
3. Sofreír la cebolla y zanahoria en la misma grasa durante 5 minutos.
4. Disolver el cubo de caldo en una taza de agua y agregar a las legumbres.
5. Cuando hierva, colocar de nuevo el pollo en el sartén.
6. Tapar y cocinar a fuego lento por 30 minutos.
7. Servir el pollo en un molde.
8. Mezclar la crema agria con la salsa del sartén y calentar sin que hierva.
9. Verter la mezcla sobre el pollo y adornar con perejil.`,
    notes: `Porciones: 4 porciones`,
    createdAt: 128,
  },
  {
    id: "seed-pollo-limon",
    name: "Pollo al Limón",
    category: "rapido",
    methods: ["sarten"],
    time: "20 minutos",
    ingredients: `- 4 pechugas de pollo deshuesadas
- 3 cucharadas de aceite
- 1 cucharada de semillas de ajonjolí
- 2 cucharadas de mantequilla
- ½ taza de azúcar
- ¼ taza de agua
- ¼ taza de jugo de limón
- 2 cucharadas de maizena
- 1 cucharada de agua (para maizena)
- Sal y pimienta al gusto`,
    preparation: `1. Calentar aceite en un sartén.
2. Aplanar las pechugas de pollo y saltear durante 2½ minutos por cada lado.
3. Cubrir con semillas de ajonjolí, retirar del sartén y mantener calientes.
4. Derretir la mantequilla en una cacerola y agregar el azúcar.
5. Revolver constantemente y cocinar hasta que el azúcar se caramelice.
6. Agregar ¼ taza de agua y jugo de limón, calentar hasta que hierva.
7. Mezclar la maizena con 1 cucharada de agua y agregar a la salsa.
8. Dejar hervir nuevamente hasta que espese.
9. Verter la salsa sobre el pollo y servir.`,
    notes: `Porciones: 4 porciones

Secreto del cucharón: El caramelo le da un sabor agridulce increíble. No te asustes cuando agregues el líquido al caramelo, va a burbujear fuerte pero es normal.`,
    createdAt: 129,
  },
  {
    id: "seed-souffle-pollo",
    name: "Soufflé de Pollo",
    category: "plan",
    methods: ["horno"],
    time: "1 hora 30 minutos",
    ingredients: `- 1 pollo cocido y desmechado
- 4 huevos
- 1 taza de pan tostado molido
- 1 taza de verduras mixtas (opcional)
- 2 cebollas cabezonas picadas
- 1 cucharada de pimentón picado
- 1 cucharada de apio picado
- ½ taza de crema de leche
- Aceitunas o alcaparras para decorar
- Sal y pimienta al gusto
- Mantequilla para el molde`,
    preparation: `1. Cocinar el pollo con sal, aliños y hierbas hasta que esté blando.
2. Dejar reposar y desmechar muy fino.
3. Mezclar el pollo con todos los ingredientes.
4. Verter en un molde engrasado y espolvorear con pan tostado.
5. Cocinar al baño María hasta que al chuzarlo con un cuchillo salga limpio.
6. Alternativamente, llevar al horno cubierto con papel aluminio y con trocitos de mantequilla por encima.
7. Servir acompañado con salsa de tomate o champiñones.`,
    notes: `Porciones: 6 porciones`,
    createdAt: 130,
  },
  {
    id: "seed-cazuela-calamares",
    name: "Cazuela de Calamares",
    category: "plan",
    methods: ["sarten"],
    time: "45 minutos",
    ingredients: `- 1 libra de calamares limpios
- 1 libra de papas en rodajas delgadas
- 1 cucharada de vinagre
- 1 cucharada de salsa inglesa
- 1 pimentón maduro picado
- 2 cebollas cabezonas picadas
- 3 cucharadas de aceite
- 1 hoja de laurel
- 2 dientes de ajo
- 1 cucharada de mostaza
- 1 copa de vino blanco
- Sal y pimienta al gusto`,
    preparation: `1. Limpiar los calamares y ponerlos a cocinar en agua suficiente para 6 porciones.
2. Agregar laurel, sal, pimienta, mostaza, salsa inglesa y vinagre.
3. Añadir las papas en rodajas delgadas y cocinar hasta que los calamares estén tiernos y las papas blandas.
4. Aparte, sofreír la cebolla, pimentón y ajo en el aceite.
5. Agregar el sofrito a los calamares y dejar hervir por 10 minutos más.
6. Añadir 1 copa de vino blanco y servir caliente con arroz blanco.`,
    notes: `Porciones: 6 porciones`,
    createdAt: 131,
  },
  {
    id: "seed-cocktail-camarones",
    name: "Cocktail de Camarones",
    category: "rapido",
    methods: ["sarten","sincoccion"],
    time: "20 minutos + enfriado",
    ingredients: `- 1 libra de camarones cocidos
- 1 yema de huevo
- 1 cucharada de mantequilla
- 1 cucharada de azúcar
- 1 cucharadita de sal
- 1 cucharadita de maizena
- 1 taza de salsa de tomate
- 1 cucharada de salsa Perrins (Worcestershire)
- 1 cucharada de apio picado
- ½ limón (jugo)
- Pimienta al gusto
- Lechuga y perejil para decorar`,
    preparation: `1. Poner al fuego una sartén con ½ taza de agua, la yema de huevo batida, mantequilla, azúcar, sal y pimienta.
2. Cuando empiece a hervir, agregar la maizena disuelta en un poco de agua.
3. Revolver hasta que espese y retirar del fuego.
4. Agregar la salsa de tomate, salsa Perrins, apio y jugo de limón.
5. Mezclar con los camarones y llevar a la nevera.
6. Servir en recipientes rodeados de hielo picado y adornar con perejil y lechuga.`,
    notes: `Porciones: 6 porciones`,
    createdAt: 132,
  },
  {
    id: "seed-cazuela-mariscos",
    name: "Cazuela de Mariscos",
    category: "plan",
    methods: ["sarten"],
    time: "50 minutos",
    ingredients: `- 1 libra de filetes de pescado
- 1 libra de calamares
- 1 libra de camarones
- 1 libra de almejas
- ½ taza de apio picado
- 1 taza de cebolla cabezona picada
- ½ taza de pimentón picado
- 3-4 dientes de ajo
- 1 frasco de pasta de tomate
- 2 cucharadas de margarina
- ¼ taza de aceite de oliva
- ½ taza de vino blanco
- 1 manojo de hierbas (orégano, tomillo, apio, 3 hojas de laurel)
- ½ taza de crema de leche
- 2 cubos de caldo
- Ají, sal y pimienta al gusto
- Queso parmesano rayado (opcional)`,
    preparation: `1. Limpiar los mariscos y ponerlos a cocinar en agua suficiente para 6 porciones.
2. Agregar los cubos de caldo, hierbas y sal.
3. Aparte, sofreír cebolla, apio, pimentón y ajo en aceite mezclado con mantequilla.
4. Agregar pasta de tomate, ají y pimienta al sofrito.
5. Cuando los mariscos estén blandos, agregar el sofrito.
6. Rectificar sal y ají, dejar cocinar por 15-20 minutos.
7. Agregar el vino blanco.
8. Si se desea más espesa, añadir 2 cucharadas de harina disuelta en agua.
9. Opcionalmente, espolvorear con queso parmesano y gratinar.`,
    notes: `Porciones: 6 porciones

Secreto del cucharón: Este es un plato de celebración. Usa los mariscos más frescos que consigas y no escatimes en el vino blanco.`,
    createdAt: 133,
  },
  {
    id: "seed-pescado-leche",
    name: "Pescado en Leche",
    category: "plan",
    methods: ["horno"],
    time: "45 minutos",
    ingredients: `- 2 libras de pescado (corvina o similar)
- 3 cebollas cabezonas
- 1 rama de apio
- ½ libra de queso parmesano rallado
- 1 taza de pan tostado molido
- ¼ libra de mantequilla
- 2 libras de papas para freír
- 2 tazas de leche
- Sal al gusto`,
    preparation: `1. Cocinar el pescado en agua con leche, sal, una cebolla y una rama de apio.
2. Cuando esté cocido, deshuesar y desmechar.
3. Mezclar el pescado con mantequilla derretida, cebolla picada, sal y pimienta.
4. En un recipiente refractario, colocar una capa de pescado.
5. Agregar una capa de miga de pan y rociar con un poco de leche.
6. Añadir una capa de queso parmesano.
7. Continuar hasta terminar con todos los ingredientes, cuidando que la última capa sea de queso.
8. Cubrir con papas fritas y llevar al horno por 15 minutos.`,
    notes: `Porciones: 6 porciones`,
    createdAt: 134,
  },
  {
    id: "seed-pescado-vino",
    name: "Pescado al Vino",
    category: "rapido",
    methods: ["horno"],
    time: "25 minutos",
    ingredients: `- 3 libras de filete de pescado
- 2 copas de vino blanco seco
- 2 cucharadas de jerez seco
- 1 limón en rodajas
- 1 taza de champiñones
- 2 cucharadas de mantequilla
- Sal y pimienta al gusto
- Mantequilla para engrasar`,
    preparation: `1. Colocar los filetes en un molde engrasado.
2. Bañar con las dos copas de vino blanco seco y el jerez.
3. Sazonar con sal y pimienta.
4. Llevar al horno hasta que esté cocido (aproximadamente 20-25 minutos).
5. Mientras tanto, saltear los champiñones en mantequilla.
6. Servir el pescado con limón en rodajas y champiñones salteados.`,
    notes: `Porciones: 6 porciones

Secreto del cucharón: Simple pero elegante. El vino blanco seco es clave, no uses vino dulce.`,
    createdAt: 135,
  },
  {
    id: "seed-seviche-pescado",
    name: "Seviche de Pescado",
    category: "rapido",
    methods: ["sincoccion"],
    time: "15 minutos + marinado",
    ingredients: `- 2 libras de pescado fresco (corvina, tilapia o mero)
- ½ taza de jugo de limón
- 3 tomates pelados y picados
- 2 cebollas cabezonas en rebanadas
- 1 cucharadita de sal
- 1 cucharadita de azúcar
- 1 cucharada de vinagre
- 1 cucharada de aceite
- 1 cucharadita de pimienta
- 1 cucharada de perejil picado`,
    preparation: `1. Partir el pescado en tajadas delgadas y mezclar con el jugo de limón.
2. Pelar los tomates en agua hirviendo y picarlos.
3. Partir las cebollas en rebanadas finas.
4. Agregar todos los ingredientes restantes y mezclar bien.
5. Llevar a la nevera por al menos 2 horas.
6. Servir bien helado.`,
    notes: `Porciones: 6 porciones

Secreto del cucharón: El pescado debe estar MUY fresco. El limón 'cocina' el pescado, así que déjalo marinar mínimo 2 horas.`,
    createdAt: 136,
  },
  {
    id: "seed-donas",
    name: "Donas",
    category: "dulce",
    methods: ["sarten"],
    time: "1 hora",
    ingredients: `- 2 libras de harina de trigo
- 1 pocillo de agua tibia
- 3 cucharadas de azúcar
- 1 cucharada de levadura
- 3 cucharadas de leche en polvo
- 1 cucharadita de sal
- 2 onzas de mantequilla
- 3 yemas de huevo
- Aceite para freír
- Azúcar y canela en polvo para espolvorear`,
    preparation: `1. Poner la levadura en el agua tibia con una pizca de azúcar hasta que suba.
2. Agregar suficiente harina para hacer una masa y el resto de los ingredientes.
3. Amasar bien hasta obtener una masa suave y elástica.
4. Extender con rodillo y cortar las donas con cortador.
5. Dejar reposar por 10-15 minutos para que suban.
6. Freír en aceite caliente hasta dorar.
7. Espolvorear con azúcar mezclada con canela en polvo.`,
    notes: `Porciones: 12-15 donas`,
    createdAt: 137,
  },
  {
    id: "seed-hojaldras",
    name: "Hojaldras",
    category: "dulce",
    methods: ["sarten"],
    time: "40 minutos",
    ingredients: `- 1 libra de harina de trigo
- 1 huevo
- 2 cucharadas de margarina
- 2 cucharaditas de azúcar
- 1 cucharadita de sal
- 1 cucharadita de jugo de naranja agria (o jugo de 1 naranja dulce)
- Agua tibia (la necesaria)
- Aceite para freír
- Azúcar para espolvorear (opcional)`,
    preparation: `1. Amasar la harina con el huevo, margarina, azúcar, sal y jugo de naranja.
2. Si es necesario, terminar de mojar con agua tibia.
3. Amasar hasta que la masa esté dócil y suave.
4. Dejar reposar por 15 minutos cubierta con un paño.
5. Extender la masa bien delgada y cortar las hojaldras.
6. Freír en aceite bien caliente hasta dorar.
7. Si se desea, poner azúcar en una bolsa de papel y meter las hojaldras recién fritas para que se cubran de azúcar.`,
    notes: `Porciones: 15-20 hojaldras

Secreto del cucharón: La masa debe quedar MUY delgada, casi transparente. Eso es lo que las hace crujientes y hojaldradas.`,
    createdAt: 138,
  },
  {
    id: "seed-galletas-cucas",
    name: "Galletas Cucas",
    category: "dulce",
    methods: ["horno"],
    time: "35 minutos",
    ingredients: `- 1 libra de harina de trigo
- 1 huevo
- ¼ libra de margarina
- 1 cucharada de bicarbonato
- 1 panela (para el melado)
- 1 taza de agua`,
    preparation: `1. Preparar el melado cocinando la panela en una taza de agua.
2. Dejar hervir un poco para que quede a término medio (ni muy claro ni muy espeso).
3. Cuando se enfríe, remojar la harina con la margarina, huevo, bicarbonato y el melado necesario.
4. Amasar bien (la masa no debe pegarse en las manos; si se ablanda agregar un poco más de harina).
5. Armar las galletas bien planitas con las manos engrasadas de aceite.
6. Colocar en una lata engrasada, separadas porque crecen.
7. Hornear a 150°C (300°F) hasta que doren.`,
    notes: `Porciones: 24 galletas

Secreto del cucharón: Estas galletas colombianas tradicionales tienen ese sabor único de la panela. La textura debe ser crocante por fuera y suave por dentro.`,
    createdAt: 139,
  },
  {
    id: "seed-muffins",
    name: "Muffins",
    category: "bases",
    methods: ["horno"],
    time: "35 minutos",
    ingredients: `- 1¾ tazas de harina de trigo
- 2 cucharadas de azúcar
- 2½ cucharaditas de polvo de hornear
- ¾ cucharadita de sal
- 1 huevo batido
- ¾ taza de leche
- 1/3 taza de aceite`,
    preparation: `1. Mezclar los ingredientes secos (harina, azúcar, polvo de hornear y sal).
2. Aparte, combinar el huevo batido, la leche y el aceite.
3. Añadir los líquidos a los ingredientes secos.
4. Revolver con tenedor solo hasta que todos los ingredientes estén mojados (no sobre mezclar).
5. Verter la masa en moldes individuales engrasados.
6. Hornear a 200°C (400°F) por 25 minutos.`,
    notes: `Porciones: 12 muffins

Secreto del cucharón: La clave: NO sobre mezclar. La masa debe verse con grumos. Si la bates mucho, quedan duros.`,
    createdAt: 140,
  },
  {
    id: "seed-palitos-soda",
    name: "Palitos de Soda",
    category: "bases",
    methods: ["horno"],
    time: "30 minutos",
    ingredients: `- ½ libra de harina de trigo
- ½ taza de leche
- ¼ libra de mantequilla
- 1 cucharadita de sal
- ½ cucharadita de bicarbonato
- 1 cucharadita de polvo Royal`,
    preparation: `1. Mezclar todos los ingredientes.
2. Amasar bien hasta obtener una masa homogénea.
3. Formar un cordón delgado con la masa.
4. Cortar palitos de aproximadamente 10 centímetros.
5. Llevar al horno a 175°C (350°F) hasta que doren.`,
    notes: `Porciones: 20-25 palitos`,
    createdAt: 141,
  },
  {
    id: "seed-pan-batido",
    name: "Pan Batido",
    category: "bases",
    methods: ["horno"],
    time: "1 hora 30 minutos",
    ingredients: `- 1 libra de harina de trigo
- 1 huevo
- 1 cucharadita de sal
- 1 sobre de levadura (7g)
- ¼ libra de margarina
- 1 taza de agua tibia
- ¾ taza de azúcar
- 1 taza de leche
- ½ taza de pasas`,
    preparation: `1. Tibiar la taza de agua (apenas calientita) con una cucharadita de azúcar.
2. Agregar la levadura y tapar hasta que suba (10-15 minutos).
3. Aparte, mezclar todos los ingredientes restantes.
4. Agregar la levadura activada a la mezcla.
5. Amasar bien y golpear la masa con la mano (dando palmadas) hasta que haga burbujas.
6. Poner un poco de masa en un vaso con agua y dejar en un lugar cerrado y tibio.
7. Cuando la masa del vaso suba, significa que está lista.
8. Colocar la masa en un molde engrasado y enharinado.
9. Calentar el horno a 200°C (400°F) y hornear por 20 minutos o hasta que al introducir un cuchillo salga limpio.`,
    notes: `Porciones: 1 pan grande

Secreto del cucharón: El 'batido' viene de golpear la masa con las manos. Eso desarrolla el gluten y hace que quede esponjoso.`,
    createdAt: 142,
  },
  {
    id: "seed-torta-sencilla",
    name: "Torta Sencilla",
    category: "dulce",
    methods: ["horno"],
    time: "1 hora",
    ingredients: `- ¼ libra de mantequilla
- 1¼ taza de azúcar
- 2¼ tazas de harina de trigo
- 3 huevos
- 3 cucharaditas de polvo Royal
- ¾ taza de leche o jugo de naranja
- 1 cucharadita de vainilla
- 1 copa de vino (si se usa leche)
- ½ cucharadita de sal
- Ralladura de naranja (opcional si se usa jugo)`,
    preparation: `1. Batir la mantequilla con el azúcar hasta que esté cremosa.
2. Agregar los huevos uno a uno y batir.
3. Ir agregando el resto de los ingredientes poco a poco sin dejar de batir.
4. Verter la mezcla en un molde engrasado y enharinado.
5. Hornear a 175°C (350°F) por 45 minutos aproximadamente o hasta que al insertar un palillo salga limpio.`,
    notes: `Porciones: 8-10 porciones`,
    createdAt: 143,
  },
  {
    id: "seed-torta-media-noche",
    name: "Torta de Media Noche",
    category: "dulce",
    methods: ["horno"],
    time: "1 hora",
    ingredients: `- 2¼ tazas de harina de trigo
- 1⅔ tazas de azúcar
- ⅔ taza de cocoa
- 1¼ cucharadita de bicarbonato
- 1 cucharadita de sal
- 1¼ cucharadita de polvo Royal
- 1¼ tazas de leche
- ¾ taza de mantequilla
- 2 huevos
- 1 cucharadita de vainilla`,
    preparation: `1. Batir la mantequilla con el azúcar hasta que esté cremosa.
2. Agregar los huevos y batir un poco más.
3. Ir agregando el resto de los ingredientes poco a poco sin dejar de batir.
4. Verter la mezcla en un molde engrasado y enharinado.
5. Hornear a 175°C (350°F) por 45 minutos aproximadamente o hasta que al insertar un palillo salga limpio.`,
    notes: `Porciones: 8-10 porciones

Secreto del cucharón: El nombre viene de que es perfecta para esos antojos de media noche. Húmeda, chocolatosa y reconfortante.`,
    createdAt: 144,
  },
  {
    id: "seed-torta-banano",
    name: "Torta de Banano",
    category: "dulce",
    methods: ["horno"],
    time: "1 hora 15 minutos",
    ingredients: `- 4 onzas de margarina (¼ libra)
- 1 huevo
- 1½ taza de harina de trigo
- 2 cucharadas de leche
- 1 taza de azúcar
- 2 bananos maduros
- 1 cucharadita de polvo de hornear
- 1 cucharadita de bicarbonato
- 1 cucharadita de vainilla
- ½ cucharadita de sal`,
    preparation: `1. Mezclar la margarina con el azúcar hasta que esté cremosa.
2. Añadir el huevo.
3. Pelar y triturar los bananos y añadirlos a la mezcla.
4. Agregar la harina, sal, bicarbonato y polvo de hornear.
5. Disolver la vainilla en la leche y añadir a la mezcla.
6. Mezclar bien todos los ingredientes.
7. Verter en un molde engrasado y enharinado.
8. Hornear a 150°C (300°F) por una hora aproximadamente o hasta que el cuchillo salga limpio.`,
    notes: `Porciones: 8-10 porciones

Secreto del cucharón: Entre más maduros los bananos, mejor. Los que están casi negros dan el sabor más dulce y húmedo.`,
    createdAt: 145,
  },
  {
    id: "seed-suspiros",
    name: "Suspiros",
    category: "dulce",
    methods: ["horno"],
    time: "45 minutos",
    ingredients: `- 4 claras de huevo
- ¼ cucharadita de cremor tártaro
- 1 pizca de sal
- 1 taza de azúcar refinada
- 1 cucharadita de vainilla`,
    preparation: `1. Batir bien las claras de huevo con la sal hasta que estén espumosas.
2. Añadir el cremor tártaro y continuar batiendo hasta que se formen picos suaves.
3. Ir incorporando 2/3 partes del azúcar poco a poco sin dejar de batir.
4. Continuar batiendo hasta que la mezcla adquiera una consistencia espesa y homogénea.
5. Para verificar el punto, tomar una pequeña cantidad entre los dedos; si no se sienten granos de azúcar, está listo.
6. Agregar la vainilla y el resto del azúcar con movimientos suaves y envolventes.
7. Recubrir una lata de hornear con papel grueso o papel mantequilla.
8. Poner los suspiros por cucharadas o usar una manga pastelera con boquilla.
9. Hornear a 120°C (250°F) durante 30 minutos.
10. No deben tomar color; cuando estén firmes, sacarlos y despegarlos del papel.`,
    notes: `Porciones: 24-30 suspiros

Secreto del cucharón: La paciencia es clave. Hornear bajo y lento los hace crocantes por fuera y suaves por dentro. Si se doran, la temperatura está muy alta.`,
    createdAt: 146,
  },
  {
    id: "seed-tortillas-yuca",
    name: "Tortillas de Yuca",
    category: "colombiano",
    methods: ["olla", "sarten"],
    time: "45 min",
    ingredients: `- 2 tazas de yuca cocida y rallada (400 gramos aproximadamente)
- 1 huevo
- 1 cebolla cabezona pequeña picada finamente
- 1 cucharadita de sal
- Aceite para freír`,
    preparation: `1. Si aún no has cocido la yuca, pela y corta en trozos.
2. Cocina en agua con sal hasta que esté blanda (20-25 minutos).
3. Escurre bien y deja enfriar ligeramente.
4. Ralla la yuca cocida con rallador grueso o májala con tenedor.
5. En un recipiente mezcla la yuca rallada con el huevo.
6. Agrega la cebolla picada finamente y la sal.
7. Mezcla todo muy bien hasta integrar.
8. Calienta una cucharadita de aceite en un sartén a fuego medio.
9. Toma porciones de la masa y forma tortillas con las manos.
10. Coloca en el sartén caliente.
11. Espera que se doren de un lado (3-4 minutos).
12. Voltea con cuidado y dora del otro lado (3-4 minutos más).
13. Retira cuando estén doradas por ambos lados.
14. Escurre sobre papel absorbente si es necesario.
15. Sirve calientes.`,
    createdAt: 125,
  },
];
