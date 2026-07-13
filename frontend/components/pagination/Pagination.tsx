import { buildCharacterQuery } from "@/lib/queryParams"
import type { CharacterFilters } from "@/types/api"
import type { PaginationMeta } from "@/types/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PaginationItem } from "./PaginationItem"

// Gera hrefs preservando os filtros atuais (compartilháveis via URL).
export function Pagination({
  meta,
  filters,
}: {
  meta: PaginationMeta
  filters: CharacterFilters
}) {
  const { current_page, last_page } = meta
  if (last_page <= 1) return null

  const hrefFor = (page: number) => `/characters${buildCharacterQuery(filters, page)}`

  // Janela de páginas ao redor da atual, com "..." e sempre primeira/última.
  const pages = buildPageWindow(current_page, last_page)

  return (
    <nav aria-label="Paginação" className="flex flex-wrap items-center justify-center gap-2">
      <PaginationItem
        href={current_page > 1 ? hrefFor(current_page - 1) : undefined}
        disabled={current_page <= 1}
        ariaLabel="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </PaginationItem>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`gap-${i}`} className="px-1 text-muted-foreground" aria-hidden="true">
            ...
          </span>
        ) : (
          <PaginationItem
            key={page}
            href={hrefFor(page)}
            active={page === current_page}
            ariaLabel={`Página ${page}`}
          >
            {page}
          </PaginationItem>
        ),
      )}

      <PaginationItem
        href={current_page < last_page ? hrefFor(current_page + 1) : undefined}
        disabled={current_page >= last_page}
        ariaLabel="Próxima página"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </PaginationItem>
    </nav>
  )
}

function buildPageWindow(current: number, last: number): (number | "...")[] {
  const delta = 1
  const range: (number | "...")[] = []
  const left = Math.max(2, current - delta)
  const right = Math.min(last - 1, current + delta)

  range.push(1)
  if (left > 2) range.push("...")
  for (let i = left; i <= right; i++) range.push(i)
  if (right < last - 1) range.push("...")
  if (last > 1) range.push(last)

  return range
}
