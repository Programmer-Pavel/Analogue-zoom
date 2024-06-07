import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { SignIn } from '../components/sign/Sign'
import { Chat } from '../components/chat/Chat'
import { PrivateRoutes } from './PrivateRoutes'

export function AppRoutes() {
  return (
    <Routes>
      {/* private routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Route>

      {/* public routes */}
      <Route path="/login" element={<SignIn />} />
      {/* <Route path="/register" element={<Register />} />
    <Route path="*" element={<Missing />} /> */}
    </Routes>
  )
}
