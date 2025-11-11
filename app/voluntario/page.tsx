import { Header } from "@/components/header"
import { Volunteer } from "@/components/volunteer"
import { Footer } from "@/components/footer"

export default function VoluntariPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Volunteer />
      </main>
      <Footer />
    </div>
  )
}
