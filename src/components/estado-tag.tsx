import { Check, Lock, MessageCircle, TriangleAlert } from "lucide-react"
import { rotuloEstado, type EstadoPedido } from "@/lib/mock"
import { cn } from "@/lib/utils"

const estilo: Record<EstadoPedido, string> = {
  combinando: "bg-muted text-muted-foreground",
  retido: "bg-sol/25 text-tinta",
  concluido: "bg-accent text-verde",
  disputa: "bg-destructive/10 text-destructive",
}

const icone: Record<EstadoPedido, typeof Lock> = {
  combinando: MessageCircle,
  retido: Lock,
  concluido: Check,
  disputa: TriangleAlert,
}

/** Etiqueta de estado do dinheiro, compartilhada entre Pedidos e o painel admin. */
export function EstadoTag({ estado }: { estado: EstadoPedido }) {
  const Icon = icone[estado]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        estilo[estado],
      )}
    >
      <Icon size={13} aria-hidden />
      {rotuloEstado[estado]}
    </span>
  )
}
