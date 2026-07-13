import type { CharacterLocation } from "./location"

export type CharacterStatus = "Alive" | "Dead" | "unknown"
export type CharacterGender = "Male" | "Female" | "Genderless" | "unknown"

export interface Episode {
    api_id: number
    url: string
}

export interface Character {
    api_id: number
    name: string
    status: CharacterStatus
    type: string
    species: string
    gender: CharacterGender
    image: string
    origin: CharacterLocation
    current_location: CharacterLocation
    episodes?: Episode[]
}