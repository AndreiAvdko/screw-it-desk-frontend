export interface BaseUser {
  id: string
  email: string
  username: string
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  role: 'admin' | 'customer' | 'contractor'
  status: 'active' | 'inactive' | 'blocked' | 'pending'
}

export interface UserFilters {
  role?: 'admin' | 'customer' | 'contractor' | 'all'
  status?: 'active' | 'inactive' | 'blocked' | 'pending' | 'all'
  search?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface AdminUser extends BaseUser {
  role: 'admin'
}

// Для списков используем те же типы
export interface AdminListItem extends AdminUser {}


export interface CreateUserRequest {
  email: string
  username: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: 'admin' | 'customer' | 'contractor'
  status?: 'active' | 'inactive' | 'blocked'
  organization?: string  // для заказчиков
}

export interface UpdateUserRequest {
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: 'admin' | 'customer' | 'contractor'
  status?: 'active' | 'inactive' | 'blocked'
  organization?: string  // для заказчиков
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

// Заказчик - добавляет поля организации и количества заявок
export interface CustomerUser extends BaseUser {
  role: 'customer'
  organization?: string | null
  ticketsCount?: number | null 
}

export interface CustomerListItem extends CustomerUser{}


export interface ContractorUser extends BaseUser {
  role: 'contractor'
  rating?: number | null
  completedTickets?: number | null
  activeTickets?: number | null
  companyId?: string | null
}

export interface ContractorListItem extends ContractorUser{}