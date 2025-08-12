import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-900">Acesso Negado</CardTitle>
          <CardDescription>Você não tem permissão para acessar esta página</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Entre em contato com o administrador do sistema se você acredita que deveria ter acesso a esta
            funcionalidade.
          </p>
          <Button asChild>
            <Link href="/">Voltar ao Início</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
