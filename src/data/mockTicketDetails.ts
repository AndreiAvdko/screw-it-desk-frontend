import type { TicketDetail } from '@/types/ticket-detail'
import type { Ticket } from '@/types/ticket'

import { mockTickets } from '@/data/mockTickets'

type TicketDetailExtra = Omit<
  TicketDetail,
  keyof Ticket
>

const extraById: Record<string, TicketDetailExtra> = {
  '1': {
    displayNumber: '149201',
    criticality: 4,
    requestType: 'Инцидент',
    workType: 'Аварийное обслуживание',
    address: 'Республика Татарстан, г. Альметьевск, АЗС №7, корпус Б',
    performer: {
      initials: 'ВК',
      fullName: 'Волков Кирилл Андреевич',
    },
    paymentRecipientCompany: 'ООО «Нефтегазсервис»',
    parentRequest: null,
    objectPlan: 'План объекта v4',
    contactPerson: 'Михайлов Дмитрий Алексеевич',
  },
  '2': {
    displayNumber: '149202',
    criticality: 3,
    requestType: 'Заявка',
    workType: 'Техническое обслуживание',
    address: 'г. Казань, ул. Транспортная, 12, котельная №7',
    performer: {
      initials: 'МД',
      fullName: 'Морозова Дарья Игоревна',
    },
    paymentRecipientCompany: 'АО «Казанские тепловые сети»',
    parentRequest: '731-112',
    objectPlan: '—',
    contactPerson: 'Кузнецов Артем Викторович',
  },
  '3': {
    displayNumber: '149203',
    criticality: 2,
    requestType: 'Жалоба',
    workType: 'Осмотр оборудования',
    address: 'г. Набережные Челны, бульвар Энтузиастов, д. 8, подъезд 1',
    performer: {
      initials: '—',
      fullName: 'Не назначен',
    },
    paymentRecipientCompany: 'УК «Сервис-Гарант»',
    parentRequest: null,
    objectPlan: 'План МКД',
    contactPerson: '—',
  },
  '4': {
    displayNumber: '149204',
    criticality: 3,
    requestType: 'Инцидент',
    workType: 'Обслуживание вентиляции',
    address: 'г. Казань, ТЦ «Меридиан», 2 этаж, узел В2',
    performer: {
      initials: 'ГЕ',
      fullName: 'Григорьев Евгений Павлович',
    },
    paymentRecipientCompany: 'ООО «ВентТехСтрой»',
    parentRequest: null,
    objectPlan: 'План ТЦ',
    contactPerson: 'Федорова Наталья',
  },
  '5': {
    displayNumber: '149205',
    criticality: 1,
    requestType: 'Плановая',
    workType: 'Плановый осмотр',
    address: 'Промзона, насосная станция, стр. 5',
    performer: {
      initials: 'ВК',
      fullName: 'Волков Кирилл Андреевич',
    },
    paymentRecipientCompany: 'ООО «ПромБезопасность»',
    parentRequest: null,
    objectPlan: '—',
    contactPerson: 'Оператор Щитовой',
  },
}

function fallbackExtra(id: string): TicketDetailExtra {
  return {
    displayNumber: id,
    criticality: 2,
    requestType: 'Заявка',
    workType: '—',
    address: '—',
    performer: { initials: '—', fullName: 'Не назначен' },
    paymentRecipientCompany: '—',
    parentRequest: null,
    objectPlan: '—',
    contactPerson: '—',
  }
}

/** Полная карточка заявки для страницы просмотра */
export function getTicketDetail(id: string): TicketDetail | null {
  const base = mockTickets.find((t) => t.id === id)
  if (!base) {
    return null
  }
  const extra = extraById[id] ?? fallbackExtra(id)
  return { ...base, ...extra }
}
