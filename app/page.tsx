import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Fondo oscuro decorativo */}
      <div className="fixed inset-0 pointer-events-none dark:bg-gradient-to-b dark:from-yellow-900/20 dark:via-orange-900/15 dark:to-yellow-900/20 z-[100] mix-blend-multiply" />

      {/* Eliminado el botón flotante ThemeToggle duplicado */}

      <Header />
      <main className="relative z-0">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
