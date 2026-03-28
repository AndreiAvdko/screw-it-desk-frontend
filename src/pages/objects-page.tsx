// src/pages/objects-page.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, RefreshCw, Plus, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockObjects } from '@/data/mockObjects'
import { cn } from '@/lib/utils'

export function ObjectsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'my' | 'withTickets'>('all')

  // Фильтрация объектов
  const filteredObjects = mockObjects.filter((object) => {
    const matchesSearch = searchQuery === '' || 
      object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      object.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesFilter = true
    if (activeFilter === 'my') {
      matchesFilter = object.companyOwner.includes('ООО') // пример
    } else if (activeFilter === 'withTickets') {
      matchesFilter = object.ticketsCount > 0
    }
    
    return matchesSearch && matchesFilter
  })

  // Статистика
  const stats = {
    totalObjects: mockObjects.length,
    totalTickets: mockObjects.reduce((sum, obj) => sum + obj.ticketsCount, 0),
    objectsWithTickets: mockObjects.filter(obj => obj.ticketsCount > 0).length,
  }

  return (
    <div className="flex min-h-full flex-col">
      {/* Заголовок */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">
              Объекты | Оборудование
            </h1>
            <span className="text-sm text-muted-foreground">
              ({stats.totalObjects})
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
              onClick={() => setSearchQuery('')}
            >
              <RefreshCw className="size-4" />
            </Button>
          </div>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Добавить объект
          </Button>
        </div>

        {/* Быстрые фильтры */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Быстрые фильтры:</span>
          <button
            onClick={() => setActiveFilter('all')}
            className={cn(
              "rounded-md px-3 py-1 text-sm transition-colors",
              activeFilter === 'all'
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Все
          </button>
          <button
            onClick={() => setActiveFilter('my')}
            className={cn(
              "rounded-md px-3 py-1 text-sm transition-colors",
              activeFilter === 'my'
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Мои объекты
          </button>
          <button
            onClick={() => setActiveFilter('withTickets')}
            className={cn(
              "rounded-md px-3 py-1 text-sm transition-colors",
              activeFilter === 'withTickets'
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            С заявками
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Список объектов */}
        <div className="flex-1">
          {/* Поиск */}
          <div className="border-b border-border px-6 py-3">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск по названию или адресу..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Список объектов */}
          <div className="divide-y divide-border">
            {filteredObjects.map((object) => (
              <div
                key={object.id}
                className="cursor-pointer px-6 py-4 transition-colors hover:bg-muted/50"
                onClick={() => navigate(`/objects/${object.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {object.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {object.address}
                    </p>
                    
                    <div className="mt-2 flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Компания-владелец</span>
                        <p className="font-medium text-foreground">{object.companyOwner}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Заявки</span>
                        <p className="font-medium text-foreground">{object.ticketsCount}</p>
                        {object.totalTickets && (
                          <p className="text-xs text-muted-foreground">
                            Всего заявок: {object.totalTickets}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>

          {filteredObjects.length === 0 && (
            <div className="flex min-h-[40vh] items-center justify-center text-center text-muted-foreground">
              Объекты не найдены
            </div>
          )}
        </div>

        {/* Боковая панель с фильтрами и статистикой */}
        <aside className="hidden w-80 border-l border-border bg-card/50 p-6 xl:block">
          {/* Фильтры */}
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Фильтры</h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveFilter('all')}
              >
                Все быстрые фильтры
              </Button>
            </div>
          </div>

          {/* Статистика */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-foreground">Статистика</h2>
            <div className="space-y-4 rounded-lg bg-muted/30 p-4">
              <div>
                <div className="text-xs text-muted-foreground">Компания-владелец</div>
                <div className="mt-1 text-2xl font-bold text-foreground">
                  {mockObjects.filter(obj => obj.companyOwner !== '0').length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Всего объектов: {stats.totalObjects}
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <div className="text-xs text-muted-foreground">Заявки</div>
                <div className="mt-1 text-2xl font-bold text-foreground">
                  {stats.totalTickets}
                </div>
                <div className="text-xs text-muted-foreground">
                  Объектов с заявками: {stats.objectsWithTickets}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}