# Travesía Misional — Compañero de Preparación y Reingreso Misional
*(repo: github.com/Victordaz07/traves-a_misional)*

## Qué es este proyecto
Una PWA (Next.js + Serwist) que acompaña a futuros misioneros SUD seis meses antes de su servicio ("Antes") y nueve meses después de regresar ("Después"). No reemplaza Preach My Gospel ni el rol del obispo o presidente de misión: complementa con preparación emocional, práctica y de expectativas reales, y con apoyo de reingreso post-misión. Pensado especialmente para jóvenes con TDAH, dislexia, ansiedad o depresión, donde el formato típico de "leer y escribir mucho" no funciona bien.

## Antes de tocar código, SIEMPRE
1. Lee `PROJECT_LOG.md` completo — empieza por la entrada más reciente, pero revisa hacia atrás si necesitas contexto de una decisión.
2. Si vas a trabajar contenido de un mes específico, lee también `CURRICULUM.md`.
3. El registro manda sobre lo que "parece" el estado del código. Si algo no coincide, pregúntale a Victor antes de asumir.

## Al terminar una sesión de trabajo, SIEMPRE
Agrega una entrada nueva al final de `PROJECT_LOG.md`, siguiendo el formato exacto que ya está documentado ahí. Nunca edites ni borres entradas anteriores — solo agrega.

## Stack técnico (no cambiar sin aprobación explícita de Victor)
- Next.js (App Router) + TypeScript + Tailwind CSS
- Serwist para PWA / service worker — **no usar next-pwa**, está descontinuado
- IndexedDB vía Dexie.js para almacenamiento local en el dispositivo
- Vercel Postgres + Prisma para datos compartidos/sincronizados (cuentas, progreso agregado, emparejamiento de mentores, visibilidad consentida con padres/obispo)
- Auth.js con enlace mágico — sin contraseñas
- Web Speech API nativa para voz en v1, sin SDK de terceros
- `web-push` para notificaciones, con tabla de suscripciones en Postgres
- Vídeo: YouTube no listado. Imágenes y audio: Vercel Blob
- Despliegue: Vercel

### Nota de versiones (Sesión 1)
Next.js se fijó en la línea **15.x** (no 16) porque Next 16 usa Turbopack por defecto tanto en `dev` como en `build`, y `@serwist/next` (el plugin de Serwist para Next.js) todavía depende de mutar la configuración de webpack — no soporta Turbopack (ver https://github.com/serwist/serwist/issues/54). Usar Next 16 habría roto la decisión ya tomada de usar Serwist. Prisma se fijó en la línea **6.x** (no 7) porque Prisma 7 cambió dónde vive la URL de conexión (ya no en `datasource` del schema, sino vía adapters en `prisma.config.ts` + cliente), lo cual es un cambio de arquitectura mayor que no aporta nada todavía en esta etapa. Si en una sesión futura se quiere subir de versión cualquiera de los dos, primero confirmar que el ecosistema (Serwist, adapters de Auth.js, etc.) ya lo soporta bien.

## Principios de diseño que NUNCA se rompen
- Todo el feedback es de crecimiento, nunca de juicio. Jamás mostrar solo un número o "bajo/alto" sin una estrategia concreta al lado.
- La entrada principal de datos es por voz; el texto es secundario. Diseña pensando primero en TDAH y dislexia.
- Sesiones cortas: máximo 5-10 minutos por interacción diaria. Nunca formularios largos.
- La visibilidad compartida con padres/obispo SIEMPRE requiere consentimiento explícito del joven. Nunca es automática ni oculta.
- Si una respuesta del usuario sugiere una crisis real de salud mental (depresión seria, ideas de autolesión), la app SIEMPRE dirige a una persona real (obispo, Family Services, profesional). Nunca intenta resolverlo dentro de la app.
- Optimiza para teléfonos de gama media/baja (ej. Galaxy A23 5G) y conexión de datos limitada. Nada de vídeo autohospedado pesado, nada de librerías innecesariamente grandes.
- Este proyecto NO se distribuye ni se promueve para uso dentro del teléfono oficial de misión mientras el misionero está sirviendo. Eso solo se considera si un presidente de misión lo autoriza formalmente por su cuenta — nunca como algo que el misionero instala por su lado.

## Decisiones ya tomadas (no las reabras sin una razón nueva)
- next-pwa descartado por Serwist (ver Sesión 0 en PROJECT_LOG.md).
- Vídeo por YouTube no listado, no autohospedado.
- V1 no incluye transcripción automática de voz para tongano ni samoano (la Web Speech API no los soporta bien); se guarda el audio crudo sin transcribir. Posible mejora futura: Whisper de OpenAI.
- Next.js fijado en la línea 15.x y Prisma en la línea 6.x por compatibilidad con Serwist (ver "Nota de versiones" arriba y Sesión 1 en PROJECT_LOG.md).
