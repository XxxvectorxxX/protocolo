import { Client, LocalAuth } from "whatsapp-web.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const clients: Map<number, Client> = new Map()

export async function initWhatsapp(whatsappId: number) {
  // Verifica se o cliente já existe
  if (clients.has(whatsappId)) return clients.get(whatsappId)

  const whatsapp = await prisma.whatsapps.findUnique({ where: { id: whatsappId } })
  if (!whatsapp) throw new Error("WhatsApp não encontrado")

  const client = new Client({
    authStrategy: new LocalAuth({ 
      clientId: whatsappId.toString(), // persistência local
      dataPath: "./sessions"          // pasta onde as sessões ficam armazenadas
    }),
    puppeteer: { headless: true }
  })

  client.on("qr", async (qr) => {
    // Atualiza QR no banco
    await prisma.whatsapps.update({
      where: { id: whatsappId },
      data: { qrcode: qr, status: "disconnected" }
    })
  })

  client.on("ready", async () => {
    await prisma.whatsapps.update({
      where: { id: whatsappId },
      data: { status: "connected", qrcode: null }
    })
    console.log("WhatsApp conectado:", whatsappId)
  })

  client.on("message", async (msg) => {
    // Salva mensagem no banco
    const conversationId = msg.from // aqui você pode mapear para sua conversa real
    await prisma.messageUpserts.create({
      data: {
        whatsappId,
        conversationId,
        content: msg.body,
        sender: "client",
        timestamp: new Date()
      }
    })
  })

  client.initialize()
  clients.set(whatsappId, client)
  return client
}

export function getClient(whatsappId: number) {
  return clients.get(whatsappId)
}
