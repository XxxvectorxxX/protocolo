"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Calendar, MoreHorizontal } from "lucide-react"

export interface KanbanCard {
  id: string
  title: string
  description?: string
  assignedTo?: string
  priority: "low" | "medium" | "high"
  value?: number
  dueDate?: string
  tags: string[]
  avatar?: string
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
  color: string
}

const mockColumns: KanbanColumn[] = [
  {
    id: "leads",
    title: "Novos Leads",
    color: "bg-blue-500",
    cards: [
      {
        id: "card-1",
        title: "Empresa ABC - Sistema CRM",
        description: "Interessados em implementar CRM completo",
        assignedTo: "Carlos Lima",
        priority: "high",
        value: 45000,
        dueDate: "2024-01-25",
        tags: ["crm", "b2b"],
        avatar: "/placeholder-g0yux.png",
      },
      {
        id: "card-2",
        title: "StartupX - Consultoria",
        description: "Consultoria em automação de processos",
        assignedTo: "Ana Costa",
        priority: "medium",
        value: 15000,
        tags: ["consultoria", "startup"],
        avatar: "/abstract-user-carlos.png",
      },
    ],
  },
  {
    id: "qualification",
    title: "Qualificação",
    color: "bg-yellow-500",
    cards: [
      {
        id: "card-3",
        title: "Indústria XYZ - ERP",
        description: "Avaliando necessidades de ERP personalizado",
        assignedTo: "Pedro Oliveira",
        priority: "high",
        value: 120000,
        dueDate: "2024-02-10",
        tags: ["erp", "indústria"],
        avatar: "/stylized-woman-profile.png",
      },
    ],
  },
  {
    id: "proposal",
    title: "Proposta Enviada",
    color: "bg-orange-500",
    cards: [
      {
        id: "card-4",
        title: "Comercial 123 - E-commerce",
        description: "Proposta para plataforma de e-commerce",
        assignedTo: "Lucia Ferreira",
        priority: "high",
        value: 80000,
        dueDate: "2024-01-30",
        tags: ["ecommerce", "web"],
        avatar: "/placeholder-cl5hp.png",
      },
      {
        id: "card-5",
        title: "Tech Solutions - Integração",
        description: "Integração com sistemas legados",
        assignedTo: "Carlos Lima",
        priority: "medium",
        value: 35000,
        tags: ["integração", "api"],
        avatar: "/generic-user-avatar.png",
      },
    ],
  },
  {
    id: "negotiation",
    title: "Negociação",
    color: "bg-purple-500",
    cards: [
      {
        id: "card-6",
        title: "Empresa Digital - App Mobile",
        description: "Desenvolvimento de aplicativo mobile",
        assignedTo: "Ana Costa",
        priority: "high",
        value: 60000,
        dueDate: "2024-02-05",
        tags: ["mobile", "app"],
        avatar: "/placeholder-g0yux.png",
      },
    ],
  },
  {
    id: "closed",
    title: "Fechados",
    color: "bg-green-500",
    cards: [
      {
        id: "card-7",
        title: "Loja Online - Website",
        description: "Website institucional e loja online",
        assignedTo: "Pedro Oliveira",
        priority: "medium",
        value: 25000,
        tags: ["website", "loja"],
        avatar: "/abstract-user-carlos.png",
      },
    ],
  },
]

export function KanbanInterface() {
  const [columns, setColumns] = useState<KanbanColumn[]>(mockColumns)

  const getPriorityColor = (priority: KanbanCard["priority"]) => {
    switch (priority) {
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

  const getPriorityLabel = (priority: KanbanCard["priority"]) => {
    switch (priority) {
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const totalValue = columns.reduce(
    (sum, column) => sum + column.cards.reduce((cardSum, card) => cardSum + (card.value || 0), 0),
    0,
  )

  const totalCards = columns.reduce((sum, column) => sum + column.cards.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kanban CRM</h1>
          <p className="text-muted-foreground">
            {totalCards} oportunidades • {formatCurrency(totalValue)} em pipeline
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Oportunidade
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full ${column.color}`}></div>
                    <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {column.cards.length}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrency(column.cards.reduce((sum, card) => sum + (card.value || 0), 0))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                {column.cards.map((card) => (
                  <Card key={card.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium line-clamp-2 flex-1">{card.title}</h4>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>

                      {card.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{card.description}</p>
                      )}

                      <div className="flex items-center justify-between">
                        <Badge variant={getPriorityColor(card.priority)} className="text-xs">
                          {getPriorityLabel(card.priority)}
                        </Badge>
                        {card.value && (
                          <span className="text-sm font-semibold text-green-600">{formatCurrency(card.value)}</span>
                        )}
                      </div>

                      {card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {card.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {card.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{card.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        {card.assignedTo && (
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={card.avatar || "/placeholder.svg"} alt={card.assignedTo} />
                              <AvatarFallback className="text-xs">
                                {card.assignedTo
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{card.assignedTo}</span>
                          </div>
                        )}

                        {card.dueDate && (
                          <div
                            className={`flex items-center space-x-1 text-xs ${
                              isOverdue(card.dueDate) ? "text-red-500" : "text-muted-foreground"
                            }`}
                          >
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(card.dueDate).toLocaleDateString("pt-BR")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}

                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar card
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
