import { isApiEnabled, useMockData, SYSTEM_CONFIG } from "./config"
import { MOCK_SESSIONS, MOCK_USERS, MOCK_QUEUES, MOCK_CONTACTS, MOCK_MESSAGES, getMockProtocolos } from "./mock-data"
import type { ApiSession, ApiContact, ApiMessage, ApiTicket, ApiUser, ApiQueue } from "./api-config"

class ApiClient {
  private baseUrl: string
  private bearerToken: string
  private isApiMode: boolean

  constructor() {
    this.baseUrl = SYSTEM_CONFIG.API.BASE_URL
    this.bearerToken = SYSTEM_CONFIG.API.BEARER_TOKEN
    this.isApiMode = isApiEnabled()
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<{ data: T; success: boolean; error?: string }> {
    // Se não estiver no modo API, retornar erro
    if (!this.isApiMode) {
      return {
        data: {} as T,
        success: false,
        error: "API não está habilitada - usando dados mockados",
      }
    }

    try {
      const url = `${this.baseUrl}${endpoint}`
      console.log(`🔗 [API] Fazendo requisição para: ${url}`)

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.bearerToken}`,
          ...options.headers,
        },
      })

      console.log(`📡 [API] Status da resposta: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ [API] Erro: ${response.status} - ${errorText}`)
        return {
          data: {} as T,
          success: false,
          error: `Erro ${response.status}: ${errorText}`,
        }
      }

      const data = await response.json()
      console.log(`✅ [API] Dados recebidos:`, data)

      return {
        data,
        success: true,
      }
    } catch (error) {
      console.error(`💥 [API] Erro na requisição:`, error)
      return {
        data: {} as T,
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }

  // Simular delay para dados mockados
  private async mockDelay(ms = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Testar conexão com a API
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    console.log("🎭 [MOCK] Simulando teste de conexão...")
    await this.mockDelay(1000)
    return { success: true }
  }

  // Sessões WhatsApp
  async getSessions(): Promise<{ data: ApiSession[]; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log("🎭 [MOCK] Retornando sessões mockadas...")
      await this.mockDelay()
      return { data: MOCK_SESSIONS, success: true }
    }

    return this.request<ApiSession[]>("/sessions")
  }

  async getSession(sessionId: string): Promise<{ data: ApiSession; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Buscando sessão: ${sessionId}`)
      await this.mockDelay()
      const session = MOCK_SESSIONS.find((s) => s.id === sessionId)
      if (session) {
        return { data: session, success: true }
      }
      return { data: {} as ApiSession, success: false, error: "Sessão não encontrada" }
    }

    return this.request<ApiSession>(`/sessions/${sessionId}`)
  }

  async createSession(name: string): Promise<{ data: ApiSession; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Criando sessão: ${name}`)
      await this.mockDelay(2000)

      const newSession: ApiSession = {
        id: `session-${Date.now()}`,
        name,
        status: "CONNECTING",
        qrcode: "/generic-qr-code.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      MOCK_SESSIONS.push(newSession)

      // Simular conexão após 3 segundos
      setTimeout(() => {
        newSession.status = "CONNECTED"
        newSession.phone = `+5511${Math.floor(Math.random() * 900000000) + 100000000}`
        newSession.updatedAt = new Date().toISOString()
      }, 3000)

      return { data: newSession, success: true }
    }

    return this.request<ApiSession>("/sessions", {
      method: "POST",
      body: JSON.stringify({ name }),
    })
  }

  async deleteSession(sessionId: string): Promise<{ data: any; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Deletando sessão: ${sessionId}`)
      await this.mockDelay()

      const index = MOCK_SESSIONS.findIndex((s) => s.id === sessionId)
      if (index !== -1) {
        MOCK_SESSIONS.splice(index, 1)
        return { data: { deleted: true }, success: true }
      }
      return { data: {}, success: false, error: "Sessão não encontrada" }
    }

    return this.request(`/sessions/${sessionId}`, {
      method: "DELETE",
    })
  }

  // Contatos
  async getContacts(sessionId?: string): Promise<{ data: ApiContact[]; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log("🎭 [MOCK] Retornando contatos mockados...")
      await this.mockDelay()
      return { data: MOCK_CONTACTS, success: true }
    }

    const query = sessionId ? `?sessionId=${sessionId}` : ""
    return this.request<ApiContact[]>(`/contacts${query}`)
  }

  async getContact(contactId: string): Promise<{ data: ApiContact; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Buscando contato: ${contactId}`)
      await this.mockDelay()
      const contact = MOCK_CONTACTS.find((c) => c.id === contactId)
      if (contact) {
        return { data: contact, success: true }
      }
      return { data: {} as ApiContact, success: false, error: "Contato não encontrado" }
    }

    return this.request<ApiContact>(`/contacts/${contactId}`)
  }

  async createContact(data: {
    name: string
    number: string
    email?: string
  }): Promise<{ data: ApiContact; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Criando contato: ${data.name}`)
      await this.mockDelay()

      const newContact: ApiContact = {
        id: `contact-${Date.now()}`,
        name: data.name,
        number: data.number,
        profilePicUrl: "/diverse-avatars.png",
        isGroup: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      MOCK_CONTACTS.push(newContact)
      return { data: newContact, success: true }
    }

    return this.request<ApiContact>("/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Tickets/Atendimentos
  async getTickets(params?: {
    status?: string
    userId?: string
    queueId?: string
    contactId?: string
  }): Promise<{ data: ApiTicket[]; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log("🎭 [MOCK] Retornando tickets mockados...")
      await this.mockDelay()

      // Converter protocolos mockados em tickets
      const protocolos = getMockProtocolos()
      const tickets: ApiTicket[] = protocolos.map((p) => ({
        id: p.ticketId || `ticket-${p.id}`,
        status: p.status === "aberto" ? "open" : p.status === "fechado" ? "closed" : "pending",
        userId: MOCK_USERS.find((u) => u.name === p.responsavel)?.id,
        contactId: p.contactId || "contact-1",
        whatsappId: p.whatsappId || "session-1",
        queueId: "queue-1",
        createdAt: p.dataAbertura,
        updatedAt: p.dataFechamento || new Date().toISOString(),
        contact: MOCK_CONTACTS.find((c) => c.id === p.contactId),
        user: MOCK_USERS.find((u) => u.name === p.responsavel),
        queue: MOCK_QUEUES[0],
        messages: [],
      }))

      return { data: tickets, success: true }
    }

    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append("status", params.status)
    if (params?.userId) searchParams.append("userId", params.userId)
    if (params?.queueId) searchParams.append("queueId", params.queueId)
    if (params?.contactId) searchParams.append("contactId", params.contactId)

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ""
    return this.request<ApiTicket[]>(`/tickets${query}`)
  }

  async createTicket(data: {
    contactId: string
    whatsappId: string
    userId?: string
    queueId?: string
    status?: string
  }): Promise<{ data: ApiTicket; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log("🎭 [MOCK] Criando ticket...")
      await this.mockDelay()

      const newTicket: ApiTicket = {
        id: `ticket-${Date.now()}`,
        status: data.status || "open",
        userId: data.userId,
        contactId: data.contactId,
        whatsappId: data.whatsappId,
        queueId: data.queueId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        contact: MOCK_CONTACTS.find((c) => c.id === data.contactId),
        user: data.userId ? MOCK_USERS.find((u) => u.id === data.userId) : undefined,
        queue: data.queueId ? MOCK_QUEUES.find((q) => q.id === data.queueId) : undefined,
        messages: [],
      }

      return { data: newTicket, success: true }
    }

    return this.request<ApiTicket>("/tickets", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateTicket(
    ticketId: string,
    data: {
      status?: string
      userId?: string
      queueId?: string
    },
  ): Promise<{ data: ApiTicket; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Atualizando ticket: ${ticketId}`)
      await this.mockDelay()

      // Simular atualização
      const mockTicket: ApiTicket = {
        id: ticketId,
        status: data.status || "open",
        userId: data.userId,
        contactId: "contact-1",
        whatsappId: "session-1",
        queueId: data.queueId,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date().toISOString(),
      }

      return { data: mockTicket, success: true }
    }

    return this.request<ApiTicket>(`/tickets/${ticketId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Mensagens
  async getMessages(ticketId: string): Promise<{ data: ApiMessage[]; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Buscando mensagens do ticket: ${ticketId}`)
      await this.mockDelay()
      return { data: MOCK_MESSAGES.filter((m) => m.ticketId === ticketId), success: true }
    }

    return this.request<ApiMessage[]>(`/messages/${ticketId}`)
  }

  async sendMessage(data: {
    ticketId: string
    body: string
    quotedMsgId?: string
  }): Promise<{ data: ApiMessage; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Enviando mensagem para ticket: ${data.ticketId}`)
      await this.mockDelay(1000)

      const newMessage: ApiMessage = {
        id: `msg-${Date.now()}`,
        body: data.body,
        fromMe: true,
        read: true,
        quotedMsgId: data.quotedMsgId,
        timestamp: Date.now(),
        contactId: "contact-1",
        ticketId: data.ticketId,
        ack: 1,
      }

      // Simular entrega da mensagem
      setTimeout(() => {
        newMessage.ack = 3
      }, 2000)

      return { data: newMessage, success: true }
    }

    return this.request<ApiMessage>("/messages", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Usuários
  async getUsers(): Promise<{ data: ApiUser[]; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log("🎭 [MOCK] Retornando usuários mockados...")
      await this.mockDelay()
      return { data: MOCK_USERS, success: true }
    }

    return this.request<ApiUser[]>("/users")
  }

  // Filas
  async getQueues(): Promise<{ data: ApiQueue[]; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log("🎭 [MOCK] Retornando filas mockadas...")
      await this.mockDelay()
      return { data: MOCK_QUEUES, success: true }
    }

    return this.request<ApiQueue[]>("/queues")
  }

  // Status da sessão
  async getSessionStatus(sessionId: string): Promise<{ data: any; success: boolean; error?: string }> {
    if (useMockData()) {
      console.log(`🎭 [MOCK] Verificando status da sessão: ${sessionId}`)
      await this.mockDelay()
      const session = MOCK_SESSIONS.find((s) => s.id === sessionId)
      return {
        data: {
          status: session?.status || "DISCONNECTED",
          qrcode: session?.qrcode,
        },
        success: true,
      }
    }

    return this.request(`/sessions/${sessionId}/status`)
  }
}

export default ApiClient
