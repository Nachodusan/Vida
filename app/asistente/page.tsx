import AssistantWidget from "@/components/assistant"

export default function AsistentePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Asistente Virtual</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Usa el botón flotante en la esquina inferior derecha para abrir el chat.
        </p>
        <AssistantWidget />
      </div>
    </div>
  )
}