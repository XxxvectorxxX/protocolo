"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { ProtectedRoute } from "../../../components/auth/protected-route"
import { useAuth } from "../../../contexts/auth-context"
import { api } from "../../../lib/api"
import type { CreateChamadoData } from "../../../types"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NovoChamadoPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    clienteId: "",
    assunto: "",
    descricao: "",
    prioridade: "media" as const,
    categoria: "",
    tipoSistema: "",
    versaoSistema: "",
    tipoErro: "",
    sistemaOperacional: "",
    memoria: "",
    processador: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const chamadoData: CreateChamadoData = {
        clienteId: formData.clienteId,
        assunto: formData.assunto,
        descricao: formData.descricao,
        prioridade: formData.prioridade,
        categoria: formData.categoria,
        informacoesCliente: {
          tipoSistema: formData.tipoSistema,
          versaoSistema: formData.versaoSistema,
          tipoErro: formData.tipoErro,
          configuracaoMaquina: {
            sistemaOperacional: formData.sistemaOperacional,
            versaoSO: "",
            memoria: formData.memoria,
            processador: formData.processador,
            espacoDisco: "",
            resolucaoTela: "",
          },
        },
      }

      const novoChamado = await api.createChamado(chamadoData)
      router.push(`/chamados/${novoChamado.id}`)
    } catch (error) {
      console.error("Erro ao criar chamado:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
          <h1 className="text-3xl font-bold">Novo Chamado</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Dados principais do chamado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clienteId">Cliente</Label>
                  <Select value={formData.clienteId} onValueChange={(value) => handleInputChange("clienteId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">João Silva</SelectItem>
                      <SelectItem value="2">Empresa ABC Ltda</SelectItem>
                      <SelectItem value="3">Pedro Santos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assunto">Assunto</Label>
                  <Input
                    id="assunto"
                    value={formData.assunto}
                    onChange={(e) => handleInputChange("assunto", e.target.value)}
                    placeholder="Descreva brevemente o problema"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    placeholder="Descreva detalhadamente o problema ou solicitação"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prioridade">Prioridade</Label>
                    <Select
                      value={formData.prioridade}
                      onValueChange={(value) => handleInputChange("prioridade", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Dúvida">Dúvida</SelectItem>
                        <SelectItem value="Solicitação">Solicitação</SelectItem>
                        <SelectItem value="Reclamação">Reclamação</SelectItem>
                        <SelectItem value="Sugestão">Sugestão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações Técnicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Técnicas</CardTitle>
                <CardDescription>Dados técnicos para melhor atendimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tipoSistema">Tipo do Sistema</Label>
                  <Select
                    value={formData.tipoSistema}
                    onValueChange={(value) => handleInputChange("tipoSistema", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ERP">ERP</SelectItem>
                      <SelectItem value="CRM">CRM</SelectItem>
                      <SelectItem value="Sistema Administrativo">Sistema Administrativo</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="versaoSistema">Versão do Sistema</Label>
                  <Input
                    id="versaoSistema"
                    value={formData.versaoSistema}
                    onChange={(e) => handleInputChange("versaoSistema", e.target.value)}
                    placeholder="Ex: v2.1.0"
                  />
                </div>

                <div>
                  <Label htmlFor="tipoErro">Tipo de Erro</Label>
                  <Select value={formData.tipoErro} onValueChange={(value) => handleInputChange("tipoErro", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de erro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Autenticação">Autenticação</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Interface">Interface</SelectItem>
                      <SelectItem value="Integração">Integração</SelectItem>
                      <SelectItem value="Dados">Dados</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sistemaOperacional">Sistema Operacional</Label>
                  <Select
                    value={formData.sistemaOperacional}
                    onValueChange={(value) => handleInputChange("sistemaOperacional", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o SO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Windows 11">Windows 11</SelectItem>
                      <SelectItem value="Windows 10">Windows 10</SelectItem>
                      <SelectItem value="macOS">macOS</SelectItem>
                      <SelectItem value="Linux">Linux</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="memoria">Memória RAM</Label>
                    <Select value={formData.memoria} onValueChange={(value) => handleInputChange("memoria", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4GB">4GB</SelectItem>
                        <SelectItem value="8GB">8GB</SelectItem>
                        <SelectItem value="16GB">16GB</SelectItem>
                        <SelectItem value="32GB">32GB</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="processador">Processador</Label>
                    <Input
                      id="processador"
                      value={formData.processador}
                      onChange={(e) => handleInputChange("processador", e.target.value)}
                      placeholder="Ex: Intel i7"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/chamados">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Criando..." : "Criar Chamado"}
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  )
}
