export function PortalSpinner({ label = "Abrindo portal..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20" role="status" aria-live="polite">
      <div className="portal-spinner" />
      <p className="font-display text-lg text-portal">{label}</p>
      <span className="sr-only">{label}</span>
    </div>
  )
}
