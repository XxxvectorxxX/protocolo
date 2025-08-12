"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DashboardCharts() {
  const progressData = [
    { label: "Atendimentos Hoje", value: 75, total: 100, color: "bg-blue-500" },
    { label: "Meta Mensal", value: 68, total: 100, color: "bg-green-500" },
    { label: "Satisfação Cliente", value: 92, total: 100, color: "bg-purple-500" },
  ]

  const recentStats = [
    { label: "7 horas 19 minutos", sublabel: "Tempo médio de resposta", icon: "⏱️" },
    { label: "2 horas 20 minutos", sublabel: "Tempo médio de resolução", icon: "✅" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Progress Cards */}
      {progressData.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-2xl font-bold">{item.value}%</span>
                <span className="text-muted-foreground">de {item.total}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Stats Cards */}
      {recentStats.map((stat) => (
        <Card key={stat.label} className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <div className="text-lg font-semibold">{stat.label}</div>
                <div className="text-sm opacity-80">{stat.sublabel}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
