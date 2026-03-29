// src/components/schedule/calendar-grid.tsx
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CalendarGridProps {
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  ticketsByDate: Map<string, { assigned: number; unassigned: number }>
}

export function CalendarGrid({ selectedDate, onSelectDate, ticketsByDate }: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay() // 0 - воскресенье, 6 - суббота
    
    // Адаптируем под неделю с понедельника
    const startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1
    
    const days: Date[] = []
    
    // Добавляем дни предыдущего месяца
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startOffset - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i))
    }
    
    // Добавляем дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    // Добавляем дни следующего месяца для заполнения сетки (6 строк = 42 дня)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }
    
    return days
  }
  
  const days = getDaysInMonth(currentMonth)
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
  
  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth()
  }
  
  const changeMonth = (increment: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1))
  }
  
  const getTicketCounts = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return ticketsByDate.get(dateStr) || { assigned: 0, unassigned: 0 }
  }
  
  return (
    <div className="flex h-full flex-col">
      {/* Заголовок календаря */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground">
            {currentMonth.toLocaleString('ru', { month: 'long', year: 'numeric' })}
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentMonth(new Date())}
        >
          Сегодня
        </Button>
      </div>
      
      {/* Сетка календаря */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays.map(day => (
            <div
              key={day}
              className="border-r border-border p-2 text-center text-xs font-medium text-muted-foreground last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((date, idx) => {
            const counts = getTicketCounts(date)
            const hasTickets = counts.assigned > 0 || counts.unassigned > 0
            
            return (
              <button
                key={idx}
                onClick={() => onSelectDate(date)}
                className={cn(
                  'group relative border-b border-r border-border p-2 transition-colors hover:bg-muted/50 focus:z-10 focus:outline-none',
                  !isCurrentMonth(date) && 'bg-muted/20',
                  isSelected(date) && 'bg-primary/5',
                  'last:border-r-0'
                )}
              >
                <div className="flex flex-col items-start gap-1">
                  <span
                    className={cn(
                      'inline-flex size-7 items-center justify-center rounded-full text-sm',
                      isToday(date) && 'bg-primary text-primary-foreground',
                      !isCurrentMonth(date) && 'text-muted-foreground'
                    )}
                  >
                    {date.getDate()}
                  </span>
                  
                  {hasTickets && (
                    <div className="flex flex-wrap gap-1">
                      {counts.assigned > 0 && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                          {counts.assigned}
                        </span>
                      )}
                      {counts.unassigned > 0 && (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                          {counts.unassigned}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}