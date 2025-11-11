"use client"

import { DollarSign, PieChart, Receipt, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Financial() {
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

    const element = document.getElementById("financieros")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const financialInfo = [
    {
      icon: DollarSign,
      title: "Ingresos y Donaciones",
      description: "Registro detallado de todas las contribuciones recibidas.",
    },
    {
      icon: Receipt,
      title: "Gastos Operativos",
      description: "Desglose completo de gastos en campañas y operaciones.",
    },
    {
      icon: PieChart,
      title: "Distribución de Recursos",
      description: "Cómo se distribuyen los fondos en diferentes áreas.",
    },
    {
      icon: Shield,
      title: "Auditorías Externas",
      description: "Informes de auditorías independientes y certificaciones.",
    },
  ]

  return (
    <section id="financieros" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Financieros y <span className="text-primary">Fiscalización</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Accede a toda nuestra información financiera. Creemos en la transparencia total de nuestros recursos y su
            uso responsable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto mb-12">
          {financialInfo.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-8 transition-all duration-700 hover:border-primary hover:shadow-2xl hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-lg font-bold"
          >
            Ver Informes Financieros Completos
          </Button>
        </div>
      </div>
    </section>
  )
}
