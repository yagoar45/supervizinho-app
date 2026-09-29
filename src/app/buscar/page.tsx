"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { PrestadorCard } from "@/components/prestador-card"
import { categorias, prestadores } from "@/lib/mock"
import { cn } from "@/lib/utils"

type Ordem = "perto" | "nota" | "preco" | "verificados"

const ordens: { id: Ordem; rotulo: string }[] = [
  { id: "perto", rotulo: "Mais perto" },
  { id: "nota", rotulo: "Melhor nota" },
  { id: "preco", rotulo: "Menor preço" },
  { id: "verificados", rotulo: "Verificados" },
]

export default function Buscar() {
  const [termo, setTermo] = useState("")
  const [ordem, setOrdem] = useState<Ordem>("perto")
  const [categoria, setCategoria] = useState<string | null>(null)

  const resultados = useMemo(() => {
    const busca = termo.trim().toLowerCase()

    let lista = prestadores.filter((p) => {
      const casaTermo =
        !busca ||
        p.nome.toLowerCase().includes(busca) ||
        p.categoria.toLowerCase().includes(busca) ||
        p.habilidades.some((h) => h.nome.toLowerCase().includes(busca))

      const casaCategoria =
        !categoria ||
        p.fachada === categorias.find((c) => c.slug === categoria)?.fachada

      return casaTermo && casaCategoria
    })

    if (ordem === "verificados") {
      lista = lista.filter((p) => p.verificacao === "verificada")
    }

    return [...lista].sort((a, b) => {
      if (ordem === "nota") return b.nota - a.nota
      if (ordem === "preco") return a.habilidades[0].precoDe - b.habilidades[0].precoDe
      return a.distanciaKm - b.distanciaKm
    })
  }, [termo, ordem, categoria])

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-5 pb-3 pt-6 backdrop-blur lg:px-8 lg:pb-5 lg:pt-10">
        <h1 className="font-heading text-2xl font-extrabold lg:text-4xl">
          Conte o que você precisa
        </h1>

        <div className="mt-3 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-3 lg:mt-5">
          <Search size={17} className="shrink-0 text-muted-foreground" aria-hidden />
          <input
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="chuveiro, bolo, tela de celular…"
            aria-label="Buscar serviço"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
          {ordens.map((o) => (
            <button
              key={o.id}
              onClick={() => setOrdem(o.id)}
              aria-pressed={ordem === o.id}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                ordem === o.id
                  ? "border-verde bg-verde text-white"
                  : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              {o.rotulo}
            </button>
          ))}
        </div>
      </header>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5 lg:flex-wrap lg:overflow-visible lg:px-8">
        <button
          onClick={() => setCategoria(null)}
          className={cn(
            "shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
            categoria === null ? "bg-tinta text-white" : "bg-muted text-muted-foreground",
          )}
        >
          Todas
        </button>
        {categorias.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategoria(categoria === c.slug ? null : c.slug)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-tinta transition-opacity",
              c.fachada,
              categoria && categoria !== c.slug && "opacity-40",
            )}
          >
            <span aria-hidden>{c.emoji}</span>
            {c.nome}
          </button>
        ))}
      </div>

      <p className="mt-5 px-5 text-sm text-muted-foreground lg:px-8">
        {resultados.length === 0
          ? "Nenhum vizinho encontrado"
          : `${resultados.length} ${resultados.length === 1 ? "vizinho" : "vizinhos"} perto de você`}
      </p>

      <div className="mt-2.5 grid gap-2.5 px-5 lg:grid-cols-2 lg:gap-3 lg:px-8">
        {resultados.map((p) => (
          <PrestadorCard key={p.id} p={p} />
        ))}

        {resultados.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border px-5 py-10 text-center lg:col-span-2">
            <p className="font-semibold">Ninguém por perto ainda faz isso.</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Publique o pedido e avisamos quem se cadastrar no seu bairro.
            </p>
            <button className="mt-4 rounded-full bg-verde px-5 py-2.5 text-sm font-bold text-white">
              Publicar pedido
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
