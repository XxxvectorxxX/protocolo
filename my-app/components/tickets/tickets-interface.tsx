"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react"
import { CreateTicketDialog } from "./create-ticket-dialog"
import { TicketDetailDialog } from "./ticket-detail-dialog"

export interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  assignedTo?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  clientName?: string
  clientEmail?: string
}

const mockTickets: Ticket[] = [
  {
    id: "TK-001",
    title: "Problema com integração WhatsApp",
    description: "Cliente não está recebendo mensagens do WhatsApp Business",
    status: "open",
    priority: "high",
    category: "Técnico",
    createdBy: "Maria Silva",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    clientName: "João Santos",
    clientEmail: "joao@empresa.com",
  },
  {
    id: "TK-002",
    title: "Solicitação de novo usuário",
    description: "Criar acesso para novo funcionário do departamento comercial",
    status: "in-progress",
    priority: "medium",
    category: "Acesso",
    assignedTo: "Carlos Lima",
    createdBy: "Ana Costa",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "TK-003",
    title: "Relatório de vendas não carrega",
    description: "Erro 500 ao tentar gerar relatório mensal de vendas",
    status: "resolved",
    priority: "medium",
    category: "Bug",
    assignedTo: "Pedro Oliveira",
    createdBy: "Lucia Ferreira",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
  },
  {
    id: "TK-004",
    title: "Configuração de campanha de email",
    description: "Configurar nova campanha de email marketing para produto X",
    status: "open",
    priority: "low",
    category: "Marketing",
    createdBy: "Roberto Silva",
    createdAt: "2024-01-12T08:15:00Z",
    updatedAt: "2024-01-12T08:15:00Z",
  },
]

export function TicketsInterface() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusIcon = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return "bg-red-500"
      case "in-progress":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "urgent":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return "Aberto"
      case "in-progress":
        return "Em Andamento"
      case "resolved":
        return "Resolvido"
      case "closed":
        return "Fechado"
      default:
        return "Desconhecido"
    }
  }

  const getPriorityLabel = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "urgent":
        return "Urgente"
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return "Desconhecida"
    }
  }

  const handleCreateTicket = (ticketData: Omit<Ticket, "id" | "createdAt" | "updatedAt">) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `TK-${String(tickets.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTickets([newTicket, ...tickets])
  }

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsDetailDialogOpen(true)
  }

  const statusCounts = {
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tickets</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abertos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.open}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolvidos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.resolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fechados</CardTitle>
            <XCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.closed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="open">Aberto</SelectItem>
            <SelectItem value="in-progress">Em Andamento</SelectItem>
            <SelectItem value="resolved">Resolvido</SelectItem>
            <SelectItem value="closed">Fechado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Prioridades</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleTicketClick(ticket)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-mono">
                      {ticket.id}
                    </Badge>
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(ticket.status)}`}></div>
                    <Badge variant="outline">{getStatusLabel(ticket.status)}</Badge>
                    <Badge variant={getPriorityColor(ticket.priority)}>{getPriorityLabel(ticket.priority)}</Badge>
                    <Badge variant="secondary">{ticket.category}</Badge>
                  </div>

                  <h3 className="text-lg font-semibold">{ticket.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{ticket.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Criado por: {ticket.createdBy}</span>
                    {ticket.assignedTo && <span>Atribuído a: {ticket.assignedTo}</span>}
                    {ticket.clientName && <span>Cliente: {ticket.clientName}</span>}
                    <span>{new Date(ticket.createdAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                <div className="ml-4">{getStatusIcon(ticket.status)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateTicketDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTicket={handleCreateTicket}
      />

      {selectedTicket && (
        <TicketDetailDialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen} ticket={selectedTicket} />
      )}
    </div>
  )
}
