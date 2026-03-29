// src/types/schedule.ts
export interface Employee {
  id: string
  name: string
  company?: string
  avatar?: string
}

export interface ScheduledTicket {
  id: string
  number: string
  title: string
  employeeId: string
  date: string
  time: string
  status: 'assigned' | 'unassigned'
  objectName: string
}

export interface DaySchedule {
  date: string
  assignedTickets: ScheduledTicket[]
  unassignedTickets: ScheduledTicket[]
}