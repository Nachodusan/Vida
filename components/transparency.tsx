"use client"

import { Eye, FileCheck, Users, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export function Transparency() {
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

    const element = document.getElementById("transparencia")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const metrics = [
    {
      icon: Eye,
      value: "100%",
      label: "Transparencia en Gastos",
      description: "Todos nuestros gastos son públicos y auditables.",
    },
    {
      icon: FileCheck,
      value: "24",
      label: "Informes Publicados",
      description: "Reportes mensuales de actividades y finanzas.",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Ciudadanos Informados",
      description: "Personas que acceden a nuestra información.",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Confianza Ciudadana",
      description: "Índice de confianza según encuestas.",
    },
  ]

  return (
    <section id="transparencia" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-primary">Transparencia</span> Total
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Creemos en la rendición de cuentas clara y honesta. Toda nuestra información financiera y administrativa
            está disponible para la ciudadanía.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.label}
                className={`group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-6 text-center transition-all duration-700 hover:border-primary hover:shadow-2xl hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="text-4xl font-black text-primary mb-2">{metric.value}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{metric.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
