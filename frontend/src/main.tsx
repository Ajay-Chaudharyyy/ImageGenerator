
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './Context/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <AppContextProvider >
  <App />
  </AppContextProvider>
  </BrowserRouter>
    
  
)
