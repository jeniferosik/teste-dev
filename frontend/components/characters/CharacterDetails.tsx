import type { Character } from "@/types/character"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CharacterImage } from "./CharacterImage"
import { CharacterInfo } from "./CharacterInfo"

export function CharacterDetails({ character }: { character: Character }) {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/characters"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-accent/40 bg-card/50 px-4 py-2 text-sm font-medium text-cyan-accent transition-colors hover:bg-cyan-accent/10"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar para listagem
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-start">
        {/* Coluna esquerda: imagem com moldura */}
        <div className="w-full">
          <CharacterImage src={character.image} alt={character.name} />
        </div>

        {/* Coluna direita: nome + bloco de infos empilhadas */}
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-4xl text-portal drop-shadow-[0_0_16px_rgba(153,205,67,0.35)] text-balance sm:text-5xl">
            {character.name}
          </h1>
          <CharacterInfo character={character} />
        </div>
      </div>
    </div>
  )
}
