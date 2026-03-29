// src/types/planner.ts
export interface PlannedTask {
  id: string
  title: string
  objectsCount: number
  objectsList?: string[]
  type: string
  workType: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  nextOccurrence: string
  status: 'scheduled' | 'unscheduled'
  customer?: string
}

export interface PlannerFilter {
  searchQuery?: string
  customer?: string[]
  workType?: string[]
  ticketType?: string[]
  object?: string[]
  status?: 'all' | 'scheduled' | 'unscheduled'
  frequency?: string
}