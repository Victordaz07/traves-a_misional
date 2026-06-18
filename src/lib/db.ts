import Dexie, { type EntityTable } from "dexie";

// Almacenamiento local en el dispositivo (IndexedDB). Las grabaciones de voz
// viven aquí hasta que se sincronizan; nunca se transcriben automáticamente
// (ver "Decisiones ya tomadas" en CLAUDE.md).
export interface GrabacionLocal {
  id?: number;
  moduloSlug: string;
  audio: Blob;
  creadoEn: Date;
  sincronizado: boolean;
}

export const db = new Dexie("travesia-misional") as Dexie & {
  grabaciones: EntityTable<GrabacionLocal, "id">;
};

db.version(1).stores({
  grabaciones: "++id, moduloSlug, creadoEn, sincronizado",
});
