import type { Employee, ScheduledTicket } from '@/features/schedule/types/schedule.types'

export const mockEmployees: Employee[] = [
  { id: '1', name: 'Без исполнителя', company: '' },
  { id: '2', name: 'Волков Дмитрий', company: 'Рогин и копытин' },
  { id: '3', name: 'Кузнецов Игорь Викторович', company: 'ООО Моя оборона' },
  { id: '4', name: 'Морозов Алексей Петрович', company: '' },
  { id: '5', name: 'Соколов Егор Михайлович', company: 'Самозанятый' },
  { id: '6', name: 'Попов Никита Сергеевич', company: 'ИП ХЗ' },
  { id: '7', name: 'Лебедев Артем Владимирович', company: '' },
  { id: '8', name: 'Новиков Иван Александрович', company: '' },
  { id: '9', name: 'Козлов Денис Андреевич', company: '' },
  { id: '10', name: 'Смирнов Александр', company: '' },
  { id: '11', name: 'Иванов Кирилл Денисович', company: '' },
]

// Генерация случайных заявок для демонстрации
const generateMockTickets = (): ScheduledTicket[] => {
  const tickets: ScheduledTicket[] = []
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  // Генерируем заявки для текущего месяца
  for (let i = 1; i <= 30; i++) {
    // Несколько заявок в случайные дни
    if (Math.random() > 0.7) {
      const employeeId = Math.random() > 0.3 ? String(Math.floor(Math.random() * 10) + 2) : '1'
      tickets.push({
        id: `ticket-${i}-1`,
        number: `${700 + i}-${Math.floor(Math.random() * 100)}`,
        title: `Заявка на обслуживание оборудования #${i}`,
        employeeId,
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        time: `${Math.floor(Math.random() * 12) + 8}:00`,
        status: employeeId === '1' ? 'unassigned' : 'assigned',
        objectName: ['Le Smash', 'Supramen', 'Siberia', 'Авангард', 'ЛОЭСК'][Math.floor(Math.random() * 5)]
      })
    }
    
    // Добавляем вторую заявку в некоторые дни
    if (Math.random() > 0.85) {
      const employeeId = Math.random() > 0.3 ? String(Math.floor(Math.random() * 10) + 2) : '1'
      tickets.push({
        id: `ticket-${i}-2`,
        number: `${700 + i}-${Math.floor(Math.random() * 100)}`,
        title: `Плановое обслуживание #${i}`,
        employeeId,
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        time: `${Math.floor(Math.random() * 4) + 13}:00`,
        status: employeeId === '1' ? 'unassigned' : 'assigned',
        objectName: ['Le Smash', 'Supramen', 'Siberia', 'Авангард', 'ЛОЭСК'][Math.floor(Math.random() * 5)]
      })
    }
  }
  
  return tickets
}

export const mockScheduledTickets = generateMockTickets()

// Функция для получения заявок на конкретный день
export const getTicketsByDate = (date: string): { assigned: ScheduledTicket[], unassigned: ScheduledTicket[] } => {
  const ticketsForDate = mockScheduledTickets.filter(ticket => ticket.date === date)
  return {
    assigned: ticketsForDate.filter(t => t.status === 'assigned'),
    unassigned: ticketsForDate.filter(t => t.status === 'unassigned')
  }
}

// Функция для получения заявок сотрудника на конкретный день
export const getTicketsByEmployeeAndDate = (employeeId: string, date: string): ScheduledTicket[] => {
  return mockScheduledTickets.filter(ticket => ticket.employeeId === employeeId && ticket.date === date)
}