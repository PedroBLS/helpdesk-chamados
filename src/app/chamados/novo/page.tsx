import { FormNovoChamado } from "@/components/FormNovoChamado";

export default function NovoChamado() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Novo chamado</h1>
        <p className="mt-1 text-sm text-slate-500">Quanto mais detalhes, mais rápido o atendimento</p>
      </div>
      <section className="max-w-3xl rounded-xl border border-slate-200 bg-white p-5">
        <FormNovoChamado />
      </section>
    </div>
  );
}
