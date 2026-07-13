export default function CharacterDetailLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="portal-spinner-delayed" aria-label="Carregando personagem" role="status" />
        </div>
    )
}