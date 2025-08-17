// components/chat/chat-interface.tsx
"use client"

import { useState, useEffect } from "react"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"
import { ChatHeader } from "./chat-header"

export interface Conversation {
  id: string
  clientName: string
  clientPhone: string
  lastMessage: string
  timestamp: string
  status: "waiting" | "active" | "finished"
  assignedTo?: string
  unreadCount: number
  avatar?: string
}

export interface Message {
  id: string
  conversationId: string
  content: string
  timestamp: string
  sender: "client" | "agent"
  senderName: string
  type: "text" | "image" | "file"
  status: "sent" | "delivered" | "read"
}



export function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
const [conversations, setConversations] = useState<Conversation[]>([]);
const [messages, setMessages] = useState<Message[]>([]);

  const currentConversation = conversations.find((c) => c.id === selectedConversation)
  const currentMessages = messages.filter((m) => m.conversationId === selectedConversation)

  const updateConversationStatus = (conversationId: string, status: Conversation["status"]) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === conversationId ? { ...conv, status } : conv))
    )
  }

  const handleNewMessage = (content: string) => {
    if (!selectedConversation) return

    const newMsg: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation,
      content,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      sender: "agent",
      senderName: "Você",
      type: "text",
      status: "sent",
    }

    setMessages((prev) => [...prev, newMsg])

    // Atualiza última mensagem da conversa
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation
          ? { ...conv, lastMessage: content, timestamp: "agora", status: "active" }
          : conv
      )
    )

    // Enviar para API do WhatsApp
    fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        whatsappId: 1,
        to: currentConversation?.clientPhone,
        message: content,
        conversationId: selectedConversation,
      }),
    })
  }

  return (
    <div className="flex h-full">
      <ChatSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
      />
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            <ChatHeader
              conversation={currentConversation}
              onStatusChange={(status) =>
                updateConversationStatus(currentConversation.id, status)
              }
            />
            <ChatWindow
              conversation={currentConversation}
              messages={currentMessages}
              whatsappId={1} // Id do WhatsApp da sessão
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
              <p>Escolha uma conversa da lista para começar o atendimento</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
