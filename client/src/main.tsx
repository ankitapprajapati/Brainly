import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <div className=' min-h-screen bg-black' >
    <App />
  </div>,
)
