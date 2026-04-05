import { Ticket, User, Clock, Building2 } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import type { ScheduledTicket, Employee } from '@/features/schedule/types/schedule.types'

interface DayTicketsListProps {
  date: Date | null
  assignedTickets: ScheduledTicket[]
  unassignedTickets: ScheduledTicket[]
  employees: Employee[]
  onAssignTicket?: (ticketId: string, employeeId: string) => void
}

export function DayTicketsList({
  date,
  assignedTickets,
  unassignedTickets,
  employees,
}: DayTicketsListProps) {
  if (!date) {
    return (
      <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
        Выберите день в календаре
      </div>
    )
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  
  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId)
    return employee?.name || 'Не назначен'
  }
  
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <h3 className="font-semibold text-foreground">
          {formatDate(date)}
        </h3>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {/* Назначенные заявки */}
        {assignedTickets.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Назначенные заявки ({assignedTickets.length})
            </h4>
            <div className="space-y-2">
              {assignedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Ticket className="size-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          №{ticket.number}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-foreground/90">
                        {ticket.title}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="size-3" />
                          <span>{ticket.objectName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>{ticket.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="size-3" />
                          <span>{getEmployeeName(ticket.employeeId)}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40">
                      Назначена
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Неназначенные заявки */}
        {unassignedTickets.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-medium text-amber-600 dark:text-amber-400">
              Неназначенные заявки ({unassignedTickets.length})
            </h4>
            <div className="space-y-2">
              {unassignedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Ticket className="size-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          №{ticket.number}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-foreground/90">
                        {ticket.title}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="size-3" />
                          <span>{ticket.objectName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>{ticket.time}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950/40">
                      Не назначена
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {assignedTickets.length === 0 && unassignedTickets.length === 0 && (
          <div className="flex h-48 items-center justify-center text-center text-sm text-muted-foreground">
            Нет заявок на этот день
          </div>
        )}
      </div>
    </div>
  )
}