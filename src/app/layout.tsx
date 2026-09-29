import type { Metadata } from "next"
import { Bricolage_Grotesque, Figtree } from "next/font/google"
import { AppShell } from "@/components/app-shell"
import "./globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["600", "700", "800"],
})

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Vizinho — você sabe fazer, alguém precisa",
  description:
    "O jeito direto de achar quem resolve perto de você, em Betim. Sem intermediário, sem espera.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
