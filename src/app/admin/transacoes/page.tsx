import { TopoVoltar } from "@/components/topo"
import { EstadoTag } from "@/components/estado-tag"
import { moeda, transacoes } from "@/lib/mock"

export default function Transacoes() {
  const total = transacoes.reduce((s, t) => s + t.valor, 0)
  const taxa = transacoes.reduce((s, t) => s + t.taxa, 0)

  return (
    <div>
      <TopoVoltar titulo="Transações" voltarPara="/admin" />

      <div className="px-5 pt-5 lg:px-8 lg:pt-8">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <div>
            <p className="font-heading text-2xl font-extrabold tabular-nums">
              {moeda(total)}
            </p>
            <p className="text-xs text-muted-foreground">movimentado</p>
          </div>
          <div>
            <p className="font-heading text-2xl font-extrabold tabular-nums text-verde">
              {moeda(taxa)}
            </p>
            <p className="text-xs text-muted-foreground">retido como taxa</p>
          </div>
        </div>

        {/* Tabela no desktop, cartões no celular: uma linha com seis colunas
            não cabe em 390 px sem virar rolagem horizontal. */}
        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-border lg:block">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3 font-semibold">Serviço</th>
                <th className="p-3 font-semibold">Contratante</th>
                <th className="p-3 font-semibold">Prestador</th>
                <th className="p-3 font-semibold">Estado</th>
                <th className="p-3 text-right font-semibold">Valor</th>
                <th className="p-3 text-right font-semibold">Taxa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transacoes.map((t) => (
                <tr key={t.id}>
                  <td className="p-3 font-semibold">{t.servico}</td>
                  <td className="p-3 text-muted-foreground">{t.contratante}</td>
                  <td className="p-3 text-muted-foreground">{t.prestador}</td>
                  <td className="p-3">
                    <EstadoTag estado={t.estado} />
                  </td>
                  <td className="p-3 text-right font-semibold tabular-nums">
                    {moeda(t.valor)}
                  </td>
                  <td className="p-3 text-right tabular-nums text-verde">
                    {moeda(t.taxa)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-5 space-y-2.5 lg:hidden">
          {transacoes.map((t) => (
            <li key={t.id} className="rounded-2xl border border-border p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{t.servico}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.contratante} para {t.prestador}
                  </p>
                </div>
                <span className="shrink-0 font-semibold tabular-nums">
                  {moeda(t.valor)}
                </span>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <EstadoTag estado={t.estado} />
                <span className="text-xs text-verde">taxa {moeda(t.taxa)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
