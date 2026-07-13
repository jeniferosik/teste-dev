import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ReactNode } from "react"

export function PaginationItem({
  href,
  active,
  disabled,
  ariaLabel,
  children,
}: {
  href?: string
  active?: boolean
  disabled?: boolean
  ariaLabel?: string
  children: ReactNode
}) {
  const base =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors"

  if (disabled || !href) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, "cursor-not-allowed border-border bg-background/30 text-muted-foreground/50")}
      >
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={cn(
        base,
        active
          ? "border-portal bg-portal text-primary-foreground shadow-[0_0_16px_rgba(153,205,67,0.45)]"
          : "border-border bg-card/50 text-morty-hair hover:border-portal/60 hover:text-portal",
      )}
    >
      {children}
    </Link>
  )
}
