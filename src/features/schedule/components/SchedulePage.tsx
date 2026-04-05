import { useState, useMemo } from 'react'
import { CalendarGrid } from '@/features/schedule/components/CalendarGrid'
import { DayTicketsList } from '@/features/schedule/components/DayTicketsList'
import { mockEmployees, mockScheduledTickets, getTicketsByDate } from '@/lib/mocks/handlers/mockSchedule'
import { cn } from '@/lib/utils'

export function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  
  // Подготавливаем данные о количестве заявок для каждого дня
  const ticketsByDate = useMemo(() => {
    const map = new Map<string, { assigned: number; unassigned: number }>()
    
    mockScheduledTickets.forEach(ticket => {
      const current = map.get(ticket.date) || { assigned: 0, unassigned: 0 }
      if (ticket.status === 'assigned') {
        current.assigned++
      } else {
        current.unassigned++
      }
      map.set(ticket.date, current)
    })
    
    return map
  }, [])
  
  // Получаем заявки на выбранную дату
  const selectedDateTickets = selectedDate
    ? getTicketsByDate(selectedDate.toISOString().split('T')[0])
    : { assigned: [], unassigned: [] }
  
  // Фильтруем заявки по выбранному сотруднику
  const filteredAssignedTickets = selectedEmployee
    ? selectedDateTickets.assigned.filter(t => t.employeeId === selectedEmployee)
    : selectedDateTickets.assigned
  
  const filteredUnassignedTickets = selectedEmployee
    ? []
    : selectedDateTickets.unassigned
  
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-6 py-4">
        <h1 className="text-xl font-semibold text-foreground">
          Расписание заявок
        </h1>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Левая панель - список сотрудников */}
        <aside className="w-64 border-r border-border bg-card/50 overflow-auto">
          <div className="p-3">
            <button
              onClick={() => setSelectedEmployee(null)}
              className={cn(
                'w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
                !selectedEmployee
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              )}
            >
              Все сотрудники
            </button>
          </div>
          <div className="border-t border-border">
            {mockEmployees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => setSelectedEmployee(employee.id)}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm transition-colors',
                  selectedEmployee === employee.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <div className="font-medium">{employee.name}</div>
                {employee.company && (
                  <div className="text-xs text-muted-foreground">{employee.company}</div>
                )}
              </button>
            ))}
          </div>
        </aside>
        
        {/* Центральная часть - календарь */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <CalendarGrid
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              ticketsByDate={ticketsByDate}
            />
          </div>
        </div>
        
        {/* Правая панель - список заявок на день */}
        <aside className="w-96 border-l border-border bg-card/50 overflow-auto">
          <DayTicketsList
            date={selectedDate}
            assignedTickets={filteredAssignedTickets}
            unassignedTickets={filteredUnassignedTickets}
            employees={mockEmployees}
          />
        </aside>
      </div>
    </div>
  )
}