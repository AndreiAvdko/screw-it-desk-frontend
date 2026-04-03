import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// Создаем экземпляр QueryClient с настройками
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // данные считаются свежими 5 минут
      gcTime: 10 * 60 * 1000,        // кэш хранится 10 минут
      retry: 3,                       // количество попыток при ошибке
      refetchOnWindowFocus: false,    // не обновлять при фокусе окна
      refetchOnMount: false,          // не обновлять при монтировании
      refetchOnReconnect: false,      // не обновлять при переподключении
    },
    mutations: {
      retry: 1,                       // 1 попытка для мутаций
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)