"use client"

import { AlertTriangle } from "lucide-react"

export function ErrorState({
  title = "Algo deu errado no multiverso",
  description = "Não foi possível carregar os dados da API. Verifique se o backend está rodando e tente novamente.",
  onRetry,
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dead/40 bg-card/40 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/60 ring-1 ring-dead/50">
        <AlertTriangle className="h-8 w-8 text-dead" aria-hidden="true" />
      </span>
      <h2 className="font-display text-2xl text-dead">{title}</h2>
      <p className="max-w-md text-pretty text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-full bg-portal px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          Tentar de novo
        </button>
      )}
    </div>
  )
}
