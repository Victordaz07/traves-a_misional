import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center font-sans dark:bg-black">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Travesía Misional
      </h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        Tu compañero de preparación antes de la misión y de reingreso después
        de servir.
      </p>
      <Link
        href="/antes/mes-1"
        className="rounded-full bg-blue-700 px-8 py-4 text-base font-medium text-white"
      >
        Empezar Mes 1
      </Link>
    </div>
  );
}
