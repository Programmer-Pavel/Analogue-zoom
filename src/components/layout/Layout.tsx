import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import Box from '@mui/material/Box';


export const Layout = () => {
  return (
    <Box height='100%'>
      <Header/>
      <Box height='calc(100% - 84px)' p='10px'>
        <Outlet/>
      </Box>
    </Box>
  );
}
