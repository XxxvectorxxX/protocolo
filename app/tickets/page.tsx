import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TicketsInterface } from "@/components/tickets/tickets-interface"

export default function TicketsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 p-6">
          <TicketsInterface />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
