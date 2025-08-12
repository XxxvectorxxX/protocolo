"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, Video, MoreVertical, UserCheck, UserX, FileText, Archive } from "lucide-react"
import type { Conversation } from "./chat-interface"

interface ChatHeaderProps {
  conversation: Conversation
  onStatusChange: (status: Conversation["status"]) => void
}

export function ChatHeader({ conversation, onStatusChange }: ChatHeaderProps) {
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

  return (
    <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
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

        <div>
          <h3 className="font-semibold">{conversation.clientName}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{conversation.clientPhone}</span>
            <Badge variant="outline" className="text-xs">
              {getStatusLabel(conversation.status)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Video className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {conversation.status === "waiting" && (
              <DropdownMenuItem onClick={() => onStatusChange("active")}>
                <UserCheck className="mr-2 h-4 w-4" />
                Assumir Atendimento
              </DropdownMenuItem>
            )}
            {conversation.status === "active" && (
              <DropdownMenuItem onClick={() => onStatusChange("finished")}>
                <UserX className="mr-2 h-4 w-4" />
                Finalizar Atendimento
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Gerar Relatório
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Arquivar Conversa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
