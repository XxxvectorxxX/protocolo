"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Mail, Phone, MapPin, Star, StarOff } from "lucide-react"
import { CreateContactDialog } from "./create-contact-dialog"
import { ContactDetailDialog } from "./contact-detail-dialog"

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  position?: string
  address?: string
  city?: string
  status: "lead" | "prospect" | "customer" | "inactive"
  source: "website" | "referral" | "social" | "advertising" | "other"
  tags: string[]
  notes?: string
  createdAt: string
  updatedAt: string
  lastContact?: string
  isFavorite: boolean
  avatar?: string
}

const mockContacts: Contact[] = [
  {
    id: "CNT-001",
    name: "Maria Silva Santos",
    email: "maria.santos@empresa.com",
    phone: "+55 11 99999-1234",
    company: "Tech Solutions Ltda",
    position: "Gerente de TI",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    status: "customer",
    source: "website",
    tags: ["vip", "tecnologia"],
    notes: "Cliente muito satisfeito com nossos serviços",
    createdAt: "2024-01-10T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    lastContact: "2024-01-15T14:20:00Z",
    isFavorite: true,
    avatar: "/placeholder-g0yux.png",
  },
  {
    id: "CNT-002",
    name: "João Pedro Oliveira",
    email: "joao.oliveira@startup.com",
    phone: "+55 11 98888-5678",
    company: "StartupX",
    position: "CEO",
    city: "Rio de Janeiro",
    status: "prospect",
    source: "referral",
    tags: ["startup", "inovação"],
    notes: "Interessado em nossos produtos premium",
    createdAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    lastContact: "2024-01-14T16:45:00Z",
    isFavorite: false,
    avatar: "/abstract-user-carlos.png",
  },
  {
    id: "CNT-003",
    name: "Ana Costa Ferreira",
    email: "ana.costa@comercial.com",
    phone: "+55 11 97777-9012",
    company: "Comercial ABC",
    position: "Diretora Comercial",
    city: "Belo Horizonte",
    status: "lead",
    source: "social",
    tags: ["comercial", "b2b"],
    createdAt: "2024-01-13T11:20:00Z",
    updatedAt: "2024-01-13T11:20:00Z",
    isFavorite: false,
    avatar: "/stylized-woman-profile.png",
  },
  {
    id: "CNT-004",
    name: "Carlos Lima",
    email: "carlos.lima@industria.com",
    phone: "+55 11 96666-3456",
    company: "Indústria XYZ",
    position: "Gerente de Compras",
    city: "Campinas",
    status: "inactive",
    source: "advertising",
    tags: ["indústria"],
    notes: "Não demonstrou interesse recentemente",
    createdAt: "2024-01-08T15:30:00Z",
    updatedAt: "2024-01-10T10:15:00Z",
    lastContact: "2024-01-10T10:15:00Z",
    isFavorite: false,
    avatar: "/placeholder-cl5hp.png",
  },
]

export function ContactsInterface() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || contact.status === statusFilter
    const matchesSource = sourceFilter === "all" || contact.source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "lead":
        return "bg-blue-500"
      case "prospect":
        return "bg-yellow-500"
      case "customer":
        return "bg-green-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: Contact["status"]) => {
    switch (status) {
      case "lead":
        return "Lead"
      case "prospect":
        return "Prospect"
      case "customer":
        return "Cliente"
      case "inactive":
        return "Inativo"
      default:
        return "Desconhecido"
    }
  }

  const getSourceLabel = (source: Contact["source"]) => {
    switch (source) {
      case "website":
        return "Website"
      case "referral":
        return "Indicação"
      case "social":
        return "Redes Sociais"
      case "advertising":
        return "Publicidade"
      case "other":
        return "Outros"
      default:
        return "Desconhecido"
    }
  }

  const handleCreateContact = (contactData: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
    const newContact: Contact = {
      ...contactData,
      id: `CNT-${String(contacts.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setContacts([newContact, ...contacts])
  }

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact)
    setIsDetailDialogOpen(true)
  }

  const toggleFavorite = (contactId: string) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, isFavorite: !contact.isFavorite, updatedAt: new Date().toISOString() }
          : contact,
      ),
    )
  }

  const statusCounts = {
    lead: contacts.filter((c) => c.status === "lead").length,
    prospect: contacts.filter((c) => c.status === "prospect").length,
    customer: contacts.filter((c) => c.status === "customer").length,
    inactive: contacts.filter((c) => c.status === "inactive").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contatos</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Contato
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.lead}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospects</CardTitle>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.prospect}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.customer}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.inactive}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contatos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="customer">Cliente</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Origem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Origens</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="referral">Indicação</SelectItem>
            <SelectItem value="social">Redes Sociais</SelectItem>
            <SelectItem value="advertising">Publicidade</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contacts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredContacts.map((contact) => (
          <Card
            key={contact.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleContactClick(contact)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    {contact.position && contact.company && (
                      <p className="text-sm text-muted-foreground">
                        {contact.position} • {contact.company}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(contact.id)
                  }}
                >
                  {contact.isFavorite ? (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.phone}</span>
                </div>
                {contact.city && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{contact.city}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(contact.status)}`}></div>
                  <Badge variant="outline" className="text-xs">
                    {getStatusLabel(contact.status)}
                  </Badge>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getSourceLabel(contact.source)}
                </Badge>
              </div>

              {contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {contact.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {contact.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{contact.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateContactDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateContact={handleCreateContact}
      />

      {selectedContact && (
        <ContactDetailDialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen} contact={selectedContact} />
      )}
    </div>
  )
}
