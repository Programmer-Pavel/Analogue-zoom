import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App'

const rootElement = document.getElementById('root')

if (!rootElement)
  throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // children: [
    //   {
    //     path: "userchat/:id",
    //     element: <NewChat />,
    //   },
    // ],
  },
])

root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>
)
