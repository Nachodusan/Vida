"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { withBase } from "@/lib/path"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/eventos", label: "Eventos y Noticias" },
    { href: "/voluntario", label: "Voluntario" },
    { href: "/transparencia", label: "Transparencia" },
    { href: "/estrados", label: "Estrados Digitales" },
  ]

  const dropdownItems = [
    { href: "/documentos", label: "Documentos Básicos" },
    { href: "/estructura", label: "Estructura" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        scrolled
          ? "border-b border-yellow-300 bg-yellow-400/95 backdrop-blur shadow-sm dark:border-yellow-600 dark:bg-yellow-500/90"
          : "border-b border-yellow-300 bg-yellow-400 dark:border-yellow-600 dark:bg-yellow-500"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src={withBase("/images/vida-logo.png")}
            alt="VIDA - Partido Político"
            width={120}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-sm font-semibold text-gray-900 dark:text-white">
            Inicio
          </Link>

          <div className="relative group">
            <button className="text-sm font-semibold text-gray-900 flex items-center gap-1 dark:text-white">
              Nuestro Partido
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible py-2 dark:bg-gray-800">
              {dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white dark:hover:bg-gray-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-gray-900 dark:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 🔆 Botón de modo noche y “Súmate” */}
        <div className="flex items-center gap-3">
          {/* 🔆 ThemeToggle antes */}
          <ThemeToggle />

          {/* 🔵 Botón Súmate */}
          <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700 shadow-md">
            <Link href="/afiliate">Súmate</Link>
          </Button>

          {/* ☰ Menú móvil */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-yellow-300 bg-yellow-400 dark:border-yellow-600 dark:bg-yellow-500">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-900 py-2 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>

            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-sm font-semibold text-gray-900 py-2 w-full text-left flex items-center justify-between dark:text-white"
              >
                Nuestro Partido
                <ChevronDown className={`h-4 w-4 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="pl-4 flex flex-col gap-2 mt-2">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-semibold text-gray-900 py-2 dark:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-900 py-2 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
