import Link from "next/link"
import { Lock, ShieldAlert, TrendingUp, Users } from "lucide-react"
import { disputas, metricasPlataforma as m, moeda, transacoes } from "@/lib/mock"
import { EstadoTag } from "@/components/estado-tag"
import { cn } from "@/lib/utils"

export default function PainelAdmin() {
  return (
    <div>
      <header className="px-5 pt-6 lg:px-8 lg:pt-10">
        <h1 className="font-heading text-2xl font-extrabold lg:text-4xl">
          Plataforma
        </h1>
        <p className="mt-1 text-sm text-muted-foreground lg:text-base">
          Betim, setembro de 2026
        </p>
      </header>

      {/* Duas leituras diferentes: o retido é passivo (dinheiro de terceiros
          sob custódia), a taxa é receita. Separar visualmente evita somar
          mentalmente coisas que não se somam. */}
      <section className="mt-5 grid grid-cols-2 gap-2.5 px-5 lg:mt-7 lg:grid-cols-4 lg:px-8">
        <div className="col-span-2 rounded-2xl bg-tinta p-4 text-white lg:col-span-1">
          <Lock size={17} className="text-sol" aria-hidden />
          <p className="mt-2 font-heading text-2xl font-extrabold tabular-nums">
            {moeda(m.retidoAgora)}
          </p>
          <p className="text-xs text-white/70">retido em custódia agora</p>
        </div>
        <div className="col-span-2 rounded-2xl border border-border p-4 lg:col-span-1">
          <TrendingUp size={17} className="text-verde" aria-hidden />
          <p className="mt-2 font-heading text-2xl font-extrabold tabular-nums">
            {moeda(m.taxaNoMes)}
          </p>
          <p className="text-xs text-muted-foreground">receita de taxa no mês</p>
        </div>
        <div className="rounded-2xl border border-border p-4">
          <Users size={17} className="text-muted-foreground" aria-hidden />
          <p className="mt-2 font-heading text-xl font-extrabold tabular-nums">
            {m.usuarios.toLocaleString("pt-BR")}
          </p>
          <p className="text-xs text-muted-foreground">
            {m.prestadoresAtivos} prestadores ativos
          </p>
        </div>
        <Link
          href="/admin/disputas"
          className={cn(
            "rounded-2xl border p-4 transition-colors",
            m.disputasAbertas > 0
              ? "border-destructive/40 bg-destructive/5 hover:bg-destructive/10"
              : "border-border",
          )}
        >
          <ShieldAlert size={17} className="text-destructive" aria-hidden />
          <p className="mt-2 font-heading text-xl font-extrabold tabular-nums">
            {m.disputasAbertas}
          </p>
          <p className="text-xs text-muted-foreground">disputas aguardando</p>
        </Link>
      </section>

      <section className="mt-8 px-5 lg:mt-12 lg:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold lg:text-xl">Transações recentes</h2>
          <Link href="/admin/transacoes" className="text-sm font-semibold text-verde">
            Ver todas
          </Link>
        </div>

        <ul className="mt-3 divide-y divide-border rounded-2xl border border-border">
          {transacoes.slice(0, 4).map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-3 p-3.5">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold">{t.servico}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.contratante} para {t.prestador} — {t.quando}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <EstadoTag estado={t.estado} />
                <span className="w-20 text-right font-semibold tabular-nums">
                  {moeda(t.valor)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 px-5 lg:mt-12 lg:px-8">
        <h2 className="text-lg font-bold lg:text-xl">Disputas abertas</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enquanto não houver decisão, o dinheiro fica parado. É o que a
          plataforma promete ao contratante.
        </p>

        <div className="mt-3 grid gap-2.5 lg:grid-cols-3 lg:gap-3">
          {disputas.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl border border-destructive/30 bg-destructive/5 p-3.5"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[15px] font-bold">{d.servico}</p>
                <span className="shrink-0 font-semibold tabular-nums">
                  {moeda(d.valor)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {d.contratante} contra {d.prestador}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{d.motivo}</p>
              <p className="mt-2 text-xs font-semibold text-destructive">{d.prazo}</p>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-full bg-verde py-2 text-xs font-bold text-white">
                  Liberar ao prestador
                </button>
                <button className="flex-1 rounded-full border border-border bg-background py-2 text-xs font-bold">
                  Devolver
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
