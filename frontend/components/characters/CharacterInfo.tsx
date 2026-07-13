import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Character } from "@/types/character";
import type { ReactNode } from "react";

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium text-morty-hair">{children}</span>
    </div>
  )
}

// Bloco de atributos empilhados verticalmente, todas as linhas conectadas
// num único bloco visual (cantos arredondados só no topo e na base).
export function CharacterInfo({ character }: { character: Character }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
      <InfoRow label="Status">
        <StatusBadge status={character.status} />
      </InfoRow>
      <InfoRow label="Espécie">{character.species || "unknown"}</InfoRow>
      <InfoRow label="Gênero">{character.gender || "unknown"}</InfoRow>
      {character.type ? <InfoRow label="Tipo">{character.type}</InfoRow> : null}
      <InfoRow label="Origem">{character.origin?.name || "unknown"}</InfoRow>
      <InfoRow label="Localização atual">{character.current_location?.name || "unknown"}</InfoRow>
    </div>
  )
}
