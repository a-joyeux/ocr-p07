import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PostModal from '../components/PostModal';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth';

export default function TopBar(title, reload) {
  let navigate = useNavigate();

  const handleClickOpen = () => {
    AuthService.logout();
    navigate('/', { replace: true });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            onClick={handleClickOpen}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <LogoutIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <>{title}</>
          </Typography>
          {PostModal(reload)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
