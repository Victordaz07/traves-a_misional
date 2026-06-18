import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AyudaCrisis } from "@/components/AyudaCrisis";

export default async function AntesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/iniciar-sesion");
  }

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col">{children}</main>
      <AyudaCrisis />
    </div>
  );
}
