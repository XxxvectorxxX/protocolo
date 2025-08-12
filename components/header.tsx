"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, Menu, User, LogOut, Settings, Sun, Moon, Palette } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { useRouter } from "next/navigation"
import { GlobalSearch } from "@/components/ui/global-search"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout, updateStatus } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const toggleStatus = () => {
    if (user) {
      updateStatus(user.status === "online" ? "offline" : "online")
      // @ts-ignore
      window.showToast?.({
        type: "success",
        title: "Status atualizado",
        description: `Você está agora ${user.status === "online" ? "offline" : "online"}`,
      })
    }
  }

  return (
    <header className="h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <Palette className="h-4 w-4 text-purple-600" />
          <div className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Royal CRM
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center max-w-2xl mx-4">
        <GlobalSearch />
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        {user && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleStatus}
              className="hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200"
            >
              <div
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                  user.status === "online" ? "bg-green-500 animate-pulse" : "bg-gray-500"
                }`}
              ></div>
              <span className="ml-2 text-sm">{user.status === "online" ? "Online" : "Offline"}</span>
            </Button>
            <Badge
              variant={user.role === "admin" ? "default" : "secondary"}
              className={user.role === "admin" ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white" : ""}
            >
              {user.role === "admin" ? "Admin" : "Usuário"}
            </Badge>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-purple-100 dark:hover:bg-purple-900/20 relative transition-all duration-200 hover:scale-105"
          onClick={() => {
            // @ts-ignore
            window.showToast?.({
              type: "info",
              title: "Notificações",
              description: "3 novas notificações disponíveis",
            })
          }}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200 hover:scale-105"
            >
              <Avatar className="h-8 w-8 ring-2 ring-purple-200 dark:ring-purple-800 transition-all duration-200">
                <AvatarImage src="/generic-user-avatar.png" alt="Avatar" />
                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors duration-200"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
