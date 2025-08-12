"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Building, MapPin, Calendar, Star, Edit, MessageSquare } from "lucide-react"
import type { Contact } from "./contacts-interface"

interface ContactDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact: Contact
}

export function ContactDetailDialog({ open, onOpenChange, contact }: ContactDetailDialogProps) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
              <AvatarFallback className="text-lg">
                {contact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{contact.name}</DialogTitle>
              <DialogDescription className="text-base">
                {contact.position && contact.company && (
                  <span>
                    {contact.position} • {contact.company}
                  </span>
                )}
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              {contact.isFavorite && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
              <div className={`h-3 w-3 rounded-full ${getStatusColor(contact.status)}`}></div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Source */}
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-1">
              <div className={`h-2 w-2 rounded-full ${getStatusColor(contact.status)}`}></div>
              <span>{getStatusLabel(contact.status)}</span>
            </Badge>
            <Badge variant="secondary">Origem: {getSourceLabel(contact.source)}</Badge>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-medium mb-3">Informações de Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.phone}</span>
                </div>
              </div>
              <div className="space-y-3">
                {contact.company && (
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{contact.company}</span>
                  </div>
                )}
                {contact.city && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{contact.city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {contact.address && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Endereço</h3>
                <p className="text-sm text-muted-foreground">{contact.address}</p>
              </div>
            </>
          )}

          {contact.tags.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {contact.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {contact.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Observações</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{contact.notes}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Histórico
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Criado em {new Date(contact.createdAt).toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span>Última atualização em {new Date(contact.updatedAt).toLocaleString("pt-BR")}</span>
              </div>
              {contact.lastContact && (
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Último contato em {new Date(contact.lastContact).toLocaleString("pt-BR")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Iniciar Chat
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Enviar Email
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4" />
              Ligar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
