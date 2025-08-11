import { supabase } from "../../../lib/supabase"
import { ProtocolosDashboard } from "../components/protocolos-dashboard"

async function getProtocolos() {
  const { data: protocolos, error } = await supabase
    .from("protocolos")
    .select(`
      *,
      categoria:categorias(nome, cor),
      responsavel:usuarios(nome, email)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar protocolos:", error)
    return []
  }

  return protocolos || []
}

async function getCategorias() {
  const { data: categorias, error } = await supabase.from("categorias").select("*").eq("ativo", true).order("nome")

  if (error) {
    console.error("Erro ao buscar categorias:", error)
    return []
  }

  return categorias || []
}

async function getUsuarios() {
  const { data: usuarios, error } = await supabase.from("usuarios").select("*").eq("ativo", true).order("nome")

  if (error) {
    console.error("Erro ao buscar usuários:", error)
    return []
  }

  return usuarios || []
}

export default async function ProtocolosPage() {
  const [protocolos, categorias, usuarios] = await Promise.all([getProtocolos(), getCategorias(), getUsuarios()])

  return <ProtocolosDashboard protocolos={protocolos} categorias={categorias} usuarios={usuarios} />
}
