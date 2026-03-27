import { Bell, CircleHelp } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

type AppHeaderProps = {
  breadcrumbs: string
  userInitials?: string
}

export function AppHeader({
  breadcrumbs,
  userInitials = 'АТ',
}: AppHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4 shadow-sm">
      <nav
        className="min-w-0 truncate text-sm text-muted-foreground"
        aria-label="Навигация"
      >
        <span className="font-medium text-foreground">{breadcrumbs}</span>
      </nav>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          title="Справка"
          aria-label="Справка"
        >
          <CircleHelp className="size-5 text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          title="Уведомления"
          aria-label="Уведомления"
        >
          <Bell className="size-5 text-muted-foreground" />
        </Button>
        <Avatar className="size-9 border border-border">
          <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
