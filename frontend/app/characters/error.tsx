"use client"

import { Container } from "@/components/layout/Container"
import { Header } from "@/components/layout/Header"
import { useEffect } from "react"

export default function CharactersError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log local pro console do navegador — ajuda a depurar sem expor
        // detalhes internos na tela pro usuário final.
        console.error(error)
    }, [error])

    return (
        <main className="min-h-screen">
            <Header />
            <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <h1 className="font-display text-3xl text-dead">
                    O portal instabilizou
                </h1>
                <p className="max-w-md text-muted-foreground">
                    Algo deu errado ao tentar buscar os personagens. Pode ser uma
                    falha temporária de conexão com o multiverso.
                </p>
                <button
                    type="button"
                    onClick={() => reset()}
                    className="rounded-full bg-portal px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                    Tentar novamente
                </button>
            </Container>
        </main>
    )
}