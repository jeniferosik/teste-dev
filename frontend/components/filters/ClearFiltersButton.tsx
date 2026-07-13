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
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-0 bg-[#99CD43] px-3 py-2 text-sm font-semibold text-[#13163F] transition-colors hover:bg-[#a8dd5c] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <X className="h-4 w-4" aria-hidden="true" />
      Limpar filtros
    </button>
  )
}
