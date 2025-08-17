// services/whatsapp.ts
import { Client, LocalAuth } from "whatsapp-web.js";
import { prisma } from "@/lib/prisma";

const clients = new Map<number, Client>();

export const initWhatsappSession = async (whatsappId: number, sessionName: string) => {
  if (clients.has(whatsappId)) return clients.get(whatsappId);

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: sessionName }),
    puppeteer: { headless: true }
  });

  client.on("qr", async qr => {
    await prisma.whatsapps.update({
      where: { id: whatsappId },
      data: { qrcode: qr, status: "qr" }
    });
  });

  client.on("ready", async () => {
    await prisma.whatsapps.update({
      where: { id: whatsappId },
      data: { status: "ready" }
    });
  });

  client.on("message", async msg => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();

    await prisma.apiMessages.create({
      data: {
        whatsappId,
        conversationId: chat.id._serialized,
        body: msg.body,
        type: msg.type,
        fromMe: msg.fromMe,
        senderName: contact.pushname || contact.number,
        timestamp: new Date(msg.timestamp * 1000)
      }
    });
  });

  client.initialize();
  clients.set(whatsappId, client);
  return client;
};

export const sendMessage = async (whatsappId: number, to: string, content: string) => {
  const client = clients.get(whatsappId);
  if (!client) throw new Error("Client not initialized");
  await client.sendMessage(to, content);
};

// ⚡ Função que estava faltando para o streaming
export const getClient = (whatsappId: number) => {
  return clients.get(whatsappId);
};
