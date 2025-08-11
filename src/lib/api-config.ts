// Configuração da API Z-PRO
export const API_CONFIG = {
  BASE_URL: "https://api.z-pro.com.br", // Substitua pela URL real da API
  ENDPOINTS: {
    SESSIONS: "/sessions",
    MESSAGES: "/messages",
    CONTACTS: "/contacts",
    GROUPS: "/groups",
    WEBHOOKS: "/webhooks",
    STATUS: "/status",
  },
}

// Tipos TypeScript para a API
export interface ApiSession {
  id: string
  name: string
  status: "connected" | "disconnected" | "connecting"
  qrCode?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface ApiContact {
  id: string
  name: string
  phone: string
  profilePicUrl?: string
  isGroup: boolean
  lastSeen?: string
  createdAt: string
}

export interface ApiMessage {
  id: string
  sessionId: string
  from: string
  to: string
  body: string
  type: "text" | "image" | "audio" | "video" | "document"
  timestamp: string
  status: "pending" | "sent" | "delivered" | "read"
  mediaUrl?: string
  fileName?: string
}

export interface ApiWebhook {
  id: string
  url: string
  events: string[]
  active: boolean
  createdAt: string
}

export interface ProtocoloAtendimento {
  id: string
  numero: string
  cliente: {
    nome: string
    telefone: string
    email?: string
  }
  assunto: string
  descricao: string
  prioridade: "baixa" | "media" | "alta" | "critica"
  status: "aberto" | "em_andamento" | "aguardando_cliente" | "resolvido" | "fechado"
  categoria: string
  responsavel?: string
  dataAbertura: string
  dataFechamento?: string
  mensagens: ApiMessage[]
  anexos: string[]
  observacoes?: string
}
