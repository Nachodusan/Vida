import { Header } from "@/components/header"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"

export default function AcercaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  )
}
