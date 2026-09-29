import { notFound } from "next/navigation"
import { TopoVoltar } from "@/components/topo"
import { Escrow } from "@/components/escrow"
import { acharPrestador, prestadores } from "@/lib/mock"

export function generateStaticParams() {
  return prestadores.map((p) => ({ id: p.id }))
}

export default async function Contratar({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const p = acharPrestador(id)
  if (!p) notFound()

  return (
    <div className="pb-6 lg:mx-auto lg:max-w-3xl">
      <TopoVoltar titulo="Contratar" voltarPara={`/profissional/${p.id}`} />
      <Escrow p={p} />
    </div>
  )
}
