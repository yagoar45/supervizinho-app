"use client"

import { useState } from "react"
import Link from "next/link"
import { Lock } from "lucide-react"
import { EstadoTag } from "@/components/estado-tag"
import { moeda, pedidos, type Pedido } from "@/lib/mock"
import { cn } from "@/lib/utils"

export default function Pedidos() {
  const [aba, setAba] = useState<"andamento" | "concluidos">("andamento")

  const andamento = pedidos.filter((p) => p.estado !== "concluido")
  const concluidos = pedidos.filter((p) => p.estado === "concluido")
  const lista = aba === "andamento" ? andamento : concluidos

  const retido = andamento
    .filter((p) => p.estado === "retido")
    .reduce((s, p) => s + p.valor, 0)

  return (
    <div className="pb-6">
      <header className="px-5 pt-6 lg:px-8 lg:pt-10">
        <h1 className="font-heading text-2xl font-extrabold">Meus pedidos</h1>

        {retido > 0 && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-tinta p-4 text-white">
            <Lock size={19} className="shrink-0 text-sol" aria-hidden />
            <div>
              <p className="font-heading text-lg font-extrabold leading-none">
                {moeda(retido)}
              </p>
              <p className="mt-1 text-sm text-white/70">
                retidos, aguardando você confirmar o serviço
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          {(
            [
              ["andamento", `Em andamento (${andamento.length})`],
              ["concluidos", `Concluídos (${concluidos.length})`],
            ] as const
          ).map(([id, rotulo]) => (
            <button
              key={id}
              onClick={() => setAba(id)}
              aria-pressed={aba === id}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                aba === id ? "bg-tinta text-white" : "bg-muted text-muted-foreground",
              )}
            >
              {rotulo}
            </button>
          ))}
        </div>
      </header>

      <div className="mt-4 grid gap-2.5 px-5 lg:grid-cols-2 lg:gap-3 lg:px-8">
        {lista.map((p) => (
          <CardPedido key={p.id} p={p} />
        ))}

        {lista.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border px-5 py-10 text-center">
            <p className="font-semibold">Nada por aqui ainda.</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Quando você contratar alguém, o pedido aparece nesta lista.
            </p>
            <Link
              href="/buscar"
              className="mt-4 inline-block rounded-full bg-verde px-5 py-2.5 text-sm font-bold text-white"
            >
              Procurar vizinho
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function CardPedido({ p }: { p: Pedido }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className={cn("h-1.5", p.fachada)} aria-hidden />
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-bold">{p.servico}</h2>
            <p className="truncate text-sm text-muted-foreground">
              com {p.prestador} — {p.quando}
            </p>
          </div>
          <span className="shrink-0 font-heading text-base font-extrabold tabular-nums">
            {moeda(p.valor)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <EstadoTag estado={p.estado} />

          {p.estado === "retido" && (
            <Link
              href={`/contratar/${p.prestadorId}`}
              className="rounded-full bg-verde px-3.5 py-1.5 text-xs font-bold text-white"
            >
              Liberar pagamento
            </Link>
          )}
          {p.estado === "combinando" && (
            <button className="rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold">
              Abrir conversa
            </button>
          )}
          {p.estado === "concluido" && (
            <span className="text-xs text-muted-foreground">
              {moeda(p.valor - p.taxa)} enviados
            </span>
          )}
          {p.estado === "disputa" && (
            <span className="text-xs text-muted-foreground">resposta em até 48h</span>
          )}
        </div>
      </div>
    </article>
  )
}
