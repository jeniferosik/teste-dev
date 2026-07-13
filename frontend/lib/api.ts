// Cliente HTTP puro — sem regra de negócio.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = "ApiError"
  }
}

/**
 * GET genérico. `path` já pode conter a query string (ex.: "/characters?page=2").
 * Não define `cache` explicitamente: como as páginas dependem de searchParams/params
 * dinâmicos (filtros, página, id), o Next.js já trata essas rotas como dinâmicas por
 * padrão — buscando dado fresco a cada requisição, que é o comportamento desejado aqui.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  let res: Response
  try {
    res = await fetch(url)
  } catch (err) {
    throw new ApiError(0, `Não foi possível conectar à API (${url}). ${(err as Error).message}`)
  }

  if (!res.ok) {
    let message = `Erro ${res.status} ao buscar ${url}`
    try {
      const body = (await res.json()) as { message?: string }
      if (body?.message) message = body.message
    } catch {
      // corpo não-JSON — mantém a mensagem padrão
    }
    throw new ApiError(res.status, message)
  }

  return (await res.json()) as T
}
