import type { Character } from "@/types/character"
import { BackButton } from "../ui/BackButton"
import { CharacterImage } from "./CharacterImage"
import { CharacterInfo } from "./CharacterInfo"

export function CharacterDetails({ character }: { character: Character }) {
  return (
    <div className="flex flex-col gap-8">
      <BackButton />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,300px)_1fr] md:items-start">
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
