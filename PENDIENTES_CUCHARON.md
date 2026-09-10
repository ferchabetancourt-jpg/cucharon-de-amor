# PENDIENTES — Un Cucharón de Amor
**Última actualización: Septiembre 2026** (imágenes rotas resueltas,
migración fuera de Lovable completa, nuevo pendiente de hero de
modales)

---

## 🔧 TÉCNICOS (en orden de prioridad)

- [x] ~~Arreglar imágenes rotas en Vercel~~ — resuelto sept 2026
      (logo, modal de entrada, chef IA, favoritos, onboarding,
      decorativa, inspiración). Migración completa fuera de Lovable.
- [ ] Faltan ~11 imágenes sin archivo real todavía (selector de
      ánimo ×6, estrella de favoritos, 4 imágenes semilla de
      recetas) — se conectan cuando Fercha tenga los archivos
- [ ] Estandarizar el color del hero en todos los modales —
      hoy cada modal (bienvenida/login, onboarding, chef, etc.)
      usa un tono distinto, revisar y unificar según
      `IDENTIDAD_VISUAL_CUCHARON.md`
- [ ] Mover validación de whitelist a server-side (Edge Function)
      — pendiente antes de reencender cualquier campaña de ads
- [ ] Migrar landing page a Vercel (actualmente en Lovable)
- [ ] Migrar página de Gracias a Vercel
- [ ] Actualizar PDF de instalación — la URL cambió de Lovable a Vercel
- [ ] "Sirve con" en RecipeDetail — datos ya en BD (`sirve_con`), falta UI
- [ ] Estandarización masiva de verbos en recetas
      — SQL listo (55 verbos, 619 ocurrencias), pendiente ejecutar
- [ ] Borrar usuarios de prueba desde panel admin
- [ ] Backup completo de BD (código ya está en GitHub ✅)

---

## 📖 CONTENIDO

- [ ] Recetas Gourmet Club pendientes de subir
- [ ] Recetas nuevas estandarizadas en chat Cocina, aún no en app:
  - Pan Batido (receta de mamá)
  - Salsa Pomodoro
  - Costillas de Res en Salsa Pomodoro
  - Ceviche de Camarones
  - Chuletas de Cerdo con Piña Caramelizada
  - Palitos de Soda
  - Pan de Papa Sin Harina
  - Panecillos de Papa Sin Harina (versión mejorada con queso)
- [ ] ~80 fotos de recetas restantes (pipeline continúa)
- [ ] Historias familiares pendientes (solo Flan de Panela documentada)

---

## 💰 COMERCIAL

> ⚠️ **NOTA IMPORTANTE:**
> La parte comercial está **pausada** mientras Fercha
> se estabiliza financieramente y se prepara para la ciudadanía.
> Todo lo de abajo se evaluará en el futuro — no hay fecha
> ni compromiso de volver a activarlo. Se documenta aquí
> para no perder el aprendizaje.

---

### Lo que se hizo (julio 2026)

**Campaña:** CAM_Cucharon_Test_Jul2026
- Presupuesto: $8/día CBO · 5 ads · LAM (Col, Mx, Chile, Perú, Ecuador)
- Duración: 21–23 julio 2026 (pausada en día 3)
- Gasto total: $20.76
- Resultado: 0 ventas

**Métricas finales:**

| Ad | CTR | CPC | Hook | Veredicto |
|---|---|---|---|---|
| AD1_Elvira_Hablando | 10.23% | $0.36 | 56.25% | 🟢 Ganador atención |
| AD2_Elvira_MiedoPerdida | 4.32% | $0.44 | 52.52% | 🟡 Observar |
| AD3_Rosa_Confesion | 10.92% | $0.13 | 42.02% | 🟢 Ganador eficiencia |
| AD4_Marcela_Overlay | 2.56% | $0.59 | 17.95% | 🔴 El más débil |
| AD5_Estatico_Bandeja | 6.31% | $0.01 | N/A | 🟡 Muestra insuficiente |

**Embudo:**
```
CTR general: 7.68% 🟢 (el creativo funcionó)
Landing carga: 85.51% 🟢 (sin fricción técnica)
Checkout iniciado: 5.08% 🟢 (la landing convirtió a intención)
Compras: 0 🔴
```

**Diagnóstico:** Los 3 primeros pasos del embudo funcionaron.
El abandono fue en el último paso (checkout → compra).
**Hipótesis principal: precio $19 alto para mercado LAM.**

---

### Lo que aprendimos

1. **El creativo sí conecta** — CTR 7.68% es muy bueno para tráfico frío LAM
2. **AD1 y AD3 son los ganadores** — usar como base para próxima campaña
3. **AD4 es el más débil** — reemplazar o replantear completamente
4. **El precio es la variable más probable** — no el creativo, no la landing
5. **Nunca correr ads sin compra de prueba real en móvil** — ya validado ✅
6. **El pixel no se toca jamás** — lección aprendida de caso Air Fryer

---

### Si se retoma en el futuro — qué cambiar

- [ ] Precio: probar con **$12** (hipótesis principal post-campaña)
- [ ] Reemplazar AD4 por **AD6_Elvira_RecetaPerdida** (producción lista)
- [ ] Presupuesto: **$12/día CBO** (recomendación del curso PEV)
- [ ] Validar whitelist server-side ANTES de encender (seguridad)
- [ ] Hacer compra de prueba real en móvil ANTES del primer dólar

**AD6_Elvira_RecetaPerdida (pendiente de producción):**
- Avatar: Doña Elvira · Voz: Alisson (ElevenLabs)
- Hook: b-roll de receta manuscrita cayendo, silencio
- Script: *"Me pasaron una receta deliciosa y la perdí para siempre..."*
- Fórmula: SF3 AIDA · Ángulo: Comparación + Problema · Etapa 2
- Pipeline: b-roll móvil → ElevenLabs → Kling Avatar 2.0 → CapCut

---

### Infraestructura comercial activa (aunque campaña pausada)

- Producto Hotmart: F106796702L ✅ (aprobado, no borrar)
- Pixel Meta: 890546756836217 ✅ (no tocar)
- Token API conversiones: configurado en Hotmart ✅
- Checkout: `https://pay.hotmart.com/F106796702L?checkoutMode=10&bid=1784422266748`
- PDF instalación: en Drive (pendiente actualizar URL a Vercel)
- Grupo WhatsApp compradoras: activo ✅
- Página de Gracias: `https://gracias-un-cuchar.lovable.app` (pendiente migrar)

---

**Comando para actualizar:** "Vera actualiza PENDIENTES: [cambio]"
