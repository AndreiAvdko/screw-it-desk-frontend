/** Полоса слева у карточки — визуальный статус очереди */
export type TicketAccent = 'orange' | 'amber' | 'emerald' | 'sky'

export interface Ticket {
  id: string
  number: string
  objectEquipment: string
  description: string
  company: string
  stageLabel: string
  stageTone: 'new' | 'progress' | 'neutral'
  createdAt: string
  deadline: string
  assignee: string
  scheduled: string | null
  accent: TicketAccent
}
