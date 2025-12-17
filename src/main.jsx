import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWrapper from './Utilities/AppWrapper.jsx'
import router from './Routes/router.jsx'
import AuthProvider from './Auth/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppWrapper router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
