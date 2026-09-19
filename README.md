# Un Cucharón de Amor

App de recetas latinas y colombianas — "Recetas que viajan por
generaciones." Nació como regalo de cumpleaños #60 de Fercha para
sus hijos Juan David y Juliana, y hoy es un producto comercial real
(Founding Member, pago único vía Hotmart).

Combina un recetario personal (buscar, guardar, anotar toques
propios) con un "Chef IA" que sugiere qué cocinar según lo que hay
en la nevera y cómo está el cuerpo ese día — todo pensado para una
cocina gentil con el cuerpo (digestión ligera, sin fritos excesivos,
apta para fibromialgia, artritis y colon irritable).

**App en vivo:** https://cucharon-de-amor.vercel.app

## Documentación del proyecto

Antes de tocar código, lee esto (en este orden):

1. [`CLAUDE.md`](./CLAUDE.md) — cómo se trabaja en este repo (ramas,
   PRs, cuándo pedir permiso, qué nunca hacer)
2. [`SPEC_CUCHARON.md`](./SPEC_CUCHARON.md) — cómo funciona la app
   de verdad: base de datos, autenticación, flujos, pendientes
   técnicos
3. [`IDENTIDAD_VISUAL_CUCHARON.md`](./IDENTIDAD_VISUAL_CUCHARON.md)
   — paleta de colores, tipografía, tono de voz, reglas de marca
4. [`PENDIENTES_CUCHARON.md`](./PENDIENTES_CUCHARON.md) — qué falta,
   organizado por dueño (Fercha / técnico / contenido)

## Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Supabase (Auth + base de datos Postgres)
- **Hosting:** Vercel — despliegue automático al hacer push a `main`
- **Pagos:** Hotmart
- **Analytics:** PostHog

Migrado en septiembre 2026 desde Lovable (donde nació el proyecto)
a un flujo estándar de GitHub + Vercel — ya no depende de una
suscripción a Lovable para funcionar.

## Desarrollo local

Requiere Node.js y npm ([instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone https://github.com/ferchabetancourt-jpg/cucharon-de-amor.git
cd cucharon-de-amor
npm install
npm run dev
```

Necesitas un archivo `.env` local con las variables de Supabase
(pregunta a Fercha por los valores — nunca se commitean a git):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

### Otros comandos

```sh
npm run build       # build de producción
npm run lint        # eslint
npm run test        # tests con vitest
npm run preview     # sirve el build de producción localmente
```

## Estructura del proyecto

```
src/
  components/cucharon/   # componentes propios de la app (Header, RecipesPage, RecipeGenerator, etc.)
  components/ui/         # componentes de shadcn/ui realmente en uso (dialog, tooltip, toast...)
  pages/                  # Index (app), Admin (panel /admin), NotFound
  contexts/               # AuthContext
  hooks/                  # hooks propios (recetas, favoritos, notas)
  lib/                    # datos curados (categorías, moods, quotes), analytics, utils
  integrations/supabase/  # cliente de Supabase y tipos generados
  assets/                 # imágenes de la app (webp)
supabase/functions/       # Edge Functions (admin-users, generate-recipe, mcp)
```

## Ramas y despliegue

Todo el trabajo se hace en ramas `claude/<descripción>` vía PR a
`main` — nunca directo en `main` (ver `CLAUDE.md`). Cada PR genera
automáticamente un preview de Vercel para probar antes de mergear.
