export interface PaginationLinks {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
}

export interface PaginationMetaLink {
    url: string | null
    label: string
    page?: number | null
    active: boolean
}

export interface PaginationMeta {
    current_page: number
    last_page: number
    total: number
    per_page: number
    links: PaginationMetaLink[]
}
