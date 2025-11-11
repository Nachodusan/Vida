"use client"

import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Documents() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("documentos")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const documents = [
    {
      title: "Estatutos del Partido",
      description: "Documento fundacional que establece la estructura y principios de VIDA.",
      date: "Actualizado: Enero 2025",
    },
    {
      title: "Plan de Gobierno",
      description: "Propuestas detalladas para transformar nuestra sociedad.",
      date: "Versión 2025-2029",
    },
    {
      title: "Código de Ética",
      description: "Principios y valores que guían nuestro actuar político.",
      date: "Vigente desde 2024",
    },
    {
      title: "Reglamento Interno",
      description: "Normas de funcionamiento y organización del partido.",
      date: "Última revisión: Diciembre 2024",
    },
  ]

  return (
    <section id="documentos" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Documentos <span className="text-primary">Básicos</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Accede a nuestros documentos oficiales y conoce en detalle nuestra estructura, propuestas y principios.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {documents.map((doc, index) => (
            <div
              key={doc.title}
              className={`group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-6 transition-all duration-700 hover:border-primary hover:shadow-2xl hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{doc.title}</h3>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{doc.description}</p>
                  <p className="text-sm text-muted-foreground/70 mb-4">{doc.date}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
