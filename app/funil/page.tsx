import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FunnelInterface } from "@/components/funnel/funnel-interface"

export default function FunnelPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 p-6">
          <FunnelInterface />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
