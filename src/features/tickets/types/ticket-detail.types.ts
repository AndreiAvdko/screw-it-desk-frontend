import type { Ticket } from '@/features/tickets/types/ticket.types'

/** Расширенные поля карточки заявки (просмотр / редактирование) */
export interface TicketDetail extends Ticket {
  /** Номер для заголовка (как в системе-референсе, напр. 148380) */
  displayNumber: string
  criticality: number
  requestType: string
  workType: string
  address: string
  performer: {
    initials: string
    fullName: string
  }
  paymentRecipientCompany: string
  parentRequest: string | null
  objectPlan: string
  contactPerson: string
}

export type TicketInnerTab =
  | 'request'
  | 'messages'
  | 'checklists'
  | 'children'
  | 'execution'
  | 'act'
  | 'history'
