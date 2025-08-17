"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Headphones,
  Target,
  Trello,
  ClipboardList,
  Send,
  Mail,
  UsersRound,
  Settings,
  Zap,
  UserCog,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Painel",
    href: "/",
    description: "Dashboard principal",
    badge: null,
  },
  {
    icon: Headphones,
    label: "Atendimentos",
    href: "/chat",
    description: "Lista de atendimentos",
    badge: { count: 23, type: "warning" as const },
  },
  {
    icon: Users,
    label: "Contatos",
    href: "/contatos",
    description: "Lista de contatos",
    badge: null,
  },
  {
    icon: MessageSquare,
    label: "Chat",
    href: "/chat",
    description: "Chat",
    badge: { count: 5, type: "info" as const },
  },
  {
    icon: Target,
    label: "Funil",
    href: "/funil",
    description: "Gestão de Oportunidades",
    badge: null,
  },
  {
    icon: Trello,
    label: "Kanban",
    href: "/kanban",
    description: "CRM",
    badge: null,
  },
  {
    icon: ClipboardList,
    label: "Tarefas",
    href: "/tarefas",
    description: "TodoList",
    badge: { count: 12, type: "success" as const },
  },
  {
    icon: ClipboardList,
    label: "Tickets",
    href: "/tickets",
    description: "Sistema de Tickets",
    badge: { count: 8, type: "error" as const },
  },
  {
    icon: Send,
    label: "Disparo em Massa",
    href: "/disparo",
    description: "Envio de mensagens massivas",
    badge: null,
  },
  {
    icon: Mail,
    label: "Campanha",
    href: "/campanha",
    description: "Campanhas de envio",
    badge: null,
  },
  {
    icon: UsersRound,
    label: "Grupos",
    href: "/grupos",
    description: "Gestão de Grupos em Massa",
    badge: null,
  },
  {
    icon: Zap,
    label: "Integrações",
    href: "/integracoes",
    description: "WhatsApp, Relatórios, Email",
    badge: null,
  },
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()

  const getBadgeStyles = (type: "success" | "warning" | "error" | "info") => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white"
      case "warning":
        return "bg-yellow-500 text-white"
      case "error":
        return "bg-red-500 text-white"
      case "info":
        return "bg-cyan-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-r border-purple-200 dark:border-purple-800 transition-all duration-300 shadow-lg",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-600 to-cyan-500">
        {isOpen && (
          <div className="flex items-center space-x-2 animate-fade-in">
            <Sparkles className="h-6 w-6 text-white" />
            <h2 className="text-lg font-bold text-white font-serif">Royal CRM</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm",
                !isOpen && "px-2",
                pathname === item.href &&
                  "bg-gradient-to-r from-purple-100 to-cyan-50 dark:from-purple-900/50 dark:to-cyan-900/30 text-purple-700 dark:text-purple-300 border-r-4 border-cyan-500 shadow-sm",
              )}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <item.icon className="h-4 w-4 shrink-0" />
                  {isOpen && (
                    <div className="ml-3 flex flex-col items-start animate-fade-in">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{item.description}</span>
                    </div>
                  )}
                </div>
                {item.badge && isOpen && (
                  <Badge className={cn("text-xs px-1.5 py-0.5 animate-fade-in", getBadgeStyles(item.badge.type))}>
                    {item.badge.count}
                  </Badge>
                )}
                {item.badge && !isOpen && (
                  <div
                    className={cn(
                      "absolute -top-1 -right-1 h-2 w-2 rounded-full animate-pulse",
                      item.badge.type === "error"
                        ? "bg-red-500"
                        : item.badge.type === "warning"
                          ? "bg-yellow-500"
                          : item.badge.type === "success"
                            ? "bg-green-500"
                            : "bg-cyan-500",
                    )}
                  />
                )}
              </div>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="border-t border-purple-200 dark:border-purple-800 p-2 space-y-1 bg-gradient-to-r from-purple-50/50 to-cyan-50/50 dark:from-purple-900/20 dark:to-cyan-900/20">
        <Link href="/usuarios">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 hover:scale-[1.02]",
              !isOpen && "px-2",
              pathname === "/usuarios" &&
                "bg-gradient-to-r from-purple-100 to-cyan-50 dark:from-purple-900/50 dark:to-cyan-900/30 text-purple-700 dark:text-purple-300 border-r-4 border-cyan-500",
            )}
          >
            <UserCog className="h-4 w-4 shrink-0" />
            {isOpen && <span className="ml-3 text-sm animate-fade-in">Usuários</span>}
          </Button>
        </Link>
        <Link href="/admin">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 hover:scale-[1.02]",
              !isOpen && "px-2",
              pathname === "/admin" &&
                "bg-gradient-to-r from-purple-100 to-cyan-50 dark:from-purple-900/50 dark:to-cyan-900/30 text-purple-700 dark:text-purple-300 border-r-4 border-cyan-500",
            )}
          >
            <Settings className="h-4 w-4 shrink-0" />
            {isOpen && <span className="ml-3 text-sm animate-fade-in">Admin</span>}
          </Button>
        </Link>
      </div>
    </div>
  )
}
