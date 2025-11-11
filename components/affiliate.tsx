"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Send } from "lucide-react"

type FormData = {
  // Datos personales
  nombre: string
  apellidos: string
  fechaNacimiento: string // YYYY-MM-DD
  curp?: string
  ocupacion?: string

  // Contacto
  telefono: string
  email: string

  // Domicilio
  calle: string
  numero: string
  colonia: string
  cp: string
  municipio: string
  estado: string

  // INE (opcional pero útil)
  seccion?: string

  // Observaciones
  comentarios?: string

  // Consentimientos
  aceptaAviso: boolean
  confirmaVeracidad: boolean
}

const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/i
const emailRegex = /^\S+@\S+\.\S+$/
const telRegex = /^\+?\d{10,15}$/
const cpRegex = /^\d{5}$/

export default function AffiliateForm() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    curp: "",
    ocupacion: "",
    telefono: "",
    email: "",
    calle: "",
    numero: "",
    colonia: "",
    cp: "",
    municipio: "",
    estado: "Nuevo León",
    seccion: "",
    comentarios: "",
    aceptaAviso: false,
    confirmaVeracidad: false,
  })
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const validate = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio."
    if (!form.apellidos.trim()) return "Los apellidos son obligatorios."
    if (!form.fechaNacimiento) return "La fecha de nacimiento es obligatoria."
    if (!telRegex.test(form.telefono.replace(/\s|-/g, "")))
      return "Ingresa un teléfono válido (10–15 dígitos)."
    if (!emailRegex.test(form.email)) return "Ingresa un correo válido."
    if (!form.calle.trim()) return "La calle es obligatoria."
    if (!form.numero.trim()) return "El número es obligatorio."
    if (!form.colonia.trim()) return "La colonia es obligatoria."
    if (!cpRegex.test(form.cp)) return "El código postal debe tener 5 dígitos."
    if (!form.municipio.trim()) return "El municipio es obligatorio."
    if (!form.estado.trim()) return "El estado es obligatorio."
    if (form.curp && !curpRegex.test(form.curp.trim())) return "La CURP no parece válida."
    if (form.seccion && !/^\d{1,4}$/.test(form.seccion)) return "La sección debe ser numérica."
    if (!form.aceptaAviso) return "Debes aceptar el aviso de privacidad."
    if (!form.confirmaVeracidad) return "Debes confirmar que la información es veraz."
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOk(null)
    setError(null)

    const v = validate()
    if (v) return setError(v)

    setLoading(true)
    try {
      const res = await fetch("/api/afiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("No se pudo enviar el formulario.")
      setOk("¡Gracias! Tu solicitud de afiliación fue recibida. Te contactaremos pronto.")
      setForm({
        nombre: "",
        apellidos: "",
        fechaNacimiento: "",
        curp: "",
        ocupacion: "",
        telefono: "",
        email: "",
        calle: "",
        numero: "",
        colonia: "",
        cp: "",
        municipio: "",
        estado: "Nuevo León",
        seccion: "",
        comentarios: "",
        aceptaAviso: false,
        confirmaVeracidad: false,
      })
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al enviar tus datos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl border bg-[color:var(--background)] shadow-xl p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Formulario de <span className="text-primary">Afiliación</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Completa tus datos para afiliarte a VIDA. Los campos marcados con * son obligatorios.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-7">
          {/* Datos personales */}
          <fieldset className="space-y-4">
            <legend className="font-semibold">Datos personales</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="nombre" placeholder="Nombre(s) *" value={form.nombre} onChange={onChange} required />
              <Input name="apellidos" placeholder="Apellidos *" value={form.apellidos} onChange={onChange} required />
              <Input
                type="date"
                name="fechaNacimiento"
                placeholder="Fecha de nacimiento *"
                value={form.fechaNacimiento}
                onChange={onChange}
                required
              />
              <Input name="curp" placeholder="CURP (opcional)" value={form.curp} onChange={onChange} />
              <Input name="ocupacion" placeholder="Ocupación (opcional)" value={form.ocupacion} onChange={onChange} />
            </div>
          </fieldset>

          {/* Contacto */}
          <fieldset className="space-y-4">
            <legend className="font-semibold">Contacto</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="telefono"
                placeholder="Teléfono (10–15 dígitos) *"
                value={form.telefono}
                onChange={onChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Correo electrónico *"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
          </fieldset>

          {/* Domicilio */}
          <fieldset className="space-y-4">
            <legend className="font-semibold">Domicilio</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="calle" placeholder="Calle *" value={form.calle} onChange={onChange} required />
              <Input name="numero" placeholder="Número *" value={form.numero} onChange={onChange} required />
              <Input name="colonia" placeholder="Colonia *" value={form.colonia} onChange={onChange} required />
              <Input name="cp" placeholder="C.P. (5 dígitos) *" value={form.cp} onChange={onChange} required />
              <Input name="municipio" placeholder="Municipio *" value={form.municipio} onChange={onChange} required />
              <Input name="estado" placeholder="Estado *" value={form.estado} onChange={onChange} required />
              <Input name="seccion" placeholder="Sección INE (opcional)" value={form.seccion} onChange={onChange} />
            </div>
          </fieldset>

          {/* Comentarios */}
          <fieldset className="space-y-4">
            <legend className="font-semibold">Comentarios</legend>
            <Textarea
              name="comentarios"
              placeholder="Información adicional (opcional)"
              rows={4}
              value={form.comentarios}
              onChange={onChange}
            />
          </fieldset>

          {/* Consentimientos */}
          <div className="space-y-3 text-sm">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="aceptaAviso"
                checked={form.aceptaAviso}
                onChange={onChange}
                className="mt-1"
              />
              <span>
                Acepto el{" "}
                <a className="underline" href="/documentos/aviso-de-privacidad" target="_blank" rel="noreferrer">
                  aviso de privacidad
                </a>{" "}
                y el uso de mis datos para fines de afiliación.
              </span>
            </label>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="confirmaVeracidad"
                checked={form.confirmaVeracidad}
                onChange={onChange}
                className="mt-1"
              />
              <span>
                Declaro bajo protesta de decir verdad que la información proporcionada es correcta y verificable.
              </span>
            </label>
          </div>

          {/* Mensajes */}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {ok && (
            <p className="text-sm text-green-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {ok}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Enviando…" : "Enviar afiliación"}
          </Button>
        </form>
      </div>
    </div>
  )
}
