import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Factory,
  MessageSquare,
  Package,
  Ticket,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const ticketSubItems = [
  { to: '/', label: 'Все заявки', end: true },
  { to: '/tickets/schedule', label: 'График', end: false },
  { to: '/tickets/marking', label: 'Маркировка', end: false },
  { to: '/tickets/planner', label: 'Планировщик работ', end: false },
] as const

const mainNav = [
  { to: '/objects', label: 'Объекты | Оборудование', icon: Factory },
  { to: '/users', label: 'Пользователи', icon: Users },
  { to: '/companies', label: 'Компании', icon: Building2 },
  { to: '/messages', label: 'Сообщения', icon: MessageSquare },
  { to: '/checklists', label: 'Чек-листы', icon: ClipboardList },
  { to: '/warehouses', label: 'Склады | Материалы', icon: Package },
] as const

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out',
        collapsed ? 'w-[4.25rem]' : 'w-60'
      )}
    >
      <div
        className={cn(
          'flex h-14 items-center border-b border-sidebar-border px-3',
          collapsed && 'justify-center px-2'
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            H
          </div>
          {!collapsed && (
            <span className="truncate text-sm font-semibold tracking-tight">
              Hubex
            </span>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-0.5 p-2" aria-label="Основное меню">
          {!collapsed && (
            <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground/90">
              <Ticket className="size-4 shrink-0" aria-hidden />
              <span>Заявки</span>
            </div>
          )}
          {collapsed && (
            <NavLink
              to="/"
              end
              title="Заявки"
              className={({ isActive }) =>
                cn(
                  'flex size-10 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )
              }
            >
              <Ticket className="size-5" />
            </NavLink>
          )}
          {!collapsed && (
            <div className="flex flex-col gap-0.5 pl-2">
              {ticketSubItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md border-l-2 py-1.5 pr-2 pl-6 text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                      isActive
                        ? 'border-sidebar-primary bg-sidebar-accent/80 font-medium text-sidebar-accent-foreground'
                        : 'border-transparent text-sidebar-foreground/85 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}

          {!collapsed && <Separator className="my-2 bg-sidebar-border" />}

          {mainNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-md py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                    collapsed ? 'justify-center px-0' : 'px-2',
                    isActive
                      ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/85 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
                  )
                }
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full justify-center gap-1 text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4" />
              <span className="text-xs">Свернуть</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
