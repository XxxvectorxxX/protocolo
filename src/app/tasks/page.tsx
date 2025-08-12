"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
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
import { Calendar, User, Plus, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"

interface Task {
  id: string
  titulo: string
  descricao: string
  prioridade: "baixa" | "media" | "alta" | "urgente"
  status: "pendente" | "em_andamento" | "concluida" | "cancelada"
  atribuida_para: string
  criada_por: string
  data_criacao: string
  data_vencimento: string
  chamado_id?: string
  tags: string[]
}

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filtroStatus, setFiltroStatus] = useState<string>("todas")
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todas")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [novaTask, setNovaTask] = useState({
    titulo: "",
    descricao: "",
    prioridade: "media" as const,
    atribuida_para: "",
    data_vencimento: "",
    chamado_id: "",
    tags: [] as string[],
  })

  // Mock data - em produção viria da API
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: "1",
        titulo: "Revisar documentação do sistema",
        descricao: "Atualizar documentação técnica do módulo de atendimento",
        prioridade: "media",
        status: "em_andamento",
        atribuida_para: "João Silva",
        criada_por: "Admin",
        data_criacao: "2024-01-15T10:00:00Z",
        data_vencimento: "2024-01-20T18:00:00Z",
        tags: ["documentação", "técnico"],
      },
      {
        id: "2",
        titulo: "Implementar nova funcionalidade de relatórios",
        descricao: "Desenvolver sistema de relatórios automáticos",
        prioridade: "alta",
        status: "pendente",
        atribuida_para: "Maria Santos",
        criada_por: "Admin",
        data_criacao: "2024-01-16T09:00:00Z",
        data_vencimento: "2024-01-25T17:00:00Z",
        chamado_id: "2024-001",
        tags: ["desenvolvimento", "relatórios"],
      },
      {
        id: "3",
        titulo: "Corrigir bug no sistema de notificações",
        descricao: "Resolver problema de notificações duplicadas",
        prioridade: "urgente",
        status: "em_andamento",
        atribuida_para: "Pedro Costa",
        criada_por: "João Silva",
        data_criacao: "2024-01-17T14:00:00Z",
        data_vencimento: "2024-01-18T12:00:00Z",
        chamado_id: "2024-015",
        tags: ["bug", "notificações"],
      },
    ]
    setTasks(mockTasks)
  }, [])

  const tasksFiltradas = tasks.filter((task) => {
    const statusMatch = filtroStatus === "todas" || task.status === filtroStatus
    const prioridadeMatch = filtroPrioridade === "todas" || task.prioridade === filtroPrioridade
    return statusMatch && prioridadeMatch
  })

  const criarTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      ...novaTask,
      status: "pendente",
      criada_por: user?.nome || "Usuário",
      data_criacao: new Date().toISOString(),
      tags: novaTask.tags,
    }

    setTasks([...tasks, task])
    setNovaTask({
      titulo: "",
      descricao: "",
      prioridade: "media",
      atribuida_para: "",
      data_vencimento: "",
      chamado_id: "",
      tags: [],
    })
    setIsDialogOpen(false)
  }

  const atualizarStatus = (taskId: string, novoStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: novoStatus } : task)))
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "urgente":
        return "destructive"
      case "alta":
        return "destructive"
      case "media":
        return "default"
      case "baixa":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluida":
        return "bg-green-100 text-green-800"
      case "em_andamento":
        return "bg-blue-100 text-blue-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel de Tasks</h1>
          <p className="text-gray-600">Gerencie tarefas e atividades do sistema</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Task</DialogTitle>
              <DialogDescription>Adicione uma nova tarefa ao sistema</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={novaTask.titulo}
                  onChange={(e) => setNovaTask({ ...novaTask, titulo: e.target.value })}
                  placeholder="Título da task"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={novaTask.descricao}
                  onChange={(e) => setNovaTask({ ...novaTask, descricao: e.target.value })}
                  placeholder="Descrição detalhada"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <Select
                    value={novaTask.prioridade}
                    onValueChange={(value: any) => setNovaTask({ ...novaTask, prioridade: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="atribuida_para">Atribuir para</Label>
                  <Input
                    id="atribuida_para"
                    value={novaTask.atribuida_para}
                    onChange={(e) => setNovaTask({ ...novaTask, atribuida_para: e.target.value })}
                    placeholder="Nome do responsável"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="data_vencimento">Data de Vencimento</Label>
                <Input
                  id="data_vencimento"
                  type="datetime-local"
                  value={novaTask.data_vencimento}
                  onChange={(e) => setNovaTask({ ...novaTask, data_vencimento: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="chamado_id">Chamado Relacionado (opcional)</Label>
                <Input
                  id="chamado_id"
                  value={novaTask.chamado_id}
                  onChange={(e) => setNovaTask({ ...novaTask, chamado_id: e.target.value })}
                  placeholder="ID do chamado"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={criarTask}>
                Criar Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="em_andamento">Em Andamento</SelectItem>
            <SelectItem value="concluida">Concluída</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="baixa">Baixa</SelectItem>
            <SelectItem value="media">Média</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="urgente">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Tasks */}
      <div className="grid gap-4">
        {tasksFiltradas.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{task.titulo}</CardTitle>
                  <CardDescription className="mt-1">{task.descricao}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getPrioridadeColor(task.prioridade)}>{task.prioridade}</Badge>
                  <Badge className={getStatusColor(task.status)}>{task.status.replace("_", " ")}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {task.atribuida_para}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(task.data_vencimento).toLocaleDateString("pt-BR")}
                  </div>
                  {task.chamado_id && (
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Chamado #{task.chamado_id}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {task.status !== "concluida" && (
                    <Button size="sm" variant="outline" onClick={() => atualizarStatus(task.id, "concluida")}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Concluir
                    </Button>
                  )}
                  {task.status === "pendente" && (
                    <Button size="sm" variant="default" onClick={() => atualizarStatus(task.id, "em_andamento")}>
                      Iniciar
                    </Button>
                  )}
                </div>
              </div>
              {task.tags.length > 0 && (
                <div className="flex gap-1 mt-3">
                  {task.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {tasksFiltradas.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Nenhuma task encontrada com os filtros selecionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
