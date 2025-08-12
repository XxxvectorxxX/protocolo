"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Plus, DollarSign, TrendingUp, Users, Target } from "lucide-react"

export interface Opportunity {
  id: string
  title: string
  company: string
  contact: string
  value: number
  stage: "prospecting" | "qualification" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
  probability: number
  expectedCloseDate: string
  createdAt: string
  assignedTo: string
  notes?: string
  avatar?: string
}

const mockOpportunities: Opportunity[] = [
  {
    id: "OPP-001",
    title: "Sistema CRM Completo",
    company: "Tech Solutions Ltda",
    contact: "Maria Silva",
    value: 50000,
    stage: "proposal",
    probability: 75,
    expectedCloseDate: "2024-02-15",
    createdAt: "2024-01-10T10:30:00Z",
    assignedTo: "Carlos Lima",
    notes: "Cliente muito interessado, aguardando aprovação do orçamento",
    avatar: "/placeholder-g0yux.png",
  },
  {
    id: "OPP-002",
    title: "Consultoria em Automação",
    company: "StartupX",
    contact: "João Pedro",
    value: 25000,
    stage: "qualification",
    probability: 50,
    expectedCloseDate: "2024-02-28",
    createdAt: "2024-01-12T09:15:00Z",
    assignedTo: "Ana Costa",
    avatar: "/abstract-user-carlos.png",
  },
  {
    id: "OPP-003",
    title: "Plataforma E-commerce",
    company: "Comercial ABC",
    contact: "Ana Costa",
    value: 80000,
    stage: "negotiation",
    probability: 85,
    expectedCloseDate: "2024-01-30",
    createdAt: "2024-01-08T11:20:00Z",
    assignedTo: "Pedro Oliveira",
    avatar: "/stylized-woman-profile.png",
  },
  {
    id: "OPP-004",
    title: "Sistema de Gestão",
    company: "Indústria XYZ",
    contact: "Carlos Lima",
    value: 120000,
    stage: "prospecting",
    probability: 25,
    expectedCloseDate: "2024-03-15",
    createdAt: "2024-01-15T15:30:00Z",
    assignedTo: "Lucia Ferreira",
    avatar: "/placeholder-cl5hp.png",
  },
]

const stages = [
  { key: "prospecting", label: "Prospecção", color: "bg-gray-500" },
  { key: "qualification", label: "Qualificação", color: "bg-blue-500" },
  { key: "proposal", label: "Proposta", color: "bg-yellow-500" },
  { key: "negotiation", label: "Negociação", color: "bg-orange-500" },
  { key: "closed-won", label: "Fechado - Ganho", color: "bg-green-500" },
  { key: "closed-lost", label: "Fechado - Perdido", color: "bg-red-500" },
]

export function FunnelInterface() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)

  const getStageLabel = (stage: Opportunity["stage"]) => {
    return stages.find((s) => s.key === stage)?.label || "Desconhecido"
  }

  const getStageColor = (stage: Opportunity["stage"]) => {
    return stages.find((s) => s.key === stage)?.color || "bg-gray-500"
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const weightedValue = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability) / 100, 0)
  const avgDealSize = totalValue / opportunities.length
  const conversionRate = (opportunities.filter((opp) => opp.stage === "closed-won").length / opportunities.length) * 100

  const stageStats = stages.map((stage) => {
    const stageOpps = opportunities.filter((opp) => opp.stage === stage.key)
    const stageValue = stageOpps.reduce((sum, opp) => sum + opp.value, 0)
    return {
      ...stage,
      count: stageOpps.length,
      value: stageValue,
      opportunities: stageOpps,
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Funil de Vendas</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Oportunidade
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground">Pipeline total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Ponderado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(weightedValue)}</div>
            <p className="text-xs text-muted-foreground">Baseado na probabilidade</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgDealSize)}</div>
            <p className="text-xs text-muted-foreground">Por oportunidade</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Oportunidades fechadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Stages */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stageStats.map((stage) => (
          <Card key={stage.key} className="min-h-[400px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{stage.label}</CardTitle>
                <div className={`h-3 w-3 rounded-full ${stage.color}`}></div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{stage.count}</div>
                <div className="text-xs text-muted-foreground">{formatCurrency(stage.value)}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium line-clamp-2">{opportunity.title}</h4>
                      <Badge variant="outline" className="text-xs ml-2">
                        {opportunity.probability}%
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div>{opportunity.company}</div>
                      <div>{opportunity.contact}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-600">{formatCurrency(opportunity.value)}</span>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={opportunity.avatar || "/placeholder.svg"} alt={opportunity.assignedTo} />
                        <AvatarFallback className="text-xs">
                          {opportunity.assignedTo
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Probabilidade</span>
                        <span>{opportunity.probability}%</span>
                      </div>
                      <Progress value={opportunity.probability} className="h-1" />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Previsão: {new Date(opportunity.expectedCloseDate).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
