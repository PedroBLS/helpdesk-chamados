import { chamados } from "@/lib/chamados";

// Página provisória: as telas serão construídas a partir do layout do Figma
export default function Home() {
  const abertos = chamados.filter((c) => c.status !== "resolvido").length;
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Central de Chamados</h1>
      <p className="mt-2 text-zinc-600">{abertos} chamados em aberto</p>
    </main>
  );
}
