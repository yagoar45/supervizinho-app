"use client"

import { useCallback, useSyncExternalStore } from "react"
import { useRouter } from "next/navigation"
import { Briefcase, ShieldHalf, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

export type Papel = "contratante" | "prestador" | "admin"

export const papeis: {
  id: Papel
  rotulo: string
  descricao: string
  inicio: string
  icon: typeof ShoppingBag
}[] = [
  {
    id: "contratante",
    rotulo: "Contratante",
    descricao: "quem precisa de um serviço",
    inicio: "/",
    icon: ShoppingBag,
  },
  {
    id: "prestador",
    rotulo: "Prestador",
    descricao: "quem faz e recebe pedidos",
    inicio: "/prestador",
    icon: Briefcase,
  },
  {
    id: "admin",
    rotulo: "Admin",
    descricao: "quem opera a plataforma",
    inicio: "/admin",
    icon: ShieldHalf,
  },
]

const CHAVE = "vizinho:papel"
const PADRAO: Papel = "contratante"

function ehPapel(v: string | null): v is Papel {
  return papeis.some((p) => p.id === v)
}

/**
 * O papel escolhido vive no localStorage, não em estado React — assim ele
 * sobrevive ao recarregar no meio da apresentação.
 *
 * Lido via `useSyncExternalStore` em vez de um efeito que chama setState:
 * o servidor renderiza sempre "contratante" e o cliente assume o valor salvo
 * sem passo intermediário. getSnapshot devolve string, que compara por valor,
 * então não há laço de re-render.
 */
const ouvintes = new Set<() => void>()

function inscrever(aoMudar: () => void) {
  ouvintes.add(aoMudar)
  window.addEventListener("storage", aoMudar)
  return () => {
    ouvintes.delete(aoMudar)
    window.removeEventListener("storage", aoMudar)
  }
}

function lerCliente(): Papel {
  const salvo = window.localStorage.getItem(CHAVE)
  return ehPapel(salvo) ? salvo : PADRAO
}

function lerServidor(): Papel {
  return PADRAO
}

export function usePapel() {
  const papel = useSyncExternalStore(inscrever, lerCliente, lerServidor)
  const router = useRouter()

  const trocar = useCallback(
    (novo: Papel) => {
      window.localStorage.setItem(CHAVE, novo)
      ouvintes.forEach((avisar) => avisar())
      router.push(papeis.find((p) => p.id === novo)!.inicio)
    },
    [router],
  )

  return { papel, trocar }
}

/** Mantido para que o layout não precise saber como o papel é guardado. */
export function PapelProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

/**
 * Seletor entre as três interfaces do produto.
 *
 * Vertical na barra lateral e horizontal no topo do celular: "Contratante" é
 * palavra longa, e três delas lado a lado em 224 px de barra ficam desiguais.
 * Na coluna cada opção ganha a linha inteira e ainda cabe a descrição.
 */
export function TrocaPapel({
  orientacao = "horizontal",
}: {
  orientacao?: "horizontal" | "vertical"
}) {
  const { papel, trocar } = usePapel()
  const vertical = orientacao === "vertical"

  return (
    <div role="group" aria-label="Trocar interface">
      {vertical && (
        <p className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
          Ver como
        </p>
      )}

      <div
        className={cn(
          "gap-1 rounded-2xl bg-muted p-1",
          vertical ? "flex flex-col" : "flex rounded-full",
        )}
      >
        {papeis.map((p) => {
          const Icon = p.icon
          const ativo = papel === p.id

          return (
            <button
              key={p.id}
              onClick={() => trocar(p.id)}
              aria-pressed={ativo}
              title={p.descricao}
              className={cn(
                "flex items-center gap-2 font-bold transition-colors",
                vertical
                  ? "rounded-xl px-2.5 py-2 text-left text-sm"
                  : "flex-1 justify-center rounded-full py-1.5 text-xs",
                ativo
                  ? "bg-card text-tinta shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon size={vertical ? 16 : 14} className="shrink-0" aria-hidden />
              <span className={cn(vertical && "min-w-0 flex-1 truncate")}>
                {p.rotulo}
              </span>
              {vertical && ativo && (
                <span className="size-1.5 shrink-0 rounded-full bg-verde" aria-hidden />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
