import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import AffiliateForm from "@/components/affiliate"

export const metadata: Metadata = {
  title: "Afíliate | VIDA NL",
  description: "Formulario de afiliación al partido VIDA en Nuevo León.",
}

export default function AfiliatePage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Fondo oscuro decorativo (igual que en Home) */}
      <div className="fixed inset-0 pointer-events-none dark:bg-gradient-to-b dark:from-yellow-900/20 dark:via-orange-900/15 dark:to-yellow-900/20 z-[100] mix-blend-multiply" />

      <Header />
      <main className="relative z-0">
        <section className="min-h-[calc(100vh-120px)] bg-background py-10 md:py-16">
          <div className="container mx-auto px-4">
            <AffiliateForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

