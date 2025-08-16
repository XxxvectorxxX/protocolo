import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  // Importa Prisma só durante execução da função
  const { prisma } = await import('@/lib/server/prisma');

  const { email, password } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });

  const { passwordHash, ...userData } = user;
  return NextResponse.json(userData);
}
