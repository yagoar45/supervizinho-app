import { BottomNav } from "@/components/bottom-nav"
import { SideNav } from "@/components/side-nav"
import { PapelProvider, TrocaPapel } from "@/components/papel"

/**
 * Uma casca, dois layouts reais — não um celular falso dentro do desktop.
 *
 * Até `lg`: coluna única, navegação fixa embaixo, do jeito que se usa o app
 * na rua. A partir de `lg`: barra lateral permanente e o conteúdo ganha
 * largura para abrir em mais colunas.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PapelProvider>
      <div className="min-h-dvh lg:flex">
        <SideNav />

        <div className="flex-1 lg:min-w-0">
          {/* No celular a troca de papel fica no topo, onde o polegar alcança
              sem competir com a navegação de baixo. */}
          <div className="border-b border-border px-5 py-2.5 lg:hidden">
            <TrocaPapel />
          </div>

          <main className="mx-auto w-full max-w-6xl pb-28 lg:pb-12">{children}</main>
        </div>

        <BottomNav />
      </div>
    </PapelProvider>
  )
}
