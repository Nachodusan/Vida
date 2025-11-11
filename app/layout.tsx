import AssistantWidget from "@/components/assistant";
import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingContactButton } from "@/components/floating-contact-button"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vida NL",
  description: "Sitio oficial"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Dark mode bootstrapping */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const m = localStorage.getItem('theme');
                if (m === 'dark' || (!m && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${geist.className} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <FloatingContactButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
