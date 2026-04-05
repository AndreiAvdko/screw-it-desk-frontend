import { Outlet, useLocation } from 'react-router-dom'

import { AppFooter } from '@/shared/layout/AppFooter'
import { AppHeader } from '@/shared/layout/AppHeader'
import { AppSidebar } from '@/shared/layout/AppSidebar'
import { getHeaderBreadcrumb } from '@/lib/breadcrumbs'

type AppShellProps = {
  userInitials?: string
}

export function AppShell({ userInitials }: AppShellProps) {
  const { pathname } = useLocation()
  const breadcrumbs = getHeaderBreadcrumb(pathname)

  return (
    <div className="flex min-h-svh w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader breadcrumbs={breadcrumbs} userInitials={userInitials} />
        <main className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  )
}
