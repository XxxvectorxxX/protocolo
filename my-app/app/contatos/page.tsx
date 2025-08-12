import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ContactsInterface } from "@/components/contacts/contacts-interface"

export default function ContactsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 p-6">
          <ContactsInterface />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
