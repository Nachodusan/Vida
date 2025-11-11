"use client"

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type ChatMessage = {
  id: string
  role: 'user' | 'agent' | 'system'
  content: string
  timestamp: number
}

/** UID con fallback si no existe crypto.randomUUID */
const uid = () =>
  (typeof globalThis !== 'undefined' &&
    (globalThis as any).crypto &&
    typeof (globalThis as any).crypto.randomUUID === 'function')
    ? (globalThis as any).crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)

const SUGERENCIAS = [
  'Quiero afiliarme',
  '¿Cómo me hago voluntario?',
  'Próximos eventos',
  'Contacto directo',
]

export function VirtualAgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: uid(),
    role: 'agent',
    content:
      '¡Hola! Soy tu asistente virtual de VIDA. Puedo ayudarte con afiliaciones, voluntariado y eventos. ¿En qué te apoyo hoy?',
    timestamp: Date.now(),
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const pushAgent = (text: string) => {
    const agentMsg: ChatMessage = { id: uid(), role: 'agent', content: text, timestamp: Date.now() }
    setMessages((prev) => [...prev, agentMsg])
  }

  const fallbackAgent = (text: string) => {
    const t = text.toLowerCase()
    if (t.includes('afiliar') || t.includes('afiliación') || t.includes('afiliacion')) {
      return [
        '¡Excelente! Para **afiliarte** necesito:',
        '• Nombre completo',
        '• CURP (si la tienes a la mano)',
        '• Domicilio y un teléfono de contacto',
        '',
        '¿Deseas que te guíe paso a paso o prefieres un enlace directo al registro?',
      ].join('\n')
    }
    if (t.includes('volunt')) {
      return [
        '¡Gracias por tu interés en el **voluntariado**! 💛',
        'Tenemos roles en eventos, formación ciudadana y apoyo territorial.',
        '¿En qué área te gustaría participar? También puedo tomar tus datos para ponerte en contacto con el equipo.',
      ].join('\n')
    }
    if (t.includes('evento') || t.includes('agenda')) {
      return [
        'Nuestros **próximos eventos** se publican en la sección “Eventos”.',
        '¿Te comparto los más cercanos a tu municipio? Dime tu municipio y fecha aproximada.',
      ].join('\n')
    }
    if (t.includes('contacto') || t.includes('teléfono') || t.includes('whatsapp')) {
      return [
        'Puedo canalizarte con el equipo correspondiente.',
        '¿Prefieres **WhatsApp** o **correo**? Compárteme tu número o email, y tu municipio.',
      ].join('\n')
    }
    return 'Puedo ayudarte con afiliaciones, voluntariado, eventos o contacto con el equipo. Cuéntame brevemente 🙂'
  }

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = { id: uid(), role: 'user', content: trimmed, timestamp: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, context: { intent: 'sitio_web_vida' } }),
      })
      if (res.ok) {
        const data = await res.json()
        const reply = (data?.reply as string) || fallbackAgent(trimmed)
        pushAgent(reply)
      } else {
        pushAgent(fallbackAgent(trimmed))
      }
    } catch {
      pushAgent(fallbackAgent(trimmed))
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  // ⬇️  Eliminados los dos <div> envolventes. Deja el “card” al contenedor externo (modal).
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b bg-background">
        <Bot className="h-5 w-5" />
        <div>
          <p className="font-semibold">Agente Virtual VIDA</p>
          <p className="text-xs text-muted-foreground">En línea · responde en segundos</p>
        </div>
      </div>

      {/* Sugerencias */}
      <div className="px-5 pt-4 pb-2 flex flex-wrap gap-2">
        {SUGERENCIAS.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="rounded-full border px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Mensajes */}
      <div ref={scrollerRef} className="px-4 md:px-5 py-4 max-h-[480px] overflow-y-auto bg-background">
        {messages.map((m) => (
          <ChatBubble key={m.id} role={m.role} text={m.content} timestamp={m.timestamp} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground px-1 py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            El agente está escribiendo…
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje…"
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || loading}>
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Al continuar aceptas nuestro <a href="/documentos/aviso-de-privacidad" className="underline">aviso de privacidad</a>.
        </p>
      </form>
    </>
  )
}

function ChatBubble({
  role,
  text,
  timestamp,
}: {
  role: 'user' | 'agent' | 'system'
  text: string
  timestamp: number
}) {
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const isUser = role === 'user'
  return (
    <div className={cn('mb-3 flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="rounded-full bg-secondary text-secondary-foreground p-2">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-muted text-foreground rounded-bl-sm'
        )}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        <p className={cn('mt-1 text-[10px] opacity-70', isUser ? 'text-primary-foreground/80' : 'text-foreground/60')}>
          {time}
        </p>
      </div>
      {isUser && (
        <div className="rounded-full bg-primary text-primary-foreground p-2">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
