"use client"

import { useEffect } from "react"
import { useNotifications } from "@/contexts/notifications-context"
import { toast } from "@/hooks/use-toast"

export function ToastNotifications() {
  const { notifications } = useNotifications()

  useEffect(() => {
    // Mostrar toast para notificações críticas
    const lastNotification = notifications[0]
    if (lastNotification && !lastNotification.read && lastNotification.type === "error") {
      toast({
        title: lastNotification.title,
        description: lastNotification.message,
        variant: "destructive",
        duration: 10000, // 10 segundos para alertas críticos
      })
    }
  }, [notifications])

  return null // Este componente não renderiza nada visualmente
}
