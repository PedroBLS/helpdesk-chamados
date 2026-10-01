"use client";

import { useState } from "react";
import { PRIORIDADE } from "@/lib/rotulos";
import { CATEGORIAS, type Erros, type NovoChamado, validarChamado } from "@/lib/validacao";

const VAZIO: NovoChamado = { titulo: "", descricao: "", solicitante: "", email: "", categoria: "", prioridade: "" };

const estiloCampo = (erro?: string) =>
  `mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-marca focus:ring-2 focus:ring-emerald-100 ${
    erro ? "border-rose-400" : "border-slate-200"
  }`;

function Campo({ id, rotulo, erro, children }: { id: string; rotulo: string; erro?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {rotulo}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} className="mt-1 text-xs text-rose-600">
          {erro}
        </p>
      )}
    </div>
  );
}

export function FormNovoChamado() {
  const [dados, setDados] = useState(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);

  // Ao corrigir um campo, a mensagem de erro dele some na hora, sem esperar outro envio
  const alterar = (campo: keyof NovoChamado) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDados({ ...dados, [campo]: e.target.value });
    if (erros[campo]) setErros({ ...erros, [campo]: undefined });
  };

  const props = (campo: keyof NovoChamado) => ({
    id: campo,
    name: campo,
    value: dados[campo],
    onChange: alterar(campo),
    "aria-invalid": Boolean(erros[campo]),
    "aria-describedby": erros[campo] ? `${campo}-erro` : undefined,
    className: estiloCampo(erros[campo]),
  });

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const encontrados = validarChamado(dados);
    setErros(encontrados);
    // Ainda sem API: quando o backend existir, aqui entra o POST /api/chamados
    if (Object.keys(encontrados).length === 0) {
      setEnviado(true);
      setDados(VAZIO);
    }
  }

  if (enviado) {
    return (
      <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
        <p className="font-medium">Chamado registrado!</p>
        <p className="mt-1 text-sm">Nesta versão de demonstração o chamado não é salvo; o backend vem na próxima etapa.</p>
        <button type="button" onClick={() => setEnviado(false)} className="mt-3 text-sm font-medium underline">
          Abrir outro chamado
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Campo id="titulo" rotulo="Assunto" erro={erros.titulo}>
          <input type="text" placeholder="Ex.: VPN não conecta" {...props("titulo")} />
        </Campo>
      </div>
      <Campo id="solicitante" rotulo="Seu nome" erro={erros.solicitante}>
        <input type="text" autoComplete="name" {...props("solicitante")} />
      </Campo>
      <Campo id="email" rotulo="E-mail" erro={erros.email}>
        <input type="email" autoComplete="email" {...props("email")} />
      </Campo>
      <Campo id="categoria" rotulo="Categoria" erro={erros.categoria}>
        <select {...props("categoria")}>
          <option value="">Selecione</option>
          {CATEGORIAS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Campo>
      <Campo id="prioridade" rotulo="Prioridade" erro={erros.prioridade}>
        <select {...props("prioridade")}>
          <option value="">Selecione</option>
          {Object.entries(PRIORIDADE).map(([valor, rotulo]) => (
            <option key={valor} value={valor}>
              {rotulo}
            </option>
          ))}
        </select>
      </Campo>
      <div className="sm:col-span-2">
        <Campo id="descricao" rotulo="Descrição" erro={erros.descricao}>
          <textarea rows={5} placeholder="O que aconteceu, desde quando e o que já foi tentado" {...props("descricao")} />
        </Campo>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="w-full rounded-lg bg-marca px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 sm:w-auto">
          Abrir chamado
        </button>
      </div>
    </form>
  );
}
