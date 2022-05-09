import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation } from 'react-router-dom';

export default function CommentBar(title) {
  let navigate = useNavigate();
  const query = useLocation().search;
  const postId = new URLSearchParams(query).get('postId');
  const goBack = () => {
    navigate('/home');
  };

  const goToAddComment = () => {
    navigate('/comment/new?postId=' + postId);
  };
  return (
    <Box>
      <AppBar position='static' sx={{ background: '#091F43' }}>
        <Toolbar>
          <IconButton onClick={goBack} size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <>{title}</>
          </Typography>
          <IconButton sx={{ color: 'white' }} onClick={goToAddComment} aria-label='nouveau'>
            <AddCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
