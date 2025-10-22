import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // O nosso ficheiro do Tailwind
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Cria o "cérebro" do React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. "Disponibiliza" o React Query para toda a aplicação */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)