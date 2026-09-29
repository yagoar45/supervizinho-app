"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, MessageCircle, Star, TrendingUp, Wallet } from "lucide-react"
import { Distancia } from "@/components/selos"
import {
  acharPrestador,
  faixa,
  ganhosPrestador,
  moeda,
  pedidosRecebidos,
} from "@/lib/mock"
import { cn } from "@/lib/utils"

/** O prestador da demo é o Rodrigo — o eletricista que atende no mesmo dia. */
const EU = "rodrigo-mendes"

export default function PainelPrestador() {
  const eu = acharPrestador(EU)!
  const [aceitos, setAceitos] = useState<string[]>([])

  const novos = pedidosRecebidos.filter((p) => !p.respondido)

  return (
    <div>
      <header className="px-5 pt-6 lg:px-8 lg:pt-10">
        <h1 className="font-heading text-2xl font-extrabold lg:text-4xl">
          Olá, {eu.nome.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground lg:text-base">
          {novos.length} {novos.length === 1 ? "pedido novo" : "pedidos novos"} no
          seu raio de atendimento.
        </p>
      </header>

      <section className="mt-5 grid grid-cols-2 gap-2.5 px-5 lg:mt-7 lg:grid-cols-4 lg:px-8">
        <Metrica
          icon={Wallet}
          valor={moeda(ganhosPrestador.mes)}
          rotulo="recebido no mês"
          destaque
        />
        <Metrica
          icon={Check}
          valor={moeda(ganhosPrestador.aReceber)}
          rotulo="retido, aguardando ok"
        />
        <Metrica
          icon={TrendingUp}
          valor={String(ganhosPrestador.servicosNoMes)}
          rotulo="serviços no mês"
        />
        <Metrica
          icon={Star}
          valor={ganhosPrestador.nota.toFixed(1).replace(".", ",")}
          rotulo={`${ganhosPrestador.avaliacoes} avaliações`}
        />
      </section>

      {/* O contraste com o GetNinjas vive aqui: o pedido chega direto, com
          valor e distância, e o prestador responde na hora. */}
      <section className="mt-8 px-5 lg:mt-12 lg:px-8">
        <h2 className="text-lg font-bold lg:text-xl">Pedidos para você</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Chegam direto, sem fila de intermediário. Quem responde primeiro leva.
        </p>

        <div className="mt-3 grid gap-2.5 lg:grid-cols-2 lg:gap-3">
          {pedidosRecebidos.map((p) => {
            const aceito = aceitos.includes(p.id) || p.respondido

            return (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className={cn("h-1.5", p.fachada)} aria-hidden />
                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-bold">{p.servico}</h3>
                      <p className="truncate text-sm text-muted-foreground">
                        {p.contratante} — {p.quando}
                      </p>
                    </div>
                    <span className="shrink-0 font-heading text-base font-extrabold tabular-nums">
                      {moeda(p.valor)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <Distancia km={p.distanciaKm} />
                    {aceito ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-verde">
                        <Check size={13} aria-hidden />
                        Você respondeu
                      </span>
                    ) : (
                      <div className="flex gap-1.5">
                        <button className="grid size-8 place-items-center rounded-full bg-muted">
                          <MessageCircle size={15} aria-hidden />
                          <span className="sr-only">Mandar mensagem</span>
                        </button>
                        <button
                          onClick={() => setAceitos((l) => [...l, p.id])}
                          className="rounded-full bg-verde px-3.5 py-1.5 text-xs font-bold text-white"
                        >
                          Aceitar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mt-8 px-5 lg:mt-12 lg:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold lg:text-xl">Minhas habilidades</h2>
          <Link href="/cadastrar" className="text-sm font-semibold text-verde">
            Adicionar
          </Link>
        </div>
        <ul className="mt-3 divide-y divide-border rounded-2xl border border-border">
          {eu.habilidades.map((h) => (
            <li key={h.nome} className="flex items-center justify-between gap-3 p-3.5">
              <span className="text-[15px] font-semibold">{h.nome}</span>
              <span className="shrink-0 text-right text-sm">
                <span className="font-bold">{faixa(h.precoDe, h.precoAte)}</span>
                <span className="block text-xs text-muted-foreground">{h.unidade}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function Metrica({
  icon: Icon,
  valor,
  rotulo,
  destaque = false,
}: {
  icon: typeof Wallet
  valor: string
  rotulo: string
  destaque?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3.5",
        destaque ? "border-transparent bg-tinta text-white" : "border-border",
      )}
    >
      <Icon
        size={17}
        className={destaque ? "text-sol" : "text-muted-foreground"}
        aria-hidden
      />
      <p className="mt-2 font-heading text-xl font-extrabold tabular-nums">{valor}</p>
      <p className={cn("text-xs", destaque ? "text-white/70" : "text-muted-foreground")}>
        {rotulo}
      </p>
    </div>
  )
}
