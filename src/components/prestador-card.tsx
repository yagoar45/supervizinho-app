import Link from "next/link"
import { cn } from "@/lib/utils"
import { faixa, type Prestador } from "@/lib/mock"
import { AtendeHoje, Distancia, Nota, SeloVerificacao } from "@/components/selos"

/**
 * O card do vizinho. A faixa colorida à esquerda é a fachada da categoria —
 * o mesmo código de cor do grid de categorias, para que a pessoa reconheça
 * "isso é alimentação" antes de ler.
 */
export function PrestadorCard({ p }: { p: Prestador }) {
  const principal = p.habilidades[0]

  return (
    <Link
      href={`/profissional/${p.id}`}
      className="flex gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-verde/40"
    >
      <div className={cn("w-1.5 shrink-0 rounded-full", p.fachada)} aria-hidden />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold">{p.nome}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {p.categoria} no {p.bairro}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <Nota nota={p.nota} />
            <p className="text-xs text-muted-foreground">{p.avaliacoes} avaliações</p>
          </div>
        </div>

        <p className="mt-2 text-sm">
          <span className="font-semibold">{principal.nome}</span>{" "}
          <span className="text-muted-foreground">
            {faixa(principal.precoDe, principal.precoAte)} {principal.unidade}
          </span>
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Distancia km={p.distanciaKm} />
          <SeloVerificacao tipo={p.verificacao} />
          {p.atendeHoje && <AtendeHoje />}
        </div>
      </div>
    </Link>
  )
}
