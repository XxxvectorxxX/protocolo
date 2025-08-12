import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { KanbanInterface } from "@/components/kanban/kanban-interface"

export default function KanbanPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 p-6">
          <KanbanInterface />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
