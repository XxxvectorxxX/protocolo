"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { ProtectedRoute } from "../../components/auth/protected-route"
import { useAuth } from "../../contexts/auth-context"
import { FiltrosAvancados } from "../../components/chamados/filtros-avancados"
import type { Chamado, ChamadoFilters } from "../../types"
import { Plus, Clock, AlertTriangle, CheckCircle, User, Download, FileText } from "lucide-react"
import Link from "next/link"

export default function ChamadosPage() {
  const [chamados, setChamados] = useState<Chamado[]>([])
  const [loading, setLoading] = useState(true)
  const [filtrosAtivos, setFiltrosAtivos] = useState<ChamadoFilters>({})
  const { user } = useAuth()

  useEffect(() => {
    loadChamados()
  }, [filtrosAtivos])

  const loadChamados = async () => {
    try {
      setLoading(true)
      // Simular dados de chamados
      const mockChamados: Chamado[] = [
        {
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
          descricao: "O sistema apresenta erro ao tentar fazer login",
          status: "em_andamento",
          prioridade: "alta",
          categoria: "Técnico",
          dataAbertura: "2024-01-20T10:00:00Z",
          dataUltimaInteracao: "2024-01-20T14:30:00Z",
          tempoSemAtendimento: 30,
          conversas: [],
          anexos: [],
          tags: ["login", "erro"],
          informacoesCliente: {
            tipoSistema: "ERP",
            versaoSistema: "v2.1.0",
            tipoErro: "Autenticação",
          },
        },
        {
          id: "2",
          protocolo: "2024-002",
          clienteId: "2",
          cliente: {
            id: "2",
            nome: "Empresa ABC Ltda",
            email: "contato@abc.com",
            telefone: "(11) 88888-8888",
            documento: "12.345.678/0001-90",
            dataCadastro: "2024-01-10",
            ativo: true,
          },
          assunto: "Solicitação de nova funcionalidade",
          descricao: "Gostaria de solicitar a implementação de relatórios customizados",
          status: "aberto",
          prioridade: "media",
          categoria: "Solicitação",
          dataAbertura: "2024-01-21T09:15:00Z",
          dataUltimaInteracao: "2024-01-21T09:15:00Z",
          tempoSemAtendimento: 120,
          conversas: [],
          anexos: [],
          tags: ["relatório", "customização"],
          informacoesCliente: {
            tipoSistema: "CRM",
            versaoSistema: "v1.5.2",
          },
        },
        {
          id: "3",
          protocolo: "2024-003",
          clienteId: "3",
          cliente: {
            id: "3",
            nome: "Pedro Santos",
            email: "pedro@teste.com",
            telefone: "(11) 77777-7777",
            documento: "987.654.321-00",
            dataCadastro: "2024-01-05",
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
          assunto: "Dúvida sobre configuração",
          descricao: "Como configurar as permissões de usuário?",
          status: "finalizado",
          prioridade: "baixa",
          categoria: "Dúvida",
          dataAbertura: "2024-01-19T16:20:00Z",
          dataUltimaInteracao: "2024-01-20T10:45:00Z",
          dataFinalizacao: "2024-01-20T10:45:00Z",
          tempoSemAtendimento: 0,
          conversas: [],
          anexos: [],
          tags: ["configuração", "permissões"],
          informacoesCliente: {
            tipoSistema: "Sistema Administrativo",
            versaoSistema: "v3.0.1",
          },
        },
        {
          id: "4",
          protocolo: "2024-004",
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
          assunto: "Sistema lento para carregar relatórios",
          descricao: "Os relatórios estão demorando muito para carregar",
          status: "aberto",
          prioridade: "urgente",
          categoria: "Performance",
          dataAbertura: "2024-01-22T08:30:00Z",
          dataUltimaInteracao: "2024-01-22T08:30:00Z",
          tempoSemAtendimento: 180,
          conversas: [],
          anexos: [],
          tags: ["performance", "relatório"],
          informacoesCliente: {
            tipoSistema: "ERP",
            versaoSistema: "v2.1.0",
            tipoErro: "Performance",
          },
        },
      ]

      setChamados(mockChamados)
    } catch (error) {
      console.error("Erro ao carregar chamados:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aberto":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "em_andamento":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "finalizado":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      aberto: "destructive",
      em_andamento: "default",
      aguardando_cliente: "secondary",
      finalizado: "outline",
      cancelado: "secondary",
    } as const

    const labels = {
      aberto: "Aberto",
      em_andamento: "Em Andamento",
      aguardando_cliente: "Aguardando Cliente",
      finalizado: "Finalizado",
      cancelado: "Cancelado",
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const getPrioridadeBadge = (prioridade: string) => {
    const variants = {
      baixa: "outline",
      media: "secondary",
      alta: "destructive",
      urgente: "destructive",
    } as const

    const labels = {
      baixa: "Baixa",
      media: "Média",
      alta: "Alta",
      urgente: "Urgente",
    }

    return (
      <Badge variant={variants[prioridade as keyof typeof variants] || "secondary"}>
        {labels[prioridade as keyof typeof labels] || prioridade}
      </Badge>
    )
  }

  const filteredChamados = chamados.filter((chamado) => {
    // Busca por texto
    if (filtrosAtivos.searchTerm) {
      const searchLower = filtrosAtivos.searchTerm.toLowerCase()
      const matchesSearch =
        chamado.protocolo.toLowerCase().includes(searchLower) ||
        chamado.cliente.nome.toLowerCase().includes(searchLower) ||
        chamado.assunto.toLowerCase().includes(searchLower) ||
        chamado.descricao.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false
    }

    // Filtro por status
    if (filtrosAtivos.status && chamado.status !== filtrosAtivos.status) {
      return false
    }

    // Filtro por prioridade
    if (filtrosAtivos.prioridade && chamado.prioridade !== filtrosAtivos.prioridade) {
      return false
    }

    // Filtro por clientes
    if (filtrosAtivos.clienteId) {
      const clienteIds = filtrosAtivos.clienteId.split(",")
      if (!clienteIds.includes(chamado.clienteId)) {
        return false
      }
    }

    // Filtro por atendentes
    if (filtrosAtivos.atendenteId) {
      const atendenteIds = filtrosAtivos.atendenteId.split(",")
      if (!chamado.atendenteId || !atendenteIds.includes(chamado.atendenteId)) {
        return false
      }
    }

    // Filtro por categorias
    if (filtrosAtivos.categoria) {
      const categorias = filtrosAtivos.categoria.split(",")
      if (!categorias.includes(chamado.categoria)) {
        return false
      }
    }

    // Filtro por período
    if (filtrosAtivos.dataInicio) {
      const dataInicio = new Date(filtrosAtivos.dataInicio)
      const dataAbertura = new Date(chamado.dataAbertura)
      if (dataAbertura < dataInicio) {
        return false
      }
    }

    if (filtrosAtivos.dataFim) {
      const dataFim = new Date(filtrosAtivos.dataFim)
      const dataAbertura = new Date(chamado.dataAbertura)
      if (dataAbertura > dataFim) {
        return false
      }
    }

    // Filtros especiais
    if (filtrosAtivos.tempoSemAtendimento && chamado.tempoSemAtendimento < filtrosAtivos.tempoSemAtendimento) {
      return false
    }

    if (filtrosAtivos.semAtendente && chamado.atendenteId) {
      return false
    }

    if (filtrosAtivos.altaPrioridade && !["alta", "urgente"].includes(chamado.prioridade)) {
      return false
    }

    return true
  })

  const exportarDadosFiltrados = () => {
    const dadosExport = filteredChamados.map((chamado) => ({
      Protocolo: chamado.protocolo,
      Cliente: chamado.cliente.nome,
      Assunto: chamado.assunto,
      Status: chamado.status,
      Prioridade: chamado.prioridade,
      Categoria: chamado.categoria,
      Atendente: chamado.atendente?.nome || "Não atribuído",
      "Data Abertura": new Date(chamado.dataAbertura).toLocaleDateString("pt-BR"),
      "Tempo sem Atendimento (min)": chamado.tempoSemAtendimento,
    }))

    // Simular download CSV
    const csv = [
      Object.keys(dadosExport[0] || {}).join(","),
      ...dadosExport.map((row) => Object.values(row).join(",")),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chamados_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <ProtectedRoute requiredPermission="view_chamados">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chamados</h1>
            <p className="text-gray-600">
              Gerencie todos os chamados e protocolos
              {filteredChamados.length !== chamados.length && (
                <span className="ml-2">
                  ({filteredChamados.length} de {chamados.length} chamados)
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportarDadosFiltrados}>
              <Download className="mr-2 h-4 w-4" />
              Exportar Filtrados
            </Button>
            <Button asChild>
              <Link href="/chamados/novo">
                <Plus className="mr-2 h-4 w-4" />
                Novo Chamado
              </Link>
            </Button>
          </div>
        </div>

        <FiltrosAvancados onFiltersChange={setFiltrosAtivos} initialFilters={filtrosAtivos} />

        {/* Lista de Chamados */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Carregando chamados...</div>
          ) : filteredChamados.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Nenhum chamado encontrado</p>
                <p className="text-gray-400 text-sm">
                  {chamados.length > 0
                    ? "Tente ajustar os filtros para ver mais resultados"
                    : "Não há chamados cadastrados no sistema"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredChamados.map((chamado) => (
              <Card key={chamado.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(chamado.status)}
                        <Link
                          href={`/chamados/${chamado.id}`}
                          className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                        >
                          #{chamado.protocolo}
                        </Link>
                        {getStatusBadge(chamado.status)}
                        {getPrioridadeBadge(chamado.prioridade)}
                      </div>
                      <h3 className="text-lg font-medium mb-2">{chamado.assunto}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{chamado.descricao}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {chamado.cliente.nome}
                        </div>
                        {chamado.atendente && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Atendente: {chamado.atendente.nome}
                          </div>
                        )}
                        <div>Categoria: {chamado.categoria}</div>
                        <div>Aberto em: {new Date(chamado.dataAbertura).toLocaleDateString("pt-BR")}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {chamado.tempoSemAtendimento > 60 && (
                        <Badge variant="destructive" className="text-xs">
                          {Math.floor(chamado.tempoSemAtendimento / 60)}h sem atendimento
                        </Badge>
                      )}
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/chamados/${chamado.id}`}>Ver Detalhes</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
