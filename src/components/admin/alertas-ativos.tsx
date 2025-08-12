"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import type { AlertaAtendimento } from "../../types"
import { AlertTriangle, Clock, UserX, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"

interface AlertasAtivosProps {
  alertas: AlertaAtendimento[]
  onResolverAlerta?: (alertaId: string) => void
}

export function AlertasAtivos({ alertas, onResolverAlerta }: AlertasAtivosProps) {
  if (alertas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <AlertTriangle className="h-5 w-5" />
            Nenhum Alerta Ativo
          </CardTitle>
          <CardDescription>Todos os chamados estão sendo atendidos adequadamente</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case "tempo_limite":
        return <Clock className="h-4 w-4 text-red-500" />
      case "sem_atendente":
        return <UserX className="h-4 w-4 text-orange-500" />
      case "cliente_aguardando":
        return <MessageSquare className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getAlertaDescricao = (alerta: AlertaAtendimento) => {
    switch (alerta.tipo) {
      case "tempo_limite":
        return `${Math.floor(alerta.tempoSemAtendimento / 60)}h ${alerta.tempoSemAtendimento % 60}min sem atendimento`
      case "sem_atendente":
        return "Chamado sem atendente atribuído"
      case "cliente_aguardando":
        return "Cliente aguardando resposta há muito tempo"
      default:
        return "Alerta de atendimento"
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "urgente":
        return "destructive"
      case "alta":
        return "destructive"
      case "media":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Alertas Ativos ({alertas.length})
        </CardTitle>
        <CardDescription>Chamados que precisam de atenção imediata</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alertas.map((alerta) => (
            <div
              key={alerta.id}
              className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getAlertaIcon(alerta.tipo)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">#{alerta.protocolo}</p>
                    <Badge variant={getPrioridadeColor(alerta.prioridade) as any}>{alerta.prioridade}</Badge>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{alerta.cliente}</p>
                  <p className="text-sm text-gray-600">{getAlertaDescricao(alerta)}</p>
                  <p className="text-xs text-gray-500">
                    Alerta criado em: {new Date(alerta.dataAlerta).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/chamados/${alerta.chamadoId}`}>Ver Chamado</Link>
                </Button>
                {onResolverAlerta && (
                  <Button size="sm" variant="outline" onClick={() => onResolverAlerta(alerta.id)}>
                    Resolver
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
