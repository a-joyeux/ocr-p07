import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AuthService from '../../services/auth';

export default function TopBar(title, reload) {
  let navigate = useNavigate();

  const disconnect = () => {
    AuthService.logout();
    navigate('/', { replace: true });
  };

  const goToAddPost = () => {
    navigate('/post/new');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ background: '#091F43' }}>
        <Toolbar>
          <IconButton onClick={disconnect} size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <LogoutIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <>{title}</>
          </Typography>
          <IconButton sx={{ color: 'white' }} onClick={goToAddPost} aria-label='nouveau'>
            <AddCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
