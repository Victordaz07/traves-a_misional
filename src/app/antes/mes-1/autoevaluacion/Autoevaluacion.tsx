"use client";

import { useState } from "react";

// Contenido de muestra — las preguntas reales de esta autoevaluación están
// pendientes de redacción con Victor (ver "Preguntas para Victor" en
// PROJECT_LOG.md). El mecanismo (una pregunta a la vez, retroalimentación
// de estrategia en vez de puntaje) sí refleja la decisión final.
const PREGUNTAS = [
  {
    texto: "Cuando algo es importante, ¿cómo prefieres recordarlo?",
    opciones: [
      {
        texto: "Escuchándolo o diciéndolo en voz alta",
        consejo:
          "Usa notas de voz en vez de listas escritas — esta app está pensada para eso.",
      },
      {
        texto: "Viéndolo escrito o en una imagen",
        consejo:
          "Toma una foto o escribe una palabra clave justo después de cada módulo.",
      },
    ],
  },
  {
    texto: "¿Qué te ayuda más a empezar una tarea que se siente grande?",
    opciones: [
      {
        texto: "Dividirla en pasos muy pequeños",
        consejo:
          "Esta app ya está dividida en pasos cortos — sigue avanzando uno a la vez.",
      },
      {
        texto: "Tener un horario fijo para hacerla",
        consejo:
          "Elige una hora del día para tus módulos y trata de mantenerla.",
      },
    ],
  },
  {
    texto: "Cuando te sientes ansioso, ¿qué suele ayudarte?",
    opciones: [
      {
        texto: "Hablar con alguien de confianza",
        consejo:
          "Recuerda a tu equipo de apoyo — está bien recurrir a ellos seguido.",
      },
      {
        texto: "Tener un momento de silencio para procesar",
        consejo:
          "Dedica un par de minutos sin pantalla antes de seguir con tu día.",
      },
    ],
  },
] as const;

export function Autoevaluacion({
  marcarCompletado,
}: {
  marcarCompletado: () => Promise<void> | void;
}) {
  const [paso, setPaso] = useState(0);
  const [consejos, setConsejos] = useState<string[]>([]);
  const [terminado, setTerminado] = useState(false);

  function elegir(consejo: string) {
    setConsejos((actuales) => [...actuales, consejo]);
    if (paso + 1 < PREGUNTAS.length) {
      setPaso(paso + 1);
    } else {
      setTerminado(true);
    }
  }

  async function finalizar() {
    await marcarCompletado();
  }

  if (terminado) {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-medium text-zinc-900 dark:text-zinc-50">
          Algunas estrategias para ti:
        </p>
        <ul className="flex flex-col gap-2">
          {consejos.map((consejo, indice) => (
            <li
              key={indice}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {consejo}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={finalizar}
          className="rounded-full bg-blue-700 px-6 py-3 text-base font-medium text-white"
        >
          Listo
        </button>
      </div>
    );
  }

  const pregunta = PREGUNTAS[paso];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Pregunta {paso + 1} de {PREGUNTAS.length}
      </p>
      <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
        {pregunta.texto}
      </p>
      <div className="flex flex-col gap-3">
        {pregunta.opciones.map((opcion) => (
          <button
            key={opcion.texto}
            type="button"
            onClick={() => elegir(opcion.consejo)}
            className="rounded-xl border border-zinc-300 px-5 py-4 text-left text-base font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-50"
          >
            {opcion.texto}
          </button>
        ))}
      </div>
    </div>
  );
}
