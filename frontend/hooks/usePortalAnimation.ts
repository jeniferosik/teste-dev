import { useCallback } from "react"

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

/**
 * Encapsula as chamadas de element.animate() da animação de "abrir portal".
 * Dispara 3 animações em paralelo (card encolhe, conteúdo some, burst expande)
 * e resolve a Promise quando o burst (a mais longa, 700ms) termina.
 */
export function usePortalAnimation() {
  const play = useCallback(
    (
      cardEl: HTMLElement | null,
      contentEl: HTMLElement | null,
      burstEl: HTMLElement | null,
    ): Promise<void> => {
      if (!cardEl || !burstEl || prefersReducedMotion()) {
        return Promise.resolve()
      }

      cardEl.animate(
        [
          { transform: "scale(1) rotate(0deg)", opacity: 1, filter: "blur(0px)" },
          { transform: "scale(0.2) rotate(180deg)", opacity: 0, filter: "blur(6px)" },
        ],
        { duration: 400, easing: "cubic-bezier(0.55,0.06,0.68,0.19)", fill: "forwards" },
      )

      const burstAnim = burstEl.animate(
        [
          { transform: "translate(-50%,-50%) scale(0)", opacity: 0, offset: 0 },
          { opacity: 0.95, offset: 0.4 },
          { transform: "translate(-50%,-50%) scale(6)", opacity: 0, offset: 1 },
        ],
        { duration: 700, easing: "cubic-bezier(0.2,0,0.3,1)", fill: "forwards" },
      )

      return burstAnim.finished.then(() => undefined).catch(() => undefined)
    },
    [],
  )

  return { play }
}
