import { SearchX } from "lucide-react"

export function EmptyState({
  title = "Nenhum resultado encontrado",
  description = "Nenhum personagem casa com esses filtros neste universo. Tente ajustar a busca.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card/40 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/60 ring-1 ring-cyan-accent/40">
        <SearchX className="h-8 w-8 text-cyan-accent" aria-hidden="true" />
      </span>
      <h2 className="font-display text-2xl text-portal">{title}</h2>
      <p className="max-w-md text-pretty text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
