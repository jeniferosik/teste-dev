"use client"

import { useState } from "react"

const MAX_RETRIES = 6

/**
 * Retry com backoff exponencial para imagens que falham com 429 (rate
 * limit da API externa) — mesmo princípio do delay incremental usado nos
 * Jobs de importação, no backend, só que agora do lado do navegador.
 */
export function useImageRetry(src: string) {
    const [attempt, setAttempt] = useState(0)
    const [failed, setFailed] = useState(false)

    function handleError() {
        if (attempt >= MAX_RETRIES) {
            setFailed(true)
            return
        }
        const delay = Math.min(400 * 2 ** attempt, 8000) // até 8s no teto, evita crescer sem limite
        setTimeout(() => setAttempt((a) => a + 1), delay)
    }

    const resolvedSrc = failed || !src ? "/placeholder.svg" : `${src}?retry=${attempt}`

    return { src: resolvedSrc, key: attempt, onError: handleError }
}