import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './configs/routes'

const rootElement = document.getElementById('root')

if (!rootElement)
  throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
