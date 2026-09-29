"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Plus } from "lucide-react"
import { navPorPapel } from "@/components/navegacao"
import { TrocaPapel, usePapel } from "@/components/papel"
import { usuario } from "@/lib/mock"
import { cn } from "@/lib/utils"

/** Navegação do desktop. Some abaixo de `lg`, onde a BottomNav assume. */
export function SideNav() {
  const pathname = usePathname()
  const { papel } = usePapel()
  const abas = navPorPapel[papel]

  return (
    <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r border-border px-4 py-6 lg:flex">
      <Link href="/" className="px-2">
        <p className="font-heading text-2xl font-extrabold leading-none">Vizinho</p>
        <p className="mt-1.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={13} aria-hidden />
          {usuario.cidade}, {usuario.uf}
        </p>
      </Link>

      <div className="mt-6">
        <TrocaPapel orientacao="vertical" />
      </div>

      <div className="my-5 border-t border-border" />

      <nav className="flex flex-col gap-1">
        {abas.map((aba) => {
          const Icon = aba.icon
          const ativa =
            aba.href === "/" ? pathname === "/" : pathname === aba.href

          return (
            <Link
              key={aba.href}
              href={aba.href}
              aria-current={ativa ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors",
                ativa
                  ? "bg-accent text-verde"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon size={19} aria-hidden />
              {aba.label}
            </Link>
          )
        })}
      </nav>

      {papel === "contratante" && (
        <Link
          href="/cadastrar"
          className="mt-6 flex items-center justify-center gap-1.5 rounded-full bg-verde py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <Plus size={16} aria-hidden />
          Cadastrar habilidade
        </Link>
      )}

      <div className="mt-auto rounded-xl bg-muted p-3.5">
        <p className="text-sm font-semibold">Pagamento protegido</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          O dinheiro fica retido até o contratante confirmar que o serviço ficou
          pronto.
        </p>
      </div>
    </aside>
  )
}
