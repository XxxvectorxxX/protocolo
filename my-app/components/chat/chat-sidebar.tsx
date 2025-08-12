"use client"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Conversation } from "./chat-interface"

interface ChatSidebarProps {
  conversations: Conversation[]
  selectedConversation: string | null
  onSelectConversation: (id: string) => void
}

export function ChatSidebar({ conversations, selectedConversation, onSelectConversation }: ChatSidebarProps) {
  const getStatusColor = (status: Conversation["status"]) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-500"
      case "active":
        return "bg-green-500"
      case "finished":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: Conversation["status"]) => {
    switch (status) {
      case "waiting":
        return "Aguardando"
      case "active":
        return "Ativo"
      case "finished":
        return "Finalizado"
      default:
        return "Desconhecido"
    }
  }

  const waitingCount = conversations.filter((c) => c.status === "waiting").length
  const activeCount = conversations.filter((c) => c.status === "active").length

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Conversas</h2>
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar conversas..." className="pl-10" />
        </div>

        <div className="flex space-x-2">
          <Badge variant="secondary" className="text-xs">
            {waitingCount} Aguardando
          </Badge>
          <Badge variant="default" className="text-xs">
            {activeCount} Ativo
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors",
              selectedConversation === conversation.id && "bg-muted",
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.clientName} />
                  <AvatarFallback>
                    {conversation.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ${getStatusColor(conversation.status)} border-2 border-background`}
                ></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm truncate">{conversation.clientName}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>

                <p className="text-sm text-muted-foreground truncate mb-2">{conversation.lastMessage}</p>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {getStatusLabel(conversation.status)}
                  </Badge>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>

                {conversation.assignedTo && (
                  <p className="text-xs text-muted-foreground mt-1">Atendido por: {conversation.assignedTo}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
