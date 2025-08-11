"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import {
  Plus,
  Search,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Calendar,
  Filter,
  RefreshCw,
  Zap,
} from "lucide-react"
import { ProtocoloService } from "../../../lib/protocolo-service"
import type { ProtocoloAtendimento, ApiSession } from "../../../lib/api-config"
import ApiClient from "../../../lib/api-client"
import { NovoProtocoloModal } from "./novo-protocolo-modal"
import { ProtocoloDetalhes } from "./protocolo-detalhes"
import { GerenciadorSessoes } from "./gerenciador-sessoes"
import { useToast } from "../../../hooks/use-toast"

interface DashboardAtendimentosProps {
  mode?: "api" | "mock"
}

export function DashboardAtendimentos({ mode = "mock" }: DashboardAtendimentosProps) {
  const { toast } = useToast()
  const [protocoloService] = useState(() => new ProtocoloService())
  const [apiClient] = useState(() => new ApiClient())
  const [protocolos, setProtocolos] = useState<ProtocoloAtendimento[]>([])
  const [sessoes, setSessoes] = useState<ApiSession[]>([])
  const [sessaoAtiva, setSessaoAtiva] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [prioridadeFilter, setPrioridadeFilter] = useState("todas")
  const [isNovoProtocoloOpen, setIsNovoProtocoloOpen] = useState(false)
  const [protocoloSelecionado, setProtocoloSelecionado] = useState<ProtocoloAtendimento | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    carregarDados()

    // Atualizar dados a cada 30 segundos
    const interval = setInterval(carregarDados, 30000)
    return () => clearInterval(interval)
  }, [])

  const carregarDados = async () => {
    if (!isLoading) setIsRefreshing(true)

    try {
      console.log("🔄 Carregando dados do dashboard...")

      // Carregar sessões
      const sessoesResult = await apiClient.getSessions()
      if (sessoesResult.success) {
        setSessoes(sessoesResult.data)
        console.log(`📱 ${sessoesResult.data.length} sessões encontradas`)

        // Definir primeira sessão conectada como ativa
        const sessaoConectada = sessoesResult.data.find((s) => s.status === "CONNECTED")
        if (sessaoConectada && !sessaoAtiva) {
          setSessaoAtiva(sessaoConectada.id)
          console.log(`✅ Sessão ativa definida: ${sessaoConectada.name}`)
        }
      } else {
        console.error("❌ Erro ao carregar sessões:", sessoesResult.error)
        toast({
          title: "Erro ao carregar sessões",
          description: sessoesResult.error,
          variant: "destructive",
        })
      }

      // Sincronizar protocolos com a API
      const syncResult = await protocoloService.sincronizarProtocolos()
      if (syncResult.success) {
        const protocolosData = protocoloService.listarProtocolos()
        setProtocolos(protocolosData)
        console.log(`📋 ${protocolosData.length} protocolos sincronizados`)
      } else {
        console.error("❌ Erro ao sincronizar protocolos:", syncResult.error)
        toast({
          title: "Erro ao sincronizar protocolos",
          description: syncResult.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("💥 Erro ao carregar dados:", error)
      toast({
        title: "Erro ao carregar dados",
        description: "Erro inesperado ao carregar dados do dashboard",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const filteredProtocolos = protocolos.filter((protocolo) => {
    const matchesSearch =
      protocolo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocolo.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocolo.assunto.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || protocolo.status === statusFilter
    const matchesPrioridade = prioridadeFilter === "todas" || protocolo.prioridade === prioridadeFilter

    return matchesSearch && matchesStatus && matchesPrioridade
  })

  const stats = protocoloService.obterEstatisticas()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aberto":
        return "bg-red-100 text-red-800 border-red-200"
      case "em_andamento":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "aguardando_cliente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolvido":
        return "bg-green-100 text-green-800 border-green-200"
      case "fechado":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "critica":
        return "bg-red-500"
      case "alta":
        return "bg-orange-500"
      case "media":
        return "bg-yellow-500"
      case "baixa":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleNovoProtocolo = async (dados: any) => {
    if (!sessaoAtiva) {
      toast({
        title: "Erro",
        description: "Nenhuma sessão WhatsApp ativa",
        variant: "destructive",
      })
      return { success: false, error: "Nenhuma sessão WhatsApp ativa" }
    }

    const result = await protocoloService.criarProtocolo({
      ...dados,
      whatsappId: sessaoAtiva,
    })

    if (result.success) {
      setProtocolos([result.protocolo, ...protocolos])
      setIsNovoProtocoloOpen(false)
      toast({
        title: "Protocolo criado!",
        description: `Protocolo ${result.protocolo.numero} criado com sucesso`,
      })
    } else {
      toast({
        title: "Erro ao criar protocolo",
        description: result.error,
        variant: "destructive",
      })
    }

    return result
  }

  const handleProtocoloUpdate = (protocoloAtualizado: ProtocoloAtendimento) => {
    setProtocolos((prev) => prev.map((p) => (p.id === protocoloAtualizado.id ? protocoloAtualizado : p)))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
          <p className="text-sm text-gray-500">Conectando com Royal Sistemas API</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard de Atendimentos</h1>
                <p className="text-gray-600">
                  {mode === "mock" ? "🎭 Modo Demonstração" : "🔗 Royal Sistemas API"} • {protocolos.length} protocolos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={carregarDados} variant="outline" size="sm" disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Atualizando..." : "Atualizar"}
              </Button>

              <GerenciadorSessoes
                sessoes={sessoes}
                sessaoAtiva={sessaoAtiva}
                onSessaoChange={setSessaoAtiva}
                apiClient={apiClient}
                onSessoesUpdate={setSessoes}
              />

              <Button
                onClick={() => setIsNovoProtocoloOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!sessaoAtiva}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Protocolo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Abertos</p>
                  <p className="text-2xl font-bold text-red-600">{stats.abertos}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Em Andamento</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.emAndamento}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Aguardando</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.aguardandoCliente}</p>
                </div>
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolvidos</p>
                  <p className="text-2xl font-bold text-green-600">{stats.resolvidos}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fechados</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.fechados}</p>
                </div>
                <Users className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar protocolo, cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="aguardando_cliente">Aguardando Cliente</SelectItem>
                  <SelectItem value="resolvido">Resolvido</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Prioridades</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={carregarDados}
                  className="flex-1 bg-transparent"
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                  Sincronizar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Protocolos */}
        <Card>
          <CardHeader>
            <CardTitle>Protocolos de Atendimento</CardTitle>
            <CardDescription>
              {filteredProtocolos.length} protocolo(s) encontrado(s)
              <Badge variant="outline" className="ml-2">
                {mode === "mock" ? "Demonstração" : "API Real"}
              </Badge>
              {sessaoAtiva && (
                <Badge variant="outline" className="ml-2">
                  Sessão: {sessoes.find((s) => s.id === sessaoAtiva)?.name || sessaoAtiva}
                </Badge>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProtocolos.map((protocolo) => (
                <div
                  key={protocolo.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setProtocoloSelecionado(protocolo)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{protocolo.assunto}</h3>
                        <Badge variant="outline" className={getStatusColor(protocolo.status)}>
                          {protocolo.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getPrioridadeColor(protocolo.prioridade)}`}></div>
                          <span className="text-sm text-gray-600 capitalize">{protocolo.prioridade}</span>
                        </div>
                        {protocolo.ticketId && (
                          <Badge variant="outline" className="text-xs">
                            API: {protocolo.ticketId}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{protocolo.cliente.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{protocolo.cliente.telefone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(protocolo.dataAbertura).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div>
                          <span className="font-medium">Protocolo: </span>
                          <span className="font-mono text-blue-600">{protocolo.numero}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 line-clamp-2">{protocolo.descricao}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span>
                            Categoria: <span className="font-medium">{protocolo.categoria}</span>
                          </span>
                          {protocolo.responsavel && (
                            <span className="ml-4">
                              Responsável: <span className="font-medium">{protocolo.responsavel}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MessageSquare className="h-4 w-4" />
                          <span>{protocolo.mensagens.length} mensagens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProtocolos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum protocolo encontrado.</p>
                  {!sessaoAtiva && <p className="text-sm mt-2">Configure uma sessão do WhatsApp para começar.</p>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modais */}
      <NovoProtocoloModal
        isOpen={isNovoProtocoloOpen}
        onClose={() => setIsNovoProtocoloOpen(false)}
        onSubmit={handleNovoProtocolo}
        sessaoAtiva={sessaoAtiva}
      />

      {protocoloSelecionado && (
        <ProtocoloDetalhes
          protocolo={protocoloSelecionado}
          isOpen={!!protocoloSelecionado}
          onClose={() => setProtocoloSelecionado(null)}
          protocoloService={protocoloService}
          sessaoAtiva={sessaoAtiva}
          onProtocoloUpdate={handleProtocoloUpdate}
        />
      )}
    </div>
  )
}
