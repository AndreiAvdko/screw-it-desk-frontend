// src/components/planner/planner-filters.tsx
import { useState } from 'react'
import { Search, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { plannerFilters } from '@/data/mockPlanner'
import type { PlannerFilter } from '@/types/planner'
import { cn } from '@/lib/utils'

interface PlannerFiltersProps {
  filters: PlannerFilter
  onFilterChange: (filters: PlannerFilter) => void
}

export function PlannerFilters({ filters, onFilterChange }: PlannerFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    customer: false,
    workType: false,
    ticketType: false,
    object: false
  })
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  const addFilter = (key: keyof PlannerFilter, value: string) => {
    const current = filters[key] as string[] || []
    if (!current.includes(value)) {
      onFilterChange({
        ...filters,
        [key]: [...current, value]
      })
    }
  }
  
  const removeFilter = (key: keyof PlannerFilter, value: string) => {
    const current = filters[key] as string[] || []
    onFilterChange({
      ...filters,
      [key]: current.filter(v => v !== value)
    })
  }
  
  const FilterSection = ({ 
    title, 
    keyName, 
    items 
  }: { 
    title: string, 
    keyName: keyof PlannerFilter, 
    items: string[] 
  }) => {
    const selectedItems = (filters[keyName] as string[]) || []
    
    return (
      <div className="border-b border-border py-3">
        <button
          onClick={() => toggleSection(keyName)}
          className="flex w-full items-center justify-between text-left text-sm font-medium text-foreground"
        >
          {title}
          <Plus className="size-4" />
        </button>
        
        {expandedSections[keyName] && (
          <div className="mt-2 space-y-2">
            {items.map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addFilter(keyName, item)
                    } else {
                      removeFilter(keyName, item)
                    }
                  }}
                  className="rounded border-border"
                />
                <span className="text-muted-foreground">{item}</span>
              </label>
            ))}
          </div>
        )}
        
        {selectedItems.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {selectedItems.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="cursor-pointer gap-1 text-xs"
                onClick={() => removeFilter(keyName, item)}
              >
                {item}
                <X className="size-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Фильтры</h2>
      </div>
      
      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Поиск по описанию"
          className="pl-8"
          value={filters.searchQuery || ''}
          onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
        />
      </div>
      
      {/* Заказчик */}
      <FilterSection title="Заказчик" keyName="customer" items={plannerFilters.customers} />
      
      {/* Вид работ */}
      <FilterSection title="Вид работ" keyName="workType" items={plannerFilters.workTypes} />
      
      {/* Тип заявки */}
      <FilterSection title="Тип заявки" keyName="ticketType" items={plannerFilters.ticketTypes} />
      
      {/* Объект */}
      <FilterSection title="Объект" keyName="object" items={plannerFilters.objects} />
      
      {/* Состояние расписания */}
      <div className="border-b border-border py-3">
        <p className="mb-2 text-sm font-medium text-foreground">Состояние расписания:</p>
        <div className="space-y-1">
          {(['all', 'scheduled', 'unscheduled'] as const).map((status) => (
            <label key={status} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="status"
                checked={filters.status === status}
                onChange={() => onFilterChange({ ...filters, status })}
                className="rounded-full border-border"
              />
              <span className="text-muted-foreground">
                {status === 'all' && 'Все'}
                {status === 'scheduled' && 'Запланированные'}
                {status === 'unscheduled' && 'Незапланированные'}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Частоты повторений */}
      <div className="border-b border-border py-3">
        <p className="mb-2 text-sm font-medium text-foreground">Частоты повторений</p>
        <div className="space-y-1">
          {plannerFilters.frequencies.map((freq) => (
            <label key={freq} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="frequency"
                checked={filters.frequency === freq}
                onChange={() => onFilterChange({ ...filters, frequency: freq })}
                className="rounded-full border-border"
              />
              <span className="text-muted-foreground">{freq}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Следующее повторение (заглушка) */}
      <div className="py-3">
        <p className="text-sm font-medium text-foreground">Следующее повторение</p>
        <p className="mt-1 text-sm text-muted-foreground">01.04.2026 09:00</p>
      </div>
      
      {/* Сброс фильтров */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => onFilterChange({ status: 'all' })}
      >
        Сбросить фильтры
      </Button>
    </div>
  )
}