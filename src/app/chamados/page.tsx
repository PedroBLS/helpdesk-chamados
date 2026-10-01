import Link from "next/link";
import { TabelaChamados } from "@/components/TabelaChamados";
import { chamados } from "@/lib/chamados";
import { STATUS } from "@/lib/rotulos";
import type { Status } from "@/lib/sla";

export default async function ListaChamados({ searchParams }: PageProps<"/chamados">) {
  const { status } = await searchParams;
  const filtro = typeof status === "string" && status in STATUS ? (status as Status) : undefined;
  const lista = [...chamados]
    .filter((c) => !filtro || c.status === filtro)
    .sort((a, b) => b.abertoEm.getTime() - a.abertoEm.getTime());

  const opcoes: { valor?: Status; rotulo: string }[] = [
    { rotulo: "Todos" },
    ...(Object.keys(STATUS) as Status[]).map((s) => ({ valor: s, rotulo: STATUS[s].rotulo })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold sm:text-3xl">Chamados</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <nav aria-label="Filtrar por status" className="mb-4 flex flex-wrap gap-2">
          {opcoes.map((o) => {
            const selecionado = o.valor === filtro;
            return (
              <Link
                key={o.rotulo}
                href={o.valor ? `/chamados?status=${o.valor}` : "/chamados"}
                aria-current={selecionado ? "page" : undefined}
                className={`rounded-full border px-3 py-1 text-sm ${
                  selecionado ? "border-marca bg-emerald-50 text-marca" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {o.rotulo}
              </Link>
            );
          })}
        </nav>
        <TabelaChamados chamados={lista} />
      </section>
    </div>
  );
}
