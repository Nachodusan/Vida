"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Target, Zap, Award, Handshake, Lightbulb, Globe } from "lucide-react"
import { useEffect, useState, useRef, useMemo } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTimelineItem, setActiveTimelineItem] = useState(0)
  const [timelineVisible, setTimelineVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const timelineRef = useRef(null)

  const backgroundImages = useMemo(
    () => [
      "/team-meeting-unity.jpg",
      "/community-event-gathering.jpg",
      "/political-rally-crowd.jpg",
      "/people-voting-democracy.jpg",
      "/social-movement-activists.jpg",
    ],
    [],
  )

  const timelineEvents = useMemo(
    () => [
      {
        year: "2018",
        title: "Fundación de VIDA",
        description: "Nace el movimiento político VIDA con la visión de transformar la comunidad",
        icon: Zap,
      },
      {
        year: "2019",
        title: "Primeras Iniciativas",
        description: "Lanzamos programas de educación y desarrollo comunitario en 5 municipios",
        icon: Lightbulb,
      },
      {
        year: "2020",
        title: "Primeras Victorias",
        description: "Alcanzamos nuestras primeras victorias electorales en municipios clave",
        icon: Award,
      },
      {
        year: "2021",
        title: "Expansión Regional",
        description: "VIDA llega a nuevas regiones con iniciativas de salud y empleo",
        icon: Globe,
      },
      {
        year: "2022",
        title: "Expansión Nacional",
        description: "VIDA se expande a más de 120 comunidades en todo el país",
        icon: Users,
      },
      {
        year: "2023",
        title: "Consolidación",
        description: "Consolidamos nuestras bases con programas de desarrollo sostenible",
        icon: Target,
      },
      {
        year: "2024",
        title: "Presente y Futuro",
        description: "Hoy somos 50,000+ miembros comprometidos con el cambio real",
        icon: Handshake,
      },
    ],
    [],
  )

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 10000)

    return () => clearInterval(imageInterval)
  }, [backgroundImages.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineVisible(true)
        } else {
          setTimelineVisible(false)
          setActiveTimelineItem(0)
        }
      },
      { threshold: 0.3 },
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current)
      }
    }
  }, [])

  useEffect(() => {
    let interval

    if (timelineVisible) {
      interval = setInterval(() => {
        setActiveTimelineItem((prev) => {
          if (prev + 1 >= timelineEvents.length) {
            return timelineEvents.length - 1
          }
          return prev + 1
        })
      }, 1200)
    }

    return () => {
      clearInterval(interval)
    }
  }, [timelineVisible, timelineEvents.length])

  return (
    <>
      {/* Main Hero Section */}
      <section
        id="inicio"
        className="relative bg-gradient-to-b from-blue-50 via-white to-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 md:py-20 lg:py-28 overflow-hidden"
      >
        <div className="absolute inset-0 -z-20">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>

        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-yellow-200 dark:bg-yellow-900/30 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full opacity-20 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className={`mb-6 text-balance text-5xl font-black tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                animation: isVisible ? "none" : undefined,
              }}
            >
              <span className="block">Construyamos juntos</span>
              <span className="block mt-2">
                una{" "}
                <span className="relative inline-block text-blue-600 dark:text-blue-400 px-2">
                  <span className="absolute inset-0 bg-yellow-300 dark:bg-yellow-600 rounded-lg -z-10 animate-pulse-glow" />
                  VIDA
                </span>
              </span>
              <span className="block mt-2">mejor</span>
            </h1>

            <p
              className={`mb-10 text-pretty text-lg font-medium text-gray-600 dark:text-gray-300 md:text-xl transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Un movimiento político comprometido con el bienestar, la justicia social y el desarrollo sostenible.
              Juntos podemos transformar nuestra comunidad.
            </p>

            <div
              className={`flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="group w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all text-lg font-bold sm:w-auto"
              >
                Únete al Movimiento
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400 shadow-lg hover:shadow-xl transition-all text-lg font-bold sm:w-auto"
              >
                Conoce Nuestras Propuestas
              </Button>
            </div>

            <div
              className={`mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 md:text-5xl">50K+</div>
                <div className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Miembros Activos</div>
              </div>
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 md:text-5xl">120+</div>
                <div className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Comunidades</div>
              </div>
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 md:text-5xl">100%</div>
                <div className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Compromiso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Mensaje */}
      <section className="py-12 md:py-18 bg-gradient-to-br from-blue-600 to-blue-700 dark:bg-gradient-to-br dark:from-blue-800 dark:to-blue-900">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl font-black text-white mb-4 md:text-5xl">Nuestro Mensaje</h2>
          <p className="text-center text-blue-50 dark:text-blue-100 text-lg mb-16 max-w-2xl mx-auto">
            Conoce más sobre nuestro movimiento VIDA a través de nuestros videos destacados
          </p>

          {/* Videos grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1 */}
            <div className="group rounded-2xl overflow-hidden border-2 border-blue-400 dark:border-blue-500 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 hover:scale-105">
              <div className="relative aspect-video bg-gray-300 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Video VIDA 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Nuestro Movimiento</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Conoce la historia y visión de VIDA</p>
              </div>
            </div>

            {/* Video 2 */}
            <div className="group rounded-2xl overflow-hidden border-2 border-blue-400 dark:border-blue-500 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 hover:scale-105">
              <div className="relative aspect-video bg-gray-300 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Video VIDA 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Propuestas Clave</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Descubre nuestras principales iniciativas
                </p>
              </div>
            </div>

            {/* Video 3 */}
            <div className="group rounded-2xl overflow-hidden border-2 border-blue-400 dark:border-blue-500 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 hover:scale-105">
              <div className="relative aspect-video bg-gray-300 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Video VIDA 3"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Testimonios</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Historias inspiradoras de nuestros miembros
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section
        ref={timelineRef}
        className="py-12 md:py-18 bg-gradient-to-b from-white to-blue-50 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl font-black text-gray-900 dark:text-white mb-4 md:text-5xl">
            Nuestra Historia
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
            El camino que hemos recorrido en el movimiento VIDA
          </p>

          {/* Timeline container */}
          <div className="max-w-5xl mx-auto">
            {/* Interactive timeline */}
            <div className="relative">
              {/* Animated line background */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-600 -translate-x-1/2">
                <div
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-yellow-400 to-yellow-500 dark:from-yellow-600 dark:to-yellow-700 transition-all duration-500 ease-out"
                  style={{
                    height: `${((activeTimelineItem + 1) / timelineEvents.length) * 100}%`,
                  }}
                />
              </div>

              {/* Timeline items */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => {
                  const IconComponent = event.icon
                  const isActive = index <= activeTimelineItem

                  return (
                    <div
                      key={index}
                      className={`relative transition-all duration-300 ${
                        index % 2 === 0 ? "pr-1/2 text-right md:pr-0" : "pl-1/2 text-left md:pl-0"
                      }`}
                    >
                      <div className={`${index % 2 === 0 ? "md:mr-1/2 md:pr-16" : "md:ml-1/2 md:pl-16"}`}>
                        <div
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 transform will-change-transform ${
                            isActive
                              ? "bg-blue-50 dark:bg-gray-800 border-blue-400 dark:border-blue-600 shadow-lg"
                              : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isActive
                                  ? "bg-blue-600 dark:bg-blue-500 text-white scale-110"
                                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div
                              className={`text-2xl font-black ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-500"}`}
                            >
                              {event.year}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                        </div>
                      </div>

                      {/* Timeline dot */}
                      <div
                        className={`absolute left-1/2 top-6 -translate-x-1/2 h-5 w-5 rounded-full border-4 transition-all duration-300 ${
                          isActive
                            ? "bg-yellow-400 dark:bg-yellow-600 border-yellow-300 dark:border-yellow-700 scale-150 shadow-lg shadow-yellow-400 dark:shadow-yellow-600"
                            : "bg-white dark:bg-gray-900 border-blue-300 dark:border-blue-700"
                        }`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
