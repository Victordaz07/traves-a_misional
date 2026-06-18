import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const RUTAS_POR_ORDEN: Record<number, string> = {
  1: "autoevaluacion",
  2: "equipo-de-apoyo",
  3: "por-que",
  4: "habito-de-voz",
};

export default async function Mes1Page() {
  const session = await auth();
  const modulos = await prisma.moduloContenido.findMany({
    where: { fase: "ANTES", mes: 1 },
    orderBy: { orden: "asc" },
    include: {
      progresos: session?.user?.id
        ? { where: { userId: session.user.id } }
        : false,
    },
  });

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Mes 1 · Autoconocimiento
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Cuatro pasos cortos antes de empezar. No hay prisa.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {modulos.map((modulo) => {
          const completado = modulo.progresos?.[0]?.completado ?? false;
          const ruta = RUTAS_POR_ORDEN[modulo.orden] ?? "";

          return (
            <li key={modulo.id}>
              <Link
                href={`/antes/mes-1/${ruta}`}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-4 text-base font-medium text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              >
                <span>{modulo.titulo}</span>
                {completado && (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ✓
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
