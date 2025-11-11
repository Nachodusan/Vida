"use client"

import { Heart, Users, Target, Lightbulb } from "lucide-react"
import { useEffect, useState } from "react"

export function About() {
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

    const element = document.getElementById("acerca")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: Heart,
      title: "Compromiso Social",
      description: "Trabajamos por el bienestar de todas las personas, sin distinción.",
    },
    {
      icon: Users,
      title: "Inclusión",
      description: "Creemos en una sociedad donde todos tengan voz y oportunidades.",
    },
    {
      icon: Target,
      title: "Transparencia",
      description: "Rendimos cuentas claras y honestas a la ciudadanía.",
    },
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "Buscamos soluciones creativas para los desafíos actuales.",
    },
  ]

  return (
    <section id="acerca" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Acerca de <span className="text-primary">VIDA</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Somos un movimiento político comprometido con la transformación social, el desarrollo sostenible y la
            justicia para todos. Nuestro objetivo es construir una sociedad más equitativa, próspera y solidaria.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className={`group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-6 transition-all duration-700 hover:border-primary hover:shadow-2xl hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
