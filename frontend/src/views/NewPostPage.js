import PostService from '../services/post';
import * as React from 'react';
import { useState } from 'react';
import Post from '../components/Post';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import './styles/NewPostPage.scss';

function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
          onClick={(event) => {}}
          disabled={title && content ? false : true}
          type='submit'
          sx={{ mt: '20px' }}
          variant='contained'
        >
          Valider
        </Button>
      </Box>
    </Container>
  );
}

export default NewPostPage;
