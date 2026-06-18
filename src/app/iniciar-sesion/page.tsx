import { signIn } from "@/auth";

export default function IniciarSesionPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Inicia sesión
      </h1>
      <p className="max-w-sm text-zinc-600 dark:text-zinc-400">
        Te enviamos un enlace a tu correo. Sin contraseñas.
      </p>
      <form
        action={async (formData) => {
          "use server";
          await signIn("nodemailer", formData);
        }}
        className="flex w-full max-w-sm flex-col gap-3"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="tu@correo.com"
          className="rounded-lg border border-zinc-300 px-4 py-3 text-base dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-4 py-3 text-base font-medium text-white"
        >
          Enviar enlace
        </button>
      </form>
    </div>
  );
}
