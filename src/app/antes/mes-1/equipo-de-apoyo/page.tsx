import { prisma } from "@/lib/prisma";
import { GrabadorDeVoz } from "@/components/GrabadorDeVoz";
import { marcarModuloCompletado } from "../actions";

export default async function EquipoDeApoyoPage() {
  const modulo = await prisma.moduloContenido.findUniqueOrThrow({
    where: { fase_mes_orden: { fase: "ANTES", mes: 1, orden: 2 } },
  });

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {modulo.titulo}
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Piensa en 2 o 3 personas a las que puedas llamar si las cosas se
          pusieran difíciles: un padre o madre, tu obispo, un mentor.
        </p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Cuéntanos en voz alta quiénes son y por qué los elegiste.
        </p>
      </div>

      <GrabadorDeVoz
        moduloSlug="antes-mes1-equipo-de-apoyo"
        alGuardar={marcarModuloCompletado.bind(null, modulo.id)}
      />
    </div>
  );
}
