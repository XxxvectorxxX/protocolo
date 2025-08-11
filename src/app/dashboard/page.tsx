"use client"

import { useState, useEffect } from "react"
import { DashboardAtendimentos } from "./components/dashboard-atendimentos"
import { ConfiguracaoApi } from "./components/configuracao-api"
import { useMockData, isApiEnabled } from "../../lib/config"

export default function DashboardPage() {
  const [isConfigured, setIsConfigured] = useState(false)
  const [currentMode, setCurrentMode] = useState<"api" | "mock">("mock")
  const [isLoading, setIsLoading] = useState(true)

  const checkInitialConfig = async () => {
    try {
      // Se estiver configurado para usar mock, pular configuração
      const mockData = useMockData()
      if (mockData) {
        console.log("🎭 Modo mockado detectado - pulando configuração")
        setCurrentMode("mock")
        setIsConfigured(true)
        setIsLoading(false)
        return
      }

      // Se API estiver habilitada, tentar conectar
      const apiEnabled = isApiEnabled()
      if (apiEnabled) {
        console.log("🔗 API habilitada - testando conexão...")
        const response = await fetch("/api/test-connection")
        const data = await response.json()

        if (data.success || response.ok) {
          console.log("✅ API conectada - modo API ativo")
          setCurrentMode("api")
          setIsConfigured(true)
        } else {
          console.log("❌ API não conectada - mostrando configuração")
          setCurrentMode("mock")
        }
      }
    } catch (error) {
      console.error("Erro ao verificar configuração:", error)
      setCurrentMode("mock")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Verificar configuração inicial
    checkInitialConfig()
  }, [])

  const handleApiConfigured = (mode: "api" | "mock") => {
    console.log(`🔧 Configuração definida: ${mode}`)
    setCurrentMode(mode)
    setIsConfigured(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Inicializando sistema...</p>
          <p className="text-sm text-gray-500">Verificando configurações</p>
        </div>
      </div>
    )
  }

  if (!isConfigured) {
    return <ConfiguracaoApi onConfigured={handleApiConfigured} />
  }

  return <DashboardAtendimentos mode={currentMode} />
}
