"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, BarChart3, Filter, Mail, Users, MessageSquare, DollarSign } from "lucide-react"

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: "sales" | "support" | "contacts" | "performance"
  icon: React.ComponentType<{ className?: string }>
  fields: string[]
}

const reportTemplates: ReportTemplate[] = [
  {
    id: "sales-report",
    name: "Relatório de Vendas",
    description: "Análise completa de vendas, oportunidades e conversões",
    type: "sales",
    icon: DollarSign,
    fields: ["Período", "Vendedor", "Status", "Valor", "Produto"],
  },
  {
    id: "support-report",
    name: "Relatório de Atendimento",
    description: "Métricas de tickets, tempo de resposta e satisfação",
    type: "support",
    icon: MessageSquare,
    fields: ["Período", "Agente", "Status", "Categoria", "Prioridade"],
  },
  {
    id: "contacts-report",
    name: "Relatório de Contatos",
    description: "Análise de leads, prospects e clientes",
    type: "contacts",
    icon: Users,
    fields: ["Período", "Status", "Origem", "Cidade", "Tags"],
  },
  {
    id: "performance-report",
    name: "Relatório de Performance",
    description: "KPIs e métricas de performance da equipe",
    type: "performance",
    icon: BarChart3,
    fields: ["Período", "Usuário", "Departamento", "Métricas"],
  },
]

export function ReportsInterface() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [reportConfig, setReportConfig] = useState({
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    format: "pdf",
    includeCharts: true,
    includeDetails: true,
    groupBy: "date",
    filters: {
      status: "all",
      assignedTo: "all",
      category: "all",
    },
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)

    // Simulate download
    const template = reportTemplates.find((t) => t.id === selectedTemplate)
    alert(`Relatório "${template?.name}" gerado com sucesso! Download iniciado.`)
  }

  const handleScheduleReport = () => {
    alert("Relatório agendado para envio automático!")
  }

  const selectedTemplateData = reportTemplates.find((t) => t.id === selectedTemplate)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Relatórios</h2>
          <p className="text-muted-foreground">Gere relatórios personalizados e automatize o envio</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Template Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Templates</span>
            </CardTitle>
            <CardDescription>Escolha um template de relatório</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate === template.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <template.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.fields.slice(0, 2).map((field) => (
                        <Badge key={field} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                      {template.fields.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.fields.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Configuração do Relatório</span>
            </CardTitle>
            <CardDescription>
              {selectedTemplateData
                ? `Configure os parâmetros para "${selectedTemplateData.name}"`
                : "Selecione um template para configurar"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedTemplateData ? (
              <>
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Inicial</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={reportConfig.startDate}
                      onChange={(e) => setReportConfig({ ...reportConfig, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data Final</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={reportConfig.endDate}
                      onChange={(e) => setReportConfig({ ...reportConfig, endDate: e.target.value })}
                    />
                  </div>
                </div>

                {/* Format and Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="format">Formato</Label>
                    <Select
                      value={reportConfig.format}
                      onValueChange={(value) => setReportConfig({ ...reportConfig, format: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupBy">Agrupar por</Label>
                    <Select
                      value={reportConfig.groupBy}
                      onValueChange={(value) => setReportConfig({ ...reportConfig, groupBy: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Data</SelectItem>
                        <SelectItem value="user">Usuário</SelectItem>
                        <SelectItem value="category">Categoria</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <Label>Opções do Relatório</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeCharts"
                        checked={reportConfig.includeCharts}
                        onCheckedChange={(checked) =>
                          setReportConfig({ ...reportConfig, includeCharts: checked as boolean })
                        }
                      />
                      <Label htmlFor="includeCharts" className="text-sm">
                        Incluir gráficos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeDetails"
                        checked={reportConfig.includeDetails}
                        onCheckedChange={(checked) =>
                          setReportConfig({ ...reportConfig, includeDetails: checked as boolean })
                        }
                      />
                      <Label htmlFor="includeDetails" className="text-sm">
                        Incluir detalhes
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="space-y-3">
                  <Label>Filtros</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="statusFilter" className="text-sm">
                        Status
                      </Label>
                      <Select
                        value={reportConfig.filters.status}
                        onValueChange={(value) =>
                          setReportConfig({
                            ...reportConfig,
                            filters: { ...reportConfig.filters, status: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignedFilter" className="text-sm">
                        Responsável
                      </Label>
                      <Select
                        value={reportConfig.filters.assignedTo}
                        onValueChange={(value) =>
                          setReportConfig({
                            ...reportConfig,
                            filters: { ...reportConfig.filters, assignedTo: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="carlos">Carlos Lima</SelectItem>
                          <SelectItem value="ana">Ana Costa</SelectItem>
                          <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoryFilter" className="text-sm">
                        Categoria
                      </Label>
                      <Select
                        value={reportConfig.filters.category}
                        onValueChange={(value) =>
                          setReportConfig({
                            ...reportConfig,
                            filters: { ...reportConfig.filters, category: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="sales">Vendas</SelectItem>
                          <SelectItem value="support">Suporte</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleGenerateReport} disabled={isGenerating} className="flex-1">
                    {isGenerating ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Gerar Relatório
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleScheduleReport}>
                    <Mail className="mr-2 h-4 w-4" />
                    Agendar Envio
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Selecione um template de relatório para começar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>Histórico dos últimos relatórios gerados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Relatório de Vendas - Janeiro 2024", date: "2024-01-15", format: "PDF", size: "2.3 MB" },
              { name: "Relatório de Atendimento - Dezembro 2023", date: "2024-01-01", format: "Excel", size: "1.8 MB" },
              { name: "Relatório de Performance - Q4 2023", date: "2023-12-31", format: "PDF", size: "3.1 MB" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium text-sm">{report.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {new Date(report.date).toLocaleDateString("pt-BR")} • {report.format} • {report.size}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
