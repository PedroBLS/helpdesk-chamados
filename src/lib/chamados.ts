import type { Prioridade, Status } from "./sla";

export type Chamado = {
  id: number;
  titulo: string;
  descricao: string;
  solicitante: string;
  setor: string;
  categoria: "Acesso" | "Hardware" | "Rede" | "Software" | "Sistema interno";
  prioridade: Prioridade;
  status: Status;
  nivel: "N1" | "N2";
  responsavel?: string;
  abertoEm: Date;
  resolvidoEm?: Date;
};

// Dados simulados até o backend existir; as datas são relativas a agora para o painel de SLA ficar realista
const horasAtras = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000);

export const chamados: Chamado[] = [
  { id: 1042, titulo: "VPN não conecta fora da rede da empresa", descricao: "Erro de autenticação ao conectar a VPN de casa desde a troca de senha.", solicitante: "Mariana Costa", setor: "Financeiro", categoria: "Rede", prioridade: "alta", status: "em_andamento", nivel: "N2", responsavel: "Pedro", abertoEm: horasAtras(7) },
  { id: 1041, titulo: "Impressora do 2º andar imprimindo em branco", descricao: "Folhas saem sem impressão; toner trocado ontem.", solicitante: "Carlos Lima", setor: "RH", categoria: "Hardware", prioridade: "media", status: "aberto", nivel: "N1", abertoEm: horasAtras(3) },
  { id: 1040, titulo: "Sistema de pagamentos fora do ar", descricao: "Tela de cobrança retorna erro 500 para todos os usuários.", solicitante: "Ana Souza", setor: "Comercial", categoria: "Sistema interno", prioridade: "urgente", status: "em_andamento", nivel: "N2", responsavel: "Pedro", abertoEm: horasAtras(3.5) },
  { id: 1039, titulo: "Recuperação de senha não envia e-mail", descricao: "Usuário clica em 'esqueci minha senha' e o e-mail nunca chega.", solicitante: "João Pereira", setor: "Atendimento", categoria: "Acesso", prioridade: "alta", status: "aguardando_usuario", nivel: "N1", responsavel: "Luiza", abertoEm: horasAtras(5) },
  { id: 1038, titulo: "Instalar Power BI Desktop", descricao: "Novo analista precisa do Power BI instalado na estação.", solicitante: "Beatriz Alves", setor: "Dados", categoria: "Software", prioridade: "baixa", status: "aberto", nivel: "N1", abertoEm: horasAtras(20) },
  { id: 1037, titulo: "Lentidão na rede do laboratório", descricao: "Downloads abaixo de 1 Mbps desde a manhã.", solicitante: "Rafael Gomes", setor: "Pesquisa", categoria: "Rede", prioridade: "media", status: "em_andamento", nivel: "N2", responsavel: "Pedro", abertoEm: horasAtras(26) },
  { id: 1036, titulo: "Acesso à pasta compartilhada de contratos", descricao: "Solicita permissão de leitura na pasta Contratos/2026.", solicitante: "Fernanda Rocha", setor: "Jurídico", categoria: "Acesso", prioridade: "media", status: "resolvido", nivel: "N1", responsavel: "Luiza", abertoEm: horasAtras(30), resolvidoEm: horasAtras(27) },
  { id: 1035, titulo: "Monitor piscando", descricao: "Monitor secundário apaga a cada poucos minutos.", solicitante: "Gustavo Martins", setor: "Compras", categoria: "Hardware", prioridade: "baixa", status: "resolvido", nivel: "N1", responsavel: "Luiza", abertoEm: horasAtras(60), resolvidoEm: horasAtras(40) },
  { id: 1034, titulo: "Relatório mensal com totais divergentes", descricao: "O total de vendas do relatório não bate com a soma das notas do mês.", solicitante: "Ana Souza", setor: "Comercial", categoria: "Sistema interno", prioridade: "urgente", status: "resolvido", nivel: "N2", responsavel: "Pedro", abertoEm: horasAtras(50), resolvidoEm: horasAtras(47) },
  { id: 1033, titulo: "Excel travando ao abrir planilha de compras", descricao: "Arquivo de 40 MB trava o Excel na abertura.", solicitante: "Gustavo Martins", setor: "Compras", categoria: "Software", prioridade: "media", status: "resolvido", nivel: "N1", responsavel: "Luiza", abertoEm: horasAtras(80), resolvidoEm: horasAtras(50) },
  { id: 1032, titulo: "Novo colaborador sem e-mail corporativo", descricao: "Criar conta de e-mail e acesso ao sistema para o estagiário.", solicitante: "Carlos Lima", setor: "RH", categoria: "Acesso", prioridade: "alta", status: "resolvido", nivel: "N1", responsavel: "Luiza", abertoEm: horasAtras(100), resolvidoEm: horasAtras(95) },
  { id: 1031, titulo: "Servidor de arquivos sem espaço", descricao: "Disco de dados com 98% de uso, backups falhando.", solicitante: "Rafael Gomes", setor: "Pesquisa", categoria: "Rede", prioridade: "alta", status: "resolvido", nivel: "N2", responsavel: "Pedro", abertoEm: horasAtras(120), resolvidoEm: horasAtras(110) },
];
