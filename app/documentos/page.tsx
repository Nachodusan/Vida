import { Header } from "@/components/header"
import { Documents } from "@/components/documents"
import { Footer } from "@/components/footer"

export default function DocumentosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Documents />
      </main>
      <Footer />
    </div>
  )
}
