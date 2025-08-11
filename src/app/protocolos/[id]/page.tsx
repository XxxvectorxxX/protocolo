import { notFound } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import { ProtocoloDetalhes } from "./components/protocolo-detalhes"

async function getProtocolo(id: string) {
  const { data: protocolo, error } = await supabase
    .from("protocolos")
    .select(`
      *,
      categoria:categorias(nome, cor, descricao),
      responsavel:usuarios(nome, email, cargo)
    `)
    .eq("id", id)
    .single()

  if (error || !protocolo) {
    return null
  }

  return protocolo
}

async function getComentarios(protocoloId: string) {
  const { data: comentarios, error } = await supabase
    .from("protocolo_comentarios")
    .select(`
      *,
      usuario:usuarios(nome, email)
    `)
    .eq("protocolo_id", protocoloId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Erro ao buscar comentários:", error)
    return []
  }

  return comentarios || []
}

async function getAnexos(protocoloId: string) {
  const { data: anexos, error } = await supabase
    .from("protocolo_anexos")
    .select(`
      *,
      usuario:usuarios(nome, email)
    `)
    .eq("protocolo_id", protocoloId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar anexos:", error)
    return []
  }

  return anexos || []
}

async function getUsuarios() {
  const { data: usuarios, error } = await supabase.from("usuarios").select("*").eq("ativo", true).order("nome")

  if (error) {
    console.error("Erro ao buscar usuários:", error)
    return []
  }

  return usuarios || []
}

export default async function ProtocoloDetalhesPage({ params }: { params: { id: string } }) {
  const [protocolo, comentarios, anexos, usuarios] = await Promise.all([
    getProtocolo(params.id),
    getComentarios(params.id),
    getAnexos(params.id),
    getUsuarios(),
  ])

  if (!protocolo) {
    notFound()
  }

  return <ProtocoloDetalhes protocolo={protocolo} comentarios={comentarios} anexos={anexos} usuarios={usuarios} />
}
