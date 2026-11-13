import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fontes variáveis locais (somente os subconjuntos usados são baixados, via unicode-range)
import '@fontsource-variable/bricolage-grotesque/standard.css'
import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
