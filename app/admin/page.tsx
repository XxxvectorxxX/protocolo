import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Settings, Database } from "lucide-react"

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout>
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
            <Badge variant="default">Admin Only</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 novos este mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Permissões</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Grupos de acesso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Configurações</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Módulos ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Banco de Dados</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">Saúde do sistema</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades Administrativas</CardTitle>
              <CardDescription>Acesso exclusivo para administradores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Gerenciamento de Usuários</h3>
                  <p className="text-sm text-muted-foreground">Criar, editar e remover usuários do sistema</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Configurações do Sistema</h3>
                  <p className="text-sm text-muted-foreground">Configurar integrações, APIs e parâmetros globais</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Relatórios Avançados</h3>
                  <p className="text-sm text-muted-foreground">Acesso a relatórios detalhados e analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
