'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * ✅ Versión corregida:
 * - Usa el spread operator {...props} en lugar de {props}
 * - Incluye configuraciones recomendadas para next-themes
 * - Compatible con Tailwind (modo oscuro por clase .dark)
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
