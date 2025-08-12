import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { ToastContainer } from "@/components/ui/toast"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Royal CRM - Sistema de Atendimento",
  description: "Sistema CRM completo da Royal Sistemas para atendimento com WhatsApp",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={null}>
              {children}
              <ToastContainer />
              <Analytics />
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
