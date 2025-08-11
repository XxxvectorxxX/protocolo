"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Badge } from "../../../components/ui/badge"
import { CheckCircle, AlertCircle, Zap, Shield, RefreshCw, Database, Wifi, WifiOff } from "lucide-react"
import { isApiEnabled } from "../../../lib/config"
import ApiClient from "../../../lib/api-client"

interface ConfiguracaoApiProps {
  onConfigured: (mode: "api" | "mock") => void
}

export function ConfiguracaoApi({ onConfigured }: ConfiguracaoApiProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState("")
  const [connectionInfo, setConnectionInfo] = useState<any>(null)
  const [selectedMode, setSelectedMode] = useState<"api" | "mock">("mock")
  const [showApiTest, setShowApiTest] = useState(false)

  useEffect(() => {
    // Verificar se a API está habilitada por padrão
    if (isApiEnabled()) {
      setSelectedMode("api")
      setShowApiTest(true)
      testConnection()
    }
  }, [])

  const testConnection = async () => {
    setIsLoading(true)
    setError("")

    try {
      const apiClient = new ApiClient()
      const result = await apiClient.testConnection()

      if (result.success) {
        setIsConnected(true)

        // Buscar informações adicionais
        try {
          const [sessionsResult, usersResult, queuesResult] = await Promise.all([
            apiClient.getSessions(),
            apiClient.getUsers(),
            apiClient.getQueues(),
          ])

          setConnectionInfo({
            sessions: sessionsResult.success ? sessionsResult.data.length : 0,
            users: usersResult.success ? usersResult.data.length : 0,
            queues: queuesResult.success ? queuesResult.data.length : 0,
          })
        } catch (infoError) {
          console.warn("Erro ao buscar informações adicionais:", infoError)
        }
      } else {
        setIsConnected(false)
        setError(result.error || "Erro ao conectar com a API")
      }
    } catch (error) {
      setIsConnected(false)
      setError("Erro ao testar conexão com a API")
      console.error("Erro na conexão:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleModeChange = (mode: "api" | "mock") => {
    setSelectedMode(mode)
    if (mode === "api") {
      setShowApiTest(true)
      if (!isConnected) {
        testConnection()
      }
    } else {
      setShowApiTest(false)
      setError("")
    }
  }

  const handleContinue = () => {
    if (selectedMode === "api" && !isConnected) {
      setError("Conecte-se à API primeiro ou escolha o modo demonstração")
      return
    }

    onConfigured(selectedMode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Atendimentos</h1>
          <p className="text-gray-600 mt-2">Escolha como deseja usar o sistema</p>
        </div>

        {/* Seleção de Modo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Modo Demonstração */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedMode === "mock" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
            }`}
            onClick={() => handleModeChange("mock")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Modo Demonstração
                {selectedMode === "mock" && <Badge className="bg-blue-600">Selecionado</Badge>}
              </CardTitle>
              <CardDescription>Use dados mockados para testar o sistema sem API externa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>15 protocolos de exemplo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Funcionalidades completas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Sem necessidade de configuração</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Ideal para testes e demonstrações</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modo API */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedMode === "api" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
            }`}
            onClick={() => handleModeChange("api")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Modo API Real
                {selectedMode === "api" && <Badge className="bg-blue-600">Selecionado</Badge>}
              </CardTitle>
              <CardDescription>Conecte com a API da Royal Sistemas para dados reais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Wifi className="h-4 w-4" />
                  <span>Dados em tempo real</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Wifi className="h-4 w-4" />
                  <span>WhatsApp integrado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Wifi className="h-4 w-4" />
                  <span>Sincronização automática</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Wifi className="h-4 w-4" />
                  <span>Produção completa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teste de Conexão API */}
        {showApiTest && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Status da Conexão API
              </CardTitle>
              <CardDescription>Testando conexão com: https://atendimentoapi.royalsistemas.com.br</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status da Conexão */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {isLoading ? (
                    <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                  ) : isConnected ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">
                      {isLoading ? "Testando conexão..." : isConnected ? "Conectado" : "Desconectado"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isLoading
                        ? "Verificando API..."
                        : isConnected
                          ? "API funcionando corretamente"
                          : "Erro na conexão"}
                    </p>
                  </div>
                </div>
                <Badge variant={isConnected ? "default" : "destructive"}>{isConnected ? "Online" : "Offline"}</Badge>
              </div>

              {/* Informações da API */}
              {connectionInfo && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{connectionInfo.sessions}</p>
                    <p className="text-sm text-gray-600">Sessões</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{connectionInfo.users}</p>
                    <p className="text-sm text-gray-600">Usuários</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{connectionInfo.queues}</p>
                    <p className="text-sm text-gray-600">Filas</p>
                  </div>
                </div>
              )}

              {/* Erro */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Botão de Teste */}
              <Button onClick={testConnection} disabled={isLoading} variant="outline" className="w-full bg-transparent">
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Testar Conexão
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Informações do Modo Selecionado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedMode === "mock" ? (
                <>
                  <Database className="h-5 w-5" />
                  Modo Demonstração Selecionado
                </>
              ) : (
                <>
                  <Wifi className="h-5 w-5" />
                  Modo API Real Selecionado
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMode === "mock" ? (
              <div className="space-y-3">
                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Modo Demonstração:</strong> O sistema funcionará com dados de exemplo. Perfeito para testar
                    funcionalidades sem configurar APIs externas.
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-bold text-gray-900">15</p>
                    <p className="text-gray-600">Protocolos</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-bold text-gray-900">3</p>
                    <p className="text-gray-600">Sessões</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-bold text-gray-900">5</p>
                    <p className="text-gray-600">Clientes</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-bold text-gray-900">4</p>
                    <p className="text-gray-600">Usuários</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {isConnected ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>API Conectada:</strong> O sistema está pronto para usar dados reais da Royal Sistemas API
                      com integração WhatsApp completa.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <WifiOff className="h-4 w-4" />
                    <AlertDescription>
                      <strong>API Desconectada:</strong> Não foi possível conectar com a API. Verifique a conexão ou use
                      o modo demonstração.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Configuração da API:</p>
                      <ul className="mt-2 text-gray-700 space-y-1">
                        <li>
                          • <strong>URL:</strong> https://atendimentoapi.royalsistemas.com.br
                        </li>
                        <li>
                          • <strong>Versão:</strong> v2
                        </li>
                        <li>
                          • <strong>Tenant:</strong> 3b2e21a7-fd7c-4645-8885-6031ec1d8d62
                        </li>
                        <li>
                          • <strong>Autenticação:</strong> Bearer Token
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Botão Continuar */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
            disabled={selectedMode === "api" && showApiTest && !isConnected}
          >
            {selectedMode === "mock" ? (
              <>
                <Database className="h-5 w-5 mr-2" />
                Iniciar Demonstração
              </>
            ) : (
              <>
                <Wifi className="h-5 w-5 mr-2" />
                Acessar Dashboard
              </>
            )}
          </Button>
        </div>

        {/* Rodapé */}
        <div className="text-center text-sm text-gray-500">
          <p>
            💡 <strong>Dica:</strong> Você pode alternar entre os modos a qualquer momento nas configurações do sistema
          </p>
        </div>
      </div>
    </div>
  )
}
