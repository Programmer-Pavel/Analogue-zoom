import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { socket } from '../socket'

export function App() {
  const [users, setUsers] = useState<any[]>([])
  const [value, setValue] = useState<string>('')
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false)
  const [nameInputValue, setNameInputValue] = useState('')
  // const [setSelectedUser] = useState(null)

  useEffect(() => {
    setValue(users[0]?.userID)
  }, [users])

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID')

    if (sessionID) {
      setUsernameAlreadySelected(true)
      socket.auth = { sessionID }
      socket.connect()
    }

    socket.on('session', ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID }
      // store it in the localStorage
      localStorage.setItem('sessionID', sessionID)
      // save the ID of the user
      // @ts-expect-error fix
      socket.userID = userID
    })

    socket.on('users', (usersList: any) => {
      const changedData = usersList.map((user: any) => {
        // const userMessages = user?.messages?.map((message: any) => {
        //   return {
        //     ...message,
        //       // @ts-expect-error fix
        //     fromSelf: message?.from === socket.userID,
        //   }
        // });

        return {
          ...user,
          // messages: userMessages,
          // @ts-expect-error fix
          self: user.userID === socket.userID,
          // hasNewMessages: false
        }
      })

      changedData.sort((a: any, b: any) => {
        if (a.self)
          return -1
        if (b.self)
          return 1
        if (a.username < b.username)
          return -1
        return a.username > b.username ? 1 : 0
      })

      setUsers(changedData)
    })

    socket.on('user connected', (user) => {
      const tt = users?.find(item => item.userID === user.userID)

      if (tt) {
        const te = users?.map((item) => {
          if (tt.userID === item.userID) {
            return {
              ...item,
              connected: true,
            }
          }
          return item
        })
        setUsers(te)
      }
      else {
        setUsers([...users, user])
      }
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username')
        setUsernameAlreadySelected(false)
    })

    socket.on('user disconnected', (id) => {
      const changedData = users.map((item) => {
        if (item.userID === id) {
          return {
            ...item,
            connected: false,
          }
        }
        return item
      })
      setUsers(changedData)
    })

    socket.on('disconnect', () => {
      const changedUsers = users.map((user: any) => {
        if (user.self) {
          return {
            ...user,
            connected: false,
          }
        }
        return user
      })
      setUsers(changedUsers)
    })

    return () => {
      socket.off('connect_error')
      socket.off('session')
      socket.off('users')
      socket.off('disconnect')
      socket.off('user disconnected')
      socket.off('user connected')
    }
  }, [socket, users])

  const onUsernameSelection = () => {
    setUsernameAlreadySelected(true)
    socket.auth = { username: nameInputValue }
    socket.connect()
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    // const currentUser = users.find(el => String(el?.userID) === newValue)
    // setSelectedUser(currentUser)
  }

  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
    >
      {
        usernameAlreadySelected
          ? (
            <>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ width: '25%', height: '100%', borderRight: 1, borderColor: 'divider' }}
              >
                {users.map(el => (
                  <Tab
                    value={`${el?.userID}`}
                    key={el?.userID}
                    label={(
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                        whiteSpace="nowrap"
                        color="black"
                      >
                        {el?.username}
                        {' '}
                        {el?.self ? '(свой)' : ''}
                        <Box component="div" width="8px" height="8px" bgcolor={el?.connected ? 'green' : 'red'} borderRadius="50%" />
                      </Box>
                    )}
                  />
                ))}
              </Tabs>

              <Box display="flex" flexDirection="column" justifyContent="space-between" p="10px">
                dwad
                {/* <Chat users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/> */}
              </Box>
            </>
            )
          : (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 3 }}
                  value={nameInputValue}
                  onChange={e => setNameInputValue(e.target.value)}
                />
                <Button variant="outlined" onClick={onUsernameSelection}>
                  send
                </Button>
              </CardContent>
            </Card>
            )
      }
    </Box>
  )
}
