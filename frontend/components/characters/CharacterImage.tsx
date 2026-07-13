import { UI_COLORS } from "@/constants/colors";
import Image from "next/image";

export function CharacterImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative w-full rounded-3xl p-[3px] shadow-[0_0_40px_rgba(153,205,67,0.35)]"
      style={{
        background: `linear-gradient(135deg, ${UI_COLORS.rickShirt} 0%, ${UI_COLORS.portalLight} 35%, ${UI_COLORS.portalDark} 70%, ${UI_COLORS.cyanAccent} 100%)`,
      }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[calc(1.5rem-3px)] bg-card">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 420px"
          className="object-cover"
        />
      </div>
    </div>
  )
}