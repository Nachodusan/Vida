import { NextResponse } from "next/server"

export async function POST(req: Request) {
  // In production, call your LLM provider here (server-side) with proper auth
  // const { messages } = await req.json()
  // const reply = await callYourModel(messages)

  return NextResponse.json({ reply: "Respuesta generada por el asistente (demo)." })
}