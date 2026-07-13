export default function CharactersLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="portal-spinner-delayed" aria-label="Carregando personagens" role="status" />
        </div>
    )
}