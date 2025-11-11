import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import { withBase } from "@/lib/path"

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 py-12 border-t border-gray-800 dark:border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image src={withBase("/images/vida-logo.png")} alt="VIDA Logo" width={120} height={48} className="h-12 w-auto" />
            </div>
            <p className="mb-6 max-w-sm text-pretty text-sm leading-relaxed text-gray-300 dark:text-gray-400">
              Un movimiento político comprometido con el bienestar de todos. Juntos construimos un futuro de justicia,
              inclusión y desarrollo sostenible.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all hover:scale-110 hover:shadow-lg"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-primary">Movimiento</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Propuestas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Nuestro Equipo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Historia
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Logros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-primary">Participa</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Únete
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Voluntariado
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Donaciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-primary">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Oficinas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Prensa
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Transparencia
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white">
                  Denuncias
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 dark:border-gray-900 pt-8 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>© 2025 Partido VIDA. Todos los derechos reservados. Construyendo un futuro mejor juntos.</p>
        </div>
      </div>
    </footer>
  )
}
