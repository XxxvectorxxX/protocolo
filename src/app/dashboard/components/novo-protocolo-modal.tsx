"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Save, AlertCircle } from "lucide-react"

interface NovoProtocoloModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (dados: any) => Promise<{ success: boolean; error?: string }>
  sessaoAtiva: string
}

export function NovoProtocoloModal({ isOpen, onClose, onSubmit, sessaoAtiva }: NovoProtocoloModalProps) {
  const [formData, setFormData] = useState({
    clienteNome: "",
    clienteTelefone: "",
    clienteEmail: "",
    assunto: "",
    descricao: "",
    prioridade: "media",
    categoria: "",
    responsavel: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const categorias = [
    "Suporte Técnico",
    "Dúvidas Gerais",
    "Reclamação",
    "Sugestão",
    "Comercial",
    "Financeiro",
    "Outros",
  ]

  const responsaveis = ["Maria Santos", "Carlos Lima", "Ana Ferreira", "Pedro Silva"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!sessaoAtiva) {
      setError("Nenhuma sessão WhatsApp ativa")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await onSubmit({
        cliente: {
          nome: formData.clienteNome,
          telefone: formData.clienteTelefone,
          email: formData.clienteEmail,
        },
        assunto: formData.assunto,
        descricao: formData.descricao,
        prioridade: formData.prioridade,
        categoria: formData.categoria,
        responsavel: formData.responsavel,
      })

      if (result.success) {
        // Reset form
        setFormData({
          clienteNome: "",
          clienteTelefone: "",
          clienteEmail: "",
          assunto: "",
          descricao: "",
          prioridade: "media",
          categoria: "",
          responsavel: "",
        })
        onClose()
      } else {
        setError(result.error || "Erro ao criar protocolo")
      }
    } catch (error) {
      setError("Erro inesperado ao criar protocolo")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Protocolo de Atendimento</DialogTitle>
          <DialogDescription>Preencha as informações para criar um novo protocolo via WhatsApp</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações do Cliente</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clienteNome">Nome do Cliente *</Label>
                <Input
                  id="clienteNome"
                  value={formData.clienteNome}
                  onChange={(e) => handleInputChange("clienteNome", e.target.value)}
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clienteTelefone">Telefone/WhatsApp *</Label>
                <Input
                  id="clienteTelefone"
                  value={formData.clienteTelefone}
                  onChange={(e) => handleInputChange("clienteTelefone", e.target.value)}
                  placeholder="5511999999999"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clienteEmail">E-mail (opcional)</Label>
              <Input
                id="clienteEmail"
                type="email"
                value={formData.clienteEmail}
                onChange={(e) => handleInputChange("clienteEmail", e.target.value)}
                placeholder="cliente@email.com"
              />
            </div>
          </div>

          {/* Detalhes do Protocolo */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Detalhes do Protocolo</h3>

            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto *</Label>
              <Input
                id="assunto"
                value={formData.assunto}
                onChange={(e) => handleInputChange("assunto", e.target.value)}
                placeholder="Descreva brevemente o problema"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição Detalhada *</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                placeholder="Descreva detalhadamente o problema ou solicitação..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria *</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => handleInputChange("categoria", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade *</Label>
                <Select value={formData.prioridade} onValueChange={(value) => handleInputChange("prioridade", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Baixa
                      </div>
                    </SelectItem>
                    <SelectItem value="media">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Média
                      </div>
                    </SelectItem>
                    <SelectItem value="alta">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        Alta
                      </div>
                    </SelectItem>
                    <SelectItem value="critica">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        Crítica
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Select value={formData.responsavel} onValueChange={(value) => handleInputChange("responsavel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Atribuir responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {responsaveis.map((responsavel) => (
                      <SelectItem key={responsavel} value={responsavel}>
                        {responsavel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !sessaoAtiva} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                "Criando..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Criar Protocolo
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
