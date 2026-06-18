import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

// Mes 1 de "Antes" — Autoconocimiento (ver CURRICULUM.md)
const modulosMes1 = [
  { orden: 1, titulo: "Autoevaluación inicial" },
  { orden: 2, titulo: "Construcción del equipo de apoyo" },
  { orden: 3, titulo: "Reflexión sobre tu 'por qué'" },
  { orden: 4, titulo: "Hábito de registro por voz" },
] as const;

async function main() {
  for (const modulo of modulosMes1) {
    await prisma.moduloContenido.upsert({
      where: { fase_mes_orden: { fase: "ANTES", mes: 1, orden: modulo.orden } },
      update: { titulo: modulo.titulo },
      create: {
        fase: "ANTES",
        mes: 1,
        orden: modulo.orden,
        titulo: modulo.titulo,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
