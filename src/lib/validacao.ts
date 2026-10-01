import { PRAZO_HORAS } from "./sla";

export type NovoChamado = {
  titulo: string;
  descricao: string;
  solicitante: string;
  email: string;
  categoria: string;
  prioridade: string;
};

export type Erros = Partial<Record<keyof NovoChamado, string>>;

export const CATEGORIAS = ["Acesso", "Hardware", "Rede", "Software", "Sistema interno"];

export function validarChamado(dados: NovoChamado): Erros {
  const erros: Erros = {};
  if (dados.titulo.trim().length < 5) erros.titulo = "Descreva o problema em pelo menos 5 caracteres.";
  if (dados.descricao.trim().length < 10) erros.descricao = "Conte o que aconteceu em pelo menos 10 caracteres.";
  if (!dados.solicitante.trim()) erros.solicitante = "Informe quem está abrindo o chamado.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email.trim())) erros.email = "Informe um e-mail válido.";
  if (!CATEGORIAS.includes(dados.categoria)) erros.categoria = "Escolha uma categoria.";
  if (!(dados.prioridade in PRAZO_HORAS)) erros.prioridade = "Escolha a prioridade.";
  return erros;
}
