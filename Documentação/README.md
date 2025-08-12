# Royal CRM - Sistema de Atendimento

Sistema CRM completo da Royal Sistemas para atendimento com integração WhatsApp API, desenvolvido com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades Principais

### 📊 Dashboard Inteligente
- **Métricas em tempo real**: Atendimentos ativos, em espera, usuários online
- **Gráficos interativos**: Análise de performance e tendências
- **Atividade recente**: Histórico de ações e eventos do sistema
- **Temas personalizáveis**: Light/Dark mode com paleta Royal Sistemas

### 👥 Sistema de Autenticação
- **Níveis de usuário**: Admin e usuário comum
- **Controle de acesso**: Rotas protegidas por role
- **Status online/offline**: Gerenciamento de disponibilidade
- **Sessões seguras**: JWT com refresh automático

### 💬 Interface de Chat/Atendimento
- **WhatsApp integrado**: Conexão direta com WhatsApp Business API
- **Chat em tempo real**: Interface moderna para atendimento
- **Gestão de filas**: Distribuição automática de atendimentos
- **Histórico completo**: Todas as conversas salvas e pesquisáveis

### 🎫 Sistema de Tickets
- **Criação automática**: Tickets gerados a partir de conversas
- **Prioridades**: Sistema de classificação por urgência
- **Atribuição**: Designação de responsáveis
- **Status tracking**: Acompanhamento completo do ciclo de vida

### ✅ Gerenciamento de Tarefas
- **Tasks internas**: Organização de atividades da equipe
- **Deadlines**: Controle de prazos e lembretes
- **Colaboração**: Comentários e atualizações em tempo real
- **Relatórios**: Produtividade e performance da equipe

### 📋 CRM Completo
- **Gestão de contatos**: Base completa de clientes e prospects
- **Funil de vendas**: Acompanhamento de oportunidades
- **Kanban visual**: Gestão visual de leads e negociações
- **Histórico 360°**: Visão completa do relacionamento com cliente

### 🔗 Integrações Avançadas
- **WhatsApp Business API**: Envio de mensagens, arquivos e templates
- **Email automático**: PDFs enviados após finalização de atendimento
- **Relatórios personalizados**: Exportação em múltiplos formatos
- **API própria**: Integração com sistemas existentes da Royal Sistemas

## 🏗️ Arquitetura Técnica

### Stack Tecnológica
- **Frontend**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Ícones**: Lucide React
- **Fontes**: Inter + Poppins (Google Fonts)
- **Deploy**: Vercel
- **Analytics**: Vercel Analytics

### Estrutura de Pastas
\`\`\`
├── app/                    # App Router (Next.js 14)
│   ├── (auth)/            # Grupo de rotas de autenticação
│   │   └── login/         # Página de login
│   ├── admin/             # Área administrativa
│   ├── chat/              # Interface de chat
│   ├── contatos/          # Gestão de contatos
│   ├── funil/             # Funil de vendas
│   ├── integracoes/       # Configurações de integração
│   ├── kanban/            # Quadro Kanban
│   ├── tarefas/           # Gerenciamento de tarefas
│   ├── tickets/           # Sistema de tickets
│   ├── usuarios/          # Gestão de usuários
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Dashboard principal
│   ├── globals.css        # Estilos globais
│   └── error.tsx          # Página de erro
├── components/            # Componentes React
│   ├── auth/              # Componentes de autenticação
│   ├── chat/              # Componentes de chat
│   ├── contacts/          # Componentes de contatos
│   ├── funnel/            # Componentes de funil
│   ├── integrations/      # Componentes de integração
│   ├── kanban/            # Componentes Kanban
│   ├── tasks/             # Componentes de tarefas
│   ├── tickets/           # Componentes de tickets
│   ├── ui/                # Componentes base (shadcn/ui)
│   └── users/             # Componentes de usuários
├── contexts/              # React Contexts
│   ├── auth-context.tsx   # Contexto de autenticação
│   └── theme-context.tsx  # Contexto de tema
├── lib/                   # Utilitários e configurações
│   ├── api.ts             # Cliente da API Royal Sistemas
│   └── utils.ts           # Funções utilitárias
├── hooks/                 # Custom Hooks
├── public/                # Arquivos estáticos
└── middleware.ts          # Middleware de autenticação
\`\`\`

## 🎨 Design System

### Paleta de Cores Royal Sistemas
\`\`\`css
/* Cores Primárias */
--color-royal-purple: #8b5cf6    /* Roxo principal */
--color-royal-cyan: #06b6d4      /* Ciano para acentos */

/* Gradientes */
--gradient-royal: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)
\`\`\`

### Tipografia
- **Headings**: Poppins (600, 700)
- **Body**: Inter (400, 500)
- **Monospace**: JetBrains Mono (código)

### Componentes UI
- **Cards**: Efeito glass com bordas sutis
- **Botões**: Gradientes Royal com hover states
- **Inputs**: Bordas arredondadas com foco destacado
- **Navegação**: Sidebar fixa com animações suaves

## 🔧 Configuração e Deploy

### Variáveis de Ambiente
\`\`\`bash
# API Royal Sistemas
NEXT_PUBLIC_API_BASE_URL=https://atendimentoapi.royalsistemas.com.br/v2/api/external/3b2e21a7-fd7c-4645-8885-6031ec1d8d62
ROYAL_API_TOKEN=seu-token-jwt

# Autenticação
NEXTAUTH_SECRET=sua-chave-secreta-min-32-chars
NEXTAUTH_URL=https://seu-dominio.vercel.app

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app

# WhatsApp (opcional)
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_ACCESS_TOKEN=seu-token-whatsapp
\`\`\`

### Deploy na Vercel
1. Conecte o repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch main

### Comandos de Desenvolvimento
\`\`\`bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Linting
npm run lint
\`\`\`

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints otimizados:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Funcionalidades Mobile
- Sidebar colapsível
- Touch gestures no chat
- Swipe actions em listas
- Teclado virtual otimizado

## 🔒 Segurança

### Medidas Implementadas
- **Autenticação JWT**: Tokens seguros com refresh
- **Middleware de proteção**: Rotas protegidas por role
- **CORS configurado**: Apenas origens autorizadas
- **Rate limiting**: Proteção contra spam
- **Sanitização**: Inputs validados e limpos
- **HTTPS obrigatório**: SSL/TLS em produção

### Controle de Acesso
\`\`\`typescript
// Níveis de usuário
type UserRole = 'admin' | 'user'

// Permissões por role
const permissions = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  user: ['read', 'write']
}
\`\`\`

## 📊 Monitoramento

### Analytics Integrados
- **Vercel Analytics**: Métricas de performance
- **Error Tracking**: Captura automática de erros
- **User Behavior**: Tracking de ações importantes
- **Performance**: Core Web Vitals

### Logs e Debugging
- Console logs estruturados
- Error boundaries React
- Fallbacks para componentes
- Retry automático em falhas de API

## 🚀 Performance

### Otimizações Implementadas
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts otimizadas
- **Bundle Analysis**: Análise de tamanho de bundle
- **Caching**: Estratégias de cache inteligentes

### Métricas Alvo
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **FID**: < 100ms

## 🔄 API Integration

### Endpoints Royal Sistemas
O sistema integra com todos os endpoints da API Royal Sistemas:

#### Autenticação e Tenant
- `POST /ShowQrCode` - Exibir QR Code WhatsApp
- `POST /CreateApi` - Criar nova API
- `POST /StoreTenant` - Armazenar tenant
- `POST /ShowTenant` - Exibir tenant
- `POST /UpdateTenant` - Atualizar tenant

#### Mensagens WhatsApp
- `GET /SendMessageParams` - Parâmetros de mensagem
- `POST /SendMessageAPIText` - Enviar texto
- `POST /SendMessageAPIFile` - Enviar arquivo
- `POST /SendMessageAPIVoice` - Enviar áudio
- `POST /SendGroupMessageAPIText` - Mensagem em grupo
- `POST /SendTemplateWaba` - Template WhatsApp Business

#### Contatos e Oportunidades
- `POST /CreateContact` - Criar contato
- `POST /ShowContact` - Exibir contato
- `POST /UpdateContact` - Atualizar contato
- `POST /CreateOpportunity` - Criar oportunidade
- `POST /UpdateOpportunity` - Atualizar oportunidade
- `POST /DeleteOpportunity` - Deletar oportunidade

#### Tickets e Atendimento
- `POST /CreateTicket` - Criar ticket
- `POST /CreateTicketFile` - Anexar arquivo
- `POST /SetQueue` - Definir fila
- `POST /SetTag` - Definir tag
- `POST /ShowTicketInformation` - Informações do ticket
- `POST /ShowAllMessages` - Todas as mensagens
- `POST /CreateNotes` - Criar notas

#### Sessões e Canais
- `POST /CreateSession` - Criar sessão
- `POST /StartSession` - Iniciar sessão
- `POST /DeleteSession` - Deletar sessão
- `POST /ShowChannelInformation` - Info do canal
- `POST /ListGroupsInfo` - Listar grupos

## 🛠️ Manutenção

### Atualizações Regulares
- Dependências npm atualizadas mensalmente
- Patches de segurança aplicados imediatamente
- Testes de regressão antes de cada deploy
- Backup automático de configurações

### Troubleshooting Comum
1. **Erro de autenticação**: Verificar token JWT válido
2. **API timeout**: Verificar conectividade com Royal API
3. **Tema não carrega**: Limpar localStorage
4. **Chat não conecta**: Verificar WebSocket connection

## 📞 Suporte

### Contato Técnico
- **Email**: suporte@royalsistemas.com.br
- **Documentação**: Este README
- **Issues**: GitHub Issues
- **Updates**: Changelog.md

### Recursos Adicionais
- [Documentação da API](./docs/API.md)
- [Guia de Usuário](./docs/USER_GUIDE.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [Changelog](./CHANGELOG.md)

---

**Royal CRM** - Desenvolvido com ❤️ pela equipe Royal Sistemas
