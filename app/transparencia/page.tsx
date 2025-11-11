import { Header } from "@/components/header"
import { Transparency } from "@/components/transparency"
import { Footer } from "@/components/footer"

export default function TransparenciaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Transparency />
      </main>
      <Footer />
    </div>
  )
}
