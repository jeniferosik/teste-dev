"use client"

import { GENDER_OPTIONS } from "@/constants/gender"
import { STATUS_OPTIONS } from "@/constants/status"
import { useDebounce } from "@/hooks/useDebounce"
import { useFilters } from "@/hooks/useFilters"
import { buildCharacterQuery } from "@/lib/queryParams"
import type { CharacterFilters } from "@/types/api"
import { useEffect, useState } from "react"
import { ClearFiltersButton } from "./ClearFiltersButton"
import { FilterInput } from "./FilterInput"
import { FilterSelect } from "./FilterSelect"
import { SpeciesAutocomplete } from "./SpeciesAutocomplete"

export function FilterForm() {
  const { filters, applyFilters, clearFilters, hasActiveFilters } = useFilters()
  const [draft, setDraft] = useState<CharacterFilters>(filters)

  // Ressincroniza o rascunho quando a URL muda por fora (limpar, voltar/avançar).
  const filtersKey = buildCharacterQuery(filters, 1)
  useEffect(() => {
    setDraft(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey])

  // Filtros de texto: debounce de 400ms antes de atualizar a URL.
  const debouncedDraft = useDebounce(draft, 400)
  useEffect(() => {
    const nextQuery = buildCharacterQuery(debouncedDraft, 1)
    if (nextQuery !== filtersKey) {
      applyFilters(debouncedDraft)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDraft])

  const setText = (key: keyof CharacterFilters) => (value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }))

  // Dropdowns fixos: aplicam imediatamente (sem debounce).
  const setSelect = (key: keyof CharacterFilters) => (value: string) => {
    const next = { ...draft, [key]: value }
    setDraft(next)
    applyFilters(next)
  }

  const handleClear = () => {
    setDraft({})
    clearFilters()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <FilterInput
        id="filter-name"
        label="Nome"
        value={draft.name ?? ""}
        placeholder="Ex.: Rick, Morty..."
        onChange={setText("name")}
      />

      <SpeciesAutocomplete value={draft.species ?? ""} onChange={setText("species")} />

      <FilterSelect
        id="filter-status"
        label="Status"
        value={draft.status ?? ""}
        options={STATUS_OPTIONS}
        onChange={setSelect("status")}
      />

      <FilterSelect
        id="filter-gender"
        label="Gênero"
        value={draft.gender ?? ""}
        options={GENDER_OPTIONS}
        onChange={setSelect("gender")}
      />

      <FilterInput
        id="filter-origin"
        label="Origem"
        value={draft.originLocation ?? ""}
        placeholder="Ex.: Earth..."
        onChange={setText("originLocation")}
      />

      <FilterInput
        id="filter-current"
        label="Localização atual"
        value={draft.currentLocation ?? ""}
        placeholder="Ex.: Citadel..."
        onChange={setText("currentLocation")}
      />

      <ClearFiltersButton disabled={!hasActiveFilters} onClear={handleClear} />
    </form>
  )
}
