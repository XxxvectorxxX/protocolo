const API_BASE_URL = "https://atendimentoapi.royalsistemas.com.br/v2/api/external/3b2e21a7-fd7c-4645-8885-6031ec1d8d62"
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MSwicHJvZmlsZSI6ImFkbWluIiwic2Vzc2lvbklkIjoxLCJpYXQiOjE3NTQ5MjEwOTgsImV4cCI6MTgxNzk5MzA5OH0.SyMZ67a-m34rNiL6mxau-HB5CrG6NxA_R1HgQMmo2kI"

type ChamadoFilters = {}

type Chamado = {}

type CreateChamadoData = {}

type UpdateChamadoData = {}

type Atendente = {}

type Cliente = {}

type RelatorioConversa = {}

export class RoyalSistemasAPI {
  private static instance: RoyalSistemasAPI
  private baseURL: string
  private token: string

  private constructor() {
    this.baseURL = API_BASE_URL
    this.token = BEARER_TOKEN
  }

  public static getInstance(): RoyalSistemasAPI {
    if (!RoyalSistemasAPI.instance) {
      RoyalSistemasAPI.instance = new RoyalSistemasAPI()
    }
    return RoyalSistemasAPI.instance
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`)
    }

    return response.json()
  }

  // Métodos para chamados/protocolos
  async getChamados(filters?: ChamadoFilters): Promise<Chamado[]> {
    const queryParams = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString())
      })
    }

    return this.request<Chamado[]>(`/chamados?${queryParams.toString()}`)
  }

  async getChamado(id: string): Promise<Chamado> {
    return this.request<Chamado>(`/chamados/${id}`)
  }

  async createChamado(data: CreateChamadoData): Promise<Chamado> {
    return this.request<Chamado>("/chamados", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateChamado(id: string, data: UpdateChamadoData): Promise<Chamado> {
    return this.request<Chamado>(`/chamados/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Métodos para WhatsApp
  async sendWhatsAppMessage(to: string, message: string): Promise<void> {
    return this.request("/whatsapp/send", {
      method: "POST",
      body: JSON.stringify({ to, message }),
    })
  }

  // Métodos para usuários/atendentes
  async getAtendentes(): Promise<Atendente[]> {
    return this.request<Atendente[]>("/atendentes")
  }

  async getClientes(): Promise<Cliente[]> {
    return this.request<Cliente[]>("/clientes")
  }

  // Método para relatórios
  async getRelatorioConversa(chamadoId: string): Promise<RelatorioConversa> {
    return this.request<RelatorioConversa>(`/chamados/${chamadoId}/relatorio`)
  }

  async enviarRelatorioPorEmail(chamadoId: string, email: string): Promise<void> {
    return this.request("/relatorios/enviar-email", {
      method: "POST",
      body: JSON.stringify({ chamadoId, email }),
    })
  }

  // Adicionando métodos de autenticação
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    // Simulação de login - em produção, fazer requisição real
    const mockUsers = {
      "admin@royal.com": {
        id: "1",
        nome: "Administrador",
        email: "admin@royal.com",
        perfil: "admin" as const,
        ativo: true,
      },
      "atendente@royal.com": {
        id: "2",
        nome: "João Atendente",
        email: "atendente@royal.com",
        perfil: "atendente" as const,
        departamento: "Suporte",
        ativo: true,
      },
      "cliente@royal.com": {
        id: "3",
        nome: "Maria Cliente",
        email: "cliente@royal.com",
        perfil: "cliente" as const,
        ativo: true,
      },
    }

    const mockPasswords = {
      "admin@royal.com": "admin123",
      "atendente@royal.com": "atend123",
      "cliente@royal.com": "client123",
    }

    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (mockPasswords[email as keyof typeof mockPasswords] === password) {
      return {
        token: "mock-jwt-token-" + Date.now(),
        user: mockUsers[email as keyof typeof mockUsers],
      }
    }

    throw new Error("Credenciais inválidas")
  }

  async getCurrentUser(): Promise<any> {
    // Simular busca do usuário atual
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      id: "1",
      nome: "Usuário Logado",
      email: "user@royal.com",
      perfil: "admin",
      ativo: true,
    }
  }
}

export const api = RoyalSistemasAPI.getInstance()
