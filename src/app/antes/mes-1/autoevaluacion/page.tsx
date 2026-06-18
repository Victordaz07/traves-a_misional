import { prisma } from "@/lib/prisma";
import { marcarModuloCompletado } from "../actions";
import { Autoevaluacion } from "./Autoevaluacion";

export default async function AutoevaluacionPage() {
  const modulo = await prisma.moduloContenido.findUniqueOrThrow({
    where: { fase_mes_orden: { fase: "ANTES", mes: 1, orden: 1 } },
  });

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {modulo.titulo}
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          No es un examen ni un diagnóstico. Solo nos ayuda a sugerirte
          estrategias que te puedan servir.
        </p>
      </div>

      <Autoevaluacion
        marcarCompletado={marcarModuloCompletado.bind(null, modulo.id)}
      />
    </div>
  );
}
