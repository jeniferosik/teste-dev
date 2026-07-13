"use client"

import { KNOWN_SPECIES } from "@/constants/species"

// Combobox híbrido: sugere as espécies conhecidas via <datalist>,
// mas aceita digitação livre de qualquer texto (backend faz busca parcial).
export function SpeciesAutocomplete({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const listId = "species-suggestions"

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="filter-species" className="text-xs font-semibold uppercase tracking-wide text-cyan-accent/90">
        Espécie
      </label>
      <input
        id="filter-species"
        type="text"
        list={listId}
        value={value}
        placeholder="Ex.: Human, Alien..."
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-portal focus:ring-2 focus:ring-portal/30"
      />
      <datalist id={listId}>
        {KNOWN_SPECIES.map((species) => (
          <option key={species} value={species} />
        ))}
      </datalist>
    </div>
  )
}
