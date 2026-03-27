import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { PlaceholderPage } from '@/pages/placeholder-page'
import { TicketDetailPage } from '@/components/ticket-detail/ticket-detail-page'
import { TicketsPage } from '@/pages/tickets-page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<TicketsPage />} />
          <Route path="tickets/schedule" element={<PlaceholderPage title="График" />} />
          <Route path="tickets/marking" element={<PlaceholderPage title="Маркировка" />} />
          <Route path="tickets/planner" element={<PlaceholderPage title="Планировщик работ" />} />
          <Route path="tickets/:id" element={<TicketDetailPage />} />
          <Route
            path="objects"
            element={<PlaceholderPage title="Объекты | Оборудование" />}
          />
          <Route
            path="users"
            element={<PlaceholderPage title="Пользователи" />}
          />
          <Route
            path="companies"
            element={<PlaceholderPage title="Компании" />}
          />
          <Route
            path="messages"
            element={<PlaceholderPage title="Сообщения" />}
          />
          <Route
            path="checklists"
            element={<PlaceholderPage title="Чек-листы" />}
          />
          <Route
            path="warehouses"
            element={<PlaceholderPage title="Склады | Материалы" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
