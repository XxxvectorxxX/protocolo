"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, ImageIcon, File } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Conversation, Message } from "./chat-interface"

interface ChatWindowProps {
  conversation: Conversation
  messages: Message[]
  whatsappId: number // ID do WhatsApp da sua tabela
}

export function ChatWindow({ conversation, messages, whatsappId }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>(messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const connectWhatsapp = async () => {
  const res = await fetch("/api/whatsapp/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ whatsappId: 1, sessionName: "suporte" })
  })
  const data = await res.json()
  console.log(data.message)
}

  // Scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  // Escuta mensagens recebidas do WhatsApp via EventSource
  useEffect(() => {
    const es = new EventSource(`/api/whatsapp/messages/stream?whatsappId=${whatsappId}`)

    es.onmessage = (event) => {
      const msg: Message = JSON.parse(event.data)
      if (msg.conversationId === conversation.id) {
        setChatMessages((prev) => [...prev, msg])
      }
    }

    return () => es.close()
  }, [conversation.id, whatsappId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const content = newMessage.trim()

    // Adiciona a mensagem localmente
    const newMsg: Message = {
      id: Date.now().toString(),
      conversationId: conversation.id,
      content,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      sender: "agent",
      senderName: "Você",
      type: "text",
      status: "sent",
    }
    setChatMessages((prev) => [...prev, newMsg])
    setNewMessage("")

    // Envia para API do WhatsApp
    await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        whatsappId,
        to: conversation.clientPhone,
        message: content,
        conversationId: conversation.id,
      }),
    })
  }

  const getMessageStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return "✓"
      case "delivered":
        return "✓✓"
      case "read":
        return "✓✓"
      default:
        return ""
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start space-x-3",
              message.sender === "agent" && "flex-row-reverse space-x-reverse",
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={message.sender === "client" ? conversation.avatar : "/generic-user-avatar.png"}
                alt={message.senderName}
              />
              <AvatarFallback>
                {message.senderName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className={cn("flex flex-col", message.sender === "agent" && "items-end")}>
              <div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                  message.sender === "client" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground",
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>

              <div className={cn("flex items-center space-x-2 mt-1 text-xs text-muted-foreground")}>
                <span>{message.timestamp}</span>
                {message.sender === "agent" && (
                  <span className={cn(message.status === "read" ? "text-blue-500" : "")}>
                    {getMessageStatusIcon(message.status)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm">
            <File className="h-4 w-4" />
          </Button>

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            disabled={conversation.status === "finished"}
          />

          <Button type="button" variant="ghost" size="sm">
            <Smile className="h-4 w-4" />
          </Button>

          <Button type="submit" size="sm" disabled={!newMessage.trim() || conversation.status === "finished"}>
            <Send className="h-4 w-4" />
          </Button>
        </form>

        {conversation.status === "finished" && (
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              Este atendimento foi finalizado
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}
