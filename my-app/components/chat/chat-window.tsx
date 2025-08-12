"use client"

import type React from "react"

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
  onSendMessage: (content: string) => void
}

export function ChatWindow({ conversation, messages, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
      setNewMessage("")
    }
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
        {messages.map((message) => (
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
