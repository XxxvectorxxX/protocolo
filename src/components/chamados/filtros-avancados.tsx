"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import type { ChamadoFilters, Cliente, Atendente } from "@/types"
import {
  Search,
  Filter,
  X,
  Save,
  Download,
  Calendar,
  Users,
  UserCheck,
  Tag,
  AlertTriangle,
  ChevronDown,
} from "lucide-react"
import type { DateRange } from "react-day-picker"

interface FiltrosAvancadosProps {
  onFiltersChange: (filters: ChamadoFilters) => void
  initialFilters?: ChamadoFilters
}

interface FiltroSalvo {
  id: string
  nome: string
  filtros: ChamadoFilters
  dataCriacao: string
}

export function FiltrosAvancados({ onFiltersChange, initialFilters = {} }: FiltrosAvancadosProps) {
  const [filtros, setFiltros] = useState<ChamadoFilters>(initialFilters)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [atendentes, setAtendentes] = useState<Atendente[]>([])
  const [filtrosSalvos, setFiltrosSalvos] = useState<FiltroSalvo[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [clientesSelecionados, setClientesSelecionados] = useState<string[]>([])
  const [atendentesSelecionados, setAtendentesSelecionados] = useState<string[]>([])
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([])
  const [nomeFiltroSalvo, setNomeFiltroSalvo] = useState("")

  const categorias = [
    "Técnico",
    "Dúvida",
    "Solicitação",
    "Reclamação",
    "Sugestão",
    "Integração",
    "Performance",
    "Configuração",
  ]

  const statusOptions = [
    { value: "aberto", label: "Aberto" },
    { value: "em_andamento", label: "Em Andamento" },
    { value: "aguardando_cliente", label: "Aguardando Cliente" },
    { value: "finalizado", label: "Finalizado" },
    { value: "cancelado", label: "Cancelado" },
  ]

  const prioridadeOptions = [
    { value: "baixa", label: "Baixa" },
    { value: "media", label: "Média" },
    { value: "alta", label: "Alta" },
    { value: "urgente", label: "Urgente" },
  ]

  useEffect(() => {
    loadClientes()
    loadAtendentes()
    loadFiltrosSalvos()
  }, [])

  useEffect(() => {
    const filtrosAtualizados: ChamadoFilters = {
      ...filtros,
      clienteId: clientesSelecionados.length > 0 ? clientesSelecionados.join(",") : undefined,
      atendenteId: atendentesSelecionados.length > 0 ? atendentesSelecionados.join(",") : undefined,
      categoria: categoriasSelecionadas.length > 0 ? categoriasSelecionadas.join(",") : undefined,
      dataInicio: dateRange?.from?.toISOString(),
      dataFim: dateRange?.to?.toISOString(),
    }

    onFiltersChange(filtrosAtualizados)
  }, [filtros, clientesSelecionados, atendentesSelecionados, categoriasSelecionadas, dateRange])

  const loadClientes = async () => {
    try {
      // Simular dados de clientes
      const mockClientes: Cliente[] = [
        {
          id: "1",
          nome: "João Silva",
          email: "joao@empresa.com",
          telefone: "(11) 99999-9999",
          documento: "123.456.789-00",
          dataCadastro: "2024-01-15",
          ativo: true,
        },
        {
          id: "2",
          nome: "Empresa ABC Ltda",
          email: "contato@abc.com",
          telefone: "(11) 88888-8888",
          documento: "12.345.678/0001-90",
          dataCadastro: "2024-01-10",
          ativo: true,
        },
        {
          id: "3",
          nome: "Pedro Santos",
          email: "pedro@teste.com",
          telefone: "(11) 77777-7777",
          documento: "987.654.321-00",
          dataCadastro: "2024-01-05",
          ativo: true,
        },
      ]
      setClientes(mockClientes)
    } catch (error) {
      console.error("Erro ao carregar clientes:", error)
    }
  }

  const loadAtendentes = async () => {
    try {
      // Simular dados de atendentes
      const mockAtendentes: Atendente[] = [
        {
          id: "1",
          nome: "Maria Atendente",
          email: "maria@royal.com",
          perfil: "atendente",
          departamento: "Suporte",
          ativo: true,
          chamadosAtivos: 3,
        },
        {
          id: "2",
          nome: "Carlos Supervisor",
          email: "carlos@royal.com",
          perfil: "supervisor",
          departamento: "Suporte",
          ativo: true,
          chamadosAtivos: 1,
        },
        {
          id: "3",
          nome: "Ana Técnica",
          email: "ana@royal.com",
          perfil: "atendente",
          departamento: "Técnico",
          ativo: true,
          chamadosAtivos: 5,
        },
      ]
      setAtendentes(mockAtendentes)
    } catch (error) {
      console.error("Erro ao carregar atendentes:", error)
    }
  }

  const loadFiltrosSalvos = () => {
    // Simular filtros salvos do localStorage
    const saved = localStorage.getItem("filtros_salvos")
    if (saved) {
      setFiltrosSalvos(JSON.parse(saved))
    }
  }

  const salvarFiltro = () => {
    if (!nomeFiltroSalvo.trim()) return

    const novoFiltro: FiltroSalvo = {
      id: Date.now().toString(),
      nome: nomeFiltroSalvo,
      filtros: {
        ...filtros,
        clienteId: clientesSelecionados.join(","),
        atendenteId: atendentesSelecionados.join(","),
        categoria: categoriasSelecionadas.join(","),
        dataInicio: dateRange?.from?.toISOString(),
        dataFim: dateRange?.to?.toISOString(),
      },
      dataCriacao: new Date().toISOString(),
    }

    const novosFiltros = [...filtrosSalvos, novoFiltro]
    setFiltrosSalvos(novosFiltros)
    localStorage.setItem("filtros_salvos", JSON.stringify(novosFiltros))
    setNomeFiltroSalvo("")
  }

  const aplicarFiltroSalvo = (filtroSalvo: FiltroSalvo) => {
    const { filtros: filtrosSalvosData } = filtroSalvo

    setFiltros(filtrosSalvosData)
    setClientesSelecionados(filtrosSalvosData.clienteId ? filtrosSalvosData.clienteId.split(",") : [])
    setAtendentesSelecionados(filtrosSalvosData.atendenteId ? filtrosSalvosData.atendenteId.split(",") : [])
    setCategoriasSelecionadas(filtrosSalvosData.categoria ? filtrosSalvosData.categoria.split(",") : [])

    if (filtrosSalvosData.dataInicio && filtrosSalvosData.dataFim) {
      setDateRange({
        from: new Date(filtrosSalvosData.dataInicio),
        to: new Date(filtrosSalvosData.dataFim),
      })
    }
  }

  const limparFiltros = () => {
    setFiltros({})
    setClientesSelecionados([])
    setAtendentesSelecionados([])
    setCategoriasSelecionadas([])
    setDateRange(undefined)
  }

  const exportarDados = () => {
    // Implementar exportação dos dados filtrados
    console.log("Exportando dados com filtros:", filtros)
    // Aqui você implementaria a lógica de exportação (CSV, Excel, PDF)
  }

  const toggleCliente = (clienteId: string) => {
    setClientesSelecionados((prev) =>
      prev.includes(clienteId) ? prev.filter((id) => id !== clienteId) : [...prev, clienteId],
    )
  }

  const toggleAtendente = (atendenteId: string) => {
    setAtendentesSelecionados((prev) =>
      prev.includes(atendenteId) ? prev.filter((id) => id !== atendenteId) : [...prev, atendenteId],
    )
  }

  const toggleCategoria = (categoria: string) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria],
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros Avançados
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? "Ocultar" : "Mostrar"} Avançados
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" onClick={exportarDados}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filtros Básicos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por protocolo, cliente ou assunto..."
              value={filtros.searchTerm || ""}
              onChange={(e) => setFiltros((prev) => ({ ...prev, searchTerm: e.target.value }))}
              className="pl-10"
            />
          </div>

          <Select
            value={filtros.status || "todos"}
            onValueChange={(value) =>
              setFiltros((prev) => ({ ...prev, status: value === "todos" ? undefined : value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filtros.prioridade || "todas"}
            onValueChange={(value) =>
              setFiltros((prev) => ({ ...prev, prioridade: value === "todas" ? undefined : value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as Prioridades</SelectItem>
              {prioridadeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={limparFiltros}>
            <X className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>

        {/* Filtros Avançados */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filtro por Clientes */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  Clientes
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      {clientesSelecionados.length > 0
                        ? `${clientesSelecionados.length} selecionado(s)`
                        : "Selecionar clientes"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <Command>
                      <CommandInput placeholder="Buscar cliente..." />
                      <CommandList>
                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                        <CommandGroup>
                          {clientes.map((cliente) => (
                            <CommandItem key={cliente.id} onSelect={() => toggleCliente(cliente.id)}>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={clientesSelecionados.includes(cliente.id)}
                                  onChange={() => toggleCliente(cliente.id)}
                                />
                                <span>{cliente.nome}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {clientesSelecionados.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {clientesSelecionados.map((clienteId) => {
                      const cliente = clientes.find((c) => c.id === clienteId)
                      return cliente ? (
                        <Badge key={clienteId} variant="secondary" className="text-xs">
                          {cliente.nome}
                          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleCliente(clienteId)} />
                        </Badge>
                      ) : null
                    })}
                  </div>
                )}
              </div>

              {/* Filtro por Atendentes */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <UserCheck className="h-4 w-4" />
                  Atendentes
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      {atendentesSelecionados.length > 0
                        ? `${atendentesSelecionados.length} selecionado(s)`
                        : "Selecionar atendentes"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <Command>
                      <CommandInput placeholder="Buscar atendente..." />
                      <CommandList>
                        <CommandEmpty>Nenhum atendente encontrado.</CommandEmpty>
                        <CommandGroup>
                          {atendentes.map((atendente) => (
                            <CommandItem key={atendente.id} onSelect={() => toggleAtendente(atendente.id)}>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={atendentesSelecionados.includes(atendente.id)}
                                  onChange={() => toggleAtendente(atendente.id)}
                                />
                                <span>{atendente.nome}</span>
                                <Badge variant="outline" className="text-xs">
                                  {atendente.departamento}
                                </Badge>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {atendentesSelecionados.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {atendentesSelecionados.map((atendenteId) => {
                      const atendente = atendentes.find((a) => a.id === atendenteId)
                      return atendente ? (
                        <Badge key={atendenteId} variant="secondary" className="text-xs">
                          {atendente.nome}
                          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleAtendente(atendenteId)} />
                        </Badge>
                      ) : null
                    })}
                  </div>
                )}
              </div>

              {/* Filtro por Período */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Período
                </Label>
                <DatePickerWithRange date={dateRange} onDateChange={setDateRange} placeholder="Selecionar período" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Filtro por Categorias */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4" />
                  Categorias
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {categorias.map((categoria) => (
                    <div key={categoria} className="flex items-center space-x-2">
                      <Checkbox
                        id={categoria}
                        checked={categoriasSelecionadas.includes(categoria)}
                        onCheckedChange={() => toggleCategoria(categoria)}
                      />
                      <Label htmlFor={categoria} className="text-sm">
                        {categoria}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filtros Especiais */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Filtros Especiais
                </Label>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sem_atendimento"
                      checked={filtros.tempoSemAtendimento !== undefined}
                      onCheckedChange={(checked) =>
                        setFiltros((prev) => ({
                          ...prev,
                          tempoSemAtendimento: checked ? 60 : undefined,
                        }))
                      }
                    />
                    <Label htmlFor="sem_atendimento" className="text-sm">
                      Chamados sem atendimento há mais de 1h
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sem_atendente"
                      checked={filtros.semAtendente !== undefined}
                      onCheckedChange={(checked) =>
                        setFiltros((prev) => ({
                          ...prev,
                          semAtendente: checked ? true : undefined,
                        }))
                      }
                    />
                    <Label htmlFor="sem_atendente" className="text-sm">
                      Chamados sem atendente
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="alta_prioridade"
                      checked={filtros.altaPrioridade !== undefined}
                      onCheckedChange={(checked) =>
                        setFiltros((prev) => ({
                          ...prev,
                          altaPrioridade: checked ? true : undefined,
                        }))
                      }
                    />
                    <Label htmlFor="alta_prioridade" className="text-sm">
                      Apenas alta prioridade/urgente
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros Salvos */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <Label className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Filtros Salvos
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Nome do filtro..."
                    value={nomeFiltroSalvo}
                    onChange={(e) => setNomeFiltroSalvo(e.target.value)}
                    className="w-40"
                  />
                  <Button size="sm" onClick={salvarFiltro} disabled={!nomeFiltroSalvo.trim()}>
                    Salvar
                  </Button>
                </div>
              </div>

              {filtrosSalvos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filtrosSalvos.map((filtroSalvo) => (
                    <Badge
                      key={filtroSalvo.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => aplicarFiltroSalvo(filtroSalvo)}
                    >
                      {filtroSalvo.nome}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
