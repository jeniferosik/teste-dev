import { PORTAL_COLORS } from "@/constants/colors"
import Link from "next/link"
import { Container } from "./Container"

export function Header() {
  return (
    <header className="border-b border-cyan-accent/30 bg-background">
      <Container className="flex items-center gap-3 py-5">
        <Link href="/characters" className="flex items-center gap-3 group">
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl text-portal drop-shadow-[0_0_10px_rgba(153,205,67,0.35)]">
              The Multiverse Ledger
            </span>
            <span className="text-xs text-cyan-accent/80">Personagens de Rick and Morty</span>
          </div>
        </Link>
      </Container>
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${PORTAL_COLORS.cream}, ${PORTAL_COLORS.brightLemon}, ${PORTAL_COLORS.lemonLime}, ${PORTAL_COLORS.brightFern}, ${PORTAL_COLORS.jadeGreen}, ${PORTAL_COLORS.forestGreen})`,
        }}
      />
    </header>
  )
}