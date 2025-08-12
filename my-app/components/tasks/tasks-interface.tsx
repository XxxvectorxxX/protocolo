"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, Clock, CheckCircle2, Circle, AlertTriangle } from "lucide-react"
import { CreateTaskDialog } from "./create-task-dialog"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  assignedTo?: string
  createdBy: string
  dueDate?: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

const mockTasks: Task[] = [
  {
    id: "TSK-001",
    title: "Implementar autenticação OAuth",
    description: "Adicionar login social com Google e Facebook",
    status: "in-progress",
    priority: "high",
    assignedTo: "Carlos Lima",
    createdBy: "Ana Costa",
    dueDate: "2024-01-20",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    tags: ["desenvolvimento", "autenticação"],
  },
  {
    id: "TSK-002",
    title: "Revisar documentação da API",
    description: "Atualizar documentação com novos endpoints",
    status: "todo",
    priority: "medium",
    assignedTo: "Pedro Oliveira",
    createdBy: "Maria Silva",
    dueDate: "2024-01-18",
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T09:15:00Z",
    tags: ["documentação", "api"],
  },
  {
    id: "TSK-003",
    title: "Configurar backup automático",
    description: "Implementar rotina de backup diário do banco de dados",
    status: "completed",
    priority: "high",
    assignedTo: "Lucia Ferreira",
    createdBy: "Roberto Silva",
    createdAt: "2024-01-10T16:45:00Z",
    updatedAt: "2024-01-13T11:30:00Z",
    tags: ["infraestrutura", "backup"],
  },
  {
    id: "TSK-004",
    title: "Criar templates de email",
    description: "Desenvolver templates responsivos para campanhas",
    status: "todo",
    priority: "low",
    createdBy: "Ana Costa",
    dueDate: "2024-01-25",
    createdAt: "2024-01-12T08:15:00Z",
    updatedAt: "2024-01-12T08:15:00Z",
    tags: ["design", "email", "marketing"],
  },
]

export function TasksInterface() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: `TSK-${String(tasks.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks([newTask, ...tasks])
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = task.status === "completed" ? "todo" : "completed"
          return { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        }
        return task
      }),
    )
  }

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return <Circle className="h-4 w-4 text-gray-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return "Desconhecida"
    }
  }

  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "A Fazer"
      case "in-progress":
        return "Em Andamento"
      case "completed":
        return "Concluída"
      default:
        return "Desconhecido"
    }
  }

  const statusCounts = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tarefas</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Fazer</CardTitle>
            <Circle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.todo}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="todo">A Fazer</SelectItem>
            <SelectItem value="in-progress">Em Andamento</SelectItem>
            <SelectItem value="completed">Concluída</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Prioridades</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                  className="mt-1"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-mono">
                      {task.id}
                    </Badge>
                    {getStatusIcon(task.status)}
                    <Badge variant="outline">{getStatusLabel(task.status)}</Badge>
                    <Badge variant={getPriorityColor(task.priority)}>{getPriorityLabel(task.priority)}</Badge>
                    {task.dueDate && isOverdue(task.dueDate) && task.status !== "completed" && (
                      <Badge variant="destructive" className="flex items-center space-x-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Atrasada</span>
                      </Badge>
                    )}
                  </div>

                  <h3
                    className={`text-lg font-semibold ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground">{task.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Criado por: {task.createdBy}</span>
                    {task.assignedTo && (
                      <div className="flex items-center space-x-2">
                        <span>Atribuído a:</span>
                        <Avatar className="h-5 w-5">
                          <AvatarImage src="/generic-user-avatar.png" alt={task.assignedTo} />
                          <AvatarFallback className="text-xs">
                            {task.assignedTo
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{task.assignedTo}</span>
                      </div>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Prazo: {new Date(task.dueDate).toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}
                  </div>

                  {task.tags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTask={handleCreateTask}
      />
    </div>
  )
}
