import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para o banco de dados
export interface Usuario {
  id: string
  nome: string
  email: string
  telefone?: string
  cargo?: string
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface Categoria {
  id: string
  nome: string
  descricao?: string
  cor: string
  ativo: boolean
  created_at: string
}

export interface Protocolo {
  id: string
  numero_protocolo: string
  titulo: string
  descricao: string
  cliente_nome: string
  cliente_email: string
  cliente_telefone?: string
  categoria_id?: string
  prioridade: "Baixa" | "Média" | "Alta" | "Crítica"
  status: "Aberto" | "Em Andamento" | "Aguardando Cliente" | "Resolvido" | "Fechado"
  responsavel_id?: string
  data_abertura: string
  data_fechamento?: string
  tempo_resposta_horas?: number
  satisfacao_cliente?: number
  observacoes_internas?: string
  created_at: string
  updated_at: string
  categoria?: Categoria
  responsavel?: Usuario
}

export interface ProtocoloComentario {
  id: string
  protocolo_id: string
  usuario_id?: string
  comentario: string
  tipo: "Comentário" | "Status" | "Interno" | "Cliente"
  visivel_cliente: boolean
  created_at: string
  usuario?: Usuario
}

export interface ProtocoloAnexo {
  id: string
  protocolo_id: string
  nome_arquivo: string
  url_arquivo: string
  tamanho_bytes?: number
  tipo_mime?: string
  uploaded_by?: string
  created_at: string
  usuario?: Usuario
}
