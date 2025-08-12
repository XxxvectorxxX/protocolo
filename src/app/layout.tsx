import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Header } from "../components/layout/header"
import { ThemeProvider } from "../components/theme-provider"
import { AuthProvider } from "../contexts/auth-context"
// Importando NotificationsProvider e componentes de notificação
import { NotificationsProvider } from "../contexts/notifications-context"
import { AlertBanner } from "../components/notifications/alert-banner"
import { ToastNotifications } from "../components/notifications/toast-notifications"
import { Toaster } from "../components/ui/toaster"

export const metadata: Metadata = {
  title: "Royal Sistemas - Atendimento",
  description: "Sistema de Gestão de Chamados e Protocolos",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {/* Envolvendo com NotificationsProvider */}
            <NotificationsProvider>
              <Header />
              <main>
                {/* Adicionando banner de alertas */}
                <div className="container mx-auto px-4 pt-4">
                  <AlertBanner />
                </div>
                {children}
              </main>
              {/* Adicionando componentes de notificação */}
              <ToastNotifications />
              <Toaster />
            </NotificationsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
