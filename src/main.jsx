import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)
