import { Lock } from "lucide-react"
import { TopoVoltar } from "@/components/topo"
import { disputas, moeda } from "@/lib/mock"

export default function Disputas() {
  const parado = disputas.reduce((s, d) => s + d.valor, 0)

  return (
    <div>
      <TopoVoltar titulo="Disputas" voltarPara="/admin" />

      <div className="px-5 pt-5 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3 rounded-2xl bg-tinta p-4 text-white">
          <Lock size={19} className="shrink-0 text-sol" aria-hidden />
          <div>
            <p className="font-heading text-xl font-extrabold leading-none tabular-nums">
              {moeda(parado)}
            </p>
            <p className="mt-1 text-sm text-white/70">
              parados em {disputas.length} disputas, aguardando decisão
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2.5 lg:space-y-3">
          {disputas.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl border border-border p-4 lg:flex lg:items-start lg:justify-between lg:gap-6"
            >
              <div className="min-w-0 lg:flex-1">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[15px] font-bold">{d.servico}</h2>
                  <span className="font-semibold tabular-nums">{moeda(d.valor)}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {d.contratante} contra {d.prestador} — aberta {d.abertaHa}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{d.motivo}</p>
                <p className="mt-2 text-xs font-semibold text-destructive">{d.prazo}</p>
              </div>

              <div className="mt-3 flex shrink-0 gap-2 lg:mt-0">
                <button className="flex-1 rounded-full bg-verde px-4 py-2 text-xs font-bold text-white lg:flex-none">
                  Liberar ao prestador
                </button>
                <button className="flex-1 rounded-full border border-border px-4 py-2 text-xs font-bold lg:flex-none">
                  Devolver ao contratante
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
