# Registro del Proyecto

Este archivo es la memoria viva del proyecto entre sesiones de agentes, y entre Victor y cada agente. Cualquier agente que trabaje aquí DEBE leerlo completo antes de empezar, y DEBE agregar una entrada nueva al final antes de terminar su sesión.

**Regla de oro: nunca borres ni edites entradas anteriores. Solo agrega.**

---

## Formato de cada entrada nueva

```
### Sesión N — [fecha]
**Hecho:** qué se construyó, decidió o cambió en esta sesión.
**Decisiones:** cualquier decisión de diseño o técnica tomada, y por qué se tomó así.
**Estado actual:** en qué parte del proyecto estamos ahora mismo, en una o dos frases.
**Sigue:** qué es lo siguiente que hay que hacer, en orden de prioridad.
**Preguntas para Victor:** cualquier cosa que necesite su decisión antes de continuar. Si no hay ninguna, escribe "Ninguna pendiente".
```

---

## Entradas

### Sesión 0 — [completar con la fecha de hoy]
**Hecho:** Se definió el concepto completo del proyecto en conversación con Claude (chat de planeación, no Claude Code todavía): una PWA de preparación misional "Antes" (6 meses previos al CCM) y reingreso "Después" (9 meses tras volver), pensada especialmente para jóvenes con TDAH, dislexia, ansiedad o depresión. Se diseñó el currículo completo de los quince meses (ver `CURRICULUM.md`) y se eligió el stack técnico completo (ver `CLAUDE.md`).

**Decisiones:** Next.js + Serwist en vez de next-pwa (descontinuado). Vercel Postgres + Prisma para datos compartidos. Auth.js sin contraseña (enlace mágico). Web Speech API nativa para voz en v1, con Whisper como posible mejora futura para idiomas que el navegador no soporta bien (tongano, samoano). YouTube no listado para vídeo en vez de autohospedarlo. Explícitamente fuera de alcance por ahora: cualquier versión que se use durante la misión en el teléfono oficial — eso solo se reconsiderará si un presidente de misión lo autoriza formalmente.

**Estado actual:** Cero líneas de código todavía. Solo concepto, currículo completo de 15 meses y stack técnico definidos. Repositorio aún no creado.

**Sigue:** Crear el repositorio en GitHub (victordaz07). Construir el esqueleto del proyecto: estructura de carpetas de Next.js, configuración inicial de Serwist, schema base de Prisma (usuarios, progreso, módulos de contenido, suscripciones push). Después de eso, construir un primer módulo real de contenido — el Mes 1 de "Antes" — de principio a fin, para validar el flujo completo en un teléfono de gama media antes de construir los catorce meses restantes.

**Preguntas para Victor:** Ninguna pendiente todavía.

---

### Sesión 1 — 2026-06-18
**Hecho:** Repositorio creado en GitHub y primer commit. Se construyó el esqueleto completo del proyecto:
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, generado con `create-next-app`.
- Serwist configurado como PWA: `next.config.ts` con `withSerwistInit`, service worker en `src/app/sw.ts` (precaching + runtime caching con `defaultCache`), `public/manifest.json` con metadata de la app y un ícono placeholder en `public/icons/icon.svg` (sin diseño final todavía — usa "TM" sobre fondo azul). El service worker se deshabilita en desarrollo (`disable: process.env.NODE_ENV === "development"`) y `cacheOnNavigation: false` para no gastar datos de más en teléfonos de gama baja.
- `layout.tsx` y `page.tsx` actualizados a español, con metadata PWA básica (nombre, manifest, viewport, `appleWebApp`).
- Prisma inicializado con datasource PostgreSQL. Schema base en `prisma/schema.prisma` con: `User` (incluye `rol`, `fase`, `mesActual`), los modelos `Account`/`Session`/`VerificationToken` siguiendo la convención del adapter de Prisma para Auth.js (para que el enlace mágico se pueda conectar después sin tener que migrar el schema), `VinculoApoyo` (conecta a un joven con un padre/madre, obispo o mentor, con campo explícito `consentimientoJoven` — nunca automático, ver principios de CLAUDE.md), `ModuloContenido` (fase + mes + orden, mapea a la estructura de `CURRICULUM.md`), `Progreso` (por joven y módulo, con `notaDeVoz` como referencia a audio en Blob, no transcripción) y `SuscripcionPush`.
- Dependencias instaladas: `@serwist/next`, `serwist`, `dexie`, `web-push`, `@prisma/client`/`prisma`. Todavía no se instaló `next-auth`/Auth.js en sí — el schema quedó compatible para cuando se conecte, pero wirearlo sin una base de datos real todavía habría sido prematuro.
- Validado con `npm run build` (compila, lint y type-check pasan, el service worker se genera correctamente) — sin base de datos real conectada todavía, así que Prisma solo se validó con `prisma validate` y `prisma generate`, no con una migración contra una base real.

**Decisiones:** Next.js se fijó en la línea **15.x** en vez de 16: Next 16 usa Turbopack por defecto en `dev` y `build`, y `@serwist/next` todavía no soporta Turbopack (solo webpack) — usar 16 habría roto en la práctica la decisión ya tomada de usar Serwist. Prisma se fijó en la línea **6.x** en vez de 7: Prisma 7 mueve la URL de conexión del `datasource` del schema a un adapter configurado en código, un cambio de arquitectura que no aporta nada en esta etapa todavía. Se eliminó el `AGENTS.md` que generó `create-next-app` por defecto (hablaba de "breaking changes" de Next 16, que ya no aplican porque el proyecto quedó en la línea 15.x). Íconos de la PWA son un placeholder explícito (SVG simple con "TM"), pendientes de diseño real.

**Estado actual:** Hay un esqueleto de Next.js + Serwist + Prisma que compila y pasa lint/type-check, con un schema de base de datos pensado para todo el stack (usuarios, progreso, módulos, vínculos de apoyo con consentimiento, suscripciones push) pero sin una base de datos real conectada ni ninguna pantalla de contenido todavía — solo una landing mínima en español.

**Sigue (en orden de prioridad):**
1. Conectar una base de datos Postgres real (Vercel Postgres) y correr la primera migración (`prisma migrate dev`) para validar que el schema funciona de verdad, no solo que es sintácticamente válido.
2. Configurar Auth.js con enlace mágico sobre el `User` ya modelado.
3. Construir el primer módulo real de contenido — Mes 1 de "Antes" (Autoconocimiento) — de principio a fin: autoevaluación inicial, construcción del equipo de apoyo, reflexión del "por qué", y el primer hábito de registro por voz usando la Web Speech API. Esto valida el flujo completo (incluyendo IndexedDB vía Dexie para guardar localmente) en un teléfono de gama media/baja antes de construir los catorce meses restantes.
4. Generar íconos/branding reales de la PWA para reemplazar el placeholder.

**Preguntas para Victor:**
- ¿Ya existe una base de datos Vercel Postgres creada, o hay que crearla antes de la próxima sesión?
- Para el Mes 1, ¿la autoevaluación inicial (TDAH/dislexia/ansiedad) la quieres con preguntas ya redactadas por ti, o construyo una primera versión de borrador para que la revises?
