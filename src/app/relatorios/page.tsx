"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Calendar, Download, Mail, FileText, Database, Send, Eye } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"
import { useToast } from "../../hooks/use-toast"

interface Relatorio {
  id: string
  titulo: string
  tipo: "conversa" | "atendimento" | "performance" | "customizado"
  chamado_id?: string
  cliente_email?: string
  data_criacao: string
  status: "gerando" | "pronto" | "enviado" | "arquivado"
  arquivo_url?: string
  enviado_para?: string[]
}

export default function RelatoriosPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [relatorios, setRelatorios] = useState<Relatorio[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [novoRelatorio, setNovoRelatorio] = useState({
    titulo: "",
    tipo: "conversa" as const,
    chamado_id: "",
    cliente_email: "",
    periodo_inicio: "",
    periodo_fim: "",
    incluir_anexos: true,
    formato: "pdf",
  })

  // Mock data - em produção viria da API
  useEffect(() => {
    const mockRelatorios: Relatorio[] = [
      {
        id: "1",
        titulo: "Relatório de Conversa - Chamado #2024-001",
        tipo: "conversa",
        chamado_id: "2024-001",
        cliente_email: "cliente@empresa.com",
        data_criacao: "2024-01-15T10:00:00Z",
        status: "enviado",
        arquivo_url: "/relatorios/conversa-2024-001.pdf",
        enviado_para: ["cliente@empresa.com", "admin@royalsistemas.com.br"],
      },
      {
        id: "2",
        titulo: "Relatório de Performance - Janeiro 2024",
        tipo: "performance",
        data_criacao: "2024-01-16T09:00:00Z",
        status: "pronto",
        arquivo_url: "/relatorios/performance-jan-2024.pdf",
      },
      {
        id: "3",
        titulo: "Relatório de Atendimento - Cliente XYZ",
        tipo: "atendimento",
        cliente_email: "xyz@cliente.com",
        data_criacao: "2024-01-17T14:00:00Z",
        status: "gerando",
      },
    ]
    setRelatorios(mockRelatorios)
  }, [])

  const gerarRelatorio = async () => {
    const relatorio: Relatorio = {
      id: Date.now().toString(),
      titulo: novoRelatorio.titulo,
      tipo: novoRelatorio.tipo,
      chamado_id: novoRelatorio.chamado_id || undefined,
      cliente_email: novoRelatorio.cliente_email || undefined,
      data_criacao: new Date().toISOString(),
      status: "gerando",
    }

    setRelatorios([relatorio, ...relatorios])
    setIsDialogOpen(false)

    // Simular geração do relatório
    setTimeout(() => {
      setRelatorios((prev) =>
        prev.map((r) =>
          r.id === relatorio.id ? { ...r, status: "pronto", arquivo_url: `/relatorios/${relatorio.id}.pdf` } : r,
        ),
      )

      toast({
        title: "Relatório gerado com sucesso!",
        description: "O relatório está pronto para download ou envio.",
      })
    }, 3000)

    // Reset form
    setNovoRelatorio({
      titulo: "",
      tipo: "conversa",
      chamado_id: "",
      cliente_email: "",
      periodo_inicio: "",
      periodo_fim: "",
      incluir_anexos: true,
      formato: "pdf",
    })
  }

  const enviarPorEmail = async (relatorioId: string, email: string) => {
    const relatorio = relatorios.find((r) => r.id === relatorioId)
    if (!relatorio) return

    // Simular envio por email
    setTimeout(() => {
      setRelatorios((prev) =>
        prev.map((r) =>
          r.id === relatorioId
            ? {
                ...r,
                status: "enviado",
                enviado_para: [...(r.enviado_para || []), email],
              }
            : r,
        ),
      )

      toast({
        title: "Relatório enviado!",
        description: `Relatório enviado para ${email}`,
      })
    }, 1000)
  }

  const arquivarRelatorio = async (relatorioId: string) => {
    // Simular arquivamento na base de dados
    setTimeout(() => {
      setRelatorios((prev) => prev.map((r) => (r.id === relatorioId ? { ...r, status: "arquivado" } : r)))

      toast({
        title: "Relatório arquivado!",
        description: "Relatório salvo na base de dados.",
      })
    }, 500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pronto":
        return "bg-green-100 text-green-800"
      case "enviado":
        return "bg-blue-100 text-blue-800"
      case "gerando":
        return "bg-yellow-100 text-yellow-800"
      case "arquivado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "conversa":
        return <FileText className="h-4 w-4" />
      case "atendimento":
        return <Calendar className="h-4 w-4" />
      case "performance":
        return <Database className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Gere e gerencie relatórios do sistema</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Novo Relatório
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Gerar Novo Relatório</DialogTitle>
              <DialogDescription>Configure os parâmetros do relatório</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="titulo">Título do Relatório</Label>
                <Input
                  id="titulo"
                  value={novoRelatorio.titulo}
                  onChange={(e) => setNovoRelatorio({ ...novoRelatorio, titulo: e.target.value })}
                  placeholder="Ex: Relatório de Conversa - Chamado #2024-001"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo de Relatório</Label>
                  <Select
                    value={novoRelatorio.tipo}
                    onValueChange={(value: any) => setNovoRelatorio({ ...novoRelatorio, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conversa">Conversa Completa</SelectItem>
                      <SelectItem value="atendimento">Histórico de Atendimento</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="customizado">Customizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="formato">Formato</Label>
                  <Select
                    value={novoRelatorio.formato}
                    onValueChange={(value) => setNovoRelatorio({ ...novoRelatorio, formato: value })}
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
              </div>

              {novoRelatorio.tipo === "conversa" && (
                <div className="grid gap-2">
                  <Label htmlFor="chamado_id">ID do Chamado</Label>
                  <Input
                    id="chamado_id"
                    value={novoRelatorio.chamado_id}
                    onChange={(e) => setNovoRelatorio({ ...novoRelatorio, chamado_id: e.target.value })}
                    placeholder="Ex: 2024-001"
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="cliente_email">Email do Cliente (para envio automático)</Label>
                <Input
                  id="cliente_email"
                  type="email"
                  value={novoRelatorio.cliente_email}
                  onChange={(e) => setNovoRelatorio({ ...novoRelatorio, cliente_email: e.target.value })}
                  placeholder="cliente@empresa.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="periodo_inicio">Período - Início</Label>
                  <Input
                    id="periodo_inicio"
                    type="date"
                    value={novoRelatorio.periodo_inicio}
                    onChange={(e) => setNovoRelatorio({ ...novoRelatorio, periodo_inicio: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="periodo_fim">Período - Fim</Label>
                  <Input
                    id="periodo_fim"
                    type="date"
                    value={novoRelatorio.periodo_fim}
                    onChange={(e) => setNovoRelatorio({ ...novoRelatorio, periodo_fim: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={gerarRelatorio}>
                Gerar Relatório
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Relatórios */}
      <div className="grid gap-4">
        {relatorios.map((relatorio) => (
          <Card key={relatorio.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {getTipoIcon(relatorio.tipo)}
                  <div>
                    <CardTitle className="text-lg">{relatorio.titulo}</CardTitle>
                    <CardDescription className="mt-1">
                      Criado em {new Date(relatorio.data_criacao).toLocaleDateString("pt-BR")}
                      {relatorio.chamado_id && ` • Chamado #${relatorio.chamado_id}`}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(relatorio.status)}>{relatorio.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {relatorio.cliente_email && <p>Cliente: {relatorio.cliente_email}</p>}
                  {relatorio.enviado_para && relatorio.enviado_para.length > 0 && (
                    <p>Enviado para: {relatorio.enviado_para.join(", ")}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  {relatorio.status === "pronto" && (
                    <>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4 mr-1" />
                            Enviar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Enviar Relatório por Email</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email de destino</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="destinatario@email.com"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    const email = (e.target as HTMLInputElement).value
                                    if (email) {
                                      enviarPorEmail(relatorio.id, email)
                                      ;(e.target as HTMLInputElement).value = ""
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                const input = document.getElementById("email") as HTMLInputElement
                                if (input?.value) {
                                  enviarPorEmail(relatorio.id, input.value)
                                  input.value = ""
                                }
                              }}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Enviar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline" onClick={() => arquivarRelatorio(relatorio.id)}>
                        <Database className="h-4 w-4 mr-1" />
                        Arquivar
                      </Button>
                    </>
                  )}

                  {relatorio.status === "enviado" && (
                    <Button size="sm" variant="outline" onClick={() => arquivarRelatorio(relatorio.id)}>
                      <Database className="h-4 w-4 mr-1" />
                      Arquivar
                    </Button>
                  )}

                  {relatorio.arquivo_url && (
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {relatorios.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum relatório encontrado.</p>
            <p className="text-sm text-gray-400">Clique em "Novo Relatório" para começar.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
