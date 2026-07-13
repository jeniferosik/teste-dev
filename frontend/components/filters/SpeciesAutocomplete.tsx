"use client"

import { KNOWN_SPECIES } from "@/constants/species"
import { useRef, useState } from "react"

// Combobox híbrido construído à mão: aceita digitação livre (backend faz
// busca parcial) e sugere espécies conhecidas — sem depender de <datalist>,
// que tem um comportamento inconsistente entre navegadores ao reabrir a
// lista depois de um valor já ter sido selecionado.
export function SpeciesAutocomplete({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = searchTerm.trim()
    ? KNOWN_SPECIES.filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    : KNOWN_SPECIES

  function selectSpecies(species: string) {
    onChange(species)
    setSearchTerm("")
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative flex flex-col gap-1.5">
      <label htmlFor="filter-species" className="text-xs font-semibold uppercase tracking-wide text-white">
        Espécie
      </label>
      <input
        ref={inputRef}
        id="filter-species"
        type="text"
        value={value}
        placeholder="Ex.: Human, Alien..."
        onChange={(e) => {
          onChange(e.target.value)
          setSearchTerm(e.target.value)
          setOpen(true)
        }}
        onFocus={() => {
          setSearchTerm("")
          setOpen(true)
        }}
        onClick={() => {
          setSearchTerm("")
          setOpen(true)
        }}
        onBlur={() => setOpen(false)}
        autoComplete="off"
        className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-portal focus:ring-2 focus:ring-portal/30"
      />

      {open && filtered.length > 0 && (
        <ul className="absolute top-full z-30 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-input bg-card p-1 shadow-lg">
          {filtered.map((species) => (
            <li key={species}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  selectSpecies(species)
                }}
                className="w-full rounded-md px-3 py-1.5 text-left text-sm text-foreground hover:bg-portal/15"
              >
                {species}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}