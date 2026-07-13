"use client"

import type { Option } from "@/types/option"

// Genérico — usado por status e gênero (dropdown fixo, sem debounce).
export function FilterSelect({
  id,
  label,
  value,
  options,
  placeholder = "Todos",
  onChange,
}: {
  id: string
  label: string
  value: string
  options: Option[]
  placeholder?: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-cyan-accent/90">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-portal focus:ring-2 focus:ring-portal/30"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
