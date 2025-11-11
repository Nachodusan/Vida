"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Bot, MessageCircle, Send, X, Loader2, Trash2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Role = "user" | "assistant" | "system"
type Msg = { id: string; role: Role; content: string; ts?: number }

// Minimal markdown (bold, italic, links, code) without extra deps
function renderInlineMarkdown(text: string) {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  let html = esc(text)
  html = html.replace(/`([^`]+)`/g, "<code class='px-1 rounded bg-muted/60'>$1</code>")
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>")
  html = html.replace(/(https?:\/\/[^\s)]+)(?![^<]*>)/g, "<a class='underline' href='$1' target='_blank' rel='noreferrer'>$1</a>")
  return html
}

function Bubble({ role, content }: { role: Role; content: string }) {
  const isUser = role === "user"
  const isSystem = role === "system"
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow",
          isUser
            ? "bg-primary text-primary-foreground"
            : isSystem
              ? "bg-accent/15 text-foreground border border-accent/30"
              : "bg-muted text-foreground"
        )}
        dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(content) }}
      />
    </div>
  )
}

type Suggestion = { id: string; label: string; prompt: string }

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { id: "afiliate", label: "¿Cómo me afilio?", prompt: "Quiero afiliarme, dime los pasos." },
  { id: "docs", label: "Ver documentos", prompt: "Muéstrame qué documentos oficiales hay disponibles." },
  { id: "eventos", label: "Próximos eventos", prompt: "¿Cuáles son los próximos eventos y fechas?" },
  { id: "contacto", label: "Contacto", prompt: "¿Cómo puedo ponerme en contacto con ustedes?" },
]

const STORAGE_KEY = "vidanl.assistant.v1"

export default function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw) as Msg[]
    } catch {}
    return [
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "¡Hola! Soy tu asistente virtual de VIDA NL. Puedo ayudarte con afiliación, documentos y eventos.",
        ts: Date.now(),
      },
    ]
  })
  const [suggestionsOpen, setSuggestionsOpen] = useState(true)

  // Persist messages
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
      } catch {}
    }
  }, [messages])

  // Auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const el = scrollRef.current
    el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  const canSend = useMemo(() => input.trim().length > 0 && !pending, [input, pending])

  const quickAsk = useCallback((s: Suggestion) => {
    setInput(s.prompt)
    setSuggestionsOpen(false)
    // optional auto send: handleSend()
  }, [])

  async function handleSend() {
    const text = input.trim()
    if (!text || pending) return

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text, ts: Date.now() }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setPending(true)

    try {
      // Replace stub with your real endpoint call e.g. /api/asistente
      // const res = await fetch("/api/asistente", { method: "POST", body: JSON.stringify({ messages: [...messages, userMsg] }) })
      // const data = await res.json()
      // const answer = String(data.reply ?? "")

      // Smarter demo: small rule-based helper
      const lower = text.toLowerCase()
      let answer = "Entendido. ¿Podrías darme más contexto? Puedo ayudarte con afiliación, documentos y eventos."
      if (/(afilia|afíli|afiliate)/.test(lower)) {
        answer = [
          "**Afiliación:**",
          "1) Ve a la sección **Afíliate** en el sitio.",
          "2) Completa el formulario y confirma por correo.",
          "3) Te contactaremos con los siguientes pasos."
        ].join("\n")
      } else if (/(document|pdf|estatuto|lineamiento)/.test(lower)) {
        answer = "Puedes consultar **Documentos** desde el menú principal. ¿Buscas algún documento específico?"
      } else if (/(evento|agenda|fecha)/.test(lower)) {
        answer = "Los próximos **eventos** se publican en la sección de Noticias/Eventos. ¿Te interesa alguno en particular?"
      } else if (/(contacto|whatsapp|correo|email)/.test(lower)) {
        answer = "Puedes escribirnos desde la sección **Contacto** del sitio. ¡Con gusto te apoyamos!"
      }

      const botMsg: Msg = { id: crypto.randomUUID(), role: "assistant", content: answer, ts: Date.now() }
      setMessages((m) => [...m, botMsg])
    } catch (e) {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", content: "Hubo un problema al responder. Inténtalo de nuevo.", ts: Date.now() },
      ])
    } finally {
      setPending(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function clearChat() {
    setMessages([
      { id: crypto.randomUUID(), role: "assistant", content: "Nueva conversación iniciada. ¿En qué te ayudo?", ts: Date.now() },
    ])
    setSuggestionsOpen(true)
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-5 right-5 z-[200]">
        {!open ? (
          <Button
            onClick={() => setOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 p-0 shadow-lg"
            aria-label="Abrir asistente virtual"
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </Button>
        ) : null}
      </div>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-5 right-5 z-[210] w-[92vw] max-w-md rounded-2xl border bg-background shadow-xl">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Asistente VIDA NL</p>
              <p className="text-xs text-muted-foreground">En línea</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={clearChat} aria-label="Limpiar conversación" title="Limpiar">
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Cerrar">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="px-4 pt-2">
            <button
              className="text-xs text-muted-foreground hover:underline flex items-center gap-1"
              onClick={() => setSuggestionsOpen((s) => !s)}
              aria-expanded={suggestionsOpen}
            >
              Sugerencias rápidas <ChevronDown className="h-3 w-3" />
            </button>
            {suggestionsOpen && (
              <div className="mt-2 flex flex-wrap gap-2">
                {DEFAULT_SUGGESTIONS.map((s) => (
                  <button
                    key={s.id}
                    className="text-xs rounded-full border px-3 py-1 hover:bg-muted transition-colors"
                    onClick={() => quickAsk(s)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={scrollRef} className="max-h-[60vh] overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <Bubble key={m.id} role={m.role} content={m.content} />
            ))}
            {pending && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Pensando…
              </div>
            )}
          </div>

          <div className="border-t p-3">
            <label htmlFor="assistant-input" className="sr-only">Escribe tu mensaje</label>
            <div className="flex items-end gap-2">
              <Textarea
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Escribe tu mensaje… (Enter para enviar, Shift+Enter para salto de línea)"
                className="min-h-[44px] max-h-40"
                aria-label="Caja de mensaje"
              />
              <Button onClick={handleSend} disabled={!canSend} className="shrink-0" aria-label="Enviar">
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}