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

---

### Sesión 2 — 2026-06-18
**Hecho:** Con autorización explícita de Victor para avanzar de forma autónoma, se completaron los tres primeros puntos del "Sigue" de la Sesión 1:
- **Base de datos real:** en vez de crear ya un recurso de Vercel Postgres (de pago, no reversible fácilmente), se usó Postgres 16 local dentro del entorno de trabajo para correr la primera migración real (`prisma migrate dev --name init`) y validar el schema contra una base de datos de verdad. La migración quedó en `prisma/migrations/`. La URL de conexión real vive solo en `.env` (no se commitea); `.env.example` documenta las variables sin valores reales.
- **Auth.js con enlace mágico:** `src/auth.ts` configura NextAuth v5 con `@auth/prisma-adapter` sobre los modelos `Account`/`Session`/`VerificationToken` ya existentes, estrategia de sesión `"database"`, y proveedor `Nodemailer` (SMTP genérico, sin atarse a un vendor específico de correo). Páginas propias en español: `/iniciar-sesion` (formulario de correo) y `/iniciar-sesion/revisa-tu-correo` (confirmación). Las credenciales SMTP reales todavía no están puestas — el envío de correos fallará hasta que Victor las configure.
- **Módulo Mes 1 ("Antes" — Autoconocimiento) de principio a fin:**
  - `prisma/seed.ts` siembra los 4 `ModuloContenido` del mes (autoevaluación, equipo de apoyo, "por qué", hábito de voz), conectado a `prisma.config.ts` (`migrations.seed`) para correr con `npx prisma db seed`.
  - `src/lib/db.ts`: esquema de Dexie (IndexedDB) para guardar grabaciones de voz en el dispositivo antes de sincronizar.
  - `src/components/GrabadorDeVoz.tsx`: componente cliente reutilizable que grava audio con `MediaRecorder` (no Web Speech API — ver nota de decisiones abajo), lo guarda en IndexedDB, y avisa al padre cuando se guardó.
  - `src/components/AyudaCrisis.tsx`: banner fijo de ayuda en crisis, visible en todas las pantallas de `/antes` vía `src/app/antes/layout.tsx` (que también protege la ruta — redirige a `/iniciar-sesion` si no hay sesión).
  - `src/app/antes/mes-1/page.tsx`: pantalla resumen del mes con los 4 módulos y marca de completado (✓) por usuario.
  - Cuatro subpáginas: `autoevaluacion` (cuestionario corto de una pregunta a la vez, sin puntaje — cada respuesta da una estrategia concreta, nunca una etiqueta; contenido de muestra, ver pregunta pendiente abajo), `equipo-de-apoyo`, `por-que` y `habito-de-voz` (estas tres usan `GrabadorDeVoz` con un prompt distinto cada una).
  - `src/app/antes/mes-1/actions.ts`: server action `marcarModuloCompletado` que hace upsert de `Progreso` por usuario autenticado.
  - `src/types/next-auth.d.ts`: aumenta el tipo `Session` de Auth.js para incluir `user.id` (necesario para el `where` del upsert de `Progreso`).
- Se agregó `AUTH_TRUST_HOST="true"` a `.env`/`.env.example` — sin esto, Auth.js v5 rechaza cualquier host que no reconozca como propio (`UntrustedHost`) en self-hosted/puertos no estándar; Vercel no lo necesita porque ya confía en su propio dominio, pero se deja explícito para que el self-hosting/desarrollo local no se rompa.
- Se limpió un warning de ESLint (`eslint.config.mjs` ahora ignora `public/sw.js` y `public/swe-worker*.js`, que son archivos generados por Serwist y no deberían lintearse) y un `eslint-disable` que ya no hacía nada en `GrabadorDeVoz.tsx`.

**Verificación realizada (sin navegador real disponible en este entorno):** `npm run lint` y `npm run build` limpios. Se probó el flujo completo contra la base de datos local insertando manualmente un `User`+`Session` de prueba (borrados al terminar) y usando `curl` con la cookie de sesión (`authjs.session-token`) para confirmar: redirección a `/iniciar-sesion` sin sesión (307), acceso correcto a `/antes/mes-1` y a una subpágina con sesión (200), y que el upsert de `Progreso` (la misma lógica que usa el server action) marca el módulo como completado y aparece el ✓ en el resumen. **No se pudo probar de verdad la grabación de audio ni el envío real del correo de enlace mágico** — eso requiere micrófono/navegador real y credenciales SMTP, ninguno disponible aquí.

**Decisiones:**
- Postgres local (no Vercel Postgres) para esta sesión, para no crear un recurso de nube/facturación sin confirmación más directa de Victor — totalmente reversible, la URL de producción se cambia solo en variables de entorno cuando Victor decida crear el recurso real.
- Nodemailer (SMTP genérico) en vez de un proveedor específico (p. ej. Resend) porque `CLAUDE.md` no especifica un vendor — queda neutral hasta que Victor elija uno.
- El "hábito de registro por voz" y los otros módulos de Mes 1 que piden grabación usan `MediaRecorder` para guardar audio crudo, **no** la Web Speech API. Esto no contradice el stack (`CLAUDE.md` menciona Web Speech API nativa para voz) porque la decisión ya tomada es que v1 no transcribe automáticamente — se guarda el audio tal cual. Web Speech API solo haría falta si en el futuro se agrega transcripción real.
- El banner `AyudaCrisis` es una implementación v1 **estática** (siempre visible, no detecta nada). Es un cumplimiento parcial, no completo, del principio "si la respuesta sugiere una crisis real, dirigir a una persona real" — todavía no hay ninguna detección de palabras/señales de crisis en las respuestas del usuario. Si se quiere ese nivel de detección, es trabajo futuro explícito, no algo ya resuelto.
- Las preguntas de la autoevaluación inicial son contenido de muestra explícitamente marcado como tal en el código (`Autoevaluacion.tsx`) — no son las preguntas reales sobre TDAH/dislexia/ansiedad que pide el currículo, porque Victor todavía no ha dicho si las redacta él o si debo proponer un borrador (pregunta ya hecha en la Sesión 1, sigue sin respuesta).

**Estado actual:** El Mes 1 completo de "Antes" funciona de extremo a extremo contra una base de datos real: un usuario autenticado puede ver el resumen del mes, completar sus 4 módulos (3 por voz + 1 cuestionario corto) y ver su progreso reflejado. Auth.js con enlace mágico está configurado pero no probado de verdad (faltan credenciales SMTP). Nada de esto se ha visto en un navegador real ni en un teléfono — solo se validó por build/lint/curl contra Postgres local.

**Sigue (en orden de prioridad):**
1. Cuando Victor decida, crear la base de datos Vercel Postgres real y migrar `DATABASE_URL` de local a producción (correr `prisma migrate deploy` contra ella).
2. Configurar credenciales SMTP reales (cualquier proveedor) para que el enlace mágico funcione de verdad, y probarlo con un correo real.
3. Que Victor responda quién redacta las preguntas reales de la autoevaluación del Mes 1 (sigue pendiente desde la Sesión 1) y reemplazar el contenido de muestra en `Autoevaluacion.tsx`.
4. Construir el Mes 2 ("Cimientos espirituales") siguiendo el mismo patrón ya establecido en Mes 1.
5. Generar íconos/branding reales de la PWA (sigue pendiente desde la Sesión 1).
6. Evaluar si vale la pena un primer nivel de detección de palabras de crisis en las respuestas de voz/texto, más allá del banner estático — sin perder de vista que la app nunca debe intentar "resolver" la crisis por sí sola, solo detectar mejor cuándo mostrar el aviso con más énfasis.

**Preguntas para Victor:**
- ¿Ya existe (o ya se creó) la base de datos Vercel Postgres de producción?
- ¿Quién redacta las preguntas reales de la autoevaluación inicial del Mes 1 — tú, o propongo un borrador?
- ¿Qué proveedor SMTP quieres usar para el enlace mágico (o prefieres que yo sugiera uno)?

---

### Sesión 3 — 2026-06-19
**Hecho:** Se tomó el punto 5 del "Sigue" de la Sesión 2 (ícono real de la PWA), el único pendiente que no dependía de una decisión de Victor. Se reemplazó el placeholder "TM" por un ícono con un motivo de camino/sendero (línea blanca curva sobre el azul de marca `#1d4ed8`, con un punto de partida y un punto de destino) — coherente con el nombre "Travesía". Se generaron `public/icons/icon.svg` (versión redondeada, propósito `any`) y `public/icons/icon-maskable.svg` (mismo diseño a sangrado completo, sin esquinas redondeadas propias, para que el sistema operativo aplique su propia máscara). Con `sharp` (ya presente como dependencia transitiva de Next.js, no se agregó ninguna dependencia nueva) se rasterizaron `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` y `public/apple-touch-icon.png` (180×180). `public/manifest.json` y `src/app/layout.tsx` (campo `icons` de metadata) se actualizaron para referenciar los nuevos archivos.

**Decisiones:** Diseño propio (sendero/camino simple, dos colores) en vez de seguir esperando una decisión de branding de Victor — es de bajo riesgo y fácil de reemplazar si Victor prefiere algo distinto; no se tocó el color de marca (`#1d4ed8`) ya establecido en la Sesión 1.

**Verificación realizada:** `npm run lint` y `npm run build` limpios. Se sirvió la app (`npm run start`) y se confirmó con `curl` que `/manifest.json`, `/icons/icon.svg`, `/icons/icon-192.png`, `/icons/icon-512.png`, `/icons/icon-maskable-512.png` y `/apple-touch-icon.png` responden 200 con el `content-type` correcto. No se probó en un dispositivo real cómo se ve instalado como ícono de pantalla de inicio (ni Android ni iOS) — eso sigue pendiente de una prueba real en teléfono.

**Estado actual:** Igual que al final de la Sesión 2, más el ícono de la PWA ya no es un placeholder de texto — ahora es un diseño simple intencional, aunque no validado en un dispositivo real ni revisado por Victor.

**Sigue (en orden de prioridad):** Igual que el listado de la Sesión 2 (puntos 1-3 dependen de Victor; punto 4 es Mes 2; punto 6 es evaluar detección de crisis). El punto 5 (íconos) se considera resuelto por ahora, pendiente de que Victor lo revise y pida cambios si quiere otro estilo.

**Preguntas para Victor:**
- ¿Te gusta el ícono nuevo (sendero blanco sobre azul) o prefieres otra dirección de diseño/branding?
- Las mismas tres preguntas de la Sesión 2 siguen abiertas (base de datos de producción, autoevaluación, proveedor SMTP).
