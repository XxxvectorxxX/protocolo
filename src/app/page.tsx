"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { CalendarDays, Plus, Search, User, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

// Dados mockados para demonstração
const atendimentos = [
  {
    id: "ATD-2024-001",
    titulo: "Problema com login no sistema",
    cliente: "João Silva",
    email: "joao@empresa.com",
    telefone: "(11) 99999-9999",
    categoria: "Técnico",
    prioridade: "Alta",
    status: "Aberto",
    dataAbertura: "2024-01-15T10:30:00",
    descricao: "Usuário não consegue fazer login no sistema após atualização",
    responsavel: "Maria Santos",
  },
  {
    id: "ATD-2024-002",
    titulo: "Solicitação de nova funcionalidade",
    cliente: "Ana Costa",
    email: "ana@empresa.com",
    telefone: "(11) 88888-8888",
    categoria: "Funcionalidade",
    prioridade: "Média",
    status: "Em Andamento",
    dataAbertura: "2024-01-14T14:20:00",
    descricao: "Cliente solicita implementação de relatório personalizado",
    responsavel: "Carlos Lima",
  },
  {
    id: "ATD-2024-003",
    titulo: "Erro no processamento de pagamentos",
    cliente: "Pedro Oliveira",
    email: "pedro@empresa.com",
    telefone: "(11) 77777-7777",
    categoria: "Crítico",
    prioridade: "Crítica",
    status: "Resolvido",
    dataAbertura: "2024-01-13T09:15:00",
    descricao: "Sistema apresenta erro ao processar pagamentos via cartão",
    responsavel: "Ana Ferreira",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Aberto":
      return <AlertCircle className="h-4 w-4" />
    case "Em Andamento":
      return <Clock className="h-4 w-4" />
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

export default function HomePage() {
  // Redirecionar para o dashboard
  redirect("/dashboard")

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [categoriaFilter, setCategoriaFilter] = useState("todas")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [novoAtendimento, setNovoAtendimento] = useState({
    titulo: "",
    cliente: "",
    email: "",
    telefone: "",
    categoria: "",
    prioridade: "",
    descricao: "",
  })

  const filteredAtendimentos = atendimentos.filter((atendimento) => {
    const matchesSearch =
      atendimento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atendimento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atendimento.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || atendimento.status === statusFilter
    const matchesCategoria = categoriaFilter === "todas" || atendimento.categoria === categoriaFilter

    return matchesSearch && matchesStatus && matchesCategoria
  })

  const handleNovoAtendimento = () => {
    // Aqui você implementaria a lógica para salvar o novo atendimento
    console.log("Novo atendimento:", novoAtendimento)
    setIsDialogOpen(false)
    setNovoAtendimento({
      titulo: "",
      cliente: "",
      email: "",
      telefone: "",
      categoria: "",
      prioridade: "",
      descricao: "",
    })
  }

  const stats = {
    total: atendimentos.length,
    abertos: atendimentos.filter((a) => a.status === "Aberto").length,
    emAndamento: atendimentos.filter((a) => a.status === "Em Andamento").length,
    resolvidos: atendimentos.filter((a) => a.status === "Resolvido").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Atendimentos</h1>
            <p className="text-gray-600 mt-1">Gerencie e acompanhe todos os protocolos de atendimento</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Atendimento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Protocolar Novo Atendimento</DialogTitle>
                <DialogDescription>
                  Preencha as informações para criar um novo protocolo de atendimento.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título do Atendimento</Label>
                    <Input
                      id="titulo"
                      value={novoAtendimento.titulo}
                      onChange={(e) => setNovoAtendimento({ ...novoAtendimento, titulo: e.target.value })}
                      placeholder="Descreva brevemente o problema"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Nome do Cliente</Label>
                    <Input
                      id="cliente"
                      value={novoAtendimento.cliente}
                      onChange={(e) => setNovoAtendimento({ ...novoAtendimento, cliente: e.target.value })}
                      placeholder="Nome completo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={novoAtendimento.email}
                      onChange={(e) => setNovoAtendimento({ ...novoAtendimento, email: e.target.value })}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={novoAtendimento.telefone}
                      onChange={(e) => setNovoAtendimento({ ...novoAtendimento, telefone: e.target.value })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select
                      value={novoAtendimento.categoria}
                      onValueChange={(value) => setNovoAtendimento({ ...novoAtendimento, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Funcionalidade">Funcionalidade</SelectItem>
                        <SelectItem value="Crítico">Crítico</SelectItem>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                        <SelectItem value="Suporte">Suporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prioridade">Prioridade</Label>
                    <Select
                      value={novoAtendimento.prioridade}
                      onValueChange={(value) => setNovoAtendimento({ ...novoAtendimento, prioridade: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Crítica">Crítica</SelectItem>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição Detalhada</Label>
                  <Textarea
                    id="descricao"
                    value={novoAtendimento.descricao}
                    onChange={(e) => setNovoAtendimento({ ...novoAtendimento, descricao: e.target.value })}
                    placeholder="Descreva detalhadamente o problema ou solicitação..."
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleNovoAtendimento} className="bg-blue-600 hover:bg-blue-700">
                  Protocolar Atendimento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Atendimentos</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Todos os protocolos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abertos</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.abertos}</div>
              <p className="text-xs text-muted-foreground">Aguardando atendimento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.emAndamento}</div>
              <p className="text-xs text-muted-foreground">Sendo processados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolvidos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolvidos}</div>
              <p className="text-xs text-muted-foreground">Finalizados hoje</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros e Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
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
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Aberto">Aberto</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Resolvido">Resolvido</SelectItem>
                  <SelectItem value="Fechado">Fechado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Categorias</SelectItem>
                  <SelectItem value="Técnico">Técnico</SelectItem>
                  <SelectItem value="Funcionalidade">Funcionalidade</SelectItem>
                  <SelectItem value="Crítico">Crítico</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Suporte">Suporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Atendimentos List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lista de Atendimentos</CardTitle>
            <CardDescription>{filteredAtendimentos.length} atendimento(s) encontrado(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAtendimentos.map((atendimento) => (
                <div key={atendimento.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{atendimento.titulo}</h3>
                        <Badge variant="outline" className={getStatusColor(atendimento.status)}>
                          {getStatusIcon(atendimento.status)}
                          <span className="ml-1">{atendimento.status}</span>
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getPrioridadeColor(atendimento.prioridade)}`}></div>
                          <span className="text-sm text-gray-600">{atendimento.prioridade}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{atendimento.cliente}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{new Date(atendimento.dataAbertura).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div>
                          <span className="font-medium">Protocolo: </span>
                          <span className="font-mono text-blue-600">{atendimento.id}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{atendimento.descricao}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            Categoria: <span className="font-medium">{atendimento.categoria}</span>
                          </span>
                          <span>
                            Responsável: <span className="font-medium">{atendimento.responsavel}</span>
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredAtendimentos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum atendimento encontrado com os filtros aplicados.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
