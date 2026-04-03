// src/lib/api/services/user-service.ts
import { apiClient } from '../client'
import { UserAdapter } from '../adapters/user-adapter'
import type { 
  AdminListItem, 
  UserFilters, 
  PaginationParams, 
  PaginatedResponse,
  CreateUserRequest,
  UpdateUserRequest
} from '../types/users-types/types'

// Определяем тип ответа API
interface ApiResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class UserService {
  private readonly baseUrl = '/users'

  /**
   * Получение списка администраторов
   */
  async getAdmins(
    filters?: Omit<UserFilters, 'role'>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<AdminListItem>> {
    const params = new URLSearchParams()
    
    // Всегда фильтруем по роли admin
    params.append('role', 'admin')
    
    if (pagination?.page) params.append('page', String(pagination.page))
    if (pagination?.limit) params.append('limit', String(pagination.limit))
    if (pagination?.sort) params.append('sort', pagination.sort)
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status)
    if (filters?.search) params.append('search', filters.search)
    
    // Получаем ответ от apiClient
    const response = await apiClient.get(`${this.baseUrl}?${params.toString()}`)
    
    console.log('Ответ от apiClient:', response)
    
    // Проверяем структуру ответа как ApiResponse
    if (this.isApiResponse(response)) {
      return {
        data: response.data.map((item) => UserAdapter.toAdminListItem(item as Record<string, unknown>)),
        pagination: response.pagination,
      }
    }
    
    // Если apiClient возвращает массив напрямую
    if (Array.isArray(response)) {
      return {
        data: response.map((item) => UserAdapter.toAdminListItem(item as Record<string, unknown>)),
        pagination: { page: 1, limit: 20, total: response.length, pages: 1 },
      }
    }
    
    // Если структура другая - возвращаем пустой результат
    console.error('Неизвестная структура ответа:', response)
    return {
      data: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 0 },
    }
  }

  /**
   * Получение списка пользователей с фильтрацией по роли
   */
  async getUsersByRole(
    role: 'admin' | 'customer' | 'contractor',
    filters?: Omit<UserFilters, 'role'>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<AdminListItem>> {
    const params = new URLSearchParams()
    
    params.append('role', role)
    
    if (pagination?.page) params.append('page', String(pagination.page))
    if (pagination?.limit) params.append('limit', String(pagination.limit))
    if (pagination?.sort) params.append('sort', pagination.sort)
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status)
    if (filters?.search) params.append('search', filters.search)
    
    const response = await apiClient.get(`${this.baseUrl}?${params.toString()}`)
    
    console.log('Ответ от apiClient (getUsersByRole):', response)
    
    if (this.isApiResponse(response)) {
      return {
        data: response.data.map((item) => UserAdapter.toAdminListItem(item as Record<string, unknown>)),
        pagination: response.pagination,
      }
    }
    
    if (Array.isArray(response)) {
      return {
        data: response.map((item) => UserAdapter.toAdminListItem(item as Record<string, unknown>)),
        pagination: { page: 1, limit: 20, total: response.length, pages: 1 },
      }
    }
    
    return {
      data: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 0 },
    }
  }

  /**
   * Создание администратора
   */
  async createAdmin(data: CreateUserRequest): Promise<AdminListItem> {
    const response = await apiClient.post(this.baseUrl, {
      ...data,
      role: 'admin'
    })
    return UserAdapter.toAdminListItem(response as Record<string, unknown>)
  }

  /**
   * Обновление администратора
   */
  async updateAdmin(id: string, data: UpdateUserRequest): Promise<AdminListItem> {
    const response = await apiClient.patch(`${this.baseUrl}/${id}`, data)
    return UserAdapter.toAdminListItem(response as Record<string, unknown>)
  }

  /**
   * Удаление администратора
   */
  async deleteAdmin(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`)
  }

  /**
   * Type guard для проверки структуры ApiResponse
   */
  private isApiResponse(response: unknown): response is ApiResponse<unknown> {
    return (
      typeof response === 'object' &&
      response !== null &&
      'data' in response &&
      Array.isArray((response as ApiResponse<unknown>).data) &&
      'pagination' in response &&
      typeof (response as ApiResponse<unknown>).pagination === 'object'
    )
  }
}

export const userService = new UserService()