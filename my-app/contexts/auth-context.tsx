"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  status: "online" | "offline"
}

interface AuthContextType {
  user: User | null
  login: (user: User) => Promise<void>
  logout: () => void
  updateStatus: (status: "online" | "offline") => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("crm-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("crm-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (userData: User) => {
    setUser(userData)
    localStorage.setItem("crm-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("crm-user")
  }

  const updateStatus = (status: "online" | "offline") => {
    if (user) {
      const updatedUser = { ...user, status }
      setUser(updatedUser)
      localStorage.setItem("crm-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateStatus, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
