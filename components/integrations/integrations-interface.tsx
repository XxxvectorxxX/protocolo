"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, Mail, Settings, CheckCircle, AlertCircle, BarChart3 } from "lucide-react"
import { WhatsAppConfig } from "./whatsapp-config"
import { ReportsInterface } from "./reports-interface"
import { EmailPdfInterface } from "./email-pdf-interface"

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  status: "connected" | "disconnected" | "error"
  lastSync?: string
  config?: Record<string, any>
}

export function IntegrationsInterface() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "whatsapp",
      name: "WhatsApp Business API",
      description: "Conecte sua conta do WhatsApp Business para enviar e receber mensagens",
      icon: MessageSquare,
      status: "connected",
      lastSync: "2024-01-15T14:30:00Z",
      config: {
        phoneNumber: "+55 11 99999-0000",
        businessName: "Minha Empresa",
        webhookUrl: "https://api.minhaempresa.com/webhook",
      },
    },
    {
      id: "reports",
      name: "Sistema de Relatórios",
      description: "Gere relatórios detalhados de vendas, atendimentos e performance",
      icon: BarChart3,
      status: "connected",
      lastSync: "2024-01-15T15:00:00Z",
    },
    {
      id: "email-pdf",
      name: "Email com PDF",
      description: "Envie relatórios e documentos em PDF por email automaticamente",
      icon: Mail,
      status: "connected",
      lastSync: "2024-01-15T14:45:00Z",
      config: {
        smtpServer: "smtp.gmail.com",
        smtpPort: "587",
        emailFrom: "noreply@minhaempresa.com",
      },
    },
  ])

  const getStatusColor = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "disconnected":
        return "bg-gray-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return "Conectado"
      case "disconnected":
        return "Desconectado"
      case "error":
        return "Erro"
      default:
        return "Desconhecido"
    }
  }

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              status: integration.status === "connected" ? "disconnected" : "connected",
              lastSync: integration.status === "disconnected" ? new Date().toISOString() : integration.lastSync,
            }
          : integration,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrações</h1>
          <p className="text-muted-foreground">Configure e gerencie as integrações do sistema</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="email-pdf">Email PDF</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <integration.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(integration.status)}`}></div>
                          <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                            {getStatusLabel(integration.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={integration.status === "connected"}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{integration.description}</CardDescription>

                  {integration.status === "connected" && integration.lastSync && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Última sincronização: {new Date(integration.lastSync).toLocaleString("pt-BR")}</span>
                    </div>
                  )}

                  {integration.status === "error" && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>Erro na conexão. Verifique as configurações.</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurar
                    </Button>
                    {integration.status === "connected" && (
                      <Button variant="outline" size="sm">
                        Testar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="whatsapp">
          <WhatsAppConfig />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsInterface />
        </TabsContent>

        <TabsContent value="email-pdf">
          <EmailPdfInterface />
        </TabsContent>
      </Tabs>
    </div>
  )
}
