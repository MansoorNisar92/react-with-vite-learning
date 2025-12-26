import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ConsoleProvider } from './console/ConsoleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConsoleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConsoleProvider>
  </StrictMode>,
)
