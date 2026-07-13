import type { CharacterFilters } from "@/types/api"

// Única fonte que monta a query string a partir dos filtros + página.
export function buildCharacterQuery(filters: CharacterFilters, page?: number): string {
  const params = new URLSearchParams()

  const entries: [keyof CharacterFilters, string | undefined][] = [
    ["name", filters.name],
    ["species", filters.species],
    ["status", filters.status],
    ["gender", filters.gender],
    ["originLocation", filters.originLocation],
    ["currentLocation", filters.currentLocation],
  ]

  for (const [key, value] of entries) {
    if (value && value.trim() !== "") {
      params.set(key, value.trim())
    }
  }

  if (page && page > 1) {
    params.set("page", String(page))
  }

  const qs = params.toString()
  return qs ? `?${qs}` : ""
}

// Extrai os filtros a partir de um objeto de searchParams já resolvido.
export function parseFilters(searchParams: Record<string, string | string[] | undefined>): CharacterFilters {
  const get = (key: string): string | undefined => {
    const value = searchParams[key]
    return Array.isArray(value) ? value[0] : value
  }

  return {
    name: get("name"),
    species: get("species"),
    status: get("status"),
    gender: get("gender"),
    originLocation: get("originLocation"),
    currentLocation: get("currentLocation"),
  }
}

export function parsePage(searchParams: Record<string, string | string[] | undefined>): number {
  const raw = searchParams.page
  const value = Array.isArray(raw) ? raw[0] : raw
  const page = Number.parseInt(value ?? "1", 10)
  return Number.isNaN(page) || page < 1 ? 1 : page
}
