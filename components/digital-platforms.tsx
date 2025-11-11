"use client"

import { FileText, Download, FolderOpen, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function DigitalPlatforms() {
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

    const element = document.getElementById("estrados")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const platforms = [
    {
      icon: FileText,
      title: "Documentos Oficiales",
      description: "Visualiza y descarga actas, resoluciones y documentos oficiales del partido.",
      action: "Ver Documentos",
    },
    {
      icon: FolderOpen,
      title: "Archivo Digital",
      description: "Accede a nuestro archivo histórico de documentos y publicaciones.",
      action: "Explorar Archivo",
    },
    {
      icon: FileCheck,
      title: "Informes y Reportes",
      description: "Consulta informes financieros, de gestión y reportes de transparencia.",
      action: "Ver Informes",
    },
    {
      icon: Download,
      title: "Centro de Descargas",
      description: "Descarga formularios, plantillas y materiales de apoyo para afiliados.",
      action: "Ir a Descargas",
    },
  ]

  return (
    <section id="estrados" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Estrados <span className="text-primary">Digitales</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Accede, visualiza y descarga documentos oficiales del partido. Toda la información al alcance de un clic.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {platforms.map((platform, index) => {
            const Icon = platform.icon
            return (
              <div
                key={platform.title}
                className={`group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-8 transition-all duration-700 hover:border-primary hover:shadow-2xl hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{platform.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{platform.description}</p>
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
                  >
                    {platform.action}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
