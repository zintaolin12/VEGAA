import React from 'react'
import ReactDOM from 'react-dom/client'
import AppLayout from './app/layout'
import Dashboard from './features/dashboard/Dashboard'
import './index.css'
import './styles/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppLayout>
      <Dashboard />
    </AppLayout>
  </React.StrictMode>
)
