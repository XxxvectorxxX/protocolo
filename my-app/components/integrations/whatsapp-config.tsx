"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertCircle, Send, MessageSquare, Settings, Zap } from "lucide-react"

export function WhatsAppConfig() {
  const [config, setConfig] = useState({
    phoneNumber: "+55 11 99999-0000",
    businessName: "Minha Empresa",
    webhookUrl: "https://api.minhaempresa.com/webhook",
    accessToken: "EAAG...hidden",
    phoneNumberId: "123456789",
    businessAccountId: "987654321",
  })

  const [testMessage, setTestMessage] = useState({
    to: "+55 11 99999-1234",
    message: "Olá! Esta é uma mensagem de teste do nosso sistema CRM.",
  })

  const [isConnected, setIsConnected] = useState(true)
  const [isTesting, setIsTesting] = useState(false)

  const handleSaveConfig = () => {
    // Simulate saving configuration
    console.log("Saving WhatsApp config:", config)
  }

  const handleTestMessage = async () => {
    setIsTesting(true)
    // Simulate sending test message
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsTesting(false)
    alert("Mensagem de teste enviada com sucesso!")
  }

  const handleConnectWhatsApp = () => {
    // Simulate WhatsApp connection
    setIsConnected(!isConnected)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Configuração WhatsApp Business</h2>
          <p className="text-muted-foreground">Configure sua integração com WhatsApp Business API</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
          <Badge variant={isConnected ? "default" : "destructive"}>{isConnected ? "Conectado" : "Desconectado"}</Badge>
        </div>
      </div>

      {!isConnected && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            WhatsApp Business não está conectado. Configure as credenciais abaixo e clique em "Conectar WhatsApp".
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Configurações da API</span>
            </CardTitle>
            <CardDescription>Configure as credenciais da WhatsApp Business API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Número do WhatsApp Business</Label>
              <Input
                id="phoneNumber"
                value={config.phoneNumber}
                onChange={(e) => setConfig({ ...config, phoneNumber: e.target.value })}
                placeholder="+55 11 99999-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Nome da Empresa</Label>
              <Input
                id="businessName"
                value={config.businessName}
                onChange={(e) => setConfig({ ...config, businessName: e.target.value })}
                placeholder="Nome da sua empresa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessToken">Access Token</Label>
              <Input
                id="accessToken"
                type="password"
                value={config.accessToken}
                onChange={(e) => setConfig({ ...config, accessToken: e.target.value })}
                placeholder="Seu access token da Meta"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumberId">Phone Number ID</Label>
              <Input
                id="phoneNumberId"
                value={config.phoneNumberId}
                onChange={(e) => setConfig({ ...config, phoneNumberId: e.target.value })}
                placeholder="ID do número de telefone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={config.webhookUrl}
                onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                placeholder="https://api.suaempresa.com/webhook"
              />
            </div>

            <Separator />

            <div className="flex space-x-2">
              <Button onClick={handleSaveConfig} className="flex-1">
                <Settings className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
              <Button onClick={handleConnectWhatsApp} variant={isConnected ? "destructive" : "default"}>
                <Zap className="mr-2 h-4 w-4" />
                {isConnected ? "Desconectar" : "Conectar WhatsApp"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Message */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Teste de Mensagem</span>
            </CardTitle>
            <CardDescription>Envie uma mensagem de teste para verificar a integração</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testTo">Número de Destino</Label>
              <Input
                id="testTo"
                value={testMessage.to}
                onChange={(e) => setTestMessage({ ...testMessage, to: e.target.value })}
                placeholder="+55 11 99999-1234"
                disabled={!isConnected}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testMessage">Mensagem</Label>
              <Textarea
                id="testMessage"
                value={testMessage.message}
                onChange={(e) => setTestMessage({ ...testMessage, message: e.target.value })}
                placeholder="Digite sua mensagem de teste"
                rows={4}
                disabled={!isConnected}
              />
            </div>

            <Button onClick={handleTestMessage} disabled={!isConnected || isTesting} className="w-full">
              {isTesting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Teste
                </>
              )}
            </Button>

            {isConnected && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>WhatsApp conectado e pronto para enviar mensagens.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas WhatsApp</CardTitle>
          <CardDescription>Métricas de uso da integração WhatsApp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,234</div>
              <div className="text-sm text-muted-foreground">Mensagens Enviadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">856</div>
              <div className="text-sm text-muted-foreground">Mensagens Recebidas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">98.5%</div>
              <div className="text-sm text-muted-foreground">Taxa de Entrega</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">45</div>
              <div className="text-sm text-muted-foreground">Conversas Ativas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
