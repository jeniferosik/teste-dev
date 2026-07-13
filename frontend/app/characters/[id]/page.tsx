import { CharacterDetails } from "@/components/characters/CharacterDetails"
import { Container } from "@/components/layout/Container"
import { Header } from "@/components/layout/Header"
import { getCharacter } from "@/services/characters"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const character = await getCharacter(id)
  return {
    title: character ? `${character.name} — Portal Browser` : "Personagem não encontrado",
  }
}

export default async function CharacterDetailPage({ params }: { params: Params }) {
  const { id } = await params
  const character = await getCharacter(id)

  if (!character) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Container className="py-8">
        <CharacterDetails character={character} />
      </Container>
    </main>
  )
}
