import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ChatInterface } from "@/components/chat/chat-interface"

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 h-[calc(100vh-4rem)]">
          <ChatInterface />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
