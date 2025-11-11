import { Header } from "@/components/header"
import { Events } from "@/components/events"
import { Footer } from "@/components/footer"

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Events />
      </main>
      <Footer />
    </div>
  )
}
