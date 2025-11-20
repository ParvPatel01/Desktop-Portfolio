import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomeScreen from './pages/HomeScreen.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeScreen />
  </StrictMode>,
)
