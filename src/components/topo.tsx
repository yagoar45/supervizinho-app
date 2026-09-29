import Link from "next/link"
import { ChevronLeft, MapPin } from "lucide-react"
import { usuario } from "@/lib/mock"

/**
 * Cabeçalho da Início: marca + onde a pessoa está, porque tudo aqui é relativo
 * à localização. Some em `lg`, onde a barra lateral já mostra as duas coisas.
 */
export function TopoMarca() {
  return (
    <header className="flex items-center justify-between px-5 pt-6 lg:hidden">
      <div>
        <p className="font-heading text-2xl font-extrabold leading-none">Vizinho</p>
        <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={13} aria-hidden />
          {usuario.cidade}, {usuario.uf}
        </p>
      </div>
      <Link
        href="/perfil"
        className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
      >
        Entrar
      </Link>
    </header>
  )
}

/** Cabeçalho das telas internas, com volta. */
export function TopoVoltar({ titulo, voltarPara }: { titulo: string; voltarPara: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-background/95 px-3 py-3 backdrop-blur lg:px-6 lg:py-5">
      <Link
        href={voltarPara}
        aria-label="Voltar"
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-muted"
      >
        <ChevronLeft size={20} aria-hidden />
      </Link>
      <h1 className="text-lg font-bold">{titulo}</h1>
    </header>
  )
}
