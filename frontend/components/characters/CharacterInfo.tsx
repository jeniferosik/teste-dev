import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Character } from "@/types/character";
import type { ReactNode } from "react";

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0">
      <span className="text-sm font-medium uppercase tracking-wide text-white">{label}</span>
      <span className="text-right text-base font-medium text-morty-hair">{children}</span>
    </div>
  )
}

export function CharacterInfo({ character }: { character: Character }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
      <InfoRow label="Status">
        <StatusBadge status={character.status} />
      </InfoRow>
      <InfoRow label="Espécie">{capitalize(character.species || "unknown")}</InfoRow>
      <InfoRow label="Gênero">{capitalize(character.gender || "unknown")}</InfoRow>
      {character.type ? <InfoRow label="Tipo">{capitalize(character.type)}</InfoRow> : null}
      <InfoRow label="Origem">{capitalize(character.origin?.name || "unknown")}</InfoRow>
      <InfoRow label="Localização atual">{capitalize(character.current_location?.name || "unknown")}</InfoRow>
    </div>
  )
}