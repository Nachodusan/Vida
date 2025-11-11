"use client"

import { VolunteerForm } from "./volunteer-form"

export function Volunteer() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">¡Sé Parte del Cambio!</h1>
            <p className="text-lg text-muted-foreground">
              Únete a nosotros como voluntario y ayuda a construir un movimiento por el cambio en nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <VolunteerForm />
      </section>
    </div>
  )
}
