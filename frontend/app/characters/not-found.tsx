import { Container } from "@/components/layout/Container"
import { Header } from "@/components/layout/Header"
import Link from "next/link"

export default function CharactersNotFound() {
    return (
        <main className="min-h-screen">
            <Header />
            <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <h1 className="font-display text-3xl text-portal">
                    Essa dimensão não existe
                </h1>
                <p className="text-muted-foreground">
                    A página que você procura não foi encontrada em nenhum universo conhecido.
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