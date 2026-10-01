import Link from "next/link";
import type { Chamado } from "@/lib/chamados";
import { PRIORIDADE, SLA, STATUS, haQuanto } from "@/lib/rotulos";
import { situacaoSla } from "@/lib/sla";

export function StatusBadge({ status }: { status: Chamado["status"] }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS[status].cor}`}>
      <span aria-hidden>•</span>
      {STATUS[status].rotulo}
    </span>
  );
}

// Tabela no computador e cartões no celular: no layout original só existe a versão desktop
export function TabelaChamados({ chamados }: { chamados: Chamado[] }) {
  if (chamados.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-500">Nenhum chamado encontrado.</p>;
  }

  return (
    <>
      <table className="hidden w-full text-left text-sm md:table">
        <thead>
          <tr className="bg-emerald-50 text-emerald-700">
            <th className="rounded-l-lg px-4 py-3 font-medium">Chamado</th>
            <th className="px-4 py-3 font-medium">Solicitante</th>
            <th className="px-4 py-3 font-medium">Assunto</th>
            <th className="px-4 py-3 font-medium">Prioridade</th>
            <th className="px-4 py-3 font-medium">Aberto</th>
            <th className="px-4 py-3 font-medium">SLA</th>
            <th className="rounded-r-lg px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((c) => {
            const sla = SLA[situacaoSla(c)];
            return (
              <tr key={c.id} className="border-b border-slate-100 text-slate-600 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/chamados/${c.id}`} className="font-medium text-slate-800 hover:text-marca">
                    #{c.id}
                  </Link>
                </td>
                <td className="px-4 py-3">{c.solicitante}</td>
                <td className="px-4 py-3">{c.titulo}</td>
                <td className="px-4 py-3">{PRIORIDADE[c.prioridade]}</td>
                <td className="px-4 py-3">{haQuanto(c.abertoEm)}</td>
                <td className={`px-4 py-3 font-medium ${sla.cor}`}>{sla.rotulo}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="flex flex-col gap-3 md:hidden">
        {chamados.map((c) => {
          const sla = SLA[situacaoSla(c)];
          return (
            <li key={c.id}>
              <Link href={`/chamados/${c.id}`} className="block rounded-xl border border-slate-200 p-4 hover:border-marca">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">
                    #{c.id} · {haQuanto(c.abertoEm)}
                  </span>
                  <StatusBadge status={c.status} />
                </div>
                <p className="mt-2 font-medium text-slate-800">{c.titulo}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {c.solicitante} · {PRIORIDADE[c.prioridade]} · <span className={sla.cor}>SLA {sla.rotulo.toLowerCase()}</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
