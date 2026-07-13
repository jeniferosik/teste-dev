import { CharacterGrid } from "@/components/characters/CharacterGrid"
import { FilterSidebar } from "@/components/filters/FilterSidebar"
import { Container } from "@/components/layout/Container"
import { Header } from "@/components/layout/Header"
import { Pagination } from "@/components/pagination/Pagination"
import { EmptyState } from "@/components/ui/EmptyState"
import { parseFilters, parsePage } from "@/lib/queryParams"
import { getCharacters } from "@/services/characters"
import { Suspense } from "react"

export const metadata = {
  title: "Personagens — The Multiverse Ledger",
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const resolved = await searchParams
  const filters = parseFilters(resolved)
  const page = parsePage(resolved)

  const { data: characters, meta } = await getCharacters(filters, page)

  return (
    <main className="min-h-screen">
      <Header />
      <Container className="py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar de filtros com Suspense por causa do useSearchParams */}
          <Suspense fallback={null}>
            <FilterSidebar />
          </Suspense>

          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="font-display text-[1.65rem] text-portal drop-shadow-[0_0_12px_rgba(153,205,67,0.3)]">
                Personagens
              </h1>
              <p className="text-sm text-muted-foreground">
                {meta.total} no multiverso
              </p>
            </div>

            {characters.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <CharacterGrid characters={characters} />
                <div className="pt-2">
                  <Pagination meta={meta} filters={filters} />
                </div>
              </>
            )}
          </section>
        </div>
      </Container>
    </main>
  )
}
