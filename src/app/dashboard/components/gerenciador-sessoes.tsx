"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Smartphone, Plus, Trash2, CheckCircle, XCircle, Clock } from "lucide-react"
import type { ApiSession } from "../../../lib/api-config"
import type ApiClient from "../../../lib/api-client"

interface GerenciadorSessoesProps {
  sessoes: ApiSession[]
  sessaoAtiva: string
  onSessaoChange: (sessaoId: string) => void
  apiClient: ApiClient
  onSessoesUpdate: (sessoes: ApiSession[]) => void
}

export function GerenciadorSessoes({
  sessoes,
  sessaoAtiva,
  onSessaoChange,
  apiClient,
  onSessoesUpdate,
}: GerenciadorSessoesProps) {
  const [isNovaSessionOpen, setIsNovaSessionOpen] = useState(false)
  const [nomeSession, setNomeSession] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "connecting":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200"
      case "disconnected":
        return "bg-red-100 text-red-800 border-red-200"
      case "connecting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleCriarSession = async () => {
    if (!nomeSession.trim()) return

    setIsLoading(true)
    try {
      const result = await apiClient.createSession(nomeSession)

      if (result.success) {
        const novasSessoes = [...sessoes, result.data]
        onSessoesUpdate(novasSessoes)
        setNomeSession("")
        setIsNovaSessionOpen(false)

        // Se for a primeira sessão, definir como ativa
        if (sessoes.length === 0) {
          onSessaoChange(result.data.id)
        }

        // Verificar se precisa mostrar QR Code
        if (result.data.status === "connecting" && result.data.qrCode) {
          setQrCodeUrl(result.data.qrCode)
        }
      }
    } catch (error) {
      console.error("Erro ao criar sessão:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletarSession = async (sessionId: string) => {
    if (!confirm("Tem certeza que deseja deletar esta sessão?")) return

    try {
      const result = await apiClient.deleteSession(sessionId)

      if (result.success) {
        const novasSessoes = sessoes.filter((s) => s.id !== sessionId)
        onSessoesUpdate(novasSessoes)

        // Se a sessão ativa foi deletada, selecionar outra
        if (sessaoAtiva === sessionId && novasSessoes.length > 0) {
          onSessaoChange(novasSessoes[0].id)
        } else if (novasSessoes.length === 0) {
          onSessaoChange("")
        }
      }
    } catch (error) {
      console.error("Erro ao deletar sessão:", error)
    }
  }

  const sessaoAtual = sessoes.find((s) => s.id === sessaoAtiva)

  return (
    <div className="flex items-center gap-4">
      {/* Seletor de Sessão */}
      <div className="flex items-center gap-2">
        <Smartphone className="h-5 w-5 text-gray-500" />
        <Select value={sessaoAtiva} onValueChange={onSessaoChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione uma sessão" />
          </SelectTrigger>
          <SelectContent>
            {sessoes.map((sessao) => (
              <SelectItem key={sessao.id} value={sessao.id}>
                <div className="flex items-center gap-2">
                  {getStatusIcon(sessao.status)}
                  <span>{sessao.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status da Sessão Ativa */}
      {sessaoAtual && (
        <Badge variant="outline" className={getStatusColor(sessaoAtual.status)}>
          {getStatusIcon(sessaoAtual.status)}
          <span className="ml-1 capitalize">{sessaoAtual.status}</span>
        </Badge>
      )}

      {/* Botão Nova Sessão */}
      <Dialog open={isNovaSessionOpen} onOpenChange={setIsNovaSessionOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nova Sessão
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Sessão WhatsApp</DialogTitle>
            <DialogDescription>Crie uma nova sessão para conectar um número do WhatsApp</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Sessão</Label>
              <Input
                id="nome"
                placeholder="Ex: Atendimento Principal"
                value={nomeSession}
                onChange={(e) => setNomeSession(e.target.value)}
              />
            </div>

            {qrCodeUrl && (
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Escaneie o QR Code com o WhatsApp:</p>
                <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="mx-auto max-w-[200px]" />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNovaSessionOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCriarSession} disabled={isLoading || !nomeSession.trim()}>
                {isLoading ? "Criando..." : "Criar Sessão"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gerenciar Sessões */}
      {sessoes.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Gerenciar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gerenciar Sessões WhatsApp</DialogTitle>
              <DialogDescription>Visualize e gerencie todas as suas sessões conectadas</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {sessoes.map((sessao) => (
                <div key={sessao.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(sessao.status)}
                    <div>
                      <p className="font-medium">{sessao.name}</p>
                      <p className="text-sm text-gray-500">
                        {sessao.phone || "Não conectado"} • Criado em{" "}
                        {new Date(sessao.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(sessao.status)}>
                      {sessao.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletarSession(sessao.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
