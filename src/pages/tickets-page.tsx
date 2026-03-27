import {
  Filter,
  LayoutGrid,
  List,
  Map,
  RefreshCw,
  Search,
  Settings,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TicketCard } from '@/components/tickets/ticket-card'
import { mockTickets } from '@/data/mockTickets'
import { cn } from '@/lib/utils'

type ViewMode = 'list' | 'board' | 'map'

export function TicketsPage() {
  const navigate = useNavigate()
  const [view, setView] = useState<ViewMode>('list')

  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-border bg-card px-4 py-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Все заявки
            </h1>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
              title="Обновить список"
              aria-label="Обновить список"
            >
              <RefreshCw className="size-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
              {(
                [
                  ['list', List, 'Список'],
                  ['board', LayoutGrid, 'Доска'],
                  ['map', Map, 'Карта'],
                ] as const
              ).map(([key, Icon, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setView(key)}
                  title={label}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                    view === key
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="size-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              title="Настройки вида"
              aria-label="Настройки вида"
            >
              <Settings className="size-4" />
            </Button>
            <Button type="button" size="sm">
              Создать заявку
            </Button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Мои заявки
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1">
          {view === 'list' && (
            <div className="divide-y divide-border/80">
              {mockTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onOpen={(id) => navigate(`/tickets/${id}`)}
                />
              ))}
            </div>
          )}
          {view !== 'list' && (
            <div className="flex min-h-[40vh] items-center justify-center p-8 text-center text-sm text-muted-foreground">
              Режим «{view === 'board' ? 'Доска' : 'Карта'}» появится на
              следующих этапах.
            </div>
          )}
        </div>

        <aside className="hidden w-56 shrink-0 border-l border-border bg-card/80 p-3 xl:block">
          <h2 className="text-sm font-semibold text-foreground">Фильтры</h2>
          <div className="mt-3 space-y-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Поиск..."
                className="h-8 pl-8 text-xs"
                aria-label="Поиск по заявкам"
              />
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-full justify-start text-xs"
              type="button"
            >
              Активные фильтры
            </Button>
            <Button
              type="button"
              size="icon-sm"
              className="w-full"
              title="Расширенные фильтры"
            >
              <Filter className="size-4" />
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
