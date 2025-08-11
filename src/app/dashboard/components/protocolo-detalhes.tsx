"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { MessageSquare, Send, Phone, Mail, User, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import type { ProtocoloAtendimento } from "../../../lib/api-config"
import type { ProtocoloService } from "../../../lib/protocolo-service"

interface ProtocoloDetalhesProps {
  protocolo: ProtocoloAtendimento
  isOpen: boolean
  onClose: () => void
  protocoloService: ProtocoloService
  sessaoAtiva: string
  onProtocoloUpdate: (protocolo: ProtocoloAtendimento) => void
}

export function ProtocoloDetalhes({
  protocolo,
  isOpen,
  onClose,
  protocoloService,
  sessaoAtiva,
  onProtocoloUpdate,
}: ProtocoloDetalhesProps) {
  const [novaMensagem, setNovaMensagem] = useState("")
  const [novoStatus, setNovoStatus] = useState(protocolo.status)
  const [observacaoStatus, setObservacaoStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aberto":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "em_andamento":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "aguardando_cliente":
        return <User className="h-4 w-4 text-yellow-500" />
      case "resolvido":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fechado":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

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

  const handleEnviarMensagem = async () => {
    if (!novaMensagem.trim()) return

    setIsLoading(true)
    try {
      const result = await protocoloService.adicionarMensagem(protocolo.id, novaMensagem, sessaoAtiva, true)

      if (result.success) {
        setNovaMensagem("")
        // Atualizar protocolo localmente
        const protocoloAtualizado = protocoloService.buscarProtocolo(protocolo.id)
        if (protocoloAtualizado) {
          onProtocoloUpdate(protocoloAtualizado)
        }
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAtualizarStatus = async () => {
    if (novoStatus === protocolo.status) return

    setIsLoading(true)
    try {
      const result = await protocoloService.atualizarStatus(protocolo.id, novoStatus, observacaoStatus, sessaoAtiva)

      if (result.success) {
        setObservacaoStatus("")
        // Atualizar protocolo localmente
        const protocoloAtualizado = protocoloService.buscarProtocolo(protocolo.id)
        if (protocoloAtualizado) {
          onProtocoloUpdate(protocoloAtualizado)
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const tempoAberto = protocolo.dataFechamento
    ? Math.floor(
        (new Date(protocolo.dataFechamento).getTime() - new Date(protocolo.dataAbertura).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : Math.floor((new Date().getTime() - new Date(protocolo.dataAbertura).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{protocolo.assunto}</span>
            <Badge variant="outline" className={getStatusColor(protocolo.status)}>
              {getStatusIcon(protocolo.status)}
              <span className="ml-1 capitalize">{protocolo.status.replace("_", " ")}</span>
            </Badge>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${getPrioridadeColor(protocolo.prioridade)}`}></div>
              <span className="text-sm text-gray-600 capitalize">{protocolo.prioridade}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detalhes do Protocolo */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Protocolo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Descrição</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{protocolo.descricao}</p>
                </div>

                {protocolo.observacoes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Observações</h4>
                    <p className="text-gray-700 whitespace-pre-wrap bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      {protocolo.observacoes}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <span className="text-sm text-gray-500">Protocolo</span>
                    <p className="font-mono text-blue-600">{protocolo.numero}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Data de Abertura</span>
                    <p className="font-medium">{new Date(protocolo.dataAbertura).toLocaleDateString("pt-BR")}</p>
                  </div>
                  {protocolo.dataFechamento && (
                    <div>
                      <span className="text-sm text-gray-500">Data de Fechamento</span>
                      <p className="font-medium">{new Date(protocolo.dataFechamento).toLocaleDateString("pt-BR")}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500">Tempo Aberto</span>
                    <p className="font-medium">{tempoAberto} dia(s)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Mensagens */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Mensagens WhatsApp ({protocolo.mensagens.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {protocolo.mensagens.map((mensagem, index) => (
                    <div key={index} className="border-l-4 border-green-200 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {mensagem.from === protocolo.cliente.telefone ? protocolo.cliente.nome : "Atendente"}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {mensagem.type}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(mensagem.timestamp).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{mensagem.body}</p>
                    </div>
                  ))}

                  {protocolo.mensagens.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Nenhuma mensagem ainda.</p>
                  )}
                </div>

                {/* Enviar Nova Mensagem */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Enviar Mensagem para Cliente</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={novaMensagem}
                      onChange={(e) => setNovaMensagem(e.target.value)}
                      rows={3}
                    />
                    <Button
                      onClick={handleEnviarMensagem}
                      disabled={!novaMensagem.trim() || isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Enviar via WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Nome</span>
                  <p className="font-medium">{protocolo.cliente.nome}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{protocolo.cliente.telefone}</span>
                </div>
                {protocolo.cliente.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{protocolo.cliente.email}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações do Protocolo */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Categoria</span>
                  <p className="font-medium">{protocolo.categoria}</p>
                </div>
                {protocolo.responsavel && (
                  <div>
                    <span className="text-sm text-gray-500">Responsável</span>
                    <p className="font-medium">{protocolo.responsavel}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-500">Prioridade</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-3 h-3 rounded-full ${getPrioridadeColor(protocolo.prioridade)}`}></div>
                    <span className="font-medium capitalize">{protocolo.prioridade}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alterar Status */}
            <Card>
              <CardHeader>
                <CardTitle>Alterar Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Select value={novoStatus} onValueChange={setNovoStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aberto">Aberto</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="aguardando_cliente">Aguardando Cliente</SelectItem>
                      <SelectItem value="resolvido">Resolvido</SelectItem>
                      <SelectItem value="fechado">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {novoStatus !== protocolo.status && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Observação sobre a mudança de status (opcional)"
                      value={observacaoStatus}
                      onChange={(e) => setObservacaoStatus(e.target.value)}
                      rows={2}
                    />
                    <Button
                      onClick={handleAtualizarStatus}
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Atualizar Status
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
