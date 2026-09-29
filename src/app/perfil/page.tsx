import Link from "next/link"
import { ArrowUpRight, BadgeCheck, ChevronRight, MapPin, Star, Wallet } from "lucide-react"
import { moeda, pedidos, usuario } from "@/lib/mock"

const atalhos = [
  { rotulo: "Meus dados", detalhe: "Nome, telefone, endereço" },
  { rotulo: "Formas de pagamento", detalhe: "Pix e cartão" },
  { rotulo: "Notificações", detalhe: "Pedidos do meu bairro" },
  { rotulo: "Ajuda", detalhe: "Como funciona o pagamento protegido" },
]

export default function Perfil() {
  const gasto = pedidos
    .filter((p) => p.estado === "concluido")
    .reduce((s, p) => s + p.valor, 0)

  return (
    <div className="pb-6">
      <header className="px-5 pt-6 lg:px-8 lg:pt-10">
        <h1 className="font-heading text-2xl font-extrabold">Perfil</h1>

        <div className="mt-4 flex items-center gap-3.5">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-muted font-heading text-xl font-extrabold">
            VC
          </div>
          <div>
            <p className="text-lg font-bold">{usuario.nome}</p>
            <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={13} aria-hidden />
              {usuario.bairro}, {usuario.cidade} — {usuario.uf}
            </p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-verde">
              <BadgeCheck size={13} aria-hidden />
              Identidade conferida
            </span>
          </div>
        </div>
      </header>

      <section className="mt-5 grid grid-cols-2 gap-2.5 px-5 lg:max-w-md lg:px-8">
        <div className="rounded-2xl border border-border p-3.5">
          <Wallet size={17} className="text-muted-foreground" aria-hidden />
          <p className="mt-2 font-heading text-xl font-extrabold tabular-nums">
            {moeda(gasto)}
          </p>
          <p className="text-xs text-muted-foreground">gastos na vizinhança</p>
        </div>
        <div className="rounded-2xl border border-border p-3.5">
          <Star size={17} className="fill-sol text-sol" aria-hidden />
          <p className="mt-2 font-heading text-xl font-extrabold tabular-nums">4,9</p>
          <p className="text-xs text-muted-foreground">sua nota como contratante</p>
        </div>
      </section>

      {/* O app tem dois lados e a mesma pessoa vive os dois. Quem ainda não
          cadastrou habilidade vê aqui o convite para virar prestador. */}
      <section className="mx-5 mt-5 rounded-2xl bg-tinta p-5 text-white lg:mx-8 lg:max-w-2xl lg:p-7">
        <h2 className="font-heading text-lg font-extrabold leading-tight">
          Você ainda não cadastrou
          <br />
          nenhuma habilidade
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Tem {pedidos.length * 9} pedidos abertos no {usuario.bairro} esta
          semana. Cadastre o que você sabe fazer e comece a receber.
        </p>
        <Link
          href="/cadastrar"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-sol px-5 py-2.5 text-sm font-bold text-tinta"
        >
          Cadastrar habilidade
          <ArrowUpRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="mt-5 px-5 lg:max-w-2xl lg:px-8">
        <ul className="divide-y divide-border rounded-2xl border border-border">
          {atalhos.map((a) => (
            <li key={a.rotulo}>
              <button className="flex w-full items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-muted">
                <span>
                  <span className="block text-[15px] font-semibold">{a.rotulo}</span>
                  <span className="block text-xs text-muted-foreground">
                    {a.detalhe}
                  </span>
                </span>
                <ChevronRight size={17} className="shrink-0 text-muted-foreground" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
