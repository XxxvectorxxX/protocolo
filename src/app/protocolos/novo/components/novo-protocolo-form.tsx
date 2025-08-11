"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Textarea } from "../../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { useToast } from "../../../../hooks/use-toast"
import { criarProtocolo } from "../../../../lib/actions"
import type { Categoria, Usuario } from "../../../../lib/supabase"

interface NovoProtocoloFormProps {
  categorias: Categoria[]
  usuarios: Usuario[]
}

export function NovoProtocoloForm({ categorias, usuarios }: NovoProtocoloFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await criarProtocolo(formData)

      if (result.success) {
        toast({
          title: "Protocolo criado com sucesso!",
          description: `Protocolo ${result.data.numero_protocolo} foi criado.`,
        })
        router.push(`/protocolos/${result.data.id}`)
      } else {
        toast({
          title: "Erro ao criar protocolo",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao criar o protocolo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/protocolos">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Protocolo</h1>
          <p className="text-gray-600 mt-1">Preencha as informações para criar um novo protocolo de atendimento</p>
        </div>
      </div>

      <form action={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do Cliente */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
                <CardDescription>Dados do cliente que está solicitando o atendimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente_nome">Nome do Cliente *</Label>
                    <Input id="cliente_nome" name="cliente_nome" placeholder="Nome completo do cliente" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cliente_email">E-mail *</Label>
                    <Input
                      id="cliente_email"
                      name="cliente_email"
                      type="email"
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cliente_telefone">Telefone</Label>
                  <Input id="cliente_telefone" name="cliente_telefone" placeholder="(11) 99999-9999" />
                </div>
              </CardContent>
            </Card>

            {/* Detalhes do Protocolo */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Detalhes do Protocolo</CardTitle>
                <CardDescription>Informações sobre o problema ou solicitação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título do Protocolo *</Label>
                  <Input
                    id="titulo"
                    name="titulo"
                    placeholder="Descreva brevemente o problema ou solicitação"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição Detalhada *</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva detalhadamente o problema, incluindo passos para reproduzir, mensagens de erro, etc."
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configurações */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>Categoria, prioridade e responsável</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria_id">Categoria *</Label>
                  <Select name="categoria_id" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoria.cor }} />
                            {categoria.nome}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prioridade">Prioridade *</Label>
                  <Select name="prioridade" defaultValue="Média" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baixa">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          Baixa
                        </div>
                      </SelectItem>
                      <SelectItem value="Média">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          Média
                        </div>
                      </SelectItem>
                      <SelectItem value="Alta">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                          Alta
                        </div>
                      </SelectItem>
                      <SelectItem value="Crítica">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          Crítica
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsavel_id">Responsável</Label>
                  <Select name="responsavel_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Atribuir responsável (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {usuarios.map((usuario) => (
                        <SelectItem key={usuario.id} value={usuario.id}>
                          <div>
                            <div className="font-medium">{usuario.nome}</div>
                            <div className="text-sm text-gray-500">{usuario.cargo}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? (
                      "Criando..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Criar Protocolo
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
