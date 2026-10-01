import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/TabelaChamados";
import { chamados } from "@/lib/chamados";
import { PRIORIDADE, SLA, haQuanto } from "@/lib/rotulos";
import { prazoFinal, situacaoSla } from "@/lib/sla";

// Fuso fixo: o servidor da Vercel roda em UTC e mostraria a hora 3 h adiantada
const dataHora = (d: Date) =>
  d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" });

// Tela que não existe no layout original: segue o mesmo estilo de cartões
export default async function DetalheChamado({ params }: PageProps<"/chamados/[id]">) {
  const { id } = await params;
  const chamado = chamados.find((c) => c.id === Number(id));
  if (!chamado) notFound();

  const sla = SLA[situacaoSla(chamado)];
  const campos = [
    ["Solicitante", `${chamado.solicitante} (${chamado.setor})`],
    ["Categoria", chamado.categoria],
    ["Prioridade", PRIORIDADE[chamado.prioridade]],
    ["Nível", chamado.nivel],
    ["Responsável", chamado.responsavel ?? "Não atribuído"],
    ["Aberto em", `${dataHora(chamado.abertoEm)} (${haQuanto(chamado.abertoEm)})`],
    ["Prazo do SLA", dataHora(prazoFinal(chamado.abertoEm, chamado.prioridade))],
    ...(chamado.resolvidoEm ? [["Resolvido em", dataHora(chamado.resolvidoEm)]] : []),
  ];

  return (
    <div className="flex flex-col gap-6">
      <Link href="/chamados" className="text-sm text-slate-500 hover:text-marca">
        ← Voltar para chamados
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">#{chamado.id}</p>
          <h1 className="text-2xl font-bold sm:text-3xl">{chamado.titulo}</h1>
        </div>
        <StatusBadge status={chamado.status} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold">Descrição</h2>
          <p className="mt-3 leading-relaxed text-slate-600">{chamado.descricao}</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Detalhes</h2>
          <p className={`mt-3 text-sm font-medium ${sla.cor}`}>SLA: {sla.rotulo}</p>
          <dl className="mt-4 flex flex-col gap-3 text-sm">
            {campos.map(([rotulo, valor]) => (
              <div key={rotulo} className="flex justify-between gap-4">
                <dt className="text-slate-500">{rotulo}</dt>
                <dd className="text-right font-medium text-slate-700">{valor}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
