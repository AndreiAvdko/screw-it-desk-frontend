import { Badge } from '@/shared/ui/badge'
import { cn } from '@/lib/utils'
import type { Ticket } from '@/features/tickets/types/ticket.types'

const accentBar: Record<Ticket['accent'], string> = {
  orange: 'border-l-orange-500',
  amber: 'border-l-amber-400',
  emerald: 'border-l-emerald-500',
  sky: 'border-l-sky-400',
}

const stageClass: Record<Ticket['stageTone'], string> = {
  new: 'border-orange-200 bg-orange-50 text-orange-900 dark:bg-orange-950/40 dark:text-orange-100',
  progress:
    'border-sky-200 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100',
  neutral:
    'border-border bg-muted text-muted-foreground dark:bg-muted/60',
}

type TicketCardProps = {
  ticket: Ticket
  onOpen?: (id: string) => void
}

export function TicketCard({ ticket, onOpen }: TicketCardProps) {
  const interactive = Boolean(onOpen)

  return (
    <article
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? () => onOpen?.(ticket.id) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOpen?.(ticket.id)
              }
            }
          : undefined
      }
      className={cn(
        'group border-b border-border bg-card transition-colors',
        'border-l-4',
        accentBar[ticket.accent],
        interactive &&
          'cursor-pointer hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      )}
    >
      <div className="grid gap-3 px-3 py-2.5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.85fr)_minmax(0,1fr)] sm:gap-4 sm:px-4">
        <div className="min-w-0 space-y-1.5">
          <Field
            label="Объект / оборудование"
            value={ticket.objectEquipment}
            valueClassName="font-semibold text-foreground"
          />
          <Field
            label="Описание заявки"
            value={ticket.description}
            valueClassName="line-clamp-2 text-sm leading-snug text-foreground/90"
          />
        </div>
        <div className="min-w-0 space-y-1.5">
          <Field label="Номер заявки" value={ticket.number} />
          <Field label="Компания-заказчик" value={ticket.company} />
          <div>
            <p className="text-[11px] leading-none font-medium tracking-wide text-muted-foreground uppercase">
              Стадия
            </p>
            <Badge
              variant="outline"
              className={cn(
                'mt-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                stageClass[ticket.stageTone]
              )}
            >
              {ticket.stageLabel}
            </Badge>
          </div>
        </div>
        <div className="min-w-0 space-y-1.5">
          <Field label="Дата создания" value={ticket.createdAt} />
          <Field label="Крайний срок закрытия" value={ticket.deadline} />
          <Field label="Исполнитель" value={ticket.assignee} />
          <Field
            label="Назначено"
            value={ticket.scheduled ?? '—'}
          />
        </div>
      </div>
    </article>
  )
}

function Field({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div>
      <p className="text-[11px] leading-none font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className={cn(
          'mt-1 text-sm leading-tight text-foreground',
          valueClassName
        )}
      >
        {value}
      </p>
    </div>
  )
}
