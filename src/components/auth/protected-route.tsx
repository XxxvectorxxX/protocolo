"use client"

import type React from "react"

import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  fallbackPath?: string
}

export function ProtectedRoute({ children, requiredPermission, fallbackPath = "/login" }: ProtectedRouteProps) {
  const { user, loading, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(fallbackPath)
        return
      }

      if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, loading, hasPermission, requiredPermission, router, fallbackPath])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null
  }

  return <>{children}</>
}
