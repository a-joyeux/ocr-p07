import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import PostService from '../services/post';
import './styles/NewPostPage.scss';

function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('');

  return (
    <Container className='container' maxWidth='sm'>
      <div className='newPost-header'>
        <h2>Nouvelle publication</h2>
      </div>
      <Box className='formPost'>
        <TextField
          fullWidth
          id='title'
          size='small'
          label='Titre'
          margin='normal'
          type=''
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant='outlined'
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          id='content'
          size='small'
          label='Message'
          margin='normal'
          type=''
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant='outlined'
        />
        <Button
          onClick={(event) => {
            PostService.createPost(title, content).then((res) => {
              setAlert(res.data.message);
              setOpen(true);
            });
          }}
          disabled={title && content ? false : true}
          type='submit'
          sx={{ mt: '20px' }}
          variant='contained'
        >
          Valider
        </Button>
        <Snackbar open={open} autoHideDuration={2000} message={alert} onClose={() => setOpen(false)} />
      </Box>
    </Container>
  );
}

export default NewPostPage;
