import { Header } from "@/components/header"
import { Structure } from "@/components/structure"
import { Footer } from "@/components/footer"

export default function EstructuraPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Structure />
      </main>
      <Footer />
    </div>
  )
}
