"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../lib/api"

interface User {
  id: string
  nome: string
  email: string
  perfil: "admin" | "atendente" | "cliente"
  departamento?: string
  ativo: boolean
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um token salvo e validar
    const token = localStorage.getItem("auth_token")
    if (token) {
      validateToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const validateToken = async (token: string) => {
    try {
      // Simular validação do token com a API
      const userData = await api.getCurrentUser()
      setUser(userData)
    } catch (error) {
      localStorage.removeItem("auth_token")
      console.error("Token inválido:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      // Simular login com a API
      const response = await api.login(email, password)

      localStorage.setItem("auth_token", response.token)
      setUser(response.user)
    } catch (error) {
      throw new Error("Credenciais inválidas")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false

    const permissions = {
      admin: ["all"],
      atendente: ["view_chamados", "edit_chamados", "view_clientes"],
      cliente: ["view_own_chamados", "create_chamados"],
    }

    const userPermissions = permissions[user.perfil] || []
    return userPermissions.includes("all") || userPermissions.includes(permission)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
