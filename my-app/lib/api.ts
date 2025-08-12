// API configuration for Royal Sistemas
const API_BASE_URL = "https://atendimentoapi.royalsistemas.com.br/v2/api/external/3b2e21a7-fd7c-4645-8885-6031ec1d8d62"
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MSwicHJvZmlsZSI6ImFkbWluIiwic2Vzc2lvbklkIjoxLCJpYXQiOjE3NTQ5MjEwOTgsImV4cCI6MTgxNzk5MzA5OH0.SyMZ67a-m34rNiL6mxau-HB5CrG6NxA_R1HgQMmo2kI"

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

interface Contact {
  id?: string
  name: string
  phone: string
  email?: string
  tags?: string[]
}

interface Ticket {
  id?: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "open" | "in_progress" | "closed"
  contactId: string
  assignedTo?: string
}

interface MessageParams {
  to: string
  message: string
  type?: "text" | "file" | "voice" | "template"
}

interface SessionData {
  sessionId?: string
  contactId: string
  channelId: string
}

class RoyalSistemasAPI {
  private baseURL: string
  private token: string

  constructor() {
    this.baseURL = API_BASE_URL
    this.token = BEARER_TOKEN
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        data: null as T,
        message: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async showQrCode() {
    return this.request("/ShowQrCode", { method: "POST" })
  }

  async createApi(apiData: any) {
    return this.request("/CreateApi", {
      method: "POST",
      body: JSON.stringify(apiData),
    })
  }

  async deleteApi(apiId: string) {
    return this.request("/DeleteApi", {
      method: "POST",
      body: JSON.stringify({ apiId }),
    })
  }

  async storeTenant(tenantData: any) {
    return this.request("/StoreTenant", {
      method: "POST",
      body: JSON.stringify(tenantData),
    })
  }

  async showTenant() {
    return this.request("/ShowTenant", { method: "POST" })
  }

  async updateTenant(tenantData: any) {
    return this.request("/UpdateTenant", {
      method: "POST",
      body: JSON.stringify(tenantData),
    })
  }

  async getSendMessageParams() {
    return this.request("/SendMessageParams", { method: "GET" })
  }

  async sendMessageText(params: MessageParams) {
    return this.request("/SendMessageAPIText", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  async sendMessageFile(to: string, file: File) {
    const formData = new FormData()
    formData.append("to", to)
    formData.append("file", file)

    return this.request("/SendMessageAPIFile", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
        // Remove Content-Type para FormData
      },
    })
  }

  async sendMessageFileURL(to: string, fileUrl: string, caption?: string) {
    return this.request("/SendMessageAPIFileURL", {
      method: "POST",
      body: JSON.stringify({ to, fileUrl, caption }),
    })
  }

  async sendMessageVoice(to: string, audioFile: File) {
    const formData = new FormData()
    formData.append("to", to)
    formData.append("audio", audioFile)

    return this.request("/SendMessageAPIVoice", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async sendMessageTextBase64(to: string, message: string, mediaBase64?: string) {
    return this.request("/SendMessageAPITextBase64", {
      method: "POST",
      body: JSON.stringify({ to, message, mediaBase64 }),
    })
  }

  async sendGroupMessageText(groupId: string, message: string) {
    return this.request("/SendGroupMessageAPIText", {
      method: "POST",
      body: JSON.stringify({ groupId, message }),
    })
  }

  async sendGroupMessageFile(groupId: string, file: File) {
    const formData = new FormData()
    formData.append("groupId", groupId)
    formData.append("file", file)

    return this.request("/SendGroupMessageAPIFile", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async sendGroupMessageFileURL(groupId: string, fileUrl: string, caption?: string) {
    return this.request("/SendGroupMessageAPIFileURLGroup", {
      method: "POST",
      body: JSON.stringify({ groupId, fileUrl, caption }),
    })
  }

  async sendTemplateWaba(to: string, templateName: string, parameters?: any[]) {
    return this.request("/SendTemplateWaba", {
      method: "POST",
      body: JSON.stringify({ to, templateName, parameters }),
    })
  }

  async createContact(contact: Contact) {
    return this.request("/CreateContact", {
      method: "POST",
      body: JSON.stringify(contact),
    })
  }

  async showContact(contactId: string) {
    return this.request("/ShowContact", {
      method: "POST",
      body: JSON.stringify({ contactId }),
    })
  }

  async updateContact(contactId: string, contact: Partial<Contact>) {
    return this.request("/UpdateContact", {
      method: "POST",
      body: JSON.stringify({ contactId, ...contact }),
    })
  }

  async createOpportunity(opportunityData: any) {
    return this.request("/CreateOpportunity", {
      method: "POST",
      body: JSON.stringify(opportunityData),
    })
  }

  async updateOpportunity(opportunityId: string, opportunityData: any) {
    return this.request("/UpdateOpportunity", {
      method: "POST",
      body: JSON.stringify({ opportunityId, ...opportunityData }),
    })
  }

  async deleteOpportunity(opportunityId: string) {
    return this.request("/DeleteOpportunity", {
      method: "POST",
      body: JSON.stringify({ opportunityId }),
    })
  }

  async createNotes(ticketId: string, note: string) {
    return this.request("/CreateNotes", {
      method: "POST",
      body: JSON.stringify({ ticketId, note }),
    })
  }

  async createTicket(ticket: Ticket) {
    return this.request("/CreateTicket", {
      method: "POST",
      body: JSON.stringify(ticket),
    })
  }

  async createTicketFile(ticketId: string, file: File) {
    const formData = new FormData()
    formData.append("ticketId", ticketId)
    formData.append("file", file)

    return this.request("/CreateTicketFile", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async setQueue(ticketId: string, queueId: string) {
    return this.request("/SetQueue", {
      method: "POST",
      body: JSON.stringify({ ticketId, queueId }),
    })
  }

  async setTag(ticketId: string, tags: string[]) {
    return this.request("/SetTag", {
      method: "POST",
      body: JSON.stringify({ ticketId, tags }),
    })
  }

  async setTicketInfo(ticketId: string, info: any) {
    return this.request("/SetTicketInfo", {
      method: "POST",
      body: JSON.stringify({ ticketId, ...info }),
    })
  }

  async showTicketInformation(ticketId: string) {
    return this.request("/ShowTicketInformation", {
      method: "POST",
      body: JSON.stringify({ ticketId }),
    })
  }

  async showTicketInformationChatBot(ticketId: string) {
    return this.request("/ShowTicketInformationChatBot", {
      method: "POST",
      body: JSON.stringify({ ticketId }),
    })
  }

  async showAllTicketInformation() {
    return this.request("/ShowAllTicketInformation", { method: "POST" })
  }

  async showAllMessages(ticketId?: string) {
    return this.request("/ShowAllMessages", {
      method: "POST",
      body: JSON.stringify({ ticketId }),
    })
  }

  async showChannelInformation() {
    return this.request("/ShowChannelInformation", { method: "POST" })
  }

  async showChannelInformationById(channelId: string) {
    return this.request("/ShowChannelInformationById", {
      method: "POST",
      body: JSON.stringify({ channelId }),
    })
  }

  async listGroupsInfo() {
    return this.request("/ListGroupsInfo", { method: "POST" })
  }

  async createSession(sessionData: SessionData) {
    return this.request("/CreateSession", {
      method: "POST",
      body: JSON.stringify(sessionData),
    })
  }

  async deleteSession(sessionId: string) {
    return this.request("/DeleteSession", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    })
  }

  async startSession(sessionId: string) {
    return this.request("/StartSession", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    })
  }

  async getContacts() {
    return this.showAllTicketInformation() // Usar endpoint real disponível
  }

  async getTickets() {
    return this.showAllTicketInformation()
  }

  async sendWhatsAppMessage(to: string, message: string) {
    return this.sendMessageText({ to, message })
  }

  async getWhatsAppChats() {
    return this.showChannelInformation()
  }

  async getUsers() {
    return this.showTenant() // Usar endpoint de tenant para informações de usuários
  }

  async updateUserStatus(userId: string, status: string) {
    // Implementar usando endpoints disponíveis
    return this.updateTenant({ userId, status })
  }

  async generateReport(type: string, filters: any) {
    // Usar endpoints de informações para gerar relatórios
    switch (type) {
      case "tickets":
        return this.showAllTicketInformation()
      case "messages":
        return this.showAllMessages()
      case "channels":
        return this.showChannelInformation()
      default:
        return this.showAllTicketInformation()
    }
  }

  async getDashboardMetrics() {
    // Combinar dados de diferentes endpoints para métricas do dashboard
    const [tickets, channels, messages] = await Promise.all([
      this.showAllTicketInformation(),
      this.showChannelInformation(),
      this.showAllMessages(),
    ])

    return {
      success: true,
      data: {
        tickets: tickets.data,
        channels: channels.data,
        messages: messages.data,
      },
    }
  }
}

export const royalAPI = new RoyalSistemasAPI()
export default royalAPI
