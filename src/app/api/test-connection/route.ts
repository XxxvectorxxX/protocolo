import { type NextRequest, NextResponse } from "next/server"
import ApiClient from "../../../lib/api-client"

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API Key é obrigatória" }, { status: 400 })
    }

    // Testar conexão com a API
    const apiClient = new ApiClient(apiKey)
    const result = await apiClient.getSessions()

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: result.error || "Erro ao conectar com a API" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

