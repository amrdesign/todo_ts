import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import AppRoot from "@/app/appRoot.tsx";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true, // default: true
            staleTime: 60 * 1000, // 1 minute
            retry: 2, // Will retry failed requests 10 times before displaying an error
        }
    }
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
              <AppRoot />
      </QueryClientProvider>
  </StrictMode>,
)
