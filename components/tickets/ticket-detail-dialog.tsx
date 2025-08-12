"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Mail, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import type { Ticket } from "./tickets-interface"

interface TicketDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: Ticket
}

export function TicketDetailDialog({ open, onOpenChange, ticket }: TicketDetailDialogProps) {
  const getStatusIcon = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "closed":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <AlertCircle className="h-4 w-4" />
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <DialogTitle className="text-xl">{ticket.title}</DialogTitle>
            {getStatusIcon(ticket.status)}
          </div>
          <DialogDescription>
            <Badge variant="outline" className="font-mono mr-2">
              {ticket.id}
            </Badge>
            Criado em {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant="outline" className="flex items-center space-x-1">
                {getStatusIcon(ticket.status)}
                <span>{getStatusLabel(ticket.status)}</span>
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Prioridade:</span>
              <Badge variant={getPriorityColor(ticket.priority)}>{getPriorityLabel(ticket.priority)}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Categoria:</span>
              <Badge variant="secondary">{ticket.category}</Badge>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium mb-2">Descrição</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{ticket.description}</p>
          </div>

          <Separator />

          {/* People Involved */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <User className="mr-2 h-4 w-4" />
                Criado por
              </h3>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/generic-user-avatar.png" alt={ticket.createdBy} />
                  <AvatarFallback>
                    {ticket.createdBy
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{ticket.createdBy}</span>
              </div>
            </div>

            {ticket.assignedTo && (
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Atribuído a
                </h3>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/generic-user-avatar.png" alt={ticket.assignedTo} />
                    <AvatarFallback>
                      {ticket.assignedTo
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{ticket.assignedTo}</span>
                </div>
              </div>
            )}
          </div>

          {/* Client Information */}
          {(ticket.clientName || ticket.clientEmail) && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-3">Informações do Cliente</h3>
                <div className="space-y-2">
                  {ticket.clientName && (
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.clientName}</span>
                    </div>
                  )}
                  {ticket.clientEmail && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.clientEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Timeline
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Criado em {new Date(ticket.createdAt).toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span>Última atualização em {new Date(ticket.updatedAt).toLocaleString("pt-BR")}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm">
              Editar
            </Button>
            <Button variant="outline" size="sm">
              Comentar
            </Button>
            <Button variant="outline" size="sm">
              Atribuir
            </Button>
            {ticket.status !== "closed" && (
              <Button variant="outline" size="sm">
                Fechar Ticket
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
