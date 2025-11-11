"use client"

import { Building2, Users2, Award, Briefcase } from "lucide-react"
import { useEffect, useState } from "react"

export function Structure() {
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

    const element = document.getElementById("estructura")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const structure = [
    {
      icon: Award,
      title: "Dirección Nacional",
      description: "Órgano máximo de dirección política y estratégica del partido.",
      members: "15 miembros",
    },
    {
      icon: Building2,
      title: "Comités Regionales",
      description: "Representación y coordinación en cada región del país.",
      members: "120+ comités",
    },
    {
      icon: Users2,
      title: "Asambleas Locales",
      description: "Espacios de participación ciudadana en comunidades.",
      members: "500+ asambleas",
    },
    {
      icon: Briefcase,
      title: "Comisiones Temáticas",
      description: "Grupos especializados en áreas como salud, educación, economía.",
      members: "12 comisiones",
    },
  ]

  return (
    <section id="estructura" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Nuestra <span className="text-primary">Estructura</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Una organización democrática y participativa que garantiza la representación de todos los sectores.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {structure.map((item, index) => {
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
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                    {item.members}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
