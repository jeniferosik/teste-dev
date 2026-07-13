"use client"

import { SlidersHorizontal, X } from "lucide-react"
import { useEffect, useState } from "react"
import { FilterForm } from "./FilterForm"

const PANEL_TITLE = (
  <h2 className="font-display text-xl text-portal">Filtros</h2>
)

export function FilterSidebar() {
  const [open, setOpen] = useState(false)

  // Fecha com Esc e trava o scroll do body enquanto o drawer está aberto.
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      {/* Desktop: sidebar fixa lateral (esquerda) */}
      <aside className="hidden lg:block">
        <div className="sticky top-6 rounded-2xl border border-border bg-card/50 p-5">
          {PANEL_TITLE}
          <div className="mt-4">
            <FilterForm />
          </div>
        </div>
      </aside>

      {/* Mobile/tablet: botão que abre um drawer */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-portal/50 bg-card/60 px-4 py-2 text-sm font-semibold text-portal"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filtros
        </button>

        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Filtros"
              className="relative ml-auto flex h-full w-[85%] max-w-sm flex-col border-l border-border bg-card p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                {PANEL_TITLE}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar filtros"
                  className="rounded-full p-1.5 text-morty-hair transition-colors hover:bg-background/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 overflow-y-auto">
                <FilterForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}