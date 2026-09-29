import Link from "next/link"
import { ArrowUpRight, Search } from "lucide-react"
import { TopoMarca } from "@/components/topo"
import { PrestadorCard } from "@/components/prestador-card"
import { Distancia } from "@/components/selos"
import { categorias, faixa, oportunidades, prestadores } from "@/lib/mock"
import { cn } from "@/lib/utils"

export default function Inicio() {
  const perto = [...prestadores].sort((a, b) => a.distanciaKm - b.distanciaKm)

  return (
    <div>
      <TopoMarca />

      {/* O gancho do produto é a proximidade — então a primeira coisa é a
          pergunta que a pessoa já tem na cabeça, em corpo grande. */}
      <section className="px-5 pt-8 lg:px-8 lg:pt-12">
        <h1 className="max-w-[14ch] font-heading text-[2.1rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
          Quem resolve isso aqui do lado?
        </h1>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground lg:mt-5 lg:text-lg">
          Chuveiro queimado, bolo para sábado, tela trincada. Tem vizinho a menos
          de um quilômetro que faz — e atende hoje.
        </p>

        <form action="/buscar" className="mt-5 flex max-w-xl gap-2 lg:mt-7">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-3">
            <Search size={17} className="shrink-0 text-muted-foreground" aria-hidden />
            <input
              name="q"
              placeholder="Conte o que você precisa"
              aria-label="Conte o que você precisa"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-verde px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Achar
          </button>
        </form>
      </section>

      {/* A rua: cada categoria tem sua cor de fachada, e o número é demanda
          real em aberto — informação, não enfeite. */}
      <section className="mt-9 px-5 lg:mt-14 lg:px-8">
        <h2 className="text-lg font-bold lg:text-xl">O que tem por aqui</h2>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-4 lg:mt-4 lg:grid-cols-8 lg:gap-3">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              href={`/buscar?categoria=${c.slug}`}
              className={cn(
                "flex flex-col items-start gap-1 rounded-xl p-2.5 transition-transform active:scale-95 lg:gap-1.5 lg:p-4",
                c.fachada,
              )}
            >
              <span className="text-xl leading-none lg:text-2xl" aria-hidden>
                {c.emoji}
              </span>
              <span className="text-[11px] font-bold leading-tight text-tinta lg:text-sm">
                {c.nome}
              </span>
              <span className="text-[10px] font-medium text-tinta/70 lg:text-xs">
                {c.pedidosAbertos} pedidos
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-9 lg:mt-14">
        <div className="flex items-baseline justify-between px-5 lg:px-8">
          <h2 className="text-lg font-bold lg:text-xl">Pedidos em aberto</h2>
          <Link href="/buscar" className="text-sm font-semibold text-verde">
            Ver todos
          </Link>
        </div>
        <p className="mt-1 px-5 text-sm text-muted-foreground lg:px-8">
          Vizinhos precisando agora. Se você faz, responda direto.
        </p>

        {/* Carrossel no celular, grade no desktop: arrastar é gesto de toque;
            com mouse e espaço sobrando, esconder conteúdo fora da tela é perda. */}
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1 lg:mt-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-8">
          {oportunidades.map((o) => (
            <article
              key={o.id}
              className="w-[248px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card lg:w-auto"
            >
              <div className={cn("h-1.5", o.fachada)} aria-hidden />
              <div className="p-3.5 lg:p-4">
                <p className="text-xs font-semibold text-muted-foreground">
                  {o.categoria}
                </p>
                <h3 className="mt-1 text-[15px] font-bold leading-snug">{o.titulo}</h3>
                <p className="mt-2 text-sm font-semibold">
                  {faixa(o.precoDe, o.precoAte)}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <Distancia km={o.distanciaKm} />
                  <span className="text-xs text-muted-foreground">{o.quando}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-9 px-5 lg:mt-14 lg:px-8">
        <h2 className="text-lg font-bold lg:text-xl">Perto de você</h2>
        <div className="mt-3 grid gap-2.5 lg:mt-4 lg:grid-cols-2 lg:gap-3">
          {perto.map((p) => (
            <PrestadorCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* O outro lado do app: quem tem a habilidade. Banda escura para separar
          claramente do fluxo de quem está procurando. */}
      <section className="mx-5 mt-9 rounded-2xl bg-tinta p-5 text-white lg:mx-8 lg:mt-14 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-8">
        <div>
          <h2 className="font-heading text-xl font-extrabold leading-tight lg:text-3xl">
            Você sabe fazer. Alguém aqui precisa.
          </h2>
          <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-white/70 lg:text-base">
            Cadastre o que você faz, com foto do trabalho e certificado. Os pedidos
            do seu bairro chegam para você.
          </p>
        </div>
        <Link
          href="/cadastrar"
          className="mt-4 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sol px-5 py-2.5 text-sm font-bold text-tinta lg:mt-0 lg:px-6 lg:py-3.5"
        >
          Cadastrar minha habilidade
          <ArrowUpRight size={16} aria-hidden />
        </Link>
      </section>
    </div>
  )
}
