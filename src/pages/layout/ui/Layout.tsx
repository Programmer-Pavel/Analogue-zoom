import * as React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Header } from '../../../widgets/layout-header'
import { MenuDrawer } from '../../../widgets/menu-drawer'

export function Layout() {
  return (
    <Box height="100%">
      <Header>
        <MenuDrawer />
      </Header>
      <Box height="calc(100% - 84px)" p="10px">
        <Outlet />
      </Box>
    </Box>
  )
}
