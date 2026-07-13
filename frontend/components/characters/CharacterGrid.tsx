import type { Character } from "@/types/character"
import { CharacterCard } from "./CharacterCard"

export function CharacterGrid({ characters }: { characters: Character[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {characters.map((character) => (
        <li key={character.api_id} className="min-h-full">
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  )
}
