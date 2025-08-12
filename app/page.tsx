import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          </div>

          <DashboardMetrics />
          <DashboardCharts />
          <RecentActivity />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
