import { prisma } from "@/lib/prisma";
import { GrabadorDeVoz } from "@/components/GrabadorDeVoz";
import { marcarModuloCompletado } from "../actions";

export default async function HabitoDeVozPage() {
  const modulo = await prisma.moduloContenido.findUniqueOrThrow({
    where: { fase_mes_orden: { fase: "ANTES", mes: 1, orden: 4 } },
  });

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {modulo.titulo}
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Vas a usar tu voz seguido en esta app — es más fácil que escribir.
          Empecemos con algo simple: cuéntanos cómo te sientes hoy, en 30
          segundos.
        </p>
      </div>

      <GrabadorDeVoz
        moduloSlug="antes-mes1-habito-de-voz"
        alGuardar={marcarModuloCompletado.bind(null, modulo.id)}
      />
    </div>
  );
}
