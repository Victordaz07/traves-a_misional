"use client";

import { useRef, useState } from "react";
import { db } from "@/lib/db";

type Estado = "inactivo" | "grabando" | "grabado" | "guardado";

export function GrabadorDeVoz({
  moduloSlug,
  alGuardar,
}: {
  moduloSlug: string;
  alGuardar: () => Promise<void> | void;
}) {
  const [estado, setEstado] = useState<Estado>("inactivo");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioBlobRef = useRef<Blob | null>(null);

  async function empezarGrabacion() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (evento) => {
      if (evento.data.size > 0) chunksRef.current.push(evento.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      audioBlobRef.current = blob;
      setAudioUrl(URL.createObjectURL(blob));
      setEstado("grabado");
      for (const pista of stream.getTracks()) pista.stop();
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setEstado("grabando");
  }

  function detenerGrabacion() {
    mediaRecorderRef.current?.stop();
  }

  async function guardar() {
    if (!audioBlobRef.current) return;
    await db.grabaciones.add({
      moduloSlug,
      audio: audioBlobRef.current,
      creadoEn: new Date(),
      sincronizado: false,
    });
    await alGuardar();
    setEstado("guardado");
  }

  function regrabar() {
    audioBlobRef.current = null;
    setAudioUrl(null);
    setEstado("inactivo");
  }

  if (estado === "guardado") {
    return (
      <p className="text-base font-medium text-emerald-700 dark:text-emerald-400">
        Listo, quedó guardado.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {estado === "inactivo" && (
        <button
          type="button"
          onClick={empezarGrabacion}
          className="rounded-full bg-blue-700 px-8 py-4 text-base font-medium text-white"
        >
          Grabar respuesta
        </button>
      )}

      {estado === "grabando" && (
        <button
          type="button"
          onClick={detenerGrabacion}
          className="rounded-full bg-red-600 px-8 py-4 text-base font-medium text-white"
        >
          Detener
        </button>
      )}

      {estado === "grabado" && audioUrl && (
        <div className="flex flex-col items-center gap-3">
          <audio src={audioUrl} controls />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={regrabar}
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium dark:border-zinc-700"
            >
              Regrabar
            </button>
            <button
              type="button"
              onClick={guardar}
              className="rounded-full bg-blue-700 px-6 py-3 text-sm font-medium text-white"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
