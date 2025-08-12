import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Proteger rotas administrativas
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Adicionar headers de segurança
  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
