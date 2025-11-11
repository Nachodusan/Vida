import { Header } from "@/components/header"
import { Volunteers } from "@/components/volunteers"
import { Footer } from "@/components/footer"

export default function VoluntariosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Volunteers />
      </main>
      <Footer />
    </div>
  )
}
