"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Lock, ShieldCheck, TriangleAlert, Wallet } from "lucide-react"
import { moeda, type Prestador } from "@/lib/mock"
import { cn } from "@/lib/utils"

type Etapa = "combinar" | "retido" | "liberado" | "disputa"

const TAXA = 0.1

/**
 * Demonstração do pagamento retido — o mecanismo central da proposta.
 * O dinheiro sai do contratante na contratação, fica com a plataforma, e só
 * chega ao prestador depois do "ok". Se der problema, volta.
 *
 * Aqui é só interface: nenhum pagamento acontece de verdade.
 */
export function Escrow({ p }: { p: Prestador }) {
  const [etapa, setEtapa] = useState<Etapa>("combinar")
  const [servicoIdx, setServicoIdx] = useState(0)

  const servico = p.habilidades[servicoIdx]
  const valor = Math.round((servico.precoDe + servico.precoAte) / 2)
  const taxa = Math.round(valor * TAXA)

  const passos: { id: Etapa; titulo: string; texto: string }[] = [
    {
      id: "retido",
      titulo: "Você paga, o app segura",
      texto: `${moeda(valor)} sai da sua conta e fica retido aqui. ${p.nome.split(" ")[0]} vê que o dinheiro está garantido e começa o trabalho.`,
    },
    {
      id: "liberado",
      titulo: "Ficou pronto, você libera",
      texto: `Quando você confirmar que está tudo certo, ${moeda(valor - taxa)} vai para ${p.nome.split(" ")[0]}. O app fica com ${moeda(taxa)}.`,
    },
    {
      id: "disputa",
      titulo: "Deu problema, você não libera",
      texto: "O dinheiro não é transferido. A gente entra no meio e devolve para você.",
    },
  ]

  return (
    <div className="px-5 pt-5 lg:px-8">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-xl font-heading font-extrabold text-tinta",
            p.fachada,
          )}
          aria-hidden
        >
          {p.iniciais}
        </div>
        <div>
          <p className="font-bold">{p.nome}</p>
          <p className="text-sm text-muted-foreground">
            {p.categoria} no {p.bairro}
          </p>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-bold">Qual serviço?</legend>
        <div className="mt-2 space-y-2">
          {p.habilidades.map((h, i) => (
            <label
              key={h.nome}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-colors",
                servicoIdx === i ? "border-verde bg-accent" : "border-border",
              )}
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="servico"
                  checked={servicoIdx === i}
                  onChange={() => {
                    setServicoIdx(i)
                    setEtapa("combinar")
                  }}
                  className="accent-verde"
                />
                <span className="text-[15px] font-semibold">{h.nome}</span>
              </span>
              <span className="shrink-0 text-sm font-bold">
                {moeda(Math.round((h.precoDe + h.precoAte) / 2))}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Você paga</span>
          <span className="font-bold tabular-nums">{moeda(valor)}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Taxa do app (10%)</span>
          <span className="tabular-nums">−{moeda(taxa)}</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2.5">
          <span className="text-sm font-semibold">
            {p.nome.split(" ")[0]} recebe
          </span>
          <span className="font-heading text-lg font-extrabold tabular-nums">
            {moeda(valor - taxa)}
          </span>
        </div>
      </div>

      {/* A régua do dinheiro: onde ele está agora. É o que o prospect precisa
          ver funcionando. */}
      <ol className="mt-6 space-y-2.5">
        {passos.map((passo) => {
          const ativo = etapa === passo.id
          const cumprido =
            (passo.id === "retido" && (etapa === "liberado" || etapa === "disputa")) ||
            (passo.id === "liberado" && etapa === "liberado")
          const problema = passo.id === "disputa" && etapa === "disputa"

          const Icon = problema ? TriangleAlert : cumprido ? Check : passo.id === "retido" ? Lock : ShieldCheck

          return (
            <li
              key={passo.id}
              className={cn(
                "flex gap-3 rounded-2xl border p-3.5 transition-colors",
                ativo && problema && "border-destructive bg-destructive/5",
                ativo && !problema && "border-verde bg-accent",
                !ativo && "border-border",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full",
                  ativo && problema && "bg-destructive text-white",
                  ativo && !problema && "bg-verde text-white",
                  !ativo && "bg-muted text-muted-foreground",
                )}
                aria-hidden
              >
                <Icon size={15} />
              </span>
              <div>
                <p className="text-sm font-bold">{passo.titulo}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {passo.texto}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-6 space-y-2">
        <AnimatePresence mode="wait">
          {etapa === "combinar" && (
            <motion.button
              key="pagar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEtapa("retido")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-verde py-3.5 font-bold text-white"
            >
              <Wallet size={18} aria-hidden />
              Pagar {moeda(valor)} com Pix
            </motion.button>
          )}

          {etapa === "retido" && (
            <motion.div
              key="retido"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p className="rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold text-verde">
                {moeda(valor)} retidos. {p.nome.split(" ")[0]} já foi avisado.
              </p>
              <button
                onClick={() => setEtapa("liberado")}
                className="w-full rounded-full bg-verde py-3.5 font-bold text-white"
              >
                Ficou pronto, liberar pagamento
              </button>
              <button
                onClick={() => setEtapa("disputa")}
                className="w-full rounded-full border border-border py-3 text-sm font-semibold"
              >
                Tive um problema
              </button>
            </motion.div>
          )}

          {etapa === "liberado" && (
            <motion.div
              key="liberado"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl bg-verde p-5 text-center text-white"
            >
              <Check size={26} className="mx-auto" aria-hidden />
              <p className="mt-2 font-heading text-lg font-extrabold">
                {moeda(valor - taxa)} enviados
              </p>
              <p className="mt-1 text-sm text-white/80">
                O dinheiro caiu na conta de {p.nome.split(" ")[0]}. Avalie o
                serviço para ajudar a vizinhança.
              </p>
              <Link
                href="/pedidos"
                className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-verde"
              >
                Ver meus pedidos
              </Link>
            </motion.div>
          )}

          {etapa === "disputa" && (
            <motion.div
              key="disputa"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-destructive bg-destructive/5 p-5 text-center"
            >
              <TriangleAlert size={24} className="mx-auto text-destructive" aria-hidden />
              <p className="mt-2 font-bold">Pagamento parado</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Os {moeda(valor)} continuam retidos. Conte o que aconteceu e a
                gente resolve em até 48 horas — se procede, o dinheiro volta
                para você.
              </p>
              <button
                onClick={() => setEtapa("retido")}
                className="mt-4 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold"
              >
                Voltar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Demonstração. Nenhum pagamento é processado nesta tela.
      </p>
    </div>
  )
}
