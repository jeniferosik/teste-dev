import { ApiError, apiGet } from "@/lib/api"
import { buildCharacterQuery } from "@/lib/queryParams"
import type { CharacterFilters, PaginatedResponse, SingleResponse } from "@/types/api"
import type { Character } from "@/types/character"

export async function getCharacters(
  filters: CharacterFilters,
  page: number,
): Promise<PaginatedResponse<Character>> {
  const query = buildCharacterQuery(filters, page)
  return apiGet<PaginatedResponse<Character>>(`/characters${query}`)
}

/**
 * Busca um personagem pelo api_id. Retorna null quando a API responde 404,
 * para a página poder chamar notFound().
 */
export async function getCharacter(id: string | number): Promise<Character | null> {
  try {
    const res = await apiGet<SingleResponse<Character>>(`/characters/${id}`)
    return res.data
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null
    }
    throw err
  }
}
