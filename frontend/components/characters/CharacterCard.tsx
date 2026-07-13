"use client"

import { StatusBadge } from "@/components/ui/StatusBadge"
import { PORTAL_COLORS } from "@/constants/colors"
import { usePortalAnimation } from "@/hooks/usePortalAnimation"
import type { Character } from "@/types/character"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

const BURST_GRADIENT = `radial-gradient(circle, ${PORTAL_COLORS.cream} 0%, ${PORTAL_COLORS.brightLemon} 8%, ${PORTAL_COLORS.lemonLime} 22%, ${PORTAL_COLORS.brightFern} 42%, ${PORTAL_COLORS.jadeGreen} 60%, ${PORTAL_COLORS.mediumJungle} 76%, ${PORTAL_COLORS.forestGreen} 92%, transparent 100%)`

export function CharacterCard({ character }: { character: Character }) {
  const router = useRouter()
  const { play } = usePortalAnimation()

  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const burstRef = useRef<HTMLSpanElement>(null)
  const [navigating, setNavigating] = useState(false)

  const href = `/characters/${character.api_id}`

  async function handleClick(e: React.MouseEvent) {
    // Deixa o usuário abrir em nova aba com ctrl/cmd/meio sem animação.
    if (e.metaKey || e.ctrlKey || e.button === 1) return
    e.preventDefault()
    if (navigating) return
    setNavigating(true)

    // Navega só depois que a animação do burst (a mais longa, 700ms) terminar.
    await play(cardRef.current, contentRef.current, burstRef.current)
    router.push(href)
  }

  return (
    <div
      ref={cardRef}
      className="relative h-full w-full"
      style={{ willChange: "transform, opacity" }}
    >
      <a
        href={href}
        onClick={handleClick}
        aria-label={`Abrir portal para ${character.name}`}
        className="portal-card group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-card ring-2 ring-transparent transition-all duration-300 hover:ring-portal hover:shadow-[0_0_28px_rgba(153,205,67,0.45)] focus-visible:outline-none focus-visible:ring-portal"
      >
        {/* Burst do portal — expande do centro pra fora, atrás do conteúdo */}
        <span
          ref={burstRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-20"
          style={{
            width: "125%",
            height: "125%",
            transform: "translate(-50%,-50%) scale(0)",
            opacity: 0,
            borderRadius: "50%",
            background: BURST_GRADIENT,
          }}
        />

        {/* Conteúdo do card (avatar + nome + infos) — some mais rápido (250ms) */}
        <div ref={contentRef} className="relative z-10 flex flex-col">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-2 p-3">
            <h3 className="font-display text-lg leading-tight text-morty-hair text-balance">
              {character.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={character.status} />
              <span className="text-xs text-muted-foreground">{character.species}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
