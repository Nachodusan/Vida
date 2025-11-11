"use client"

import { Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Events() {
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

    const element = document.getElementById("eventos")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const events = [
    {
      title: "Asamblea General Ciudadana",
      date: "15 de Marzo, 2025",
      time: "18:00 hrs",
      location: "Centro Cívico Municipal",
      description: "Reunión abierta para discutir propuestas y escuchar a la comunidad.",
      type: "Evento",
    },
    {
      title: "Lanzamiento de Campaña Ambiental",
      date: "22 de Marzo, 2025",
      time: "10:00 hrs",
      location: "Parque Central",
      description: "Iniciativa de reforestación y limpieza comunitaria.",
      type: "Evento",
    },
    {
      title: "VIDA presenta nuevo plan de salud",
      date: "10 de Marzo, 2025",
      time: "",
      location: "",
      description: "Anunciamos propuestas innovadoras para mejorar el sistema de salud pública.",
      type: "Noticia",
    },
  ]

  return (
    <section id="eventos" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-black text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Eventos y <span className="text-primary">Noticias</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Mantente informado sobre nuestras actividades, eventos próximos y las últimas novedades del movimiento.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={`group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card transition-all duration-700 hover:border-primary hover:shadow-2xl hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {event.type}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">{event.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>
                {event.date && (
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                )}
                {event.type === "Evento" && (
                  <Button
                    size="sm"
                    className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    Confirmar Asistencia
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
