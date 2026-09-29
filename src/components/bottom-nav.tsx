"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { navPorPapel } from "@/components/navegacao"
import { usePapel } from "@/components/papel"
import { cn } from "@/lib/utils"

/**
 * Base: "Bottom Nav Bar" de @arunachalam no 21st.dev — pílula animada com a
 * label aparecendo só na aba ativa. Adaptado aqui para navegação real do App
 * Router (Link + usePathname) e para trocar de itens conforme o papel.
 */
export function BottomNav() {
  const pathname = usePathname()
  const { papel } = usePapel()
  const abas = navPorPapel[papel]

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-20 flex justify-center pb-5 lg:hidden"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/95 p-2 shadow-xl backdrop-blur">
        {abas.map((aba) => {
          const Icon = aba.icon
          const ativa = aba.href === "/" ? pathname === "/" : pathname === aba.href

          return (
            <Link
              key={aba.href}
              href={aba.href}
              aria-current={ativa ? "page" : undefined}
              className={cn(
                "flex h-10 min-w-11 items-center justify-center rounded-full px-3 transition-colors",
                ativa
                  ? "bg-accent text-verde"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon size={21} strokeWidth={2} aria-hidden />
              <motion.span
                initial={false}
                animate={{
                  width: ativa ? "auto" : 0,
                  opacity: ativa ? 1 : 0,
                  marginLeft: ativa ? 8 : 0,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden whitespace-nowrap text-sm font-semibold"
              >
                {aba.label}
              </motion.span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
