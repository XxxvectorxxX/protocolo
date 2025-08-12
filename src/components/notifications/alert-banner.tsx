"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { useNotifications } from "../../contexts/notifications-context"
import { AlertTriangle, X, ExternalLink, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

export function AlertBanner() {
  const { alertas, isAlertSoundEnabled, toggleAlertSound } = useNotifications()
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])
  const [isBlinking, setIsBlinking] = useState(false)

  // Filtrar alertas não dispensados
  const activeAlerts = alertas.filter((alerta) => !dismissedAlerts.includes(alerta.id))

  // Efeito de piscar para alertas urgentes
  useEffect(() => {
    const hasUrgentAlerts = activeAlerts.some((alerta) => alerta.prioridade === "urgente")
    if (hasUrgentAlerts) {
      setIsBlinking(true)
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setIsBlinking(false)
    }
  }, [activeAlerts])

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId])
  }

  const getAlertVariant = (prioridade: string) => {
    switch (prioridade) {
      case "urgente":
        return "destructive"
      case "alta":
        return "destructive"
      default:
        return "default"
    }
  }

  const getAlertMessage = (alerta: any) => {
    switch (alerta.tipo) {
      case "tempo_limite":
        return `Chamado sem atendimento há ${Math.floor(alerta.tempoSemAtendimento / 60)}h ${
          alerta.tempoSemAtendimento % 60
        }min`
      case "sem_atendente":
        return "Chamado sem atendente atribuído"
      case "cliente_aguardando":
        return "Cliente aguardando resposta"
      default:
        return "Requer atenção imediata"
    }
  }

  if (activeAlerts.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {activeAlerts.map((alerta) => (
        <Alert
          key={alerta.id}
          variant={getAlertVariant(alerta.prioridade) as any}
          className={`${alerta.prioridade === "urgente" && isBlinking ? "animate-pulse" : ""} border-l-4 ${
            alerta.prioridade === "urgente" ? "border-l-red-500" : "border-l-orange-500"
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          <div className="flex items-center justify-between w-full">
            <div className="flex-1">
              <AlertTitle className="flex items-center gap-2">
                Alerta de Atendimento - #{alerta.protocolo}
                <Badge variant={alerta.prioridade === "urgente" ? "destructive" : "secondary"}>
                  {alerta.prioridade}
                </Badge>
              </AlertTitle>
              <AlertDescription className="mt-1">
                <strong>{alerta.cliente}</strong> - {getAlertMessage(alerta)}
              </AlertDescription>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" size="sm" onClick={toggleAlertSound} title="Toggle som de alerta">
                {isAlertSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={`/chamados/${alerta.chamadoId}`}>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Ver Chamado
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => dismissAlert(alerta.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  )
}
