import {
  BadgeDollarSign,
  ClipboardList,
  Home,
  LayoutDashboard,
  Search,
  ShieldAlert,
  User,
  Wrench,
} from "lucide-react"
import type { Papel } from "@/components/papel"

export type ItemNav = {
  href: string
  label: string
  icon: typeof Home
}

/** Cada papel tem sua própria navegação — só rotas que existem de verdade. */
export const navPorPapel: Record<Papel, ItemNav[]> = {
  contratante: [
    { href: "/", label: "Início", icon: Home },
    { href: "/buscar", label: "Buscar", icon: Search },
    { href: "/pedidos", label: "Pedidos", icon: ClipboardList },
    { href: "/perfil", label: "Perfil", icon: User },
  ],
  prestador: [
    { href: "/prestador", label: "Painel", icon: LayoutDashboard },
    { href: "/buscar", label: "Oportunidades", icon: Search },
    { href: "/cadastrar", label: "Habilidades", icon: Wrench },
    { href: "/perfil", label: "Perfil", icon: User },
  ],
  admin: [
    { href: "/admin", label: "Painel", icon: LayoutDashboard },
    { href: "/admin/transacoes", label: "Transações", icon: BadgeDollarSign },
    { href: "/admin/disputas", label: "Disputas", icon: ShieldAlert },
  ],
}
