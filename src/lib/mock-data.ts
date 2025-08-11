import type { ProtocoloAtendimento, ApiSession, ApiContact, ApiMessage, ApiUser, ApiQueue } from "./api-config"

// Dados mockados para demonstração
export const MOCK_SESSIONS: ApiSession[] = [
  {
    id: "session-1",
    name: "WhatsApp Principal",
    status: "CONNECTED",
    phone: "+5511999999999",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "session-2",
    name: "WhatsApp Suporte",
    status: "CONNECTED",
    phone: "+5511888888888",
    createdAt: "2024-01-02T11:00:00Z",
    updatedAt: "2024-01-15T15:00:00Z",
  },
  {
    id: "session-3",
    name: "WhatsApp Vendas",
    status: "DISCONNECTED",
    createdAt: "2024-01-03T12:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
  },
]

export const MOCK_USERS: ApiUser[] = [
  {
    id: "user-1",
    name: "Maria Santos",
    email: "maria@empresa.com",
    profile: "admin",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "user-2",
    name: "Carlos Lima",
    email: "carlos@empresa.com",
    profile: "user",
    createdAt: "2024-01-02T11:00:00Z",
    updatedAt: "2024-01-15T15:00:00Z",
  },
  {
    id: "user-3",
    name: "Ana Ferreira",
    email: "ana@empresa.com",
    profile: "admin",
    createdAt: "2024-01-03T12:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
  },
]

export const MOCK_QUEUES: ApiQueue[] = [
  {
    id: "queue-1",
    name: "Suporte Técnico",
    color: "#EF4444",
    greetingMessage: "Olá! Você está falando com o suporte técnico.",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "queue-2",
    name: "Comercial",
    color: "#3B82F6",
    greetingMessage: "Olá! Você está falando com o setor comercial.",
    createdAt: "2024-01-02T11:00:00Z",
    updatedAt: "2024-01-15T15:00:00Z",
  },
  {
    id: "queue-3",
    name: "Financeiro",
    color: "#10B981",
    greetingMessage: "Olá! Você está falando com o financeiro.",
    createdAt: "2024-01-03T12:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
  },
]

export const MOCK_CONTACTS: ApiContact[] = [
  {
    id: "contact-1",
    name: "João Silva",
    number: "5511999999999",
    profilePicUrl: "/diverse-avatars.png",
    isGroup: false,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "contact-2",
    name: "Ana Costa",
    number: "5511888888888",
    profilePicUrl: "/diverse-avatars.png",
    isGroup: false,
    createdAt: "2024-01-11T11:00:00Z",
    updatedAt: "2024-01-15T15:00:00Z",
  },
  {
    id: "contact-3",
    name: "Pedro Oliveira",
    number: "5511777777777",
    profilePicUrl: "/diverse-avatars.png",
    isGroup: false,
    createdAt: "2024-01-12T12:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
  },
]

export const MOCK_MESSAGES: ApiMessage[] = [
  {
    id: "msg-1",
    body: "Olá, preciso de ajuda com o sistema",
    fromMe: false,
    read: true,
    timestamp: Date.now() - 3600000, // 1 hora atrás
    contactId: "contact-1",
    ticketId: "ticket-1",
    ack: 3,
  },
  {
    id: "msg-2",
    body: "Olá! Claro, vou te ajudar. Qual é o problema específico?",
    fromMe: true,
    read: true,
    timestamp: Date.now() - 3500000,
    contactId: "contact-1",
    ticketId: "ticket-1",
    ack: 3,
  },
  {
    id: "msg-3",
    body: "O sistema não está salvando os dados quando clico em salvar",
    fromMe: false,
    read: true,
    timestamp: Date.now() - 3400000,
    contactId: "contact-1",
    ticketId: "ticket-1",
    ack: 3,
  },
]

// Função para gerar protocolos mockados
export const generateMockProtocolos = (): ProtocoloAtendimento[] => {
  const protocolos: ProtocoloAtendimento[] = []

  const assuntos = [
    "Problema com login no sistema",
    "Solicitação de nova funcionalidade",
    "Erro no processamento de pagamentos",
    "Dúvida sobre relatórios",
    "Sistema lento para carregar",
    "Erro ao enviar email",
    "Problema na integração",
    "Solicitação de suporte técnico",
  ]

  const categorias = ["Suporte Técnico", "Dúvidas Gerais", "Reclamação", "Sugestão", "Comercial", "Financeiro"]

  const prioridades: ("baixa" | "media" | "alta" | "critica")[] = ["baixa", "media", "alta", "critica"]
  const status: ("aberto" | "em_andamento" | "aguardando_cliente" | "resolvido" | "fechado")[] = [
    "aberto",
    "em_andamento",
    "aguardando_cliente",
    "resolvido",
    "fechado",
  ]

  const clientes = [
    { nome: "João Silva", telefone: "5511999999999", email: "joao@email.com" },
    { nome: "Ana Costa", telefone: "5511888888888", email: "ana@email.com" },
    { nome: "Pedro Oliveira", telefone: "5511777777777", email: "pedro@email.com" },
    { nome: "Maria Santos", telefone: "5511666666666", email: "maria@email.com" },
    { nome: "Carlos Lima", telefone: "5511555555555", email: "carlos@email.com" },
  ]

  const responsaveis = ["Maria Santos", "Carlos Lima", "Ana Ferreira", "Pedro Silva"]

  // Gerar 15 protocolos de exemplo
  for (let i = 1; i <= 15; i++) {
    const dataAbertura = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Últimos 7 dias
    const cliente = clientes[Math.floor(Math.random() * clientes.length)]
    const protocoloStatus = status[Math.floor(Math.random() * status.length)]

    const protocolo: ProtocoloAtendimento = {
      id: `protocolo-${i}`,
      numero: `ATD-2024-${String(i).padStart(3, "0")}`,
      cliente,
      assunto: assuntos[Math.floor(Math.random() * assuntos.length)],
      descricao: `Descrição detalhada do problema reportado pelo cliente ${cliente.nome}. Este é um protocolo de exemplo gerado automaticamente para demonstração do sistema.`,
      prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
      status: protocoloStatus,
      categoria: categorias[Math.floor(Math.random() * categorias.length)],
      responsavel: Math.random() > 0.3 ? responsaveis[Math.floor(Math.random() * responsaveis.length)] : undefined,
      dataAbertura: dataAbertura.toISOString(),
      dataFechamento:
        protocoloStatus === "fechado" || protocoloStatus === "resolvido"
          ? new Date(dataAbertura.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
      ticketId: `ticket-${i}`,
      contactId: `contact-${Math.floor(Math.random() * 3) + 1}`,
      whatsappId: `session-${Math.floor(Math.random() * 2) + 1}`,
      mensagens: [],
      anexos: [],
      observacoes: Math.random() > 0.7 ? "Observações internas sobre este protocolo." : undefined,
    }

    protocolos.push(protocolo)
  }

  return protocolos.sort((a, b) => new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime())
}

// Cache para dados mockados
let mockProtocolosCache: ProtocoloAtendimento[] | null = null

export const getMockProtocolos = (): ProtocoloAtendimento[] => {
  if (!mockProtocolosCache) {
    mockProtocolosCache = generateMockProtocolos()
  }
  return mockProtocolosCache
}

// Função para adicionar novo protocolo mock
export const addMockProtocolo = (protocolo: ProtocoloAtendimento): void => {
  if (!mockProtocolosCache) {
    mockProtocolosCache = generateMockProtocolos()
  }
  mockProtocolosCache.unshift(protocolo)
}

// Função para atualizar protocolo mock
export const updateMockProtocolo = (id: string, updates: Partial<ProtocoloAtendimento>): boolean => {
  if (!mockProtocolosCache) {
    mockProtocolosCache = generateMockProtocolos()
  }

  const index = mockProtocolosCache.findIndex((p) => p.id === id)
  if (index !== -1) {
    mockProtocolosCache[index] = { ...mockProtocolosCache[index], ...updates }
    return true
  }
  return false
}
