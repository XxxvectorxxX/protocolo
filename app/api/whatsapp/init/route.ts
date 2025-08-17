// app/api/whatsapp/init/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initWhatsappSession } from "@/services/whatsapp";

export async function POST(req: NextRequest) {
  const { whatsappId, sessionName } = await req.json();
  await initWhatsappSession(whatsappId, sessionName);
  return NextResponse.json({ message: "WhatsApp initialized" });
}
