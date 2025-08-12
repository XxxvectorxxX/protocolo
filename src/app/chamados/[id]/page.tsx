"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { ProtectedRoute } from "../../../components/auth/protected-route"
import { useAuth } from "../../../contexts/auth-context"
import type { Chamado, Conversa } from "../../../types"
import {
  ArrowLeft,
  Send,
  Phone,
  Mail,
  Clock,
  User,
  MessageSquare,
  Paperclip,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { api } from "../../../lib/api"

export default function ChamadoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [chamado, setChamado] = useState<Chamado | null>(null)
  const [loading, setLoading] = useState(true)
  const [novaMensagem, setNovaMensagem] = useState("")
  const [novoStatus, setNovoStatus] = useState("")
  const [enviandoMensagem, setEnviandoMensagem] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadChamado(params.id as string)
    }
  }, [params.id])

  const loadChamado = async (id: string) => {
    try {
      setLoading(true)
      // Simular dados do chamado com conversas
      const mockChamado: Chamado = {
        id: "1",
        protocolo: "2024-001",
        clienteId: "1",
        cliente: {
          id: "1",
          nome: "João Silva",
          email: "joao@empresa.com",
          telefone: "(11) 99999-9999",
          documento: "123.456.789-00",
          dataCadastro: "2024-01-15",
          ativo: true,
        },
        atendenteId: "2",
        atendente: {
          id: "2",
          nome: "Maria Atendente",
          email: "maria@royal.com",
          perfil: "atendente",
          departamento: "Suporte",
          ativo: true,
          chamadosAtivos: 3,
        },
        assunto: "Sistema não está funcionando",
        descricao:
          "O sistema apresenta erro ao tentar fazer login. Quando clico no botão entrar, aparece uma mensagem de erro.",
        status: "em_andamento",
        prioridade: "alta",
        categoria: "Técnico",
        dataAbertura: "2024-01-20T10:00:00Z",
        dataUltimaInteracao: "2024-01-20T14:30:00Z",
        tempoSemAtendimento: 30,
        conversas: [
          {
            id: "1",
            chamadoId: "1",
            autorId: "1",
            autorTipo: "cliente",
            mensagem: "Olá, estou com problema para fazer login no sistema. Aparece erro 'Credenciais inválidas'.",
            dataEnvio: "2024-01-20T10:00:00Z",
            lida: true,
            tipoMensagem: "texto",
          },
          {
            id: "2",
            chamadoId: "1",
            autorId: "2",
            autorTipo: "atendente",
            mensagem: "Olá João! Vou verificar seu problema. Pode me informar qual navegador está usando?",
            dataEnvio: "2024-01-20T10:15:00Z",
            lida: true,
            tipoMensagem: "texto",
          },
          {
            id: "3",
            chamadoId: "1",
            autorId: "1",
            autorTipo: "cliente",
            mensagem: "Estou usando o Chrome, versão mais recente.",
            dataEnvio: "2024-01-20T10:20:00Z",
            lida: true,
            tipoMensagem: "texto",
          },
          {
            id: "4",
            chamadoId: "1",
            autorId: "2",
            autorTipo: "atendente",
            mensagem: "Perfeito! Vou verificar se há algum problema com a autenticação. Aguarde um momento.",
            dataEnvio: "2024-01-20T14:30:00Z",
            lida: true,
            tipoMensagem: "texto",
          },
        ],
        anexos: [],
        tags: ["login", "erro"],
        informacoesCliente: {
          tipoSistema: "ERP",
          versaoSistema: "v2.1.0",
          tipoErro: "Autenticação",
          configuracaoMaquina: {
            sistemaOperacional: "Windows 11",
            versaoSO: "22H2",
            memoria: "16GB",
            processador: "Intel i7",
            espacoDisco: "500GB SSD",
            resolucaoTela: "1920x1080",
          },
        },
      }

      setChamado(mockChamado)
      setNovoStatus(mockChamado.status)
    } catch (error) {
      console.error("Erro ao carregar chamado:", error)
    } finally {
      setLoading(false)
    }
  }

  const enviarMensagem = async () => {
    if (!novaMensagem.trim() || !chamado) return

    try {
      setEnviandoMensagem(true)

      const novaMensagemObj: Conversa = {
        id: Date.now().toString(),
        chamadoId: chamado.id,
        autorId: user?.id || "1",
        autorTipo: user?.perfil === "cliente" ? "cliente" : "atendente",
        mensagem: novaMensagem,
        dataEnvio: new Date().toISOString(),
        lida: false,
        tipoMensagem: "texto",
      }

      setChamado((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          conversas: [...prev.conversas, novaMensagemObj],
          dataUltimaInteracao: new Date().toISOString(),
        }
      })

      setNovaMensagem("")

      // Simular envio via WhatsApp se necessário
      if (user?.perfil !== "cliente") {
        await api.sendWhatsAppMessage(chamado.cliente.telefone, novaMensagem)
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    } finally {
      setEnviandoMensagem(false)
    }
  }

  const atualizarStatus = async () => {
    if (!chamado || novoStatus === chamado.status) return

    try {
      await api.updateChamado(chamado.id, { status: novoStatus as any })
      setChamado((prev) => (prev ? { ...prev, status: novoStatus as any } : prev))
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aberto":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "em_andamento":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "finalizado":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando chamado...</div>
      </div>
    )
  }

  if (!chamado) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chamado não encontrado</div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/chamados">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            {getStatusIcon(chamado.status)}
            <h1 className="text-3xl font-bold">Chamado #{chamado.protocolo}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do Chamado */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{chamado.assunto}</CardTitle>
                    <CardDescription className="mt-2">{chamado.descricao}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={chamado.prioridade === "alta" ? "destructive" : "secondary"}>
                      {chamado.prioridade}
                    </Badge>
                    <Badge variant="outline">{chamado.categoria}</Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Conversas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {chamado.conversas.map((conversa) => (
                    <div
                      key={conversa.id}
                      className={`flex ${conversa.autorTipo === "cliente" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          conversa.autorTipo === "cliente" ? "bg-gray-100 text-gray-900" : "bg-blue-500 text-white"
                        }`}
                      >
                        <p className="text-sm">{conversa.mensagem}</p>
                        <p
                          className={`text-xs mt-1 ${
                            conversa.autorTipo === "cliente" ? "text-gray-500" : "text-blue-100"
                          }`}
                        >
                          {new Date(conversa.dataEnvio).toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nova Mensagem */}
                <div className="mt-4 space-y-2">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Anexar
                    </Button>
                    <Button onClick={enviarMensagem} disabled={enviandoMensagem || !novaMensagem.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      {enviandoMensagem ? "Enviando..." : "Enviar"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status e Ações */}
            <Card>
              <CardHeader>
                <CardTitle>Status e Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={novoStatus} onValueChange={setNovoStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aberto">Aberto</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="aguardando_cliente">Aguardando Cliente</SelectItem>
                      <SelectItem value="finalizado">Finalizado</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  {novoStatus !== chamado.status && (
                    <Button onClick={atualizarStatus} size="sm" className="mt-2 w-full">
                      Atualizar Status
                    </Button>
                  )}
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar via WhatsApp
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Relatório por Email
                </Button>
              </CardContent>
            </Card>

            {/* Informações do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="font-medium">{chamado.cliente.nome}</p>
                  <p className="text-sm text-gray-600">{chamado.cliente.email}</p>
                  <p className="text-sm text-gray-600">{chamado.cliente.telefone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Informações Técnicas */}
            {chamado.informacoesCliente && (
              <Card>
                <CardHeader>
                  <CardTitle>Informações Técnicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {chamado.informacoesCliente.tipoSistema && (
                    <div>
                      <span className="font-medium">Sistema:</span> {chamado.informacoesCliente.tipoSistema}
                    </div>
                  )}
                  {chamado.informacoesCliente.versaoSistema && (
                    <div>
                      <span className="font-medium">Versão:</span> {chamado.informacoesCliente.versaoSistema}
                    </div>
                  )}
                  {chamado.informacoesCliente.tipoErro && (
                    <div>
                      <span className="font-medium">Tipo de Erro:</span> {chamado.informacoesCliente.tipoErro}
                    </div>
                  )}
                  {chamado.informacoesCliente.configuracaoMaquina && (
                    <div className="mt-3">
                      <p className="font-medium mb-2">Configuração da Máquina:</p>
                      <div className="space-y-1 text-xs">
                        <div>SO: {chamado.informacoesCliente.configuracaoMaquina.sistemaOperacional}</div>
                        <div>Memória: {chamado.informacoesCliente.configuracaoMaquina.memoria}</div>
                        <div>Processador: {chamado.informacoesCliente.configuracaoMaquina.processador}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Atendente */}
            {chamado.atendente && (
              <Card>
                <CardHeader>
                  <CardTitle>Atendente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-medium">{chamado.atendente.nome}</p>
                    <p className="text-sm text-gray-600">{chamado.atendente.departamento}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
