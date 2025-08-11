"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Building, Monitor, AlertTriangle, Settings, Edit, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ClienteInfo {
  id: string
  nome: string
  email: string
  telefone: string
  empresa: string
  cargo: string
  endereco: string
  cidade: string
  estado: string
  cep: string

  // Informações técnicas
  tipo_sistema: string
  versao_sistema: string
  sistema_operacional: string
  navegador: string
  configuracao_maquina: {
    processador: string
    memoria_ram: string
    armazenamento: string
    placa_video: string
    sistema_operacional_detalhado: string
  }

  // Histórico de erros
  erros_frequentes: Array<{
    id: string
    descricao: string
    data_ocorrencia: string
    status: "resolvido" | "pendente" | "recorrente"
    solucao?: string
  }>

  // Configurações específicas
  configuracoes_especiais: Array<{
    id: string
    tipo: string
    descricao: string
    valor: string
    data_configuracao: string
  }>

  // Dados de suporte
  nivel_suporte: "basico" | "intermediario" | "avancado"
  preferencia_contato: "email" | "telefone" | "whatsapp"
  horario_atendimento: string
  observacoes: string
}

export default function ClienteDetalhesPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [cliente, setCliente] = useState<ClienteInfo | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedCliente, setEditedCliente] = useState<ClienteInfo | null>(null)
  const [novoErro, setNovoErro] = useState({
    descricao: "",
    status: "pendente" as const,
    solucao: "",
  })
  const [novaConfiguracao, setNovaConfiguracao] = useState({
    tipo: "",
    descricao: "",
    valor: "",
  })

  // Mock data - em produção viria da API
  useEffect(() => {
    const mockCliente: ClienteInfo = {
      id: params.id,
      nome: "João Silva Santos",
      email: "joao.silva@empresa.com.br",
      telefone: "(11) 99999-9999",
      empresa: "Empresa XYZ Ltda",
      cargo: "Gerente de TI",
      endereco: "Rua das Flores, 123",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",

      tipo_sistema: "ERP Comercial",
      versao_sistema: "v2.1.5",
      sistema_operacional: "Windows 11",
      navegador: "Chrome 120.0",
      configuracao_maquina: {
        processador: "Intel Core i7-12700K",
        memoria_ram: "16GB DDR4",
        armazenamento: "SSD 512GB",
        placa_video: "NVIDIA GTX 1660",
        sistema_operacional_detalhado: "Windows 11 Pro 22H2",
      },

      erros_frequentes: [
        {
          id: "1",
          descricao: "Erro de conexão com banco de dados",
          data_ocorrencia: "2024-01-15T10:00:00Z",
          status: "resolvido",
          solucao: "Reinicialização do serviço de banco",
        },
        {
          id: "2",
          descricao: "Lentidão no módulo de vendas",
          data_ocorrencia: "2024-01-10T14:30:00Z",
          status: "recorrente",
          solucao: "Otimização de consultas SQL em andamento",
        },
      ],

      configuracoes_especiais: [
        {
          id: "1",
          tipo: "Integração",
          descricao: "API de pagamento PagSeguro",
          valor: "Ativa - Token: abc123",
          data_configuracao: "2024-01-01T00:00:00Z",
        },
        {
          id: "2",
          tipo: "Backup",
          descricao: "Backup automático diário",
          valor: "03:00 - Servidor local",
          data_configuracao: "2024-01-05T00:00:00Z",
        },
      ],

      nivel_suporte: "intermediario",
      preferencia_contato: "whatsapp",
      horario_atendimento: "08:00 às 18:00",
      observacoes: "Cliente prefere contato via WhatsApp. Tem conhecimento técnico intermediário.",
    }

    setCliente(mockCliente)
    setEditedCliente(mockCliente)
  }, [params.id])

  const salvarAlteracoes = () => {
    if (editedCliente) {
      setCliente(editedCliente)
      setIsEditing(false)
      toast({
        title: "Dados salvos com sucesso!",
        description: "As informações do cliente foram atualizadas.",
      })
    }
  }

  const adicionarErro = () => {
    if (!editedCliente || !novoErro.descricao) return

    const erro = {
      id: Date.now().toString(),
      ...novoErro,
      data_ocorrencia: new Date().toISOString(),
    }

    setEditedCliente({
      ...editedCliente,
      erros_frequentes: [erro, ...editedCliente.erros_frequentes],
    })

    setNovoErro({
      descricao: "",
      status: "pendente",
      solucao: "",
    })

    toast({
      title: "Erro adicionado!",
      description: "Novo erro registrado no histórico do cliente.",
    })
  }

  const adicionarConfiguracao = () => {
    if (!editedCliente || !novaConfiguracao.tipo || !novaConfiguracao.descricao) return

    const configuracao = {
      id: Date.now().toString(),
      ...novaConfiguracao,
      data_configuracao: new Date().toISOString(),
    }

    setEditedCliente({
      ...editedCliente,
      configuracoes_especiais: [configuracao, ...editedCliente.configuracoes_especiais],
    })

    setNovaConfiguracao({
      tipo: "",
      descricao: "",
      valor: "",
    })

    toast({
      title: "Configuração adicionada!",
      description: "Nova configuração registrada para o cliente.",
    })
  }

  if (!cliente) {
    return <div>Carregando...</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolvido":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "recorrente":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{cliente.nome}</h1>
          <p className="text-gray-600">
            {cliente.empresa} • {cliente.cargo}
          </p>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={salvarAlteracoes}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="dados-pessoais" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dados-pessoais">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
          <TabsTrigger value="configuracao">Configuração</TabsTrigger>
          <TabsTrigger value="erros">Histórico de Erros</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="dados-pessoais">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={isEditing ? editedCliente?.nome : cliente.nome}
                      onChange={(e) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, nome: e.target.value } : null))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedCliente?.email : cliente.email}
                      onChange={(e) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, email: e.target.value } : null))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={isEditing ? editedCliente?.telefone : cliente.telefone}
                      onChange={(e) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, telefone: e.target.value } : null))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input
                      id="cargo"
                      value={isEditing ? editedCliente?.cargo : cliente.cargo}
                      onChange={(e) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, cargo: e.target.value } : null))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    value={isEditing ? editedCliente?.empresa : cliente.empresa}
                    onChange={(e) =>
                      isEditing && setEditedCliente((prev) => (prev ? { ...prev, empresa: e.target.value } : null))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={isEditing ? editedCliente?.endereco : cliente.endereco}
                    onChange={(e) =>
                      isEditing && setEditedCliente((prev) => (prev ? { ...prev, endereco: e.target.value } : null))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      value={isEditing ? editedCliente?.cidade : cliente.cidade}
                      onChange={(e) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, cidade: e.target.value } : null))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      value={isEditing ? editedCliente?.estado : cliente.estado}
                      onChange={(e) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, estado: e.target.value } : null))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={isEditing ? editedCliente?.cep : cliente.cep}
                      onChange={(e) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, cep: e.target.value } : null))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferências de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nivel_suporte">Nível de Suporte</Label>
                    <Select
                      value={isEditing ? editedCliente?.nivel_suporte : cliente.nivel_suporte}
                      onValueChange={(value: any) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, nivel_suporte: value } : null))
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basico">Básico</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="preferencia_contato">Preferência de Contato</Label>
                    <Select
                      value={isEditing ? editedCliente?.preferencia_contato : cliente.preferencia_contato}
                      onValueChange={(value: any) =>
                        isEditing && setEditedCliente((prev) => (prev ? { ...prev, preferencia_contato: value } : null))
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="telefone">Telefone</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="horario_atendimento">Horário de Atendimento</Label>
                  <Input
                    id="horario_atendimento"
                    value={isEditing ? editedCliente?.horario_atendimento : cliente.horario_atendimento}
                    onChange={(e) =>
                      isEditing &&
                      setEditedCliente((prev) => (prev ? { ...prev, horario_atendimento: e.target.value } : null))
                    }
                    disabled={!isEditing}
                    placeholder="Ex: 08:00 às 18:00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={isEditing ? editedCliente?.observacoes : cliente.observacoes}
                    onChange={(e) =>
                      isEditing && setEditedCliente((prev) => (prev ? { ...prev, observacoes: e.target.value } : null))
                    }
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sistema">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Informações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tipo_sistema">Tipo do Sistema</Label>
                  <Input
                    id="tipo_sistema"
                    value={isEditing ? editedCliente?.tipo_sistema : cliente.tipo_sistema}
                    onChange={(e) =>
                      isEditing && setEditedCliente((prev) => (prev ? { ...prev, tipo_sistema: e.target.value } : null))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="versao_sistema">Versão do Sistema</Label>
                  <Input
                    id="versao_sistema"
                    value={isEditing ? editedCliente?.versao_sistema : cliente.versao_sistema}
                    onChange={(e) =>
                      isEditing &&
                      setEditedCliente((prev) => (prev ? { ...prev, versao_sistema: e.target.value } : null))
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sistema_operacional">Sistema Operacional</Label>
                  <Input
                    id="sistema_operacional"
                    value={isEditing ? editedCliente?.sistema_operacional : cliente.sistema_operacional}
                    onChange={(e) =>
                      isEditing &&
                      setEditedCliente((prev) => (prev ? { ...prev, sistema_operacional: e.target.value } : null))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="navegador">Navegador</Label>
                  <Input
                    id="navegador"
                    value={isEditing ? editedCliente?.navegador : cliente.navegador}
                    onChange={(e) =>
                      isEditing && setEditedCliente((prev) => (prev ? { ...prev, navegador: e.target.value } : null))
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracao">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuração da Máquina
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="processador">Processador</Label>
                  <Input
                    id="processador"
                    value={
                      isEditing
                        ? editedCliente?.configuracao_maquina.processador
                        : cliente.configuracao_maquina.processador
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditedCliente((prev) =>
                        prev
                          ? {
                              ...prev,
                              configuracao_maquina: { ...prev.configuracao_maquina, processador: e.target.value },
                            }
                          : null,
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="memoria_ram">Memória RAM</Label>
                  <Input
                    id="memoria_ram"
                    value={
                      isEditing
                        ? editedCliente?.configuracao_maquina.memoria_ram
                        : cliente.configuracao_maquina.memoria_ram
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditedCliente((prev) =>
                        prev
                          ? {
                              ...prev,
                              configuracao_maquina: { ...prev.configuracao_maquina, memoria_ram: e.target.value },
                            }
                          : null,
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="armazenamento">Armazenamento</Label>
                  <Input
                    id="armazenamento"
                    value={
                      isEditing
                        ? editedCliente?.configuracao_maquina.armazenamento
                        : cliente.configuracao_maquina.armazenamento
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditedCliente((prev) =>
                        prev
                          ? {
                              ...prev,
                              configuracao_maquina: { ...prev.configuracao_maquina, armazenamento: e.target.value },
                            }
                          : null,
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="placa_video">Placa de Vídeo</Label>
                  <Input
                    id="placa_video"
                    value={
                      isEditing
                        ? editedCliente?.configuracao_maquina.placa_video
                        : cliente.configuracao_maquina.placa_video
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditedCliente((prev) =>
                        prev
                          ? {
                              ...prev,
                              configuracao_maquina: { ...prev.configuracao_maquina, placa_video: e.target.value },
                            }
                          : null,
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sistema_operacional_detalhado">Sistema Operacional Detalhado</Label>
                <Input
                  id="sistema_operacional_detalhado"
                  value={
                    isEditing
                      ? editedCliente?.configuracao_maquina.sistema_operacional_detalhado
                      : cliente.configuracao_maquina.sistema_operacional_detalhado
                  }
                  onChange={(e) =>
                    isEditing &&
                    setEditedCliente((prev) =>
                      prev
                        ? {
                            ...prev,
                            configuracao_maquina: {
                              ...prev.configuracao_maquina,
                              sistema_operacional_detalhado: e.target.value,
                            },
                          }
                        : null,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="erros">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Histórico de Erros
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Adicionar Erro</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Registrar Novo Erro</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="descricao_erro">Descrição do Erro</Label>
                          <Textarea
                            id="descricao_erro"
                            value={novoErro.descricao}
                            onChange={(e) => setNovoErro({ ...novoErro, descricao: e.target.value })}
                            placeholder="Descreva o erro encontrado"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="status_erro">Status</Label>
                          <Select
                            value={novoErro.status}
                            onValueChange={(value: any) => setNovoErro({ ...novoErro, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pendente">Pendente</SelectItem>
                              <SelectItem value="resolvido">Resolvido</SelectItem>
                              <SelectItem value="recorrente">Recorrente</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="solucao_erro">Solução (opcional)</Label>
                          <Textarea
                            id="solucao_erro"
                            value={novoErro.solucao}
                            onChange={(e) => setNovoErro({ ...novoErro, solucao: e.target.value })}
                            placeholder="Descreva a solução aplicada"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={adicionarErro}>Adicionar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cliente.erros_frequentes.map((erro) => (
                    <div key={erro.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{erro.descricao}</h4>
                        <Badge className={getStatusColor(erro.status)}>{erro.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Ocorrido em: {new Date(erro.data_ocorrencia).toLocaleDateString("pt-BR")}
                      </p>
                      {erro.solucao && (
                        <div className="bg-green-50 p-3 rounded">
                          <p className="text-sm">
                            <strong>Solução:</strong> {erro.solucao}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuracoes">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configurações Especiais
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Nova Configuração</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Configuração</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="tipo_config">Tipo</Label>
                          <Input
                            id="tipo_config"
                            value={novaConfiguracao.tipo}
                            onChange={(e) => setNovaConfiguracao({ ...novaConfiguracao, tipo: e.target.value })}
                            placeholder="Ex: Integração, Backup, Customização"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="descricao_config">Descrição</Label>
                          <Input
                            id="descricao_config"
                            value={novaConfiguracao.descricao}
                            onChange={(e) => setNovaConfiguracao({ ...novaConfiguracao, descricao: e.target.value })}
                            placeholder="Descrição da configuração"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="valor_config">Valor/Detalhes</Label>
                          <Textarea
                            id="valor_config"
                            value={novaConfiguracao.valor}
                            onChange={(e) => setNovaConfiguracao({ ...novaConfiguracao, valor: e.target.value })}
                            placeholder="Detalhes da configuração"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={adicionarConfiguracao}>Adicionar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cliente.configuracoes_especiais.map((config) => (
                    <div key={config.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{config.descricao}</h4>
                          <Badge variant="outline" className="mt-1">
                            {config.tipo}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(config.data_configuracao).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded mt-2">
                        <p className="text-sm">{config.valor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
