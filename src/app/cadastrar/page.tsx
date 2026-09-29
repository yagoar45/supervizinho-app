"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, Camera, Check, Plus, X } from "lucide-react"
import { TopoVoltar } from "@/components/topo"
import { categorias, usuario } from "@/lib/mock"
import { cn } from "@/lib/utils"

/**
 * Cadastro de habilidade. O áudio do cliente insiste em três coisas que
 * sustentam a confiança: foto do trabalho, certificado que capacita, e faixa
 * de preço. As três estão no mesmo formulário, não escondidas em etapas.
 */
export default function Cadastrar() {
  const [categoria, setCategoria] = useState<string | null>(null)
  const [habilidades, setHabilidades] = useState<string[]>([])
  const [rascunho, setRascunho] = useState("")
  const [enviado, setEnviado] = useState(false)

  function adicionar() {
    const nome = rascunho.trim()
    if (!nome || habilidades.includes(nome)) return
    setHabilidades((h) => [...h, nome])
    setRascunho("")
  }

  if (enviado) {
    return (
      <div className="pb-6 lg:mx-auto lg:max-w-3xl">
        <TopoVoltar titulo="Habilidade cadastrada" voltarPara="/perfil" />
        <div className="px-5 pt-10 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-verde text-white">
            <Check size={30} aria-hidden />
          </div>
          <h1 className="mt-4 font-heading text-xl font-extrabold">
            Pronto, você está no mapa
          </h1>
          <p className="mx-auto mt-2 max-w-[32ch] text-[15px] leading-relaxed text-muted-foreground">
            Os pedidos de {habilidades[0] ?? "sua área"} no {usuario.bairro}{" "}
            começam a chegar. Você responde direto, sem intermediário.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-verde px-6 py-3 font-bold text-white"
          >
            Ver pedidos abertos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-6 lg:mx-auto lg:max-w-3xl">
      <TopoVoltar titulo="Cadastrar habilidade" voltarPara="/perfil" />

      <div className="px-5 pt-5 lg:px-8 lg:pt-8">
        <h1 className="font-heading text-xl font-extrabold leading-tight">
          O que você sabe fazer?
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Pode cadastrar mais de uma. Muita gente faz bolo e também mexe com
          elétrica.
        </p>

        <fieldset className="mt-6">
          <legend className="text-sm font-bold">Categoria</legend>
          <div className="mt-2.5 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {categorias.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategoria(c.slug)}
                aria-pressed={categoria === c.slug}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-xl p-2.5 transition-all",
                  c.fachada,
                  categoria && categoria !== c.slug && "opacity-40",
                  categoria === c.slug && "ring-2 ring-tinta",
                )}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {c.emoji}
                </span>
                <span className="text-[11px] font-bold leading-tight text-tinta">
                  {c.nome}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor="skill" className="text-sm font-bold">
            Seus serviços
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="skill"
              value={rascunho}
              onChange={(e) => setRascunho(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  adicionar()
                }
              }}
              placeholder="Ex: trocar chuveiro"
              className="flex-1 rounded-xl border border-border bg-card px-3.5 py-3 text-[15px] outline-none focus:border-verde"
            />
            <button
              onClick={adicionar}
              className="grid size-12 shrink-0 place-items-center rounded-xl bg-verde text-white"
            >
              <Plus size={19} aria-hidden />
              <span className="sr-only">Adicionar serviço</span>
            </button>
          </div>

          {habilidades.length > 0 && (
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {habilidades.map((h) => (
                <li
                  key={h}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-verde"
                >
                  {h}
                  <button
                    onClick={() => setHabilidades((l) => l.filter((x) => x !== h))}
                    aria-label={`Remover ${h}`}
                  >
                    <X size={13} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <div className="text-sm">
            <label htmlFor="de" className="font-bold">
              De
            </label>
            <input
              id="de"
              inputMode="numeric"
              placeholder="R$ 120"
              className="mt-2 w-full rounded-xl border border-border bg-card px-3.5 py-3 text-[15px] outline-none focus:border-verde"
            />
          </div>
          <div className="text-sm">
            <label htmlFor="ate" className="font-bold">
              Até
            </label>
            <input
              id="ate"
              inputMode="numeric"
              placeholder="R$ 180"
              className="mt-2 w-full rounded-xl border border-border bg-card px-3.5 py-3 text-[15px] outline-none focus:border-verde"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <button className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-3 py-6 transition-colors hover:bg-muted">
            <Camera size={22} className="text-muted-foreground" aria-hidden />
            <span className="text-sm font-semibold">Fotos do trabalho</span>
            <span className="text-xs text-muted-foreground">até 6 fotos</span>
          </button>
          <button className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-3 py-6 transition-colors hover:bg-muted">
            <Award size={22} className="text-muted-foreground" aria-hidden />
            <span className="text-sm font-semibold">Certificados</span>
            <span className="text-xs text-muted-foreground">dá o selo verde</span>
          </button>
        </div>

        <button
          onClick={() => setEnviado(true)}
          disabled={!categoria || habilidades.length === 0}
          className="mt-7 w-full rounded-full bg-verde py-3.5 font-bold text-white disabled:opacity-40"
        >
          Publicar habilidade
        </button>
        {(!categoria || habilidades.length === 0) && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Escolha uma categoria e adicione pelo menos um serviço.
          </p>
        )}
      </div>
    </div>
  )
}
