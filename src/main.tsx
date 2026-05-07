import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import AppRoot from "@/app/appRoot.tsx";

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <AppRoot />
      </QueryClientProvider>
  </StrictMode>,
)
