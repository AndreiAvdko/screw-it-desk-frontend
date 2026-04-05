import { useQuery } from '@tanstack/react-query'
import { contractorService } from '@/features/users/services/contractor-service'
import type { PaginationParams } from '@/features/users/types/user.types'

export const contractorKeys = {
  all: ['contractors'] as const,
  lists: () => [...contractorKeys.all, 'list'] as const,
  list: (pagination: PaginationParams) => [...contractorKeys.lists(), pagination] as const,
  profile: () => [...contractorKeys.all, 'profile'] as const,
}

/**
 * Хук для получения списка исполнителей (только для админов)
 */
export function useContractors(pagination: PaginationParams = {}) {
  return useQuery({
    queryKey: contractorKeys.list(pagination),
    queryFn: () => contractorService.getContractors(pagination),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    enabled: () => {
      const userRole = localStorage.getItem('userRole')
      return userRole === 'admin'
    },
  })
}

/**
 * Хук для получения профиля исполнителя (для самого исполнителя)
 */
export function useContractorProfile() {
  return useQuery({
    queryKey: contractorKeys.profile(),
    queryFn: () => contractorService.getMyProfile(),
    staleTime: 5 * 60 * 1000,
    enabled: () => {
      const userRole = localStorage.getItem('userRole')
      return userRole === 'contractor'
    },
  })
}