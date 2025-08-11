"use server"

import { supabase } from "./supabase"
import { revalidatePath } from "next/cache"

export async function criarProtocolo(formData: FormData) {
  try {
    // Gerar número do protocolo
    const { data: numeroData, error: numeroError } = await supabase.rpc("gerar_numero_protocolo")

    if (numeroError) throw numeroError

    const protocoloData = {
      numero_protocolo: numeroData,
      titulo: formData.get("titulo") as string,
      descricao: formData.get("descricao") as string,
      cliente_nome: formData.get("cliente_nome") as string,
      cliente_email: formData.get("cliente_email") as string,
      cliente_telefone: formData.get("cliente_telefone") as string,
      categoria_id: formData.get("categoria_id") as string,
      prioridade: formData.get("prioridade") as string,
      responsavel_id: (formData.get("responsavel_id") as string) || null,
    }

    const { data, error } = await supabase.from("protocolos").insert([protocoloData]).select().single()

    if (error) throw error

    // Adicionar comentário inicial
    await supabase.from("protocolo_comentarios").insert([
      {
        protocolo_id: data.id,
        comentario: "Protocolo criado",
        tipo: "Status",
        visivel_cliente: true,
      },
    ])

    revalidatePath("/protocolos")
    return { success: true, data }
  } catch (error) {
    console.error("Erro ao criar protocolo:", error)
    return { success: false, error: "Erro ao criar protocolo" }
  }
}

export async function atualizarProtocolo(id: string, formData: FormData) {
  try {
    const protocoloData = {
      titulo: formData.get("titulo") as string,
      descricao: formData.get("descricao") as string,
      cliente_nome: formData.get("cliente_nome") as string,
      cliente_email: formData.get("cliente_email") as string,
      cliente_telefone: formData.get("cliente_telefone") as string,
      categoria_id: formData.get("categoria_id") as string,
      prioridade: formData.get("prioridade") as string,
      responsavel_id: (formData.get("responsavel_id") as string) || null,
      observacoes_internas: formData.get("observacoes_internas") as string,
    }

    const { data, error } = await supabase.from("protocolos").update(protocoloData).eq("id", id).select().single()

    if (error) throw error

    revalidatePath("/protocolos")
    revalidatePath(`/protocolos/${id}`)
    return { success: true, data }
  } catch (error) {
    console.error("Erro ao atualizar protocolo:", error)
    return { success: false, error: "Erro ao atualizar protocolo" }
  }
}

export async function atualizarStatusProtocolo(id: string, novoStatus: string, comentario?: string) {
  try {
    const updateData: any = { status: novoStatus }

    if (novoStatus === "Fechado" || novoStatus === "Resolvido") {
      updateData.data_fechamento = new Date().toISOString()
    }

    const { data, error } = await supabase.from("protocolos").update(updateData).eq("id", id).select().single()

    if (error) throw error

    // Adicionar comentário de mudança de status
    if (comentario) {
      await supabase.from("protocolo_comentarios").insert([
        {
          protocolo_id: id,
          comentario: `Status alterado para: ${novoStatus}. ${comentario}`,
          tipo: "Status",
          visivel_cliente: true,
        },
      ])
    }

    revalidatePath("/protocolos")
    revalidatePath(`/protocolos/${id}`)
    return { success: true, data }
  } catch (error) {
    console.error("Erro ao atualizar status:", error)
    return { success: false, error: "Erro ao atualizar status" }
  }
}

export async function adicionarComentario(
  protocoloId: string,
  comentario: string,
  tipo = "Comentário",
  visivelCliente = false,
) {
  try {
    const { data, error } = await supabase
      .from("protocolo_comentarios")
      .insert([
        {
          protocolo_id: protocoloId,
          comentario,
          tipo,
          visivel_cliente: visivelCliente,
        },
      ])
      .select(`
        *,
        usuario:usuarios(nome, email)
      `)
      .single()

    if (error) throw error

    revalidatePath(`/protocolos/${protocoloId}`)
    return { success: true, data }
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error)
    return { success: false, error: "Erro ao adicionar comentário" }
  }
}
