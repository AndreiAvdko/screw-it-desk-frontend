import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { TicketDetailToolbar } from '@/components/ticket-detail/ticket-detail-toolbar'
import { TicketFormTab } from '@/components/ticket-detail/ticket-form-tab'
import { TicketInnerNav } from '@/components/ticket-detail/ticket-inner-nav'
import { TicketMessagesTab } from '@/components/ticket-detail/ticket-messages-tab'
import { TicketStatusBar } from '@/components/ticket-detail/ticket-status-bar'
import { getTicketDetail } from '@/data/mockTicketDetails'
import type { TicketInnerTab } from '@/types/ticket-detail'

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center p-8">
      <p className="text-center text-sm text-muted-foreground">
        Раздел «{title}» будет доступен позже.
      </p>
    </div>
  )
}

const tabTitles: Record<TicketInnerTab, string> = {
  request: 'Заявка',
  messages: 'Сообщения',
  checklists: 'Чек-листы',
  children: 'Дочерние заявки',
  execution: 'Выполнения',
  act: 'Акт выполненных работ',
  history: 'История изменений',
}

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState<TicketInnerTab>('request')

  if (!id) {
    return <Navigate to="/" replace />
  }

  const ticket = getTicketDetail(id)
  if (!ticket) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <TicketDetailToolbar />
      <TicketStatusBar ticket={ticket} />
      <div className="flex min-h-0 flex-1 items-stretch">
        <TicketInnerNav active={tab} onChange={setTab} />
        {tab === 'request' && <TicketFormTab ticket={ticket} />}
        {tab === 'messages' && (
          <TicketMessagesTab displayNumber={ticket.displayNumber} />
        )}
        {tab === 'checklists' && (
          <PlaceholderSection title={tabTitles.checklists} />
        )}
        {tab === 'children' && (
          <PlaceholderSection title={tabTitles.children} />
        )}
        {tab === 'execution' && (
          <PlaceholderSection title={tabTitles.execution} />
        )}
        {tab === 'act' && <PlaceholderSection title={tabTitles.act} />}
        {tab === 'history' && (
          <PlaceholderSection title={tabTitles.history} />
        )}
      </div>
    </div>
  )
}
