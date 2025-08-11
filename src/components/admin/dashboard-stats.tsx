"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DashboardStats } from "@/types"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface DashboardStatsProps {
  stats: DashboardStats
  loading?: boolean
}

export function DashboardStatsComponent({ stats, loading = false }: DashboardStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const statCards = [
    {
      title: "Total de Chamados",
      value: stats.totalChamados,
      change: "+12%",
      trend: "up" as const,
      description: "desde o mês passado",
    },
    {
      title: "Chamados Abertos",
      value: stats.chamadosAbertos,
      change: `${stats.alertasAtivos} alertas`,
      trend: "stable" as const,
      description: "precisam de atenção",
    },
    {
      title: "Em Andamento",
      value: stats.chamadosEmAndamento,
      change: "+5%",
      trend: "up" as const,
      description: "vs semana anterior",
    },
    {
      title: "Finalizados",
      value: stats.chamadosFinalizados,
      change: "+18%",
      trend: "up" as const,
      description: "este mês",
    },
    {
      title: "Tempo Médio",
      value: `${stats.tempoMedioAtendimento}h`,
      change: "-8%",
      trend: "down" as const,
      description: "melhoria contínua",
    },
    {
      title: "Satisfação",
      value: `${stats.satisfacaoMedia}/5`,
      change: "+0.2",
      trend: "up" as const,
      description: "pontos este mês",
    },
    {
      title: "Alertas Ativos",
      value: stats.alertasAtivos,
      change: stats.alertasAtivos > 5 ? "Alto" : "Normal",
      trend: stats.alertasAtivos > 5 ? ("up" as const) : ("stable" as const),
      description: "requer atenção",
    },
    {
      title: "Atendentes Ativos",
      value: stats.atendentesMaisAtivos.length,
      change: "100%",
      trend: "stable" as const,
      description: "disponibilidade",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {getTrendIcon(stat.trend)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge
                variant={stat.trend === "up" ? "default" : stat.trend === "down" ? "secondary" : "outline"}
                className="text-xs"
              >
                {stat.change}
              </Badge>
              <span>{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
