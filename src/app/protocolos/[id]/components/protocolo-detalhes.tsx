"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Edit,
  MessageSquare,
  Paperclip,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
} from "lucide-react"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Textarea } from "../../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { useToast } from "../../../../hooks/use-toast"
import { adicionarComentario, atualizarStatusProtocolo } from "../../../../lib/actions"
import type { Protocolo, ProtocoloComentario, ProtocoloAnexo, Usuario } from "../../../../lib/supabase"

interface ProtocoloDetalhesProps {
  protocolo: Protocolo
  comentarios: ProtocoloComentario[]
  anexos: ProtocoloAnexo[]
  usuarios: Usuario[]
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Aberto":
      return <AlertCircle className="h-4 w-4" />
    case "Em Andamento":
      return <Clock className="h-4 w-4" />
    case "Aguardando Cliente":
      return <User className="h-4 w-4" />
    case "Resolvido":
      return <CheckCircle className="h-4 w-4" />
    case "Fechado":
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aberto":
      return "bg-red-100 text-red-800 border-red-200"
    case "Em Andamento":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Aguardando Cliente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Resolvido":
      return "bg-green-100 text-green-800 border-green-200"
    case "Fechado":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "Crítica":
      return "bg-red-500"
    case "Alta":
      return "bg-orange-500"
    case "Média":
      return "bg-yellow-500"
    case "Baixa":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export function ProtocoloDetalhes({ protocolo, comentarios, anexos, usuarios }: ProtocoloDetalhesProps) {
  const { toast } = useToast()
  const [novoComentario, setNovoComentario] = useState("")
  const [novoStatus, setNovoStatus] = useState(protocolo.status)
  const [comentarioStatus, setComentarioStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleAdicionarComentario() {
    if (!novoComentario.trim()) return

    setIsLoading(true)
    try {
      const result = await adicionarComentario(protocolo.id, novoComentario, "Comentário", true)

      if (result.success) {
        setNovoComentario("")
        toast({
          title: "Comentário adicionado",
          description: "O comentário foi adicionado com sucesso.",
        })
        // Recarregar a página para mostrar o novo comentário
        window.location.reload()
      } else {
        toast({
          title: "Erro ao adicionar comentário",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao adicionar o comentário.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAtualizarStatus() {
    if (novoStatus === protocolo.status) return

    setIsLoading(true)
    try {
      const result = await atualizarStatusProtocolo(protocolo.id, novoStatus, comentarioStatus)

      if (result.success) {
        setComentarioStatus("")
        toast({
          title: "Status atualizado",
          description: `Status alterado para: ${novoStatus}`,
        })
        // Recarregar a página para mostrar as mudanças
        window.location.reload()
      } else {
        toast({
          title: "Erro ao atualizar status",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao atualizar o status.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const tempoAberto = protocolo.data_fechamento
    ? Math.floor(
        (new Date(protocolo.data_fechamento).getTime() - new Date(protocolo.data_abertura).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : Math.floor((new Date().getTime() - new Date(protocolo.data_abertura).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/protocolos">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{protocolo.titulo}</h1>
              <p className="text-gray-600 mt-1">Protocolo: {protocolo.numero_protocolo}</p>
            </div>
          </div>
          <Link href={`/protocolos/${protocolo.id}/editar`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Principais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detalhes do Protocolo */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detalhes do Protocolo</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(protocolo.status)}>
                      {getStatusIcon(protocolo.status)}
                      <span className="ml-1">{protocolo.status}</span>
                    </Badge>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getPrioridadeColor(protocolo.prioridade)}`}></div>
                      <span className="text-sm text-gray-600">{protocolo.prioridade}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Descrição</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{protocolo.descricao}</p>
                </div>

                {protocolo.observacoes_internas && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Observações Internas</h4>
                    <p className="text-gray-700 whitespace-pre-wrap bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      {protocolo.observacoes_internas}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <span className="text-sm text-gray-500">Data de Abertura</span>
                    <p className="font-medium">{new Date(protocolo.data_abertura).toLocaleDateString("pt-BR")}</p>
                  </div>
                  {protocolo.data_fechamento && (
                    <div>
                      <span className="text-sm text-gray-500">Data de Fechamento</span>
                      <p className="font-medium">{new Date(protocolo.data_fechamento).toLocaleDateString("pt-BR")}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500">Tempo Aberto</span>
                    <p className="font-medium">{tempoAberto} dia(s)</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Categoria</span>
                    <p className="font-medium" style={{ color: protocolo.categoria?.cor }}>
                      {protocolo.categoria?.nome || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Comentários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Histórico de Comentários ({comentarios.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comentarios.map((comentario) => (
                    <div key={comentario.id} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comentario.usuario?.nome || "Sistema"}</span>
                          <Badge variant="outline" className="text-xs">
                            {comentario.tipo}
                          </Badge>
                          {comentario.visivel_cliente && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              Visível ao Cliente
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(comentario.created_at).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{comentario.comentario}</p>
                    </div>
                  ))}

                  {comentarios.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Nenhum comentário ainda.</p>
                  )}
                </div>

                {/* Adicionar Novo Comentário */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Adicionar Comentário</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Digite seu comentário..."
                      value={novoComentario}
                      onChange={(e) => setNovoComentario(e.target.value)}
                      rows={3}
                    />
                    <Button
                      onClick={handleAdicionarComentario}
                      disabled={!novoComentario.trim() || isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Adicionar Comentário
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
                  <p className="font-medium">{protocolo.cliente_nome}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">E-mail</span>
                  <p className="font-medium">{protocolo.cliente_email}</p>
                </div>
                {protocolo.cliente_telefone && (
                  <div>
                    <span className="text-sm text-gray-500">Telefone</span>
                    <p className="font-medium">{protocolo.cliente_telefone}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Responsável */}
            <Card>
              <CardHeader>
                <CardTitle>Responsável</CardTitle>
              </CardHeader>
              <CardContent>
                {protocolo.responsavel ? (
                  <div className="space-y-2">
                    <p className="font-medium">{protocolo.responsavel.nome}</p>
                    <p className="text-sm text-gray-500">{protocolo.responsavel.cargo}</p>
                    <p className="text-sm text-gray-500">{protocolo.responsavel.email}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Não atribuído</p>
                )}
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
                      <SelectItem value="Aberto">Aberto</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Aguardando Cliente">Aguardando Cliente</SelectItem>
                      <SelectItem value="Resolvido">Resolvido</SelectItem>
                      <SelectItem value="Fechado">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {novoStatus !== protocolo.status && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Comentário sobre a mudança de status (opcional)"
                      value={comentarioStatus}
                      onChange={(e) => setComentarioStatus(e.target.value)}
                      rows={2}
                    />
                    <Button
                      onClick={handleAtualizarStatus}
                      disabled={isLoading}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Atualizar Status
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Anexos */}
            {anexos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Paperclip className="h-5 w-5" />
                    Anexos ({anexos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {anexos.map((anexo) => (
                      <div key={anexo.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium text-sm">{anexo.nome_arquivo}</p>
                          <p className="text-xs text-gray-500">
                            {anexo.usuario?.nome} • {new Date(anexo.created_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={anexo.url_arquivo} target="_blank" rel="noopener noreferrer">
                            Ver
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
