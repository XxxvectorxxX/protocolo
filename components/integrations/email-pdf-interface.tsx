"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Mail, Send, Settings, CheckCircle } from "lucide-react"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  type: "report" | "ticket" | "welcome" | "followup"
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "report-template",
    name: "Relatório Mensal",
    subject: "Relatório Mensal - {{month}}/{{year}}",
    body: "Olá {{clientName}},\n\nSegue em anexo o relatório mensal de {{month}}/{{year}}.\n\nAtenciosamente,\nEquipe {{companyName}}",
    type: "report",
  },
  {
    id: "ticket-closed",
    name: "Ticket Finalizado",
    subject: "Ticket #{{ticketId}} - Finalizado",
    body: "Olá {{clientName}},\n\nSeu ticket #{{ticketId}} foi finalizado com sucesso.\n\nSegue em anexo o relatório detalhado do atendimento.\n\nAtenciosamente,\nEquipe de Suporte",
    type: "ticket",
  },
]

export function EmailPdfInterface() {
  const [emailConfig, setEmailConfig] = useState({
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
    emailFrom: "noreply@minhaempresa.com",
    emailFromName: "Minha Empresa",
    username: "usuario@gmail.com",
    password: "senha_app",
    useSSL: true,
    autoSend: true,
  })

  const [testEmail, setTestEmail] = useState({
    to: "cliente@exemplo.com",
    subject: "Teste de Envio - Relatório PDF",
    body: "Olá,\n\nEste é um teste de envio de email com PDF em anexo.\n\nAtenciosamente,\nEquipe CRM",
    template: "report-template",
  })

  const [isConnected, setIsConnected] = useState(true)
  const [isTesting, setIsTesting] = useState(false)

  const handleSaveConfig = () => {
    console.log("Saving email config:", emailConfig)
    alert("Configurações salvas com sucesso!")
  }

  const handleTestEmail = async () => {
    setIsTesting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsTesting(false)
    alert("Email de teste enviado com sucesso!")
  }

  const handleToggleConnection = () => {
    setIsConnected(!isConnected)
  }

  const selectedTemplate = emailTemplates.find((t) => t.id === testEmail.template)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Configuração Email PDF</h2>
          <p className="text-muted-foreground">Configure o envio automático de PDFs por email</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
          <Badge variant={isConnected ? "default" : "destructive"}>{isConnected ? "Conectado" : "Desconectado"}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SMTP Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Configuração SMTP</span>
            </CardTitle>
            <CardDescription>Configure o servidor de email para envio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpServer">Servidor SMTP</Label>
                <Input
                  id="smtpServer"
                  value={emailConfig.smtpServer}
                  onChange={(e) => setEmailConfig({ ...emailConfig, smtpServer: e.target.value })}
                  placeholder="smtp.gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">Porta</Label>
                <Input
                  id="smtpPort"
                  value={emailConfig.smtpPort}
                  onChange={(e) => setEmailConfig({ ...emailConfig, smtpPort: e.target.value })}
                  placeholder="587"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailFrom">Email Remetente</Label>
              <Input
                id="emailFrom"
                type="email"
                value={emailConfig.emailFrom}
                onChange={(e) => setEmailConfig({ ...emailConfig, emailFrom: e.target.value })}
                placeholder="noreply@suaempresa.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailFromName">Nome do Remetente</Label>
              <Input
                id="emailFromName"
                value={emailConfig.emailFromName}
                onChange={(e) => setEmailConfig({ ...emailConfig, emailFromName: e.target.value })}
                placeholder="Sua Empresa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                value={emailConfig.username}
                onChange={(e) => setEmailConfig({ ...emailConfig, username: e.target.value })}
                placeholder="usuario@gmail.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={emailConfig.password}
                onChange={(e) => setEmailConfig({ ...emailConfig, password: e.target.value })}
                placeholder="Senha ou senha de app"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="useSSL"
                  checked={emailConfig.useSSL}
                  onCheckedChange={(checked) => setEmailConfig({ ...emailConfig, useSSL: checked })}
                />
                <Label htmlFor="useSSL">Usar SSL/TLS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoSend"
                  checked={emailConfig.autoSend}
                  onCheckedChange={(checked) => setEmailConfig({ ...emailConfig, autoSend: checked })}
                />
                <Label htmlFor="autoSend">Envio Automático</Label>
              </div>
            </div>

            <Separator />

            <div className="flex space-x-2">
              <Button onClick={handleSaveConfig} className="flex-1">
                <Settings className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
              <Button onClick={handleToggleConnection} variant={isConnected ? "destructive" : "default"}>
                {isConnected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Teste de Email</span>
            </CardTitle>
            <CardDescription>Envie um email de teste com PDF anexo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select
                value={testEmail.template}
                onValueChange={(value) => setTestEmail({ ...testEmail, template: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testTo">Email Destinatário</Label>
              <Input
                id="testTo"
                type="email"
                value={testEmail.to}
                onChange={(e) => setTestEmail({ ...testEmail, to: e.target.value })}
                placeholder="cliente@exemplo.com"
                disabled={!isConnected}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testSubject">Assunto</Label>
              <Input
                id="testSubject"
                value={selectedTemplate?.subject || testEmail.subject}
                onChange={(e) => setTestEmail({ ...testEmail, subject: e.target.value })}
                placeholder="Assunto do email"
                disabled={!isConnected}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testBody">Mensagem</Label>
              <Textarea
                id="testBody"
                value={selectedTemplate?.body || testEmail.body}
                onChange={(e) => setTestEmail({ ...testEmail, body: e.target.value })}
                placeholder="Corpo do email"
                rows={6}
                disabled={!isConnected}
              />
            </div>

            <Button onClick={handleTestEmail} disabled={!isConnected || isTesting} className="w-full">
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
                <AlertDescription>Email configurado e pronto para envio automático.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Email Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas de Email</CardTitle>
          <CardDescription>Métricas de envio de emails e PDFs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">456</div>
              <div className="text-sm text-muted-foreground">Emails Enviados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">432</div>
              <div className="text-sm text-muted-foreground">Entregues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">234</div>
              <div className="text-sm text-muted-foreground">PDFs Anexados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">94.7%</div>
              <div className="text-sm text-muted-foreground">Taxa de Entrega</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Emails */}
      <Card>
        <CardHeader>
          <CardTitle>Emails Recentes</CardTitle>
          <CardDescription>Histórico dos últimos emails enviados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                to: "cliente1@empresa.com",
                subject: "Relatório Mensal - Janeiro 2024",
                date: "2024-01-15T14:30:00Z",
                status: "delivered",
              },
              {
                to: "cliente2@startup.com",
                subject: "Ticket #TK-001 - Finalizado",
                date: "2024-01-15T13:15:00Z",
                status: "delivered",
              },
              {
                to: "cliente3@comercial.com",
                subject: "Relatório de Atendimento",
                date: "2024-01-15T12:00:00Z",
                status: "pending",
              },
            ].map((email, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium text-sm">{email.subject}</h4>
                    <p className="text-xs text-muted-foreground">
                      Para: {email.to} • {new Date(email.date).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
                <Badge variant={email.status === "delivered" ? "default" : "secondary"}>
                  {email.status === "delivered" ? "Entregue" : "Pendente"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
