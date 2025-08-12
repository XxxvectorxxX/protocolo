"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, Clock, Users, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export function DashboardMetrics() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const metrics = [
    {
      title: "Total de Atendimentos",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: MessageSquare,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Atendimentos em Espera",
      value: "23",
      change: "-5%",
      changeType: "negative" as const,
      icon: Clock,
      color: "bg-yellow-500",
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Usuários Ativos",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Atendimentos Finalizados",
      value: "1,156",
      change: "+8%",
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "bg-emerald-500",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Tickets Abertos",
      value: "45",
      change: "+3",
      changeType: "neutral" as const,
      icon: AlertCircle,
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      title: "Taxa de Conversão",
      value: "68%",
      change: "+4%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-3 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card
          key={metric.title}
          className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in royal-card"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <div className={`p-2 rounded-full bg-gradient-to-r ${metric.gradient} shadow-sm`}>
              <metric.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              {metric.value}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge
                variant={
                  metric.changeType === "positive"
                    ? "default"
                    : metric.changeType === "negative"
                      ? "destructive"
                      : "secondary"
                }
                className={cn(
                  "text-xs transition-all duration-200",
                  metric.changeType === "positive" &&
                    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
                  metric.changeType === "negative" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
                )}
              >
                {metric.change}
              </Badge>
              <span>em relação ao mês anterior</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 pointer-events-none" />
        </Card>
      ))}
    </div>
  )
}
