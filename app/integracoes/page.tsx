import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { IntegrationsInterface } from "@/components/integrations/integrations-interface"

export default function IntegrationsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 p-6">
          <IntegrationsInterface />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
