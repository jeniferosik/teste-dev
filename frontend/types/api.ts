import type { PaginationLinks, PaginationMeta } from "./pagination"

export interface PaginatedResponse<T> {
    data: T[]
    links: PaginationLinks
    meta: PaginationMeta
}

export interface SingleResponse<T> {
    data: T
}

export interface CharacterFilters {
    name?: string
    species?: string
    status?: string
    gender?: string
    originLocation?: string
    currentLocation?: string
}
