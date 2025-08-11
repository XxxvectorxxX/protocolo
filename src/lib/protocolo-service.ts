import { isApiEnabled, useMockData } from "./config"
import { getMockProtocolos, addMockProtocolo, updateMockProtocolo } from "./mock-data"
import ApiClient from "./api-client"
import type { ProtocoloAtendimento, ApiContact } from "./api-config"

export class ProtocoloService {
  private apiClient: ApiClient
  private protocolos: Map<string, ProtocoloAtendimento> = new Map()
  private isApiMode: boolean
  private isMockMode: boolean

  constructor() {
    this.apiClient = new ApiClient()
    this.isApiMode = isApiEnabled()
    this.isMockMode = useMockData()

    // Se estiver usando dados mockados, carregar na inicialização
    if (this.isMockMode) {
      this.carregarProtocolosMockados()
    }
  }

  private carregarProtocolosMockados(): void {
    console.log("🎭 [MOCK] Carregando protocolos mockados...")
    const mockProtocolos = getMockProtocolos()
    mockProtocolos.forEach((protocolo) => {
      this.protocolos.set(protocolo.id, protocolo)
    })
    console.log(`🎭 [MOCK] ${mockProtocolos.length} protocolos carregados`)
  }

  // Gerar número de protocolo
  private gerarNumeroProtocolo(): string {
    const ano = new Date().getFullYear()
    const timestamp = Date.now().toString().slice(-6)
    return `ATD-${ano}-${timestamp}`
  }

  // Simular delay para operações mockadas
  private async mockDelay(ms = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Criar novo protocolo
  async criarProtocolo(dados: {
    cliente: { nome: string; telefone: string; email?: string }
    assunto: string
    descricao: string
    prioridade: "baixa" | "media" | "alta" | "critica"
    categoria: string
    responsavel?: string
    whatsappId: string
  }): Promise<{ protocolo: ProtocoloAtendimento; success: boolean; error?: string }> {
    try {
      const numeroProtocolo = this.gerarNumeroProtocolo()
      console.log(`🎫 Criando protocolo: ${numeroProtocolo}`)

      if (this.isMockMode) {
        // Modo mockado
        console.log("🎭 [MOCK] Criando protocolo mockado...")
        await this.mockDelay(2000)

        const protocolo: ProtocoloAtendimento = {
          id: crypto.randomUUID(),
          numero: numeroProtocolo,
          cliente: dados.cliente,
          assunto: dados.assunto,
          descricao: dados.descricao,
          prioridade: dados.prioridade,
          status: "aberto",
          categoria: dados.categoria,
          responsavel: dados.responsavel,
          dataAbertura: new Date().toISOString(),
          ticketId: `ticket-${Date.now()}`,
          contactId: `contact-${Date.now()}`,
          whatsappId: dados.whatsappId,
          mensagens: [
            {
              id: `msg-${Date.now()}`,
              body: `🎫 *Protocolo Criado com Sucesso!*\n\n📋 *Número:* ${numeroProtocolo}\n📝 *Assunto:* ${dados.assunto}\n⚡ *Prioridade:* ${dados.prioridade.toUpperCase()}\n📅 *Data:* ${new Date().toLocaleString("pt-BR")}\n🏷️ *Categoria:* ${dados.categoria}\n${dados.responsavel ? `👤 *Responsável:* ${dados.responsavel}\n` : ""}\n✅ *Seu atendimento foi protocolado!*\n📱 Acompanhe o andamento através deste número de protocolo.`,
              fromMe: true,
              read: true,
              timestamp: Date.now(),
              contactId: `contact-${Date.now()}`,
              ticketId: `ticket-${Date.now()}`,
              ack: 3,
            },
          ],
          anexos: [],
          observacoes: "",
        }

        // Salvar no mock e no cache local
        this.protocolos.set(protocolo.id, protocolo)
        addMockProtocolo(protocolo)

        console.log("✅ [MOCK] Protocolo criado com sucesso")
        return { protocolo, success: true }
      }

      // Modo API (código original)
      let contact: ApiContact | null = null

      const contactsResult = await this.apiClient.getContacts()
      if (contactsResult.success) {
        contact = contactsResult.data.find((c) => c.number === dados.cliente.telefone) || null
      }

      if (!contact) {
        const createContactResult = await this.apiClient.createContact({
          name: dados.cliente.nome,
          number: dados.cliente.telefone,
          email: dados.cliente.email,
        })

        if (createContactResult.success) {
          contact = createContactResult.data
          console.log("👤 Contato criado:", contact)
        } else {
          console.error("❌ Erro ao criar contato:", createContactResult.error)
          return {
            protocolo: {} as ProtocoloAtendimento,
            success: false,
            error: `Erro ao criar contato: ${createContactResult.error}`,
          }
        }
      }

      if (!contact) {
        return {
          protocolo: {} as ProtocoloAtendimento,
          success: false,
          error: "Não foi possível criar ou encontrar o contato",
        }
      }

      let userId: string | undefined
      if (dados.responsavel) {
        const usersResult = await this.apiClient.getUsers()
        if (usersResult.success) {
          const user = usersResult.data.find((u) => u.name === dados.responsavel)
          userId = user?.id
        }
      }

      const ticketResult = await this.apiClient.createTicket({
        contactId: contact.id,
        whatsappId: dados.whatsappId,
        userId: userId,
        status: "open",
      })

      if (!ticketResult.success) {
        console.error("❌ Erro ao criar ticket:", ticketResult.error)
        return {
          protocolo: {} as ProtocoloAtendimento,
          success: false,
          error: `Erro ao criar ticket: ${ticketResult.error}`,
        }
      }

      const ticket = ticketResult.data
      console.log("🎫 Ticket criado:", ticket)

      const protocolo: ProtocoloAtendimento = {
        id: crypto.randomUUID(),
        numero: numeroProtocolo,
        cliente: dados.cliente,
        assunto: dados.assunto,
        descricao: dados.descricao,
        prioridade: dados.prioridade,
        status: "aberto",
        categoria: dados.categoria,
        responsavel: dados.responsavel,
        dataAbertura: new Date().toISOString(),
        ticketId: ticket.id,
        contactId: contact.id,
        whatsappId: dados.whatsappId,
        mensagens: [],
        anexos: [],
        observacoes: "",
      }

      this.protocolos.set(protocolo.id, protocolo)

      const mensagemConfirmacao =
        `🎫 *Protocolo Criado com Sucesso!*\n\n` +
        `📋 *Número:* ${numeroProtocolo}\n` +
        `📝 *Assunto:* ${dados.assunto}\n` +
        `⚡ *Prioridade:* ${dados.prioridade.toUpperCase()}\n` +
        `📅 *Data:* ${new Date().toLocaleString("pt-BR")}\n` +
        `🏷️ *Categoria:* ${dados.categoria}\n` +
        (dados.responsavel ? `👤 *Responsável:* ${dados.responsavel}\n` : "") +
        `\n✅ *Seu atendimento foi protocolado!*\n` +
        `📱 Acompanhe o andamento através deste número de protocolo.\n` +
        `💬 Responda esta mensagem para adicionar informações ao protocolo.`

      const sendResult = await this.apiClient.sendMessage({
        ticketId: ticket.id,
        body: mensagemConfirmacao,
      })

      if (sendResult.success) {
        protocolo.mensagens.push(sendResult.data)
        console.log("📨 Mensagem de confirmação enviada")
      } else {
        console.warn("⚠️ Erro ao enviar mensagem de confirmação:", sendResult.error)
      }

      return { protocolo, success: true }
    } catch (error) {
      console.error("💥 Erro ao criar protocolo:", error)
      return {
        protocolo: {} as ProtocoloAtendimento,
        success: false,
        error: error instanceof Error ? error.message : "Erro ao criar protocolo",
      }
    }
  }

  // Sincronizar protocolos
  async sincronizarProtocolos(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log("🔄 Sincronizando protocolos...")

      if (this.isMockMode) {
        console.log("🎭 [MOCK] Sincronização mockada - dados já carregados")
        await this.mockDelay(500)
        return { success: true }
      }

      const ticketsResult = await this.apiClient.getTickets()
      if (!ticketsResult.success) {
        return { success: false, error: ticketsResult.error }
      }

      const tickets = ticketsResult.data
      console.log(`📊 Encontrados ${tickets.length} tickets na API`)

      for (const ticket of tickets) {
        const protocoloExistente = Array.from(this.protocolos.values()).find((p) => p.ticketId === ticket.id)

        if (!protocoloExistente) {
          const protocolo: ProtocoloAtendimento = {
            id: crypto.randomUUID(),
            numero: `API-${ticket.id}`,
            cliente: {
              nome: ticket.contact?.name || "Cliente",
              telefone: ticket.contact?.number || "",
              email: "",
            },
            assunto: "Atendimento via API",
            descricao: "Protocolo sincronizado da API",
            prioridade: "media",
            status: this.mapTicketStatusToProtocoloStatus(ticket.status),
            categoria: ticket.queue?.name || "Geral",
            responsavel: ticket.user?.name,
            dataAbertura: ticket.createdAt,
            dataFechamento: ticket.status === "closed" ? ticket.updatedAt : undefined,
            ticketId: ticket.id,
            contactId: ticket.contactId,
            whatsappId: ticket.whatsappId,
            mensagens: [],
            anexos: [],
            observacoes: "",
          }

          this.protocolos.set(protocolo.id, protocolo)
        }
      }

      return { success: true }
    } catch (error) {
      console.error("💥 Erro ao sincronizar protocolos:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao sincronizar",
      }
    }
  }

  // Mapear status do ticket para status do protocolo
  private mapTicketStatusToProtocoloStatus(ticketStatus: string): ProtocoloAtendimento["status"] {
    switch (ticketStatus) {
      case "open":
        return "aberto"
      case "pending":
        return "em_andamento"
      case "closed":
        return "fechado"
      default:
        return "aberto"
    }
  }

  // Mapear status do protocolo para status do ticket
  private mapProtocoloStatusToTicketStatus(protocoloStatus: ProtocoloAtendimento["status"]): string {
    switch (protocoloStatus) {
      case "aberto":
        return "open"
      case "em_andamento":
      case "aguardando_cliente":
        return "pending"
      case "resolvido":
      case "fechado":
        return "closed"
      default:
        return "open"
    }
  }

  // Listar protocolos
  listarProtocolos(): ProtocoloAtendimento[] {
    return Array.from(this.protocolos.values()).sort(
      (a, b) => new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime(),
    )
  }

  // Buscar protocolo por ID
  buscarProtocolo(id: string): ProtocoloAtendimento | undefined {
    return this.protocolos.get(id)
  }

  // Buscar protocolo por número
  buscarProtocoloPorNumero(numero: string): ProtocoloAtendimento | undefined {
    return Array.from(this.protocolos.values()).find((p) => p.numero === numero)
  }

  // Atualizar status do protocolo
  async atualizarStatus(
    protocoloId: string,
    novoStatus: ProtocoloAtendimento["status"],
    observacao?: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const protocolo = this.protocolos.get(protocoloId)
      if (!protocolo) {
        return { success: false, error: "Protocolo não encontrado" }
      }

      console.log(`🔄 Atualizando status do protocolo ${protocolo.numero}: ${protocolo.status} → ${novoStatus}`)

      if (this.isMockMode) {
        console.log("🎭 [MOCK] Atualizando status mockado...")
        await this.mockDelay(1000)

        // Atualizar protocolo local
        protocolo.status = novoStatus
        if (observacao) {
          protocolo.observacoes = (protocolo.observacoes || "") + "\n" + observacao
        }

        if (novoStatus === "resolvido" || novoStatus === "fechado") {
          protocolo.dataFechamento = new Date().toISOString()
        }

        // Atualizar no mock
        updateMockProtocolo(protocoloId, {
          status: novoStatus,
          observacoes: protocolo.observacoes,
          dataFechamento: protocolo.dataFechamento,
        })

        // Simular mensagem de status
        const novaMensagem = {
          id: `msg-${Date.now()}`,
          body: `🔄 *Atualização do Protocolo ${protocolo.numero}*\n\n📊 *Novo Status:* ${novoStatus.replace("_", " ").toUpperCase()}\n📅 *Data:* ${new Date().toLocaleString("pt-BR")}\n${observacao ? `📝 *Observação:* ${observacao}\n` : ""}\n💬 Continue acompanhando seu atendimento por aqui!`,
          fromMe: true,
          read: true,
          timestamp: Date.now(),
          contactId: protocolo.contactId || "contact-1",
          ticketId: protocolo.ticketId || "ticket-1",
          ack: 3,
        }

        protocolo.mensagens.push(novaMensagem)
        console.log("✅ [MOCK] Status atualizado com sucesso")
        return { success: true }
      }

      // Modo API (código original)
      if (protocolo.ticketId) {
        const ticketStatus = this.mapProtocoloStatusToTicketStatus(novoStatus)
        const updateResult = await this.apiClient.updateTicket(protocolo.ticketId, {
          status: ticketStatus,
        })

        if (!updateResult.success) {
          console.error("❌ Erro ao atualizar ticket na API:", updateResult.error)
          return { success: false, error: updateResult.error }
        }

        console.log("✅ Ticket atualizado na API")
      }

      protocolo.status = novoStatus
      if (observacao) {
        protocolo.observacoes = (protocolo.observacoes || "") + "\n" + observacao
      }

      if (novoStatus === "resolvido" || novoStatus === "fechado") {
        protocolo.dataFechamento = new Date().toISOString()
      }

      if (protocolo.ticketId) {
        const mensagemStatus =
          `🔄 *Atualização do Protocolo ${protocolo.numero}*\n\n` +
          `📊 *Novo Status:* ${novoStatus.replace("_", " ").toUpperCase()}\n` +
          `📅 *Data:* ${new Date().toLocaleString("pt-BR")}\n` +
          (observacao ? `📝 *Observação:* ${observacao}\n` : "") +
          `\n💬 Continue acompanhando seu atendimento por aqui!`

        const sendResult = await this.apiClient.sendMessage({
          ticketId: protocolo.ticketId,
          body: mensagemStatus,
        })

        if (sendResult.success) {
          protocolo.mensagens.push(sendResult.data)
          console.log("📨 Mensagem de status enviada")
        } else {
          console.warn("⚠️ Erro ao enviar mensagem de status:", sendResult.error)
        }
      }

      return { success: true }
    } catch (error) {
      console.error("💥 Erro ao atualizar status:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao atualizar status",
      }
    }
  }

  // Adicionar mensagem ao protocolo
  async adicionarMensagem(
    protocoloId: string,
    mensagem: string,
    enviarParaCliente = true,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const protocolo = this.protocolos.get(protocoloId)
      if (!protocolo) {
        return { success: false, error: "Protocolo não encontrado" }
      }

      console.log(`💬 Adicionando mensagem ao protocolo ${protocolo.numero}`)

      if (this.isMockMode) {
        console.log("🎭 [MOCK] Enviando mensagem mockada...")
        await this.mockDelay(1000)

        if (enviarParaCliente) {
          const mensagemCompleta = `📝 *Protocolo ${protocolo.numero}*\n\n${mensagem}`

          const novaMensagem = {
            id: `msg-${Date.now()}`,
            body: mensagemCompleta,
            fromMe: true,
            read: true,
            timestamp: Date.now(),
            contactId: protocolo.contactId || "contact-1",
            ticketId: protocolo.ticketId || "ticket-1",
            ack: 3,
          }

          protocolo.mensagens.push(novaMensagem)
          console.log("✅ [MOCK] Mensagem enviada com sucesso")
        }

        return { success: true }
      }

      if (enviarParaCliente && protocolo.ticketId) {
        const mensagemCompleta = `📝 *Protocolo ${protocolo.numero}*\n\n${mensagem}`

        const sendResult = await this.apiClient.sendMessage({
          ticketId: protocolo.ticketId,
          body: mensagemCompleta,
        })

        if (sendResult.success) {
          protocolo.mensagens.push(sendResult.data)
          console.log("📨 Mensagem enviada com sucesso")
          return { success: true }
        } else {
          console.error("❌ Erro ao enviar mensagem:", sendResult.error)
          return { success: false, error: sendResult.error }
        }
      }

      return { success: true }
    } catch (error) {
      console.error("💥 Erro ao adicionar mensagem:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao adicionar mensagem",
      }
    }
  }

  // Carregar mensagens de um protocolo
  async carregarMensagens(protocoloId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const protocolo = this.protocolos.get(protocoloId)
      if (!protocolo || !protocolo.ticketId) {
        return { success: false, error: "Protocolo não encontrado ou sem ticket associado" }
      }

      console.log(`📥 Carregando mensagens do protocolo ${protocolo.numero}`)

      if (this.isMockMode) {
        console.log("🎭 [MOCK] Mensagens já carregadas")
        return { success: true }
      }

      const messagesResult = await this.apiClient.getMessages(protocolo.ticketId)
      if (messagesResult.success) {
        protocolo.mensagens = messagesResult.data
        console.log(`📨 ${messagesResult.data.length} mensagens carregadas`)
        return { success: true }
      } else {
        console.error("❌ Erro ao carregar mensagens:", messagesResult.error)
        return { success: false, error: messagesResult.error }
      }
    } catch (error) {
      console.error("💥 Erro ao carregar mensagens:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao carregar mensagens",
      }
    }
  }

  // Obter estatísticas
  obterEstatisticas() {
    const protocolos = this.listarProtocolos()

    return {
      total: protocolos.length,
      abertos: protocolos.filter((p) => p.status === "aberto").length,
      emAndamento: protocolos.filter((p) => p.status === "em_andamento").length,
      aguardandoCliente: protocolos.filter((p) => p.status === "aguardando_cliente").length,
      resolvidos: protocolos.filter((p) => p.status === "resolvido").length,
      fechados: protocolos.filter((p) => p.status === "fechado").length,
      porPrioridade: {
        critica: protocolos.filter((p) => p.prioridade === "critica").length,
        alta: protocolos.filter((p) => p.prioridade === "alta").length,
        media: protocolos.filter((p) => p.prioridade === "media").length,
        baixa: protocolos.filter((p) => p.prioridade === "baixa").length,
      },
    }
  }

  // Verificar se está usando API ou mock
  isUsingApi(): boolean {
    return this.isApiMode
  }

  // Verificar se está usando dados mockados
  isUsingMock(): boolean {
    return this.isMockMode
  }
}
