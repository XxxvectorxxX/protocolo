import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "João Silva",
      action: "Finalizou atendimento",
      client: "Maria Santos",
      time: "2 min atrás",
      status: "completed",
      avatar: "/placeholder-g0yux.png",
    },
    {
      id: 2,
      user: "Ana Costa",
      action: "Iniciou novo atendimento",
      client: "Pedro Oliveira",
      time: "5 min atrás",
      status: "active",
      avatar: "/stylized-woman-profile.png",
    },
    {
      id: 3,
      user: "Carlos Lima",
      action: "Criou novo ticket",
      client: "Empresa XYZ",
      time: "10 min atrás",
      status: "pending",
      avatar: "/abstract-user-carlos.png",
    },
    {
      id: 4,
      user: "Lucia Ferreira",
      action: "Enviou relatório",
      client: "Cliente Premium",
      time: "15 min atrás",
      status: "completed",
      avatar: "/placeholder-cl5hp.png",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "active":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "active":
        return "Ativo"
      case "pending":
        return "Pendente"
      default:
        return "Desconhecido"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{activity.user}</span>
                  <span className="text-sm text-muted-foreground">{activity.action}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Cliente: {activity.client}</span>
                  <Badge variant="outline" className="text-xs">
                    {getStatusLabel(activity.status)}
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
