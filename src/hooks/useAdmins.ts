// src/hooks/useAdmins.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/lib/api/services/user-services'
import type { UserFilters, PaginationParams } from '@/lib/api/types/users-types/types'

// Ключи кэша для администраторов
export const adminKeys = {
  all: ['admins'] as const,
  lists: () => [...adminKeys.all, 'list'] as const,
  list: (filters: UserFilters, pagination: PaginationParams) => 
    [...adminKeys.lists(), filters, pagination] as const,
  detail: (id: string) => [...adminKeys.all, 'detail', id] as const,
}

/**
 * Хук для получения списка администраторов
 */
export function useAdmins(filters: UserFilters = {}, pagination: PaginationParams = {}) {
  return useQuery({
    queryKey: adminKeys.list(filters, pagination),
    queryFn: () => userService.getAdmins(filters, pagination),
    staleTime: 5 * 60 * 1000, // 5 минут
  })
}

/**
 * Хук для создания администратора
 */
export function useCreateAdmin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.lists() })
    },
  })
}

/**
 * Хук для обновления администратора
 */
export function useUpdateAdmin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof userService.updateAdmin>[1] }) =>
      userService.updateAdmin(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: adminKeys.lists() })
    },
  })
}

/**
 * Хук для удаления администратора
 */
export function useDeleteAdmin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.lists() })
    },
  })
}