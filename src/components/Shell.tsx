"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MENU = [
  { href: "/", rotulo: "Painel", icone: "▦" },
  { href: "/chamados", rotulo: "Chamados", icone: "☰" },
  { href: "/chamados/novo", rotulo: "Novo chamado", icone: "+" },
];

function ativo(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/chamados") return pathname === "/chamados" || /^\/chamados\/\d+/.test(pathname);
  return pathname === href;
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen lg:pl-60">
      {/* Fundo escuro atrás do menu no celular */}
      {menuAberto && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setMenuAberto(false)} aria-hidden />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 px-5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-marca font-bold text-white">C</span>
          <span className="whitespace-nowrap font-semibold">Central de Chamados</span>
        </div>
        <nav aria-label="Menu principal" className="mt-6 flex flex-col gap-1 px-3">
          {MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuAberto(false)}
              aria-current={ativo(pathname, item.href) ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                ativo(pathname, item.href)
                  ? "bg-emerald-50 font-medium text-marca"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span aria-hidden className="w-4 text-center">{item.icone}</span>
              {item.rotulo}
            </Link>
          ))}
        </nav>
      </aside>

      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:px-8">
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          ☰
        </button>
        <span className="hidden text-sm text-slate-400 sm:inline">Help desk / {pathname === "/" ? "Painel" : "Chamados"}</span>
        <Link
          href="/chamados/novo"
          className="ml-auto whitespace-nowrap rounded-lg bg-marca px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          + Novo<span className="hidden sm:inline"> chamado</span>
        </Link>
      </header>

      <main className="px-4 py-6 lg:px-8">{children}</main>
    </div>
  );
}
