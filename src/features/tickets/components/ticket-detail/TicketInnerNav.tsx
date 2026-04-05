import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { cn } from '@/lib/utils'
import type { TicketInnerTab } from '@/features/tickets/types/ticket-detail.types'

const items: { id: TicketInnerTab; label: string; beta?: boolean }[] = [
  { id: 'request', label: 'Заявка' },
  { id: 'messages', label: 'Сообщения' },
  { id: 'checklists', label: 'Чек-листы' },
  { id: 'children', label: 'Дочерние заявки' },
  { id: 'execution', label: 'Выполнения' },
  { id: 'act', label: 'Акт выполненных работ', beta: true },
  { id: 'history', label: 'История изменений' },
]

type TicketInnerNavProps = {
  active: TicketInnerTab
  onChange: (tab: TicketInnerTab) => void
}

export function TicketInnerNav({ active, onChange }: TicketInnerNavProps) {
  return (
    <aside className="flex h-full min-h-0 w-52 shrink-0 flex-col border-r border-border bg-card">
      <nav
        className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2"
        aria-label="Разделы заявки"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              'flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors',
              active === item.id
                ? 'bg-primary/10 font-medium text-primary'
                : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            )}
          >
            <span className="min-w-0 truncate">{item.label}</span>
            {item.beta && (
              <Badge className="shrink-0 border-red-200 bg-red-50 px-1.5 py-0 text-[10px] text-red-700">
                Beta
              </Badge>
            )}
          </button>
        ))}
      </nav>
      <div className="shrink-0 border-t border-border p-3">
        <p className="text-xs font-medium text-muted-foreground">
          Рейтинг по заявке
        </p>
        <Button type="button" variant="outline" size="sm" className="mt-2 w-full">
          Оценить
        </Button>
      </div>
    </aside>
  )
}
