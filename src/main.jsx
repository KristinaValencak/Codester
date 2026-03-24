import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config'
import { HelmetProvider } from 'react-helmet-async'
import AppRouter from './routing/AppRouter.jsx'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AppRouter />
      <Analytics />
    </HelmetProvider>
  </StrictMode>,
)
