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
  const [phoneNumber, setPhoneNumber] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [phoneNumberId, setPhoneNumberId] = useState("")
  const [businessAccountId, setBusinessAccountId] = useState("")

  const [testTo, setTestTo] = useState("")
  const [testMessage, setTestMessage] = useState("")

  const [isConnected, setIsConnected] = useState(false)
  const [isTesting, setIsTesting] = useState(false)

  // Conectar WhatsApp via API
  const handleConnectWhatsApp = async () => {
    try {
      const res = await fetch("/api/whatsapp/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappId: 1, sessionName: "suporte" }) // ajuste o whatsappId conforme necessário
      })
      const data = await res.json()
      console.log(data)
      setIsConnected(true)
      alert("WhatsApp conectado com sucesso!")
    } catch (err) {
      console.error(err)
      setIsConnected(false)
      alert("Erro ao conectar WhatsApp")
    }
  }

  // Enviar mensagem de teste via API
  const handleTestMessage = async () => {
    if (!isConnected) return
    setIsTesting(true)
    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsappId: 1, // ajuste conforme necessário
          to: testTo,
          message: testMessage
        })
      })
      const data = await res.json()
      console.log(data)
      alert("Mensagem de teste enviada com sucesso!")
    } catch (err) {
      console.error(err)
      alert("Erro ao enviar mensagem de teste")
    } finally {
      setIsTesting(false)
    }
  }

  const handleSaveConfig = () => {
    // Aqui você pode enviar os dados para salvar em banco ou API
    const configData = {
      phoneNumber,
      businessName,
      webhookUrl,
      accessToken,
      phoneNumberId,
      businessAccountId
    }
    console.log("Salvando configuração:", configData)
    alert("Configurações salvas com sucesso!")
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
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? "Conectado" : "Desconectado"}
          </Badge>
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
        {/* Configuração */}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+55 11 99999-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessName">Nome da Empresa</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Nome da sua empresa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessToken">Access Token</Label>
              <Input
                id="accessToken"
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="Access token da Meta"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumberId">Phone Number ID</Label>
              <Input
                id="phoneNumberId"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
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

        {/* Mensagem de Teste */}
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
                value={testTo}
                onChange={(e) => setTestTo(e.target.value)}
                placeholder="+55 11 99999-1234"
                disabled={!isConnected}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testMessage">Mensagem</Label>
              <Textarea
                id="testMessage"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                rows={4}
                disabled={!isConnected}
              />
            </div>

            <Button onClick={handleTestMessage} disabled={!isConnected || isTesting} className="w-full">
              {isTesting ? "Enviando..." : "Enviar Teste"}
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
    </div>
  )
}
