import { Header } from "@/components/header"
import { Financial } from "@/components/financial"
import { Footer } from "@/components/footer"

export default function FinancierosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Financial />
      </main>
      <Footer />
    </div>
  )
}
