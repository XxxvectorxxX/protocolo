"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log do erro para monitoramento
    console.error("CRM Error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 p-8">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
        <h2 className="text-2xl font-bold text-foreground">Algo deu errado!</h2>
        <p className="text-muted-foreground max-w-md">
          Ocorreu um erro inesperado no sistema. Nossa equipe foi notificada.
        </p>
        <Button onClick={reset} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}
