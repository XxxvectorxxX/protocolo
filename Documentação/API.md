# Documentação da API - Royal CRM

## Visão Geral

O Royal CRM integra-se com a API da Royal Sistemas para fornecer funcionalidades completas de atendimento e gestão de relacionamento com clientes.

## Configuração Base

\`\`\`typescript
const API_BASE_URL = 'https://atendimentoapi.royalsistemas.com.br/v2/api/external/3b2e21a7-fd7c-4645-8885-6031ec1d8d62'
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// Headers padrão
const headers = {
  'Authorization': `Bearer ${BEARER_TOKEN}`,
  'Content-Type': 'application/json'
}
\`\`\`

## Endpoints Disponíveis

### 🔐 Autenticação e Tenant

#### ShowQrCode
\`\`\`typescript
POST /ShowQrCode
// Exibe QR Code para conectar WhatsApp
\`\`\`

#### CreateApi
\`\`\`typescript
POST /CreateApi
// Cria nova instância da API
\`\`\`

#### StoreTenant / ShowTenant / UpdateTenant
\`\`\`typescript
POST /StoreTenant
POST /ShowTenant  
POST /UpdateTenant
// Gerenciamento de tenant
\`\`\`

### 💬 Mensagens WhatsApp

#### Envio de Mensagens
\`\`\`typescript
// Texto simples
POST /SendMessageAPIText
{
  "number": "5511999999999",
  "message": "Olá! Como posso ajudar?"
}

// Arquivo
POST /SendMessageAPIFile
{
  "number": "5511999999999",
  "file": "base64_encoded_file",
  "filename": "documento.pdf"
}

// Áudio
POST /SendMessageAPIVoice
{
  "number": "5511999999999",
  "audio": "base64_encoded_audio"
}

// Template WhatsApp Business
POST /SendTemplateWaba
{
  "number": "5511999999999",
  "template": "template_name",
  "parameters": ["param1", "param2"]
}
\`\`\`

#### Mensagens em Grupo
\`\`\`typescript
POST /SendGroupMessageAPIText
{
  "groupId": "group_id",
  "message": "Mensagem para o grupo"
}

POST /SendGroupMessageAPIFile
{
  "groupId": "group_id",
  "file": "base64_encoded_file",
  "filename": "arquivo.pdf"
}
\`\`\`

### 👥 Contatos e Oportunidades

#### Gestão de Contatos
\`\`\`typescript
// Criar contato
POST /CreateContact
{
  "name": "João Silva",
  "phone": "5511999999999",
  "email": "joao@email.com",
  "tags": ["cliente", "vip"]
}

// Exibir contato
POST /ShowContact
{
  "contactId": "contact_id"
}

// Atualizar contato
POST /UpdateContact
{
  "contactId": "contact_id",
  "name": "João Silva Santos",
  "email": "joao.santos@email.com"
}
\`\`\`

#### Gestão de Oportunidades
\`\`\`typescript
// Criar oportunidade
POST /CreateOpportunity
{
  "contactId": "contact_id",
  "title": "Venda de Software",
  "value": 5000.00,
  "stage": "negociacao"
}

// Atualizar oportunidade
POST /UpdateOpportunity
{
  "opportunityId": "opp_id",
  "stage": "fechado_ganho",
  "value": 5500.00
}

// Deletar oportunidade
POST /DeleteOpportunity
{
  "opportunityId": "opp_id"
}
\`\`\`

### 🎫 Tickets e Atendimento

#### Gestão de Tickets
\`\`\`typescript
// Criar ticket
POST /CreateTicket
{
  "contactId": "contact_id",
  "subject": "Suporte técnico",
  "description": "Cliente relatou problema no sistema",
  "priority": "high",
  "queue": "suporte"
}

// Anexar arquivo ao ticket
POST /CreateTicketFile
{
  "ticketId": "ticket_id",
  "file": "base64_encoded_file",
  "filename": "screenshot.png"
}

// Definir fila
POST /SetQueue
{
  "ticketId": "ticket_id",
  "queueId": "queue_id"
}

// Definir tag
POST /SetTag
{
  "ticketId": "ticket_id",
  "tags": ["urgente", "bug"]
}
\`\`\`

#### Informações do Ticket
\`\`\`typescript
// Informações básicas
POST /ShowTicketInformation
{
  "ticketId": "ticket_id"
}

// Informações para ChatBot
POST /ShowTicketInformationChatBot
{
  "ticketId": "ticket_id"
}

// Todas as informações
POST /ShowAllTicketInformation
{
  "ticketId": "ticket_id"
}

// Todas as mensagens
POST /ShowAllMessages
{
  "ticketId": "ticket_id"
}
\`\`\`

#### Notas
\`\`\`typescript
POST /CreateNotes
{
  "ticketId": "ticket_id",
  "note": "Cliente confirmou resolução do problema",
  "isPrivate": false
}
\`\`\`

### 📊 Canais e Sessões

#### Informações de Canal
\`\`\`typescript
// Informações gerais
POST /ShowChannelInformation
{
  "channelId": "channel_id"
}

// Por ID específico
POST /ShowChannelInformationById
{
  "channelId": "channel_id"
}

// Listar grupos
POST /ListGroupsInfo
{
  "channelId": "channel_id"
}
\`\`\`

#### Gestão de Sessões
\`\`\`typescript
// Criar sessão
POST /CreateSession
{
  "userId": "user_id",
  "channelId": "channel_id"
}

// Iniciar sessão
POST /StartSession
{
  "sessionId": "session_id"
}

// Deletar sessão
POST /DeleteSession
{
  "sessionId": "session_id"
}
\`\`\`

## Implementação no CRM

### Cliente API
\`\`\`typescript
// lib/api.ts
class RoyalAPI {
  private baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!
  private token = process.env.ROYAL_API_TOKEN!

  private async request<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : undefined
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Métodos para cada endpoint...
  async sendMessage(number: string, message: string) {
    return this.request('/SendMessageAPIText', { number, message })
  }

  async createContact(contact: ContactData) {
    return this.request('/CreateContact', contact)
  }

  // ... outros métodos
}

export const royalAPI = new RoyalAPI()
\`\`\`

### Uso nos Componentes
\`\`\`typescript
// components/chat/chat-window.tsx
import { royalAPI } from '@/lib/api'

const sendMessage = async (message: string) => {
  try {
    await royalAPI.sendMessage(contact.phone, message)
    // Atualizar UI
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
  }
}
\`\`\`

## Tratamento de Erros

### Códigos de Status
- `200` - Sucesso
- `400` - Dados inválidos
- `401` - Token inválido/expirado
- `403` - Sem permissão
- `404` - Recurso não encontrado
- `429` - Rate limit excedido
- `500` - Erro interno do servidor

### Retry Logic
\`\`\`typescript
const retryRequest = async (fn: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
\`\`\`

## Rate Limiting

A API possui rate limiting para prevenir abuso:
- **Mensagens**: 30 por minuto por número
- **Criação de recursos**: 100 por minuto
- **Consultas**: 1000 por minuto

## Webhooks

Para receber eventos em tempo real, configure webhooks:

\`\`\`typescript
// api/webhooks/royal.ts
export async function POST(request: Request) {
  const event = await request.json()
  
  switch (event.type) {
    case 'message.received':
      // Processar mensagem recebida
      break
    case 'ticket.created':
      // Processar novo ticket
      break
    // ... outros eventos
  }
  
  return new Response('OK')
}
\`\`\`

## Monitoramento

### Logs de API
\`\`\`typescript
const logAPICall = (endpoint: string, duration: number, success: boolean) => {
  console.log(`API Call: ${endpoint} - ${duration}ms - ${success ? 'SUCCESS' : 'FAILED'}`)
}
\`\`\`

### Métricas
- Tempo de resposta médio
- Taxa de sucesso
- Erros por endpoint
- Volume de requisições

---

Para mais informações, consulte a documentação oficial da Royal Sistemas API.
