import { Container } from "@/components/layout/Container"
import { Header } from "@/components/layout/Header"
import Link from "next/link"

export default function CharacterNotFound() {
    return (
        <main className="min-h-screen">
            <Header />
            <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <h1 className="font-display text-3xl text-portal">
                    Esse personagem não existe nesse universo
                </h1>
                <p className="text-muted-foreground">
                    Talvez ele tenha sido apagado numa fusão de linhas temporais.
                </p>
                <Link
                    href="/characters"
                    className="rounded-full bg-portal px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                    Voltar para a listagem
                </Link>
            </Container>
        </main>
    )
}