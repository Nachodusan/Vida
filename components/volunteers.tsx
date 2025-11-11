"use client"

import { Heart, Megaphone, Handshake, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Volunteers() {
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

    const element = document.getElementById("voluntarios")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const opportunities = [
    {
      icon: Megaphone,
      title: "Comunicación y Difusión",
      description: "Ayuda a difundir nuestro mensaje en redes sociales y medios.",
    },
    {
      icon: Handshake,
      title: "Trabajo Comunitario",
      description: "Participa en actividades de apoyo directo a la comunidad.",
    },
    {
      icon: BookOpen,
      title: "Educación Cívica",
      description: "Colabora en talleres y programas de formación ciudadana.",
    },
    {
      icon: Heart,
      title: "Eventos y Movilización",
      description: "Organiza y apoya en eventos, marchas y actividades del partido.",
    },
  ]

  return (
    <section id="voluntarios" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Sé <span className="text-primary">Voluntario</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Tu tiempo y talento pueden marcar la diferencia. Únete a nuestro equipo de voluntarios y contribuye al
            cambio que queremos ver.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon
            return (
              <div
                key={opportunity.title}
                className={`group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-6 transition-all duration-700 hover:border-primary hover:shadow-2xl hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative text-center">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{opportunity.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{opportunity.description}</p>
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
            Inscríbete como Voluntario
          </Button>
        </div>
      </div>
    </section>
  )
}
