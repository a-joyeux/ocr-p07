import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function SimpleBar(title) {
  let navigate = useNavigate();

  const handleClickOpen = () => {
    navigate(-1);
  };
  return (
    <Box>
      <AppBar position='static' sx={{ background: '#091F43' }}>
        <Toolbar>
          <IconButton
            onClick={handleClickOpen}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <>{title}</>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
