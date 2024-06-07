import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useNavigate } from 'react-router-dom'

const menuDrawerItems = [
  {
    id: 1,
    label: 'Чат',
    link: '/chat',
    icon: <MailIcon />,
  },
  {
    id: 2,
    label: 'Остальное',
    link: '/',
    icon: <InboxIcon />,
  },
]

interface MenuDrawerProps {
  isDrawerMenu: boolean
  setIsDrawerMenu: (value: boolean) => void
}

export function MenuDrawer({ isDrawerMenu, setIsDrawerMenu }: MenuDrawerProps) {
  const navigate = useNavigate()

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsDrawerMenu(newOpen)
  }

  const onListItem = (link: string) => {
    navigate(link)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuDrawerItems.map(el => (
          <ListItem key={el.id} disablePadding onClick={() => onListItem(el.link)}>
            <ListItemButton>
              <ListItemIcon>
                {el.icon}
              </ListItemIcon>
              <ListItemText primary={el.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Drawer open={isDrawerMenu} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  )
}
