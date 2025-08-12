"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { User, Settings, LogOut, Menu } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"
// Importando NotificationCenter
import { NotificationCenter } from "../../components/notifications/notification-center"

export function Header() {
  const [alertCount] = useState(5)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Royal Sistemas</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/chamados" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Chamados
            </Link>
            <Link href="/clientes" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Clientes
            </Link>
            <Link href="/tasks" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Tasks
            </Link>
            <Link href="/relatorios" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Relatórios
            </Link>
            {user?.perfil === "admin" && (
              <Link href="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Admin
              </Link>
            )}
          </nav>
        </div>

        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {user && (
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Olá,</span>
                <span className="font-medium">{user.nome}</span>
                <Badge variant="outline" className="text-xs">
                  {user.perfil}
                </Badge>
              </div>
            )}
          </div>
          <nav className="flex items-center space-x-2">
            {/* Substituindo notificações antigas pelo NotificationCenter */}
            <NotificationCenter />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.nome || "Minha Conta"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
