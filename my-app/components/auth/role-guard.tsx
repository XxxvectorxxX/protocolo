"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: ("admin" | "user")[]
  fallback?: React.ReactNode
}

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
