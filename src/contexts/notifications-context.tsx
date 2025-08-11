"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { AlertaAtendimento } from "@/types"
import { toast } from "@/hooks/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  timestamp: string
  read: boolean
  actionUrl?: string
  chamadoId?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  alertas: AlertaAtendimento[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
  playAlertSound: () => void
  isAlertSoundEnabled: boolean
  toggleAlertSound: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [alertas, setAlertas] = useState<AlertaAtendimento[]>([])
  const [isAlertSoundEnabled, setIsAlertSoundEnabled] = useState(true)
  const { user } = useAuth()

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSoundSetting = localStorage.getItem("alert_sound_enabled")
    if (savedSoundSetting !== null) {
      setIsAlertSoundEnabled(JSON.parse(savedSoundSetting))
    }

    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  // Salvar notificações no localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  // Verificar alertas periodicamente
  useEffect(() => {
    if (!user) return

    const checkAlertas = async () => {
      try {
        // Simular verificação de alertas
        const mockAlertas: AlertaAtendimento[] = [
          {
            id: "1",
            chamadoId: "2",
            protocolo: "2024-023",
            cliente: "Empresa ABC",
            tempoSemAtendimento: 180,
            prioridade: "urgente",
            tipo: "tempo_limite",
            dataAlerta: new Date().toISOString(),
          },
          {
            id: "2",
            chamadoId: "3",
            protocolo: "2024-024",
            cliente: "Pedro Santos",
            tempoSemAtendimento: 120,
            prioridade: "alta",
            tipo: "sem_atendente",
            dataAlerta: new Date().toISOString(),
          },
        ]

        // Verificar se há novos alertas
        const novosAlertas = mockAlertas.filter((alerta) => !alertas.find((a) => a.id === alerta.id))

        if (novosAlertas.length > 0) {
          setAlertas(mockAlertas)

          // Criar notificações para novos alertas
          novosAlertas.forEach((alerta) => {
            const notification: Omit<Notification, "id" | "timestamp" | "read"> = {
              title: "Alerta de Atendimento",
              message: `Chamado #${alerta.protocolo} - ${alerta.cliente} precisa de atenção`,
              type: alerta.prioridade === "urgente" ? "error" : "warning",
              actionUrl: `/chamados/${alerta.chamadoId}`,
              chamadoId: alerta.chamadoId,
            }

            addNotification(notification)

            // Toast para alertas críticos
            if (alerta.prioridade === "urgente") {
              toast({
                title: "Alerta Urgente!",
                description: `Chamado #${alerta.protocolo} sem atendimento há ${Math.floor(
                  alerta.tempoSemAtendimento / 60,
                )}h`,
                variant: "destructive",
              })
            }
          })

          // Tocar som de alerta
          if (isAlertSoundEnabled && novosAlertas.length > 0) {
            playAlertSound()
          }
        }
      } catch (error) {
        console.error("Erro ao verificar alertas:", error)
      }
    }

    // Verificar alertas imediatamente e depois a cada 30 segundos
    checkAlertas()
    const interval = setInterval(checkAlertas, 30000)

    return () => clearInterval(interval)
  }, [user, alertas, isAlertSoundEnabled])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev].slice(0, 50)) // Manter apenas 50 notificações
  }, [])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const playAlertSound = useCallback(() => {
    if (!isAlertSoundEnabled) return

    try {
      // Criar um som de alerta simples usando Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.warn("Não foi possível reproduzir o som de alerta:", error)
    }
  }, [isAlertSoundEnabled])

  const toggleAlertSound = useCallback(() => {
    const newValue = !isAlertSoundEnabled
    setIsAlertSoundEnabled(newValue)
    localStorage.setItem("alert_sound_enabled", JSON.stringify(newValue))
  }, [isAlertSoundEnabled])

  const unreadCount = notifications.filter((n) => !n.read).length

  const value = {
    notifications,
    alertas,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    playAlertSound,
    isAlertSoundEnabled,
    toggleAlertSound,
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
