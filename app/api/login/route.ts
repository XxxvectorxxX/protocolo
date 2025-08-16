import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // Importa o Prisma dinamicamente para evitar erro na build
    const { prisma } = await import("@/lib/prisma");

    const { email, password } = await req.json();
    console.log("Tentando login para:", email);

    // Busca usuário pelo email
    const user = await prisma.users.findUnique({
      where: { email },
    });
    console.log("Usuário encontrado:", user);

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    console.log("Senha confere?", passwordMatch);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Remove passwordHash antes de enviar resposta
    const { passwordHash, ...userData } = user;

    return NextResponse.json(userData);
  } catch (err) {
    console.error("Erro no login:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
