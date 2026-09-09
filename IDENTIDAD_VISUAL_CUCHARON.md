# IDENTIDAD VISUAL — Un Cucharón de Amor
**Última actualización: Septiembre 2026** (colores, tipografía y
logos corregidos para reflejar el código real, ver notas inline)

---

## 🎯 PRINCIPIO RECTOR

> "No es una app de recetas. Es una carta de amor en formato digital.
>"

La app debe sentirse como una **cocina que acompaña**, no como
una base de datos. Cálida, humana, hogareña.

---

## 🎨 PALETA DE COLORES

**Actualizado sept 2026 para reflejar los valores reales del código**
(`src/index.css`, variables `:root`) — la versión anterior de este
documento tenía hex distintos que nunca llegaron a implementarse.
Se conserva el mismo concepto (terracota + crema cálidos), pero
estos son los valores que de verdad están en producción.

| Nombre | Hex | Uso principal |
|---|---|---|
| Terracota principal | `#E85D2F` | Botones CTA, acento, logo |
| Terracota claro | `#F18A63` | Hover, focus ring |
| Terracota oscuro | `#C44820` | Gradientes de botones, estados activos |
| Crema fondo | `#FFF6EA` | Fondo principal de toda la app |
| Crema profundo | `#F7E8D2` | Tarjetas, bordes, fondos secundarios |
| Verde | `#5E8C4A` | Acento secundario (salud, textos de éxito) |
| Dorado (ochre) | `#F2A93B` | Detalles decorativos, acentos cálidos |
| Café oscuro (ink) | `#3A2A20` | Texto principal |
| Café medio | `#8A6B55` | Texto secundario/terciario |
| Papel | `#FFF8EF` | Fondo alterno de tarjetas |

Bordes puntuales usan tonos beige muy cercanos a la crema profunda
(`#EAD9C4`, `#EDE8DC`) — variaciones del mismo concepto, no colores
nuevos.

**Por qué se queda así y no se ajusta al hex anterior:** el terracota
actual (`#E85D2F`) es más saturado que el `#cc7237` documentado antes
— dispara más respuesta de apetito/urgencia en los botones de acción
("Cocinar con amor", "Comenzar"), algo que sí importa en una app que
depende de que la usuaria toque el botón. El crema actual (`#FFF6EA`)
es más claro, mejor legibilidad en cocina con luz variable. Cambiar
esto ahora significaría rediseñar cientos de líneas de estilos en una
app que ya tiene compradoras reales, sin un beneficio claro a cambio.

### Reglas de uso
- Fondo siempre crema `#FFF6EA` — nunca blanco puro
- Botones principales: terracota `#E85D2F` con texto blanco
- Botones secundarios: outline terracota sobre crema
- Tarjetas con efecto "papel apilado": fondo `#FFF6EA` o `#FFF8EF`,
  borde `#F7E8D2` / `#EAD9C4`, sombra sutil debajo
- Texto sobre fondo oscuro: crema `#FFF6EA`

---

## 🔤 TIPOGRAFÍA

**Actualizado sept 2026** — el doc anterior decía "Nunito", pero esa
fuente nunca se implementó. Estas son las 3 que sí están cargadas y
en uso real (`index.html` + `src/index.css`):

- **Títulos / momentos con peso emocional:** Playfair Display (serif,
  elegante) — ej. "Un Cucharón de Amor", "¡Bienvenida a tu cocina!"
- **Cuerpo de texto:** DM Sans (sans-serif limpia, legible en móvil)
- **UI / labels / botones:** Montserrat (usada inline en la mayoría
  de componentes para navegación, chips, formularios)
- **Peso títulos:** Bold (700)
- **Peso cuerpo:** Regular (400) / Medium (500)
- **Tamaño mínimo:** 14px para legibilidad en móvil

**Por qué se queda así:** Playfair Display en los títulos conecta
mejor con el concepto de marca ("carta de amor", "recetas que viajan
por generaciones") que una fuente redondeada tipo Nunito — evoca
herencia y tradición en vez de un tono casual genérico, algo que
pesa más para el público objetivo (mujeres 40-65 que valoran lo
familiar) en un producto premium de pago único.

### Principios tipográficos
- Nada corporativo ni frío
- Legible en cocina (manos ocupadas, pantalla a distancia)
- Jeraquía clara: título → subtítulo → cuerpo → caption

---

## 🥄 LOGO

**Descripción:** Círculo terracota (`#cc7237`) con cucharón blanco
y corazón de vapor en el centro. Minimalista, reconocible, cálido.

**Archivos disponibles (verificado sept 2026 — los que estaban antes
listados, `Logo_Cucharon_App.png` y `Logo_Cucharon_App_Transparente.png`,
no existen en el repo):**
- `icon-192.png` — icono PWA 192x192px (`public/`)
- `icon-512.png` — icono PWA 512x512px (`public/`)
- `logo-cucharon.webp` — versión usada en header y pantalla de
  ingreso (`src/assets/`)

**Reglas de uso:**
- Sobre fondo claro: logo con círculo terracota completo
- Sobre botones naranjas: usar versión transparente dentro
  de un "medallón" blanco/crema para contraste
- Nunca deformar ni recolorear el logo
- Espacio mínimo alrededor: equivalente al radio del círculo

---

## 🖼️ FOTOGRAFÍA DE RECETAS

### Estilo visual
- Iluminación lateral dramática y cálida
- Recipientes rústicos: barro, cerámica oscura, hierro
- Calidad editorial — no foto de celular
- Props pequeños de ingredientes en el encuadre
- Vapor cuando aplica (sopas, platos calientes)

### Especificaciones técnicas
- Formato: WebP
- Tamaño: 600×600px (cuadrada)
- Calidad: 85 → 75 → 65 → 55 (reducir hasta <200KB)
- Fondo: variado (mármol, lino, madera roble, nogal, piedra)
- Generación: DALL-E con prompts de estilo editorial

### Variedad de fondos (para evitar monotonía)
1. Mármol blanco con vetas grises
2. Lino natural
3. Madera de roble oscura
4. Nogal cálido
5. Piedra gris

---

## 📱 IMÁGENES DE LA APP

| Archivo | Dónde se usa | Estilo |
|---|---|---|
| `modal-sopa.webp` | Fondo pantalla login/modal | Sopa oscura, dramática, vapor en corazón |
| `sarten-chef.webp` | Tab Chef IA | Sartén humeante, colorida, fondo blanco |
| `paella-favoritos.webp` | Header tab Favoritos | Paella de mariscos, rústica, luz natural |
| `cucharon-sopa.webp` | Imagen decorativa | Cucharón metálico con sopa, fondo blanco |
| `onboarding-ajiaco.webp` | Onboarding pantalla 1 | Ajiaco en cazuela de barro, editorial |
| `onboarding-mapa.webp` | Onboarding pantalla 2 | Captura de pantalla de la app |

---

## 📐 COMPONENTES VISUALES CLAVE

### Tarjeta de receta
- Fondo: `#f7f3eb`
- Borde: `#e7d8c6` sutil
- Sombra: 2 capas debajo (efecto "papel apilado")
- Esquinas: redondeadas (border-radius generoso)
- Foto: cuadrada arriba, título abajo

### Botones CTA principales
- Fondo: `#cc7237`
- Texto: blanco
- Tamaño: grande, fácil de tocar en móvil (mín. 48px altura)
- Forma: pill / muy redondeado

### Botones secundarios
- Outline terracota `#cc7237`
- Fondo: crema `#f7f3eb`
- Texto: café oscuro `#2f2a26`

### Chips de método de cocción
- Pastilla pequeña con texto
- Colores diferenciados por método (pendiente definir)

### Pantalla de ingreso
- Fondo: imagen `modal-sopa.webp` (oscura, dramática)
- Logo centrado arriba
- Nombre de la app en tipografía elegante
- Botón "Comenzar" en terracota
- Caption: 🔒 "Una cocina privada, hecha para ti."

---

## ✍️ VOZ Y TONO

### Cómo debe sonar
- Cálido · Humano · Cercano · Emocional · Claro
- Como una amiga que cocina bien y te quiere ayudar
- Primera persona cuando habla la app ("Tu chef personal")

### Cómo NO debe sonar
- Técnico · Frío · Corporativo · Vendedor · Genérico

### Palabras que funcionan
hogar · familia · generaciones · sabor de casa · probadas ·
reales · amor · legado · manos · memoria · cocinamos · tuyas

### Palabras a evitar
plataforma · algoritmo · digital *(en exceso)* · producto ·
app *(como eje principal)*

### Ejemplos de voz correcta
- ✅ "Tu chef personal cuando no sabes qué cocinar"
- ✅ "¡Bienvenida a tu cocina! 🧡"
- ✅ "Las recetas que amas viven aquí 💛"
- ✅ "Rico... pero tu cuerpo dice gracias, no queja"
- ❌ "Plataforma de gestión de recetas"
- ❌ "Selecciona una categoría"

---

## 🎭 PRINCIPIOS DE DISEÑO (no negociables)

1. Menos ruido, más claridad
2. Cada pantalla debe inspirar confianza
3. El usuario nunca debe sentirse abrumado
4. La emoción tiene la misma importancia que la funcionalidad
5. La tecnología debe desaparecer detrás de la experiencia
6. Toda decisión visual debe reforzar la sensación de hogar
7. La app debe acompañar, no imponer
8. Optimizado para móvil — se usa en la cocina, no en escritorio

---

## 📋 CHECKLIST ANTES DE PUBLICAR CUALQUIER PANTALLA

- [ ] ¿Usa la paleta correcta? (crema, terracota, café)
- [ ] ¿La tipografía es Nunito y legible en móvil?
- [ ] ¿El fondo es crema (no blanco puro)?
- [ ] ¿Los botones son grandes y fáciles de tocar?
- [ ] ¿Se siente cálido o se siente como software genérico?
- [ ] ¿Podría existir esta pantalla en cualquier app,
      o solo en Un Cucharón de Amor?

---

**Comando para actualizar:** "Vera actualiza IDENTIDAD_VISUAL: [cambio]"
