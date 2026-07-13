"use client"

import { X } from "lucide-react"

export function ClearFiltersButton({
  disabled,
  onClear,
}: {
  disabled?: boolean
  onClear: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClear}
      disabled={disabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm font-medium text-morty-hair transition-colors hover:border-dead/50 hover:text-dead disabled:cursor-not-allowed disabled:opacity-40"
    >
      <X className="h-4 w-4" aria-hidden="true" />
      Limpar filtros
    </button>
  )
}
