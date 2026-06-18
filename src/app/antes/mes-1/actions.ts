"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function marcarModuloCompletado(moduloId: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.progreso.upsert({
    where: { userId_moduloId: { userId: session.user.id, moduloId } },
    update: { completado: true, completadoEn: new Date() },
    create: {
      userId: session.user.id,
      moduloId,
      completado: true,
      completadoEn: new Date(),
    },
  });
}
