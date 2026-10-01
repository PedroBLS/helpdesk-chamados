export type Prioridade = "urgente" | "alta" | "media" | "baixa";
export type Status = "aberto" | "em_andamento" | "aguardando_usuario" | "resolvido";
export type SituacaoSla = "no_prazo" | "em_risco" | "estourado" | "cumprido";

// Prazo de resolução por prioridade, em horas (o relógio corre direto, sem descontar horário comercial)
export const PRAZO_HORAS: Record<Prioridade, number> = {
  urgente: 4,
  alta: 8,
  media: 24,
  baixa: 48,
};

const HORA = 60 * 60 * 1000;
const RISCO = 0.8; // a partir de 80% do prazo consumido, o chamado entra em risco

export function prazoFinal(abertoEm: Date, prioridade: Prioridade): Date {
  return new Date(abertoEm.getTime() + PRAZO_HORAS[prioridade] * HORA);
}

export function situacaoSla(
  chamado: { abertoEm: Date; prioridade: Prioridade; resolvidoEm?: Date },
  agora: Date = new Date(),
): SituacaoSla {
  const prazo = prazoFinal(chamado.abertoEm, chamado.prioridade).getTime();
  if (chamado.resolvidoEm) {
    return chamado.resolvidoEm.getTime() <= prazo ? "cumprido" : "estourado";
  }
  if (agora.getTime() > prazo) return "estourado";
  const consumido = (agora.getTime() - chamado.abertoEm.getTime()) / (PRAZO_HORAS[chamado.prioridade] * HORA);
  return consumido >= RISCO ? "em_risco" : "no_prazo";
}
