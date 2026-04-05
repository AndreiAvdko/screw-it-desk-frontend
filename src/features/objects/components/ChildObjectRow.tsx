import { ChevronRight, Building2, Ticket } from 'lucide-react'
import type { Object } from '@/features/objects/types/object.types'
import { cn } from '@/lib/utils'

interface ChildObjectRowProps {
  object: Object
  onClick?: () => void
}

export function ChildObjectRow({ object, onClick }: ChildObjectRowProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className={cn(
        'group cursor-pointer border-b border-border px-4 py-3 transition-colors hover:bg-muted/50',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {object.name}
            </h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {object.address}
          </p>
          
          <div className="mt-2 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Building2 className="size-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {object.companyOwner}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ticket className="size-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">
                Заявки: <span className="font-medium text-foreground">{object.ticketsCount}</span>
              </span>
              {object.totalTickets && (
                <span className="text-xs text-muted-foreground">
                  (всего: {object.totalTickets})
                </span>
              )}
            </div>
          </div>
        </div>
        <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </div>
  )
}