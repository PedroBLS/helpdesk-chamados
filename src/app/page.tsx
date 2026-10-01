import Link from "next/link";
import { Barras, Rosca } from "@/components/Graficos";
import { TabelaChamados } from "@/components/TabelaChamados";
import { chamados, type Chamado } from "@/lib/chamados";
import { STATUS } from "@/lib/rotulos";
import { situacaoSla } from "@/lib/sla";

const CORES_STATUS: Record<Chamado["status"], string> = {
  aberto: "#12372a",
  em_andamento: "#10b981",
  aguardando_usuario: "#2f8f6b",
  resolvido: "#7ee2bf",
};

function Cartao({ titulo, valor, detalhe }: { titulo: string; valor: number | string; detalhe: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{titulo}</p>
      <p className="mt-2 text-3xl font-semibold">{valor}</p>
      <p className="mt-2 text-xs text-slate-500">{detalhe}</p>
    </div>
  );
}

export default function Painel() {
  const porStatus = (s: Chamado["status"]) => chamados.filter((c) => c.status === s);
  const pendentes = chamados.filter((c) => c.status !== "resolvido");
  const resolvidos = porStatus("resolvido");
  const noPrazo = resolvidos.filter((c) => situacaoSla(c) === "cumprido").length;
  const emRisco = pendentes.filter((c) => situacaoSla(c) === "em_risco").length;
  const estourados = pendentes.filter((c) => situacaoSla(c) === "estourado").length;

  const categorias = [...new Set(chamados.map((c) => c.categoria))].map((categoria) => ({
    rotulo: categoria,
    valor: chamados.filter((c) => c.categoria === categoria).length,
  }));

  const recentes = [...chamados].sort((a, b) => b.abertoEm.getTime() - a.abertoEm.getTime()).slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Painel de chamados</h1>
        <p className="mt-1 text-sm text-slate-500">Acompanhe a fila de suporte e o cumprimento do SLA</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores">
        <Cartao titulo="Abertos" valor={porStatus("aberto").length} detalhe="aguardando atendimento" />
        <Cartao titulo="Em andamento" valor={porStatus("em_andamento").length} detalhe={`${emRisco} em risco · ${estourados} ${estourados === 1 ? "estourado" : "estourados"}`} />
        <Cartao titulo="Aguardando usuário" valor={porStatus("aguardando_usuario").length} detalhe="dependem de retorno" />
        <Cartao
          titulo="Resolvidos"
          valor={resolvidos.length}
          detalhe={`${resolvidos.length ? Math.round((noPrazo / resolvidos.length) * 100) : 0}% dentro do SLA`}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-6 text-lg font-semibold">Chamados por status</h2>
          <Rosca
            legendaCentro="chamados"
            fatias={(Object.keys(STATUS) as Chamado["status"][]).map((s) => ({
              rotulo: STATUS[s].rotulo,
              valor: porStatus(s).length,
              cor: CORES_STATUS[s],
            }))}
          />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-6 text-lg font-semibold">Chamados por categoria</h2>
          <Barras barras={categorias} />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Últimos chamados</h2>
          <Link href="/chamados" className="text-sm font-medium text-marca hover:underline">
            Ver todos
          </Link>
        </div>
        <TabelaChamados chamados={recentes} />
      </section>
    </div>
  );
}
