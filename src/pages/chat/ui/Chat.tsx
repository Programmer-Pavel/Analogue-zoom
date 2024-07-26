import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import { Tab } from '@mui/material'
import { useAuth } from '@entities/session'
import { useGetUsers } from '@entities/users'
import { useSocketIo } from '@shared/hooks'
import { Messages } from '@widgets/messages'

export function Chat() {
  const [value, setValue] = useState<number | boolean>(false)
  const [choosedUserId, setChoosedUserId] = useState<number | null>(null)

  const { socketConnection } = useSocketIo()
  const { infoFromToken } = useAuth()
  const { users } = useGetUsers()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const onChooseUser = (userId: number) => {
    setChoosedUserId(userId)
    socketConnection?.emit('getCurrentUserMessages', userId)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: '100%',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {users.length
          ? users?.map((el: any) => (
            <Tab
              key={el.id}
              value={el.id}
              label={(
                <div>
                  {infoFromToken.userId === el.id
                    ? `${el.username} (MY)`
                    : el.username}
                </div>
              )}
              onClick={() => onChooseUser(el.id)}
            />
          ))
          : 'Нет пользователей'}
      </Tabs>
      {choosedUserId
        ? (
          <Box width="90%" p="5px">
            <Messages choosedUserId={choosedUserId} />
          </Box>
          )
        : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="90%"
            p="5px"
          >
            Select a chat to start messaging
          </Box>
          )}
    </Box>
  )
}
