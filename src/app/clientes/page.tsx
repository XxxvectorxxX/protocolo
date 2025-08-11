"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Building, Monitor, Search, Plus } from "lucide-react"
import Link from "next/link"

interface ClienteResumo {
  id: string
  nome: string
  empresa: string
  email: string
  telefone: string
  tipo_sistema: string
  nivel_suporte: "basico" | "intermediario" | "avancado"
  status: "ativo" | "inativo"
  ultimo_chamado: string
  total_chamados: number
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<ClienteResumo[]>([])
  const [filtroNome, setFiltroNome] = useState("")
  const [filtroNivel, setFiltroNivel] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")

  // Mock data - em produção viria da API
  useEffect(() => {
    const mockClientes: ClienteResumo[] = [
      {
        id: "1",
        nome: "João Silva Santos",
        empresa: "Empresa XYZ Ltda",
        email: "joao.silva@empresa.com.br",
        telefone: "(11) 99999-9999",
        tipo_sistema: "ERP Comercial",
        nivel_suporte: "intermediario",
        status: "ativo",
        ultimo_chamado: "2024-01-15T10:00:00Z",
        total_chamados: 15,
      },
      {
        id: "2",
        nome: "Maria Santos Costa",
        empresa: "Tech Solutions Inc",
        email: "maria.costa@techsolutions.com",
        telefone: "(11) 88888-8888",
        tipo_sistema: "Sistema Financeiro",
        nivel_suporte: "avancado",
        status: "ativo",
        ultimo_chamado: "2024-01-14T14:30:00Z",
        total_chamados: 8,
      },
      {
        id: "3",
        nome: "Pedro Oliveira",
        empresa: "Comércio ABC",
        email: "pedro@comercioabc.com.br",
        telefone: "(11) 77777-7777",
        tipo_sistema: "PDV",
        nivel_suporte: "basico",
        status: "inativo",
        ultimo_chamado: "2024-01-10T09:15:00Z",
        total_chamados: 3,
      },
    ]
    setClientes(mockClientes)
  }, [])

  const clientesFiltrados = clientes.filter((cliente) => {
    const nomeMatch =
      cliente.nome.toLowerCase().includes(filtroNome.toLowerCase()) ||
      cliente.empresa.toLowerCase().includes(filtroNome.toLowerCase())
    const nivelMatch = filtroNivel === "todos" || cliente.nivel_suporte === filtroNivel
    const statusMatch = filtroStatus === "todos" || cliente.status === filtroStatus

    return nomeMatch && nivelMatch && statusMatch
  })

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "basico":
        return "bg-blue-100 text-blue-800"
      case "intermediario":
        return "bg-yellow-100 text-yellow-800"
      case "avancado":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "inativo":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie informações e dados dos clientes</p>
        </div>

        <Button asChild>
          <Link href="/clientes/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nome ou empresa..."
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filtroNivel} onValueChange={setFiltroNivel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nível de Suporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Níveis</SelectItem>
            <SelectItem value="basico">Básico</SelectItem>
            <SelectItem value="intermediario">Intermediário</SelectItem>
            <SelectItem value="avancado">Avançado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Clientes */}
      <div className="grid gap-4">
        {clientesFiltrados.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 text-gray-400" />
                  <div>
                    <CardTitle className="text-lg">{cliente.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Building className="h-4 w-4" />
                      {cliente.empresa}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getNivelColor(cliente.nivel_suporte)}>{cliente.nivel_suporte}</Badge>
                  <Badge className={getStatusColor(cliente.status)}>{cliente.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{cliente.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Telefone</p>
                  <p className="font-medium">{cliente.telefone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Sistema</p>
                  <p className="font-medium flex items-center gap-1">
                    <Monitor className="h-4 w-4" />
                    {cliente.tipo_sistema}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Último Chamado</p>
                  <p className="font-medium">{new Date(cliente.ultimo_chamado).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{cliente.total_chamados}</span> chamados registrados
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/clientes/${cliente.id}`}>Ver Detalhes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clientesFiltrados.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum cliente encontrado com os filtros selecionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
