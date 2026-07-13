import { buildCharacterQuery } from "@/lib/queryParams"
import type { CharacterFilters } from "@/types/api"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

const FILTER_KEYS: (keyof CharacterFilters)[] = [
  "name",
  "species",
  "status",
  "gender",
  "originLocation",
  "currentLocation",
]

// Estado dos filtros derivado da URL + funções para sincronizar de volta na URL.
export function useFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo<CharacterFilters>(() => {
    const result: CharacterFilters = {}
    for (const key of FILTER_KEYS) {
      const value = searchParams.get(key)
      if (value) result[key] = value
    }
    return result
  }, [searchParams])

  // Aplica novos filtros na URL, sempre resetando para a página 1.
  // Usa replace (não push) para não poluir o histórico com um passo por filtro alterado.
  const applyFilters = useCallback(
    (next: CharacterFilters) => {
      const query = buildCharacterQuery(next, 1)
      router.replace(`${pathname}${query}`, { scroll: false })
    },
    [router, pathname],
  )

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [router, pathname])

  const hasActiveFilters = useMemo(
    () => FILTER_KEYS.some((key) => Boolean(filters[key])),
    [filters],
  )

  return { filters, applyFilters, clearFilters, hasActiveFilters }
}
