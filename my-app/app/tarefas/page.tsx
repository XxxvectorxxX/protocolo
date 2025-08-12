import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TasksInterface } from "@/components/tasks/tasks-interface"

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 p-6">
          <TasksInterface />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
