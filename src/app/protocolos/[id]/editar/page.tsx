import { notFound } from "next/navigation"
import { supabase } from "../../../../lib/supabase"
import { EditarProtocoloForm } from "./components/editar-protocolo-form"

async function getProtocolo(id: string) {
  const { data: protocolo, error } = await supabase
    .from("protocolos")
    .select(`
      *,
      categoria:categorias(nome, cor),
      responsavel:usuarios(nome, email)
    `)
    .eq("id", id)
    .single()

  if (error || !protocolo) {
    return null
  }

  return protocolo
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

export default async function EditarProtocoloPage({ params }: { params: { id: string } }) {
  const [protocolo, categorias, usuarios] = await Promise.all([getProtocolo(params.id), getCategorias(), getUsuarios()])

  if (!protocolo) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <EditarProtocoloForm protocolo={protocolo} categorias={categorias} usuarios={usuarios} />
      </div>
    </div>
  )
}
