import Link from "next/link"
import { notFound } from "next/navigation"
import { Award, MessageCircle, Star } from "lucide-react"
import { TopoVoltar } from "@/components/topo"
import { AtendeHoje, Distancia, Nota, SeloVerificacao } from "@/components/selos"
import { acharPrestador, faixa, prestadores } from "@/lib/mock"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return prestadores.map((p) => ({ id: p.id }))
}

export default async function PerfilPrestador({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const p = acharPrestador(id)
  if (!p) notFound()

  return (
    <div className="pb-6 lg:mx-auto lg:max-w-3xl">
      <TopoVoltar titulo={p.nome} voltarPara="/buscar" />

      <section className="px-5 pt-5 lg:px-8 lg:pt-8">
        <div className="flex items-start gap-3.5">
          <div
            className={cn(
              "grid size-16 shrink-0 place-items-center rounded-2xl font-heading text-xl font-extrabold text-tinta",
              p.fachada,
            )}
            aria-hidden
          >
            {p.iniciais}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-xl font-extrabold leading-tight">{p.nome}</h1>
            <p className="text-sm text-muted-foreground">
              {p.categoria} no {p.bairro}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Nota nota={p.nota} avaliacoes={p.avaliacoes} />
              <Distancia km={p.distanciaKm} />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <SeloVerificacao tipo={p.verificacao} />
          {p.atendeHoje && <AtendeHoje />}
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
            {p.respondeEm}
          </span>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed">{p.resumo}</p>
      </section>

      {/* A proposta do app é a pessoa ter VÁRIAS habilidades, não uma profissão
          só — então elas vêm listadas com preço próprio, não escondidas atrás
          de uma categoria. */}
      <section className="mt-7 px-5 lg:px-8">
        <h2 className="text-lg font-bold">O que {p.nome.split(" ")[0]} faz</h2>
        <ul className="mt-3 divide-y divide-border rounded-2xl border border-border">
          {p.habilidades.map((h) => (
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

      <section className="mt-7 lg:mt-10">
        <h2 className="px-5 text-lg font-bold lg:px-8 lg:text-xl">Trabalhos</h2>
        <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto px-5 lg:px-8">
          {p.trabalhos.map((t) => (
            <figure key={t.titulo} className="w-36 shrink-0">
              <div
                className={cn("h-28 rounded-xl bg-gradient-to-br", t.cor)}
                role="img"
                aria-label={`Foto do trabalho: ${t.titulo}`}
              />
              <figcaption className="mt-1.5 text-xs text-muted-foreground">
                {t.titulo}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5 lg:px-8">
        <h2 className="text-lg font-bold">Certificados</h2>
        <ul className="mt-3 space-y-2">
          {p.certificados.map((c) => (
            <li
              key={c.nome}
              className="flex items-start gap-2.5 rounded-xl bg-muted px-3.5 py-3"
            >
              <Award size={17} className="mt-0.5 shrink-0 text-verde" aria-hidden />
              <div>
                <p className="text-sm font-semibold leading-snug">{c.nome}</p>
                <p className="text-xs text-muted-foreground">
                  {c.emissor}, {c.ano}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-7 px-5 lg:px-8">
        <h2 className="text-lg font-bold">Avaliações</h2>
        <ul className="mt-3 space-y-3">
          {p.comentarios.map((a) => (
            <li key={a.autor} className="rounded-2xl border border-border p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{a.autor}</span>
                <span className="text-xs text-muted-foreground">{a.quando}</span>
              </div>
              <div className="mt-1 flex gap-0.5" aria-label={`Nota ${a.nota} de 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    aria-hidden
                    className={i < a.nota ? "fill-sol text-sol" : "text-border"}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed">{a.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Barra fixa: a ação é o ponto da tela. Contato direto ao lado da
          contratação — é o que diferencia do modelo de intermediação. */}
      <div className="sticky bottom-24 mt-8 px-5 lg:bottom-8 lg:px-8">
        <div className="flex gap-2 rounded-full border border-border bg-card/95 p-2 shadow-lg backdrop-blur">
          <button className="grid size-11 shrink-0 place-items-center rounded-full bg-muted transition-colors hover:bg-border">
            <MessageCircle size={19} aria-hidden />
            <span className="sr-only">Mandar mensagem</span>
          </button>
          <Link
            href={`/contratar/${p.id}`}
            className="grid flex-1 place-items-center rounded-full bg-verde py-3 text-sm font-bold text-white"
          >
            Contratar com pagamento protegido
          </Link>
        </div>
      </div>
    </div>
  )
}
