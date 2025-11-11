import { Header } from "@/components/header"
import { DigitalPlatforms } from "@/components/digital-platforms"
import { Footer } from "@/components/footer"

export default function EstradosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <DigitalPlatforms />
      </main>
      <Footer />
    </div>
  )
}
