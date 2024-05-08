import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { Messages } from './Messages';
import { Tab } from '@mui/material';
import { useSocketIo } from '../../hooks/useSocketIo';
import { useAuth } from '../../hooks/useAuth';

export const Chat = () => {
  const [value, setValue] = useState<number | boolean>(false);
  const [users, setUsers] = useState([])
  const [choosedUserId, setChoosedUserId] = useState<number | null>(null);

  const { socketConnection, isConnected }  = useSocketIo()
  const { infoFromToken } = useAuth()

  useEffect(() => {
      if(isConnected) {
        socketConnection?.emit("getUsers");

        //@ts-expect-error fix
        function onGetUsers(usersFromServer: any) {
            if(infoFromToken) {
               const usersWithoutCurrentUser = usersFromServer.filter((el: any) => el.id !== infoFromToken.userId);
               setUsers(usersWithoutCurrentUser);
            }
        }
  
        socketConnection?.on('users', onGetUsers);

        return () => {
          socketConnection?.off('users', onGetUsers);
        };
      }
  }, [isConnected])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onChooseUser = (userId: number) => {
    setChoosedUserId(userId)
    socketConnection?.emit("getCurrentUserMessages", userId);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {
          users?.map((el: any) => (
            <Tab 
              key={el.id} 
              value={el.id} 
              label={<div>{ infoFromToken.userId === el.id ? `${el.username} (MY)` : el.username}</div> } 
              onClick={() => onChooseUser(el.id)}
            />
          ))
        }
      </Tabs>
      {
        choosedUserId 
        ? <Box width='90%' p='5px'>
          <Messages choosedUserId={choosedUserId}/>
        </Box> 
        : <Box
            display="flex"
            alignItems='center'
            justifyContent='center'
            width='90%'
            p='5px'
          >
            Select a chat to start messaging
        </Box>
      }
    </Box>
  );
}
