import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { PlannedTaskCard } from '@/features/planner/components/PlannedTaskCard'
import { PlannerFilters } from '@/features/planner/components/PlannerFilters'
import { mockPlannedTasks } from '@/lib/mocks/handlers/mockPlanner'
import type { PlannedTask, PlannerFilter } from '@/features/planner/types/planner.types'

export function PlannerPage() {
  const [filters, setFilters] = useState<PlannerFilter>({
    status: 'all'
  })
  
  // Фильтрация задач
  const filteredTasks = useMemo(() => {
    let tasks = [...mockPlannedTasks]
    
    // Поиск по описанию
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
    }
    
    // Фильтр по статусу
    if (filters.status && filters.status !== 'all') {
      tasks = tasks.filter(task => task.status === filters.status)
    }
    
    // Фильтр по заказчику
    if (filters.customer && filters.customer.length > 0) {
      tasks = tasks.filter(task => 
        task.customer && filters.customer?.includes(task.customer)
      )
    }
    
    // Фильтр по виду работ
    if (filters.workType && filters.workType.length > 0) {
      tasks = tasks.filter(task => 
        filters.workType?.includes(task.workType)
      )
    }
    
    // Фильтр по типу заявки
    if (filters.ticketType && filters.ticketType.length > 0) {
      tasks = tasks.filter(task => 
        filters.ticketType?.includes(task.type)
      )
    }
    
    // Фильтр по объекту
    if (filters.object && filters.object.length > 0) {
      tasks = tasks.filter(task => 
        task.objectsList?.some(obj => filters.object?.includes(obj))
      )
    }
    
    // Фильтр по частоте
    if (filters.frequency) {
      const freqMap: Record<string, string> = {
        'Ежедневно': 'daily',
        'Еженедельно': 'weekly',
        'Ежемесячно': 'monthly',
        'Ежеквартально': 'quarterly',
        'Ежегодно': 'yearly'
      }
      const freqValue = freqMap[filters.frequency]
      if (freqValue) {
        tasks = tasks.filter(task => task.frequency === freqValue)
      }
    }
    
    return tasks
  }, [filters])
  
  const handleSchedule = (task: PlannedTask) => {
    // TODO: Открыть модальное окно для планирования
    console.log('Schedule task:', task)
  }
  
  const handleEdit = (task: PlannedTask) => {
    // TODO: Открыть модальное окно для редактирования
    console.log('Edit task:', task)
  }
  
  return (
    <div className="flex h-full flex-col">
      {/* Заголовок */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Планировщик работ
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Плановые заявки ({filteredTasks.length})
            </p>
          </div>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Создать плановую заявку
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Левая панель - фильтры */}
        <aside className="w-72 border-r border-border bg-card/50 overflow-auto p-4">
          <PlannerFilters filters={filters} onFilterChange={setFilters} />
        </aside>
        
        {/* Правая часть - список задач */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <PlannedTaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onSchedule={handleSchedule}
              />
            ))}
            
            {filteredTasks.length === 0 && (
              <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
                Нет плановых заявок, соответствующих фильтрам
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}