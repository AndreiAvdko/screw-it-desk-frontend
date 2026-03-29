// src/components/planner/planned-task-card.tsx
import { useState } from 'react'
import { Calendar, Building2, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { PlannedTask } from '@/types/planner'
import { cn } from '@/lib/utils'

interface PlannedTaskCardProps {
  task: PlannedTask
  onEdit?: (task: PlannedTask) => void
  onSchedule?: (task: PlannedTask) => void
}

export function PlannedTaskCard({ task, onEdit, onSchedule }: PlannedTaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getStatusBadge = () => {
    if (task.status === 'scheduled') {
      return {
        label: 'Запланировано',
        className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
      }
    }
    return {
      label: 'Не запланировано',
      className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
    }
  }
  
  const statusBadge = getStatusBadge()
  
  return (
    <div className="rounded-lg border border-border bg-card transition-all hover:shadow-sm">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">
                {task.title}
              </h3>
              <Badge variant="outline" className={statusBadge.className}>
                {statusBadge.label}
              </Badge>
            </div>
            
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Building2 className="size-4" />
                <span>{task.objectsCount} объектов выбрано</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                <span>Следующее: {task.nextOccurrence}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSchedule?.(task)}
            >
              <CheckCircle className="mr-2 size-4" />
              Запланировать
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </Button>
          </div>
        </div>
        
        {/* Детальная информация */}
        {isExpanded && (
          <div className="mt-4 border-t border-border pt-4">
            <div className="grid gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Тип заявки:</span>
                <p className="font-medium text-foreground">{task.type}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Вид работ:</span>
                <p className="font-medium text-foreground">{task.workType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Описание заявки:</span>
                <p className="text-foreground/90">{task.description}</p>
              </div>
              {task.objectsList && (
                <div>
                  <span className="text-muted-foreground">Объекты:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {task.objectsList.map((obj, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {obj}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Частота повторений:</span>
                <p className="font-medium text-foreground">
                  {task.frequency === 'monthly' && 'Ежемесячно'}
                  {task.frequency === 'weekly' && 'Еженедельно'}
                  {task.frequency === 'daily' && 'Ежедневно'}
                  {task.frequency === 'quarterly' && 'Ежеквартально'}
                  {task.frequency === 'yearly' && 'Ежегодно'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}