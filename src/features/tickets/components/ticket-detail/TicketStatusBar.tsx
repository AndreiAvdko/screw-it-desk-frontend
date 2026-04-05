import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import type { TicketDetail } from '@/features/tickets/types/ticket-detail.types'

type TicketStatusBarProps = {
  ticket: TicketDetail
}

export function TicketStatusBar({ ticket }: TicketStatusBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-white shadow-md">
      <h1 className="text-lg font-semibold tracking-tight md:text-xl">
        Заявка {ticket.displayNumber} от {ticket.createdAt}
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="border-white/40 bg-white/15 text-white backdrop-blur-sm"
        >
          Критичность: {ticket.criticality}
        </Badge>
        <Badge
          variant="outline"
          className="border-white/40 bg-white/15 text-white backdrop-blur-sm"
        >
          Стадия: {ticket.stageLabel}
        </Badge>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="bg-white text-orange-700 hover:bg-white/90"
        >
          Перейти на стадию
        </Button>
      </div>
    </div>
  )
}
