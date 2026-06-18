// Visible en cada pantalla del currículo. Si algo en el flujo sugiere una
// crisis real, la app SIEMPRE dirige a una persona real — nunca intenta
// resolverlo dentro de la app (ver CLAUDE.md y CURRICULUM.md).
export function AyudaCrisis() {
  return (
    <div className="border-t border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
      ¿Necesitas hablar con alguien ahora?{" "}
      <span className="font-medium">
        Contacta a tu obispo o a Family Services.
      </span>{" "}
      Esto no reemplaza a una persona real.
    </div>
  );
}
