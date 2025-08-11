"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Plus, Search, User, Clock, AlertCircle, CheckCircle, XCircle, Eye, Edit } from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import type { Protocolo, Categoria, Usuario } from "../../../lib/supabase"

interface ProtocolosDashboardProps {
  protocolos: Protocolo[]
  categorias: Categoria[]
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

export function ProtocolosDashboard({ protocolos, categorias, usuarios }: ProtocolosDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [categoriaFilter, setCategoriaFilter] = useState("todas")
  const [prioridadeFilter, setPrioridadeFilter] = useState("todas")

  const filteredProtocolos = protocolos.filter((protocolo) => {
    const matchesSearch =
      protocolo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocolo.cliente_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocolo.numero_protocolo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || protocolo.status === statusFilter
    const matchesCategoria = categoriaFilter === "todas" || protocolo.categoria_id === categoriaFilter
    const matchesPrioridade = prioridadeFilter === "todas" || protocolo.prioridade === prioridadeFilter

    return matchesSearch && matchesStatus && matchesCategoria && matchesPrioridade
  })

  const stats = {
    total: protocolos.length,
    abertos: protocolos.filter((p) => p.status === "Aberto").length,
    emAndamento: protocolos.filter((p) => p.status === "Em Andamento").length,
    aguardandoCliente: protocolos.filter((p) => p.status === "Aguardando Cliente").length,
    resolvidos: protocolos.filter((p) => p.status === "Resolvido").length,
    fechados: protocolos.filter((p) => p.status === "Fechado").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sistema de Protocolos</h1>
            <p className="text-gray-600 mt-1">Gerencie e acompanhe todos os protocolos de atendimento</p>
          </div>

          <Link href="/protocolos/novo">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Protocolo
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abertos</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.abertos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.emAndamento}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aguardando</CardTitle>
              <User className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.aguardandoCliente}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolvidos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolvidos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fechados</CardTitle>
              <XCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.fechados}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros e Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por título, cliente ou protocolo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Aberto">Aberto</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Aguardando Cliente">Aguardando Cliente</SelectItem>
                  <SelectItem value="Resolvido">Resolvido</SelectItem>
                  <SelectItem value="Fechado">Fechado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Categorias</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Prioridades</SelectItem>
                  <SelectItem value="Crítica">Crítica</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Protocolos List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lista de Protocolos</CardTitle>
            <CardDescription>{filteredProtocolos.length} protocolo(s) encontrado(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProtocolos.map((protocolo) => (
                <div key={protocolo.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{protocolo.titulo}</h3>
                        <Badge variant="outline" className={getStatusColor(protocolo.status)}>
                          {getStatusIcon(protocolo.status)}
                          <span className="ml-1">{protocolo.status}</span>
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getPrioridadeColor(protocolo.prioridade)}`}></div>
                          <span className="text-sm text-gray-600">{protocolo.prioridade}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{protocolo.cliente_nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{new Date(protocolo.data_abertura).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div>
                          <span className="font-medium">Protocolo: </span>
                          <span className="font-mono text-blue-600">{protocolo.numero_protocolo}</span>
                        </div>
                        <div>
                          <span className="font-medium">Categoria: </span>
                          <span style={{ color: protocolo.categoria?.cor }}>{protocolo.categoria?.nome || "N/A"}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 line-clamp-2">{protocolo.descricao}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span>
                            Responsável:{" "}
                            <span className="font-medium">{protocolo.responsavel?.nome || "Não atribuído"}</span>
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/protocolos/${protocolo.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Ver Detalhes
                            </Button>
                          </Link>
                          <Link href={`/protocolos/${protocolo.id}/editar`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProtocolos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum protocolo encontrado com os filtros aplicados.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
