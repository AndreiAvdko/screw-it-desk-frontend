import { BaseAdapter } from './base-adapter'
import type { AdminUser } from '../types/user.types'

export class AdminAdapter extends BaseAdapter {
  static toAdminUser(raw: Record<string, unknown>): AdminUser {
    return {
      ...this.toBaseUser(raw),
      role: 'admin',
    } as AdminUser
  }
}