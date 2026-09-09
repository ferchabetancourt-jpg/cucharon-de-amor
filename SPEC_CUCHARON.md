# SPEC — Un Cucharón de Amor
**Versión: Septiembre 2026 — Migración a Vercel**
*Fuente de verdad técnica del proyecto*

---

## 1. QUÉ ES ESTE PROYECTO

App de recetas latinas y colombianas construida como regalo de
cumpleaños #60 de Fercha para sus hijos Juan David y Juliana.
Hoy es un producto comercial real.

**Frase del proyecto:** "Recetas que viajan por generaciones."
**Audiencia:** Mujeres latinas 40–65 años
**Modelo comercial:** Founding Member — pago único
**Precio actual:** $19 USD (campaña pausada, en evaluación)

---

## 2. ESTADO ACTUAL (septiembre 2026)

### Stack técnico
- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Supabase (Auth + DB)
- **Hosting:** Vercel (migrado desde Lovable en agosto 2026)
- **Repo:** `github.com/ferchabetancourt-jpg/cucharon-de-amor`
- **Deploy:** `https://cucharon-de-amor.vercel.app` (auto-deploy desde `main`)
- **Rama backup Lovable:** `lovable-backup` (creada sep 2026)
- **Pagos:** Hotmart (producto ID F106796702L)
- **Analytics:** PostHog (us.posthog.com)
- **CI/CD:** Push a `main` → Vercel deploy automático

### URLs activas
- App: `https://cucharon-de-amor.vercel.app`
- Landing: `https://n-de-amor-landing.lovable.app` *(pendiente migrar)*
- Página Gracias: `https://gracias-un-cuchar.lovable.app` *(pendiente migrar)*
- Checkout: `https://pay.hotmart.com/F106796702L?checkoutMode=10&bid=1784422266748`

### Supabase
- Project ID: `dhzihasdpkpfssjnonny`
- URL: `https://dhzihasdpkpfssjnonny.supabase.co`
- Auth: email + contraseña (sin Google, sin confirmación de email)
- Admin: `ferchabetancourt@gmail.com`

---

## 3. BASE DE DATOS — 6 TABLAS

### `profiles`
| Columna | Tipo | Descripción |
|---|---|---|
| id | uuid | Coincide con auth.users |
| display_name | text | Nombre visible en la app |
| created_at | timestamp with time zone | |
| updated_at | timestamp with time zone | |
| onboarding_visto | boolean | false = mostrar onboarding |
| password_changed | boolean | false = forzar cambio de contraseña |

⚠️ No tiene columna `email` — cruzar con `auth.users` para obtenerlo.

### `allowed_emails`
Whitelist de emails autorizados a crear cuenta (compradoras Hotmart).
| Columna | Tipo |
|---|---|
| id | uuid |
| email | text |
| created_at | timestamp without time zone ⚠️ |

### `favorites`
| Columna | Tipo |
|---|---|
| id | uuid |
| user_id | uuid |
| recipe_id | text |
| created_at | timestamp with time zone |

### `recipe_notes`
| Columna | Tipo |
|---|---|
| id | uuid |
| user_id | uuid |
| recipe_id | text |
| content | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### `recipes_staging` (tabla principal)
| Columna | Tipo | Descripción |
|---|---|---|
| id | text ⚠️ | Slug legible (excepción documentada) |
| name | text | Nombre ALL CAPS |
| category | text | Una de las 8 categorías |
| category_raw | text | Categoría original (migración) |
| methods_raw | text | Métodos en texto libre (migración) |
| time | text | Tiempo de preparación |
| servings | text | Número de porciones |
| ingredients | text | Lista de ingredientes |
| preparation | text | Pasos numerados |
| notes | text | Consejos/variaciones |
| created_at | timestamp with time zone | |
| image_url | text | URL de la foto |
| methods | ARRAY | Métodos estructurados (7 chips) |
| sirve_con | text | Acompañamiento sugerido (UI pendiente) |
| status | text | Estado de publicación |
| created_by | text | Quién subió la receta |

**Total recetas:** ~237

### `user_roles`
| Columna | Tipo |
|---|---|
| id | uuid |
| email | text |
| role | text (ej. "admin") |
| created_at | timestamp with time zone |

---

## 4. AUTENTICACIÓN Y FLUJOS

### Registro (nuevo usuario)
1. App valida email en `allowed_emails` (client-side ⚠️ pendiente mover a server)
2. Si está en whitelist → `supabase.auth.signUp()`
3. Trigger `handle_new_user_profile()` crea registro en `profiles`
   con `onboarding_visto = false` y `password_changed = false`
4. En primer login: modal obligatorio "Crea tu contraseña personal"
5. Al guardar: `password_changed = true` + revisa `onboarding_visto`
6. Si `onboarding_visto = false` → muestra onboarding (3 pantallas)
7. `onboarding_visto = true` al montar el OnboardingModal

### Recuperación de contraseña
- Link "¿Olvidaste tu contraseña?" en AuthDialog
- `supabase.auth.resetPasswordForEmail()` con redirectTo
- Email llega (puede ir a spam — normal en dominio nuevo)
- Al tocar el link: abre RecoveryPasswordDialog
- Al guardar nueva contraseña: `password_changed = true` + redirige a home

### Admin
- Ruta `/admin` restringida a `ferchabetancourt@gmail.com`
- Chips de navegación: Usuarios | Acceso | Recetas | Backup
- Funciones: crear/desactivar/eliminar usuarios, gestionar whitelist,
  recetas pendientes, exportar CSV (profiles, recipes_staging, allowed_emails)

---

## 5. ONBOARDING (3 pantallas)

1. **Bienvenida** — imagen ajiaco + "¡Bienvenida a tu cocina! 🧡"
2. **Mapa de la app** — "Así de fácil:" + lista de funciones
3. **Colecciones** — seleccionar categoría de inicio

- Botón "Saltar" en las 3 pantallas
- Flag `onboarding_visto` en `profiles` (no localStorage)
- Se marca `true` cuando el componente se monta (no al completar)

---

## 6. CONTENIDO DE RECETAS

### 8 Categorías
1. Sopas
2. Rápido sin pensar
3. Cuerpo agradecido
4. Plan con tiempo
5. Antojo dulce
6. Sabor colombiano
7. Bases que salvan
8. Especiales

### 7 Métodos de cocción (chips)
Estufa · Horno · Refrigeración · Air Fryer · Instant Pot · Sin cocción · Microondas

### Filtro de salud (obligatorio en toda receta)
✅ Digestión ligera · Sin grasas pesadas · Sin ajo crudo
✅ Sin fritos excesivos · Apta para fibromyalgia + artritis + colon irritable

### Formato de receta
- Nombre: ALL CAPS, máximo 5 palabras
- Verbos: imperativo (Agrega, Mezcla, Cocina)
- Temperaturas: Fahrenheit únicamente
- Sin Markdown en Supabase, texto plano

---

## 7. IMÁGENES — ESTADO ACTUAL

### Imágenes de recetas
- ~110-120 de 237 recetas tienen `image_url` en Supabase
- Pipeline: manual (DALL-E → WebP <200KB → panel admin)
- Formato: WebP 600x600px, quality 85→75→65→55

### Imágenes de la app (corregido sept 2026)
Los archivos `src/assets/*.asset.json` apuntaban al CDN de Lovable
(`/__l5e/assets-v1/...`), que no funciona en Vercel.

**Corrección de ruta:** las 7 imágenes reales viven en `src/assets/`
(no en `public/assets/` — esa carpeta no existe en el repo). Están
importadas directo como `.webp` en cada componente en vez de pasar
por un `.asset.json`:

| Archivo | Dónde se usa |
|---|---|
| `logo-cucharon.webp` | Logo header + pantalla ingreso |
| `modal-sopa.webp` | Fondo modal/login |
| `sarten-chef.webp` | Tab Chef IA |
| `paella-favoritos.webp` | Tab Favoritos |
| `cucharon-sopa.webp` | Imagen decorativa |
| `onboarding-ajiaco.webp` | Onboarding pantalla 1 |
| `onboarding-mapa.webp` | Onboarding pantalla 2 |

**Estado:** arreglado en PR — pendiente de aprobar/mergear a `main`.
Quedan ~12 `.asset.json` sin imagen real de reemplazo todavía
(selector de ánimo ×6, estrella de favoritos, tarjeta de inspiración,
4 imágenes semilla de recetas) — se resuelven cuando haya archivos
reales para subir.

---

## 8. PWA

- Manifest.json configurado
- `icon-192.png` y `icon-512.png` en `public/`
- `apple-touch-icon` en `<head>` de index.html
- Botón "instalar" para Android (beforeinstallprompt)
- iOS: requiere instalación manual desde Safari

---

## 9. COMERCIAL

### Hotmart
- Producto: F106796702L ("App para celular")
- Pixel Meta: 890546756836217 (Acción Digital – Pixel 1)
- Token API conversiones: configurado
- Modelo: Activación manual (Fercha agrega email a whitelist 2x/día)
- Webhook pendiente: cuando haya 5+ ventas/día

### Campaña Meta Ads (pausada)
- Primera campaña: CAM_Cucharon_Test_Jul2026
- Resultado: 0 ventas, buen CTR (7.68%)
- Hipótesis: precio $19 muy alto para LAM
- Siguiente campaña: precio $12, AD6_Elvira_RecetaPerdida pendiente

### AD6 pendiente de producción
- Avatar: Doña Elvira / Voz: Alisson (ElevenLabs)
- Hook: b-roll de receta manuscrita cayendo
- Fórmula: SF3 AIDA | Ángulo: Comparación + Problema
- Copy: "Me pasaron una receta deliciosa y la perdí para siempre..."

---

## 10. PENDIENTES TÉCNICOS (en orden de prioridad)

1. ~~**URGENTE:** Arreglar imágenes rotas en Vercel~~ — resuelto en
   PR, pendiente de aprobar/mergear a `main` (ver secc. 7)
2. Mover validación de whitelist a server-side (Edge Function)
   antes de reencender ads
3. Migrar landing page a Vercel (actualmente en Lovable)
4. Migrar página de Gracias a Vercel
5. Actualizar PDF de instalación (URL ahora es Vercel, no Lovable)
6. "Sirve con" en RecipeDetail — datos en BD, falta UI
7. Backup completo BD + código (código ya en GitHub ✅)
8. Estandarización masiva verbos (SQL listo, 55 verbos, 619 ocurrencias)

---

## 11. PALETA DE COLORES

**Corregido sept 2026** — ver `IDENTIDAD_VISUAL_CUCHARON.md` para el
detalle completo y el porqué. Resumen:

| Variable | Hex | Uso |
|---|---|---|
| Terracota principal | `#E85D2F` | Botones CTA, acento |
| Crema fondo | `#FFF6EA` | Fondo principal |
| Crema profundo | `#F7E8D2` | Tarjetas, fondos secundarios |
| Café oscuro (ink) | `#3A2A20` | Texto principal |
| Café medio | `#8A6B55` | Texto secundario |
| Verde | `#5E8C4A` | Acento secundario (salud) |
| Terracota claro | `#F18A63` | Hover, focus ring |
| Dorado (ochre) | `#F2A93B` | Detalles decorativos |

---

## 12. REGLAS DE DESARROLLO

- Auth: email + contraseña únicamente (sin Google)
- Email confirmation: DESACTIVADO (autoConfirm = true)
- Admin restringido a `ferchabetancourt@gmail.com`
- NO tocar el pixel, NO tocar la whitelist, NO tocar las recetas
- Alcance de PR: ver regla en `CLAUDE.md` secc. D (una feature por
  PR; un pase de limpieza puede ir junto si cada pieza se prueba
  por separado y el PR las detalla individualmente)
- Compilar con `npm run build` antes de cualquier push
- Diagnosticar antes de parchar — si algo falla 2 veces, buscar raíz
- Probar en DEV antes de aplicar en producción

---

## 13. CONTACTO Y ACCESOS

- Admin app: `ferchabetancourt@gmail.com`
- Soporte compradoras: `acciondigitalfb@gmail.com`
- WhatsApp compradoras: `https://chat.whatsapp.com/H7LgoU2YcuZ0MxJLlQSJsL`
- PDF instalación: `https://drive.google.com/file/d/1fbcEeiANmDRljC0BlIs8VePK58khssm2/view`
- GitHub: `ferchabetancourt-jpg/cucharon-de-amor`
- Vercel: `fercha1` (team)

---

**Última actualización:** Septiembre 2026 (rutas de imágenes,
paleta de colores y regla de PRs corregidas para reflejar el
código real, ver notas inline)
**Comando para actualizar:** "Vera actualiza SPEC_CUCHARON: [cambio]"
