// Gráficos feitos só com CSS: o painel tem dois gráficos simples e não justifica uma biblioteca

export type Fatia = { rotulo: string; valor: number; cor: string };

export function Rosca({ fatias, legendaCentro }: { fatias: Fatia[]; legendaCentro: string }) {
  const total = fatias.reduce((soma, f) => soma + f.valor, 0) || 1;
  const gradiente = fatias
    .map((f, i) => {
      const antes = fatias.slice(0, i).reduce((soma, anterior) => soma + anterior.valor, 0);
      return `${f.cor} ${(antes / total) * 360}deg ${((antes + f.valor) / total) * 360}deg`;
    })
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        role="img"
        aria-label={fatias.map((f) => `${f.rotulo}: ${f.valor}`).join(", ")}
        className="relative grid h-48 w-48 place-items-center rounded-full"
        style={{ background: `conic-gradient(${gradiente})` }}
      >
        <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center">
          <div>
            <p className="text-2xl font-semibold">{total}</p>
            <p className="text-xs text-slate-500">{legendaCentro}</p>
          </div>
        </div>
      </div>
      <ul className="grid w-full grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {fatias.map((f) => (
          <li key={f.rotulo} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.cor }} aria-hidden />
            <span className="text-slate-600">{f.rotulo}</span>
            <span className="ml-auto font-medium">{Math.round((f.valor / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Barras({ barras }: { barras: { rotulo: string; valor: number }[] }) {
  const maior = Math.max(...barras.map((b) => b.valor), 1);
  return (
    <div className="flex h-56 items-end gap-3" role="img" aria-label={barras.map((b) => `${b.rotulo}: ${b.valor}`).join(", ")}>
      {barras.map((b) => (
        <div key={b.rotulo} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
          <span className="text-xs font-medium text-slate-600">{b.valor}</span>
          <div
            className={`w-full max-w-10 rounded-t-full ${b.valor === maior ? "bg-marca" : "bg-slate-200"}`}
            style={{ height: `${(b.valor / maior) * 80}%` }}
          />
          <span className="w-full break-words text-center text-[11px] leading-tight text-slate-500">{b.rotulo}</span>
        </div>
      ))}
    </div>
  );
}
