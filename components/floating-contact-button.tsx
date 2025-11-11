"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { VirtualAgentChat } from "@/components/virtual-agent-chat"

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 🔘 Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 duration-300"
        aria-label="Abrir chat virtual"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* 🟡 Fondo oscuro cuando el chat está abierto (cierra al hacer click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 💬 Ventana del Asistente Virtual (sin X) */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-96 rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto animate-scale-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="p-6 rounded-2xl border-2 border-[color:var(--border-color)] bg-[color:var(--background)] shadow-xl transition-all duration-300">
            {/* (Encabezado vacío intencionalmente: ya no hay 'X' ni título externo) */}
            <VirtualAgentChat />
          </div>
        </div>
      )}
    </>
  )
}
