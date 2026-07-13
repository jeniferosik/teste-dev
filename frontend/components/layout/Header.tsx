import { PORTAL_COLORS } from "@/constants/colors"
import Link from "next/link"
import { Container } from "./Container"

export function Header() {
  return (
    <header className="border-b border-cyan-accent/30 bg-card/40">
      <Container className="flex items-center gap-3 py-5">
        <Link href="/characters" className="flex items-center gap-3 group">
          <span
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-cyan-accent/70 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <span
              className="h-7 w-7 rounded-full"
              style={{
                background: `radial-gradient(circle at 40% 35%, ${PORTAL_COLORS.cream} 0%, ${PORTAL_COLORS.lemonLime} 30%, ${PORTAL_COLORS.jadeGreen} 60%, ${PORTAL_COLORS.forestGreen} 100%)`,
                boxShadow: "0 0 14px rgba(153,205,67,0.7)",
              }}
            />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl text-portal drop-shadow-[0_0_10px_rgba(153,205,67,0.35)]">
              The Multiverse Ledger
            </span>
            <span className="text-xs text-cyan-accent/80">Personagens de Rick and Morty</span>
          </div>
        </Link>
      </Container>
    </header>
  )
}