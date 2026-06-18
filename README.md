# Travesía Misional

PWA de preparación y reingreso misional. Ver `CLAUDE.md` (reglas del proyecto), `CURRICULUM.md` (currículo de 15 meses) y `PROJECT_LOG.md` (historial de decisiones) antes de tocar código.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

El service worker de Serwist está desactivado en desarrollo y solo se genera con `npm run build`.

## Base de datos

El schema de Prisma vive en `prisma/schema.prisma`. Configura `DATABASE_URL` en `.env` (no se commitea) antes de correr:

```bash
npx prisma generate
npx prisma migrate dev
```
