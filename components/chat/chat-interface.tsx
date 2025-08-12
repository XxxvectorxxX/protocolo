"use client"

import { useState } from "react"
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

const mockConversations: Conversation[] = [
  {
    id: "1",
    clientName: "Maria Silva",
    clientPhone: "+55 11 99999-1234",
    lastMessage: "Preciso de ajuda com meu pedido",
    timestamp: "2 min",
    status: "waiting",
    unreadCount: 3,
    avatar: "/placeholder-g0yux.png",
  },
  {
    id: "2",
    clientName: "João Santos",
    clientPhone: "+55 11 99999-5678",
    lastMessage: "Obrigado pela ajuda!",
    timestamp: "5 min",
    status: "active",
    assignedTo: "Ana Costa",
    unreadCount: 0,
    avatar: "/abstract-user-carlos.png",
  },
  {
    id: "3",
    clientName: "Pedro Oliveira",
    clientPhone: "+55 11 99999-9012",
    lastMessage: "Quando vai chegar meu produto?",
    timestamp: "10 min",
    status: "waiting",
    unreadCount: 1,
    avatar: "/stylized-woman-profile.png",
  },
  {
    id: "4",
    clientName: "Ana Costa",
    clientPhone: "+55 11 99999-3456",
    lastMessage: "Perfeito, muito obrigada!",
    timestamp: "1h",
    status: "finished",
    assignedTo: "Carlos Lima",
    unreadCount: 0,
    avatar: "/placeholder-cl5hp.png",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    conversationId: "1",
    content: "Olá! Preciso de ajuda com meu pedido #12345",
    timestamp: "14:30",
    sender: "client",
    senderName: "Maria Silva",
    type: "text",
    status: "read",
  },
  {
    id: "2",
    conversationId: "1",
    content: "Fiz a compra ontem mas não recebi confirmação",
    timestamp: "14:31",
    sender: "client",
    senderName: "Maria Silva",
    type: "text",
    status: "read",
  },
  {
    id: "3",
    conversationId: "1",
    content: "Preciso de ajuda com meu pedido",
    timestamp: "14:32",
    sender: "client",
    senderName: "Maria Silva",
    type: "text",
    status: "delivered",
  },
]

export function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const currentConversation = conversations.find((c) => c.id === selectedConversation)
  const currentMessages = messages.filter((m) => m.conversationId === selectedConversation)

  const updateConversationStatus = (conversationId: string, status: Conversation["status"]) => {
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, status } : conv)))
  }

  const sendMessage = (content: string) => {
    if (!selectedConversation) return

    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation,
      content,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      sender: "agent",
      senderName: "Você",
      type: "text",
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation
          ? { ...conv, lastMessage: content, timestamp: "agora", status: "active" }
          : conv,
      ),
    )
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
              onStatusChange={(status) => updateConversationStatus(currentConversation.id, status)}
            />
            <ChatWindow conversation={currentConversation} messages={currentMessages} onSendMessage={sendMessage} />
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
