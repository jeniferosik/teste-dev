"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
    const router = useRouter()
    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-portal bg-portal px-4 py-2 text-base font-medium text-white shadow-[0_0_16px_rgba(153,205,67,0.45)] transition-opacity hover:opacity-90"
        >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para listagem
        </button>
    )
}