import { BadgeCheck, FileCheck2, MapPin, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Prestador } from "@/lib/mock"

export function Nota({ nota, avaliacoes }: { nota: number; avaliacoes?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <Star size={14} className="fill-sol text-sol" aria-hidden />
      <span className="font-semibold tabular-nums">{nota.toFixed(1)}</span>
      {avaliacoes !== undefined && (
        <span className="text-muted-foreground">({avaliacoes})</span>
      )}
    </span>
  )
}

export function Distancia({ km }: { km: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
      <MapPin size={13} aria-hidden />
      <span className="tabular-nums">
        {km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1).replace(".", ",")} km`}
      </span>
    </span>
  )
}

/**
 * Confiança é o que sustenta o pagamento retido, então a verificação é
 * explícita sobre o que foi checado — "documentos" e "identidade conferida"
 * dizem coisas diferentes e o contratante precisa saber qual das duas.
 */
export function SeloVerificacao({
  tipo,
  className,
}: {
  tipo: Prestador["verificacao"]
  className?: string
}) {
  if (tipo === "nenhuma") return null

  const verificada = tipo === "verificada"
  const Icon = verificada ? BadgeCheck : FileCheck2

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
        verificada ? "bg-accent text-verde" : "bg-muted text-muted-foreground",
        className,
      )}
    >
      <Icon size={13} aria-hidden />
      {verificada ? "Identidade conferida" : "Documentos enviados"}
    </span>
  )
}

export function AtendeHoje() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sol/20 px-2 py-0.5 text-xs font-semibold text-tinta">
      <span className="size-1.5 rounded-full bg-sol" aria-hidden />
      Atende hoje
    </span>
  )
}
