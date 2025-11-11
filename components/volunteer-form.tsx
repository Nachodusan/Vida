"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    celular: "",
    email: "",
    area: "",
    otro: "",
    idAfiliacion: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        celular: "",
        email: "",
        area: "",
        otro: "",
        idAfiliacion: "",
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-xl shadow-lg p-8 border-2 border-border">
        <h2 className="text-2xl font-bold text-foreground mb-1">Registro para Voluntariado</h2>
        <p className="text-muted-foreground mb-8">Completa el formulario para unirte como voluntario en VIDA</p>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/50 border-2 border-green-500 dark:border-green-700 text-green-800 dark:text-green-300 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">¡Gracias por tu interés! Tu solicitud ha sido recibida correctamente.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b-2 border-primary">
              Datos Personales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nombre(s) *</label>
                <Input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Apellido Paterno *</label>
                <Input
                  type="text"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Apellido paterno"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Apellido Materno *</label>
                <Input
                  type="text"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Apellido materno"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Celular *</label>
                <Input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Tu celular"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico *</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b-2 border-primary">
              Área a Participar
            </h3>

            <label className="block text-sm font-medium text-foreground mb-3">Selecciona un área *</label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground transition-colors hover:border-primary/50"
            >
              <option value="">-- Selecciona una opción --</option>
              <option value="ir-a-campo">Ir a campo</option>
              <option value="afiliacion">Afiliación</option>
              <option value="eventos">Eventos</option>
              <option value="home-office">Home Office</option>
              <option value="llamadas-telefonicas">Llamadas Telefónicas</option>
              <option value="otro">Otro</option>
            </select>

            {formData.area === "otro" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Especifica el área de participación *
                </label>
                <Textarea
                  name="otro"
                  value={formData.otro}
                  onChange={handleChange}
                  required={formData.area === "otro"}
                  className="w-full"
                  placeholder="Cuéntanos en qué área deseas participar"
                  rows={3}
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b-2 border-primary">
              Información Adicional
            </h3>
            <label className="block text-sm font-medium text-foreground mb-2">ID Registro de Afiliación a Vida</label>
            <Input
              type="text"
              name="idAfiliacion"
              value={formData.idAfiliacion}
              onChange={handleChange}
              className="w-full"
              placeholder="Si tienes ID de afiliación, introdúcelo aquí"
            />
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Enviar Solicitud de Voluntariado
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
