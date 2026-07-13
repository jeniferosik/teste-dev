import { cn } from "@/lib/utils";
import type { CharacterStatus } from "@/types/character";

const STATUS_STYLES: Record<string, { dot: string; text: string; ring: string }> = {
  Alive: { dot: "bg-portal", text: "text-portal", ring: "ring-portal/40" },
  Dead: { dot: "bg-dead", text: "text-dead", ring: "ring-dead/40" },
  unknown: { dot: "bg-neutral-dim", text: "text-neutral-dim", ring: "ring-neutral-dim/40" },
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function StatusBadge({
  status,
  className,
}: {
  status: CharacterStatus | string
  className?: string
}) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.unknown

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-background/60 px-3 py-1 text-sm font-medium ring-1",
        style.text,
        style.ring,
        className,
      )}
    >
      <span className={cn("h-2.5 w-2.5 rounded-full", style.dot)} aria-hidden="true" />
      {capitalize(status)}
    </span>
  )
}