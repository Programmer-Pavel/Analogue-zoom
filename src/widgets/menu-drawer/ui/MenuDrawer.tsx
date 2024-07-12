import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import DrawIcon from '@mui/icons-material/Draw'

const menuDrawerItems = [
  {
    id: 1,
    label: 'Чат',
    link: '/chat',
    icon: <MailIcon />,
  },
  {
    id: 2,
    label: 'Canvas',
    link: '/canvas',
    icon: <DrawIcon />,
  },
  {
    id: 3,
    label: 'Three Fiber',
    link: '/three-fiber',
    icon: <DrawIcon />,
  },
]

export function MenuDrawer() {
  const [isDrawerMenu, setIsDrawerMenu] = useState<boolean>(false)

  const navigate = useNavigate()

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsDrawerMenu(newOpen)
  }

  const onListItem = (link: string) => {
    navigate(link)
  }

  const handleOpenDrawer = () => {
    setIsDrawerMenu(!isDrawerMenu)
  }

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={handleOpenDrawer}
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={isDrawerMenu} onClose={toggleDrawer(false)}>
        {/* < sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}> */}
        <div style={{ width: 250 }} onClick={toggleDrawer(false)}>
          <List onClick={toggleDrawer(false)}>
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
        </div>
      </Drawer>
    </>
  )
}
