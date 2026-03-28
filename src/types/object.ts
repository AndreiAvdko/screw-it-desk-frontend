// src/types/object.ts
export interface Object {
  id: string
  name: string
  address: string
  companyOwner: string
  ticketsCount: number
  totalTickets?: number
  image?: string
  parentId?: string // ID родительского объекта
}

export interface ObjectDetails extends Object {
  serviceNumber?: string
  description?: string
  isMobile?: boolean
  site?: string
  workSchedule?: string
  files?: string[]
  parentObject?: string
  children?: Object[] // 👈 массив дочерних объектов
  contacts?: Contact[]
  contracts?: Contract[]
  serviceHistory?: ServiceRecord[]
}

export interface Contact {
  name: string
  position: string
  phone: string
  email: string
}

export interface Contract {
  number: string
  date: string
  type: string
}

export interface ServiceRecord {
  date: string
  type: string
  description: string
}