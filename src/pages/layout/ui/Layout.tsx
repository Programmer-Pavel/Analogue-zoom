import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import { MenuDrawer } from '@widgets/menu-drawer'
import { Header } from '@widgets/layout-header'

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
