// src/pages/users/admins-page.tsx
import { useState } from 'react'
import { Search, Plus, MoreVertical, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Admin {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastActive: string
}

const mockAdmins: Admin[] = [
  {
    id: '1',
    name: 'Иванов Иван Иванович',
    email: 'ivanov@milya.ru',
    role: 'Главный администратор',
    status: 'active',
    lastActive: '29.03.2026'
  },
  {
    id: '2',
    name: 'Петрова Анна Сергеевна',
    email: 'petrova@milya.ru',
    role: 'Администратор',
    status: 'active',
    lastActive: '28.03.2026'
  },
  {
    id: '3',
    name: 'Сидоров Алексей Владимирович',
    email: 'sidorov@milya.ru',
    role: 'Администратор',
    status: 'inactive',
    lastActive: '15.03.2026'
  }
]

export function AdminsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredAdmins = mockAdmins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Администраторы
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Управление администраторами системы
            </p>
          </div>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Добавить администратора
          </Button>
        </div>
        
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по имени или email..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="rounded-lg border border-border">
          <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted/30 px-4 py-3 text-sm font-medium text-muted-foreground">
            <div className="col-span-5">Администратор</div>
            <div className="col-span-3">Роль</div>
            <div className="col-span-2">Статус</div>
            <div className="col-span-2">Последняя активность</div>
          </div>
          
          <div className="divide-y divide-border">
            {filteredAdmins.map((admin) => (
              <div key={admin.id} className="grid grid-cols-12 items-center gap-4 px-4 py-3">
                <div className="col-span-5">
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{admin.name}</p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <span className="text-sm text-foreground">{admin.role}</span>
                </div>
                <div className="col-span-2">
                  <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                    {admin.status === 'active' ? 'Активен' : 'Неактивен'}
                  </Badge>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {admin.lastActive}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}