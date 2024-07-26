import { Route, Routes } from 'react-router-dom'
import { Chat } from '@pages/chat'
import { CanvasPage } from '@pages/canvas'
import { FootballGamePage } from '@pages/football-game'
import { Layout } from '@pages/layout'
import { SignIn } from '@pages/sign'
import { PrivateRoutes } from './PrivateRoutes'

export function AppRoutes() {
  return (
    <Routes>
      {/* private routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/canvas" element={<CanvasPage />} />
          <Route path="/three-fiber" element={<FootballGamePage />} />
        </Route>
      </Route>

      {/* public routes */}
      <Route path="/login" element={<SignIn />} />
      {/* <Route path="/register" element={<Register />} />
    <Route path="*" element={<Missing />} /> */}
    </Routes>
  )
}
