"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ProtectedRoute } from "../../components/auth/protected-route"
import { useAuth } from "../../contexts/auth-context"
import type { DashboardStats, Chamado, Atendente, AlertaAtendimento } from "../../types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  UserCheck,
  Settings,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [chamadosRecentes, setChamadosRecentes] = useState<Chamado[]>([])
  const [atendentes, setAtendentes] = useState<Atendente[]>([])
  const [alertas, setAlertas] = useState<AlertaAtendimento[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    loadDashboardData()
    // Atualizar dados a cada 30 segundos
    const interval = setInterval(loadDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Simular dados do dashboard
      const mockStats: DashboardStats = {
        totalChamados: 156,
        chamadosAbertos: 24,
        chamadosEmAndamento: 12,
        chamadosFinalizados: 120,
        tempoMedioAtendimento: 4.2, // horas
        satisfacaoMedia: 4.6,
        alertasAtivos: 5,
        atendentesMaisAtivos: [
          {
            id: "1",
            nome: "Maria Atendente",
            email: "maria@royal.com",
            perfil: "atendente",
            departamento: "Suporte",
            ativo: true,
            chamadosAtivos: 8,
          },
          {
            id: "2",
            nome: "Carlos Supervisor",
            email: "carlos@royal.com",
            perfil: "supervisor",
            departamento: "Suporte",
            ativo: true,
            chamadosAtivos: 5,
          },
        ],
      }

      const mockChamadosRecentes: Chamado[] = [
        {
          id: "1",
          protocolo: "2024-025",
          clienteId: "1",
          cliente: {
            id: "1",
            nome: "João Silva",
            email: "joao@empresa.com",
            telefone: "(11) 99999-9999",
            documento: "123.456.789-00",
            dataCadastro: "2024-01-15",
            ativo: true,
          },
          atendenteId: "1",
          atendente: {
            id: "1",
            nome: "Maria Atendente",
            email: "maria@royal.com",
            perfil: "atendente",
            departamento: "Suporte",
            ativo: true,
            chamadosAtivos: 8,
          },
          assunto: "Sistema apresentando lentidão",
          descricao: "O sistema está muito lento para carregar as telas",
          status: "em_andamento",
          prioridade: "alta",
          categoria: "Performance",
          dataAbertura: "2024-01-22T14:30:00Z",
          dataUltimaInteracao: "2024-01-22T15:45:00Z",
          tempoSemAtendimento: 15,
          conversas: [],
          anexos: [],
          tags: ["performance"],
          informacoesCliente: {
            tipoSistema: "ERP",
            versaoSistema: "v2.1.0",
          },
        },
      ]

      const mockAlertas: AlertaAtendimento[] = [
        {
          id: "1",
          chamadoId: "2",
          protocolo: "2024-023",
          cliente: "Empresa ABC",
          tempoSemAtendimento: 180,
          prioridade: "urgente",
          tipo: "tempo_limite",
          dataAlerta: "2024-01-22T16:00:00Z",
        },
        {
          id: "2",
          chamadoId: "3",
          protocolo: "2024-024",
          cliente: "Pedro Santos",
          tempoSemAtendimento: 120,
          prioridade: "alta",
          tipo: "sem_atendente",
          dataAlerta: "2024-01-22T15:30:00Z",
        },
      ]

      setStats(mockStats)
      setChamadosRecentes(mockChamadosRecentes)
      setAlertas(mockAlertas)
      loadAtendentes()
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadAtendentes = async () => {
    try {
      const mockAtendentes: Atendente[] = [
        {
          id: "1",
          nome: "Maria Atendente",
          email: "maria@royal.com",
          perfil: "atendente",
          departamento: "Suporte",
          ativo: true,
          chamadosAtivos: 8,
        },
        {
          id: "2",
          nome: "Carlos Supervisor",
          email: "carlos@royal.com",
          perfil: "supervisor",
          departamento: "Suporte",
          ativo: true,
          chamadosAtivos: 5,
        },
        {
          id: "3",
          nome: "Ana Técnica",
          email: "ana@royal.com",
          perfil: "atendente",
          departamento: "Técnico",
          ativo: true,
          chamadosAtivos: 3,
        },
        {
          id: "4",
          nome: "Roberto Admin",
          email: "roberto@royal.com",
          perfil: "admin",
          departamento: "Administração",
          ativo: true,
          chamadosAtivos: 0,
        },
      ]
      setAtendentes(mockAtendentes)
    } catch (error) {
      console.error("Erro ao carregar atendentes:", error)
    }
  }

  // Dados para gráficos
  const dadosStatusChamados = [
    { name: "Abertos", value: stats?.chamadosAbertos || 0, color: "#f59e0b" },
    { name: "Em Andamento", value: stats?.chamadosEmAndamento || 0, color: "#3b82f6" },
    { name: "Finalizados", value: stats?.chamadosFinalizados || 0, color: "#10b981" },
  ]

  const dadosAtendimentoPorDia = [
    { dia: "Seg", chamados: 18, finalizados: 15 },
    { dia: "Ter", chamados: 22, finalizados: 19 },
    { dia: "Qua", chamados: 25, finalizados: 21 },
    { dia: "Qui", chamados: 20, finalizados: 18 },
    { dia: "Sex", chamados: 28, finalizados: 24 },
    { dia: "Sáb", chamados: 12, finalizados: 10 },
    { dia: "Dom", chamados: 8, finalizados: 7 },
  ]

  const dadosPerformanceAtendentes = atendentes.map((atendente) => ({
    nome: atendente.nome.split(" ")[0],
    chamadosAtivos: atendente.chamadosAtivos,
    departamento: atendente.departamento,
  }))

  if (loading) {
    return (
      <ProtectedRoute requiredPermission="all">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando painel administrativo...</div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredPermission="all">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600">Visão geral completa do sistema de atendimento</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadDashboardData}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Relatório Geral
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="chamados">Todos os Chamados</TabsTrigger>
            <TabsTrigger value="atendentes">Atendentes</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Chamados</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalChamados}</div>
                  <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Chamados Abertos</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.chamadosAbertos}</div>
                  <p className="text-xs text-muted-foreground">{stats?.alertasAtivos} com alertas ativos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                  <Clock className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.tempoMedioAtendimento}h</div>
                  <p className="text-xs text-muted-foreground">-8% vs mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.satisfacaoMedia}/5</div>
                  <p className="text-xs text-muted-foreground">+0.2 pontos este mês</p>
                </CardContent>
              </Card>
            </div>

            {/* Alertas Ativos */}
            {alertas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Alertas Ativos ({alertas.length})
                  </CardTitle>
                  <CardDescription>Chamados que precisam de atenção imediata</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alertas.map((alerta) => (
                      <div
                        key={alerta.id}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="font-medium">
                              #{alerta.protocolo} - {alerta.cliente}
                            </p>
                            <p className="text-sm text-gray-600">
                              {alerta.tipo === "tempo_limite"
                                ? `${Math.floor(alerta.tempoSemAtendimento / 60)}h sem atendimento`
                                : "Sem atendente atribuído"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">{alerta.prioridade}</Badge>
                          <Button size="sm" asChild>
                            <Link href={`/chamados/${alerta.chamadoId}`}>Ver Chamado</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Chamados</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dadosStatusChamados}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dadosStatusChamados.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Atendimentos por Dia</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dadosAtendimentoPorDia}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="dia" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="chamados" fill="#3b82f6" name="Abertos" />
                      <Bar dataKey="finalizados" fill="#10b981" name="Finalizados" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance dos Atendentes */}
            <Card>
              <CardHeader>
                <CardTitle>Performance dos Atendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosPerformanceAtendentes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="chamadosAtivos" fill="#8b5cf6" name="Chamados Ativos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chamados">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Chamados</CardTitle>
                <CardDescription>Visão completa de todos os chamados do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    Aqui você pode ver todos os chamados (finalizados e em andamento)
                  </p>
                  <Button asChild>
                    <Link href="/chamados">Ver Lista Completa de Chamados</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="atendentes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gerenciamento de Atendentes
                </CardTitle>
                <CardDescription>Gerencie todos os atendentes do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atendentes.map((atendente) => (
                    <div
                      key={atendente.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{atendente.nome}</h3>
                          <p className="text-sm text-gray-600">{atendente.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{atendente.perfil}</Badge>
                            <Badge variant="secondary">{atendente.departamento}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{atendente.chamadosAtivos} chamados ativos</p>
                        <p className="text-sm text-gray-600">Status: {atendente.ativo ? "Ativo" : "Inativo"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações do Sistema
                </CardTitle>
                <CardDescription>Configure parâmetros gerais do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Alertas e Notificações</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Tempo limite para alerta (minutos)</p>
                          <p className="text-sm text-gray-600">Tempo sem atendimento para gerar alerta</p>
                        </div>
                        <div className="w-20">
                          <input
                            type="number"
                            defaultValue="60"
                            className="w-full px-3 py-1 border rounded text-center"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificações por WhatsApp</p>
                          <p className="text-sm text-gray-600">Enviar notificações automáticas</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Integração WhatsApp</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Token da API</label>
                        <input
                          type="password"
                          defaultValue="••••••••••••••••"
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Número do WhatsApp</label>
                        <input
                          type="text"
                          defaultValue="+55 11 99999-9999"
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button>Salvar Configurações</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
