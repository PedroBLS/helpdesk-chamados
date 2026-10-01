import type { Prioridade, SituacaoSla, Status } from "./sla";

export const STATUS: Record<Status, { rotulo: string; cor: string }> = {
  aberto: { rotulo: "Aberto", cor: "bg-amber-50 text-amber-700" },
  em_andamento: { rotulo: "Em andamento", cor: "bg-rose-50 text-rose-600" },
  aguardando_usuario: { rotulo: "Aguardando", cor: "bg-sky-50 text-sky-600" },
  resolvido: { rotulo: "Resolvido", cor: "bg-emerald-50 text-emerald-700" },
};

export const PRIORIDADE: Record<Prioridade, string> = {
  urgente: "Urgente",
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

export const SLA: Record<SituacaoSla, { rotulo: string; cor: string }> = {
  no_prazo: { rotulo: "No prazo", cor: "text-emerald-700" },
  em_risco: { rotulo: "Em risco", cor: "text-amber-600" },
  estourado: { rotulo: "Estourado", cor: "text-rose-600" },
  cumprido: { rotulo: "Cumprido", cor: "text-emerald-700" },
};

export function haQuanto(data: Date, agora: Date = new Date()): string {
  const minutos = Math.round((agora.getTime() - data.getTime()) / 60000);
  if (minutos < 60) return `há ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `há ${horas} h`;
  const dias = Math.floor(horas / 24);
  return dias === 1 ? "há 1 dia" : `há ${dias} dias`;
}
