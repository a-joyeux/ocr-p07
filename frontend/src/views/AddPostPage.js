import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import AddCommentBar from '../components/Bars/AddCommentBar';
import PostService from '../services/post';
import './styles/addpostpage.scss';

function AddPostPage() {
  let navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState([]);
  var visibilityState = error.length > 0 ? 'visible' : 'hidden';

  return (
    <>
      {AddCommentBar('Nouveau post')}
      <Container className='container' maxWidth='sm'>
        <Box className='add-post-page'>
          <TextField
            id='title'
            size='small'
            label='Titre du post'
            margin='normal'
            type='message'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant='outlined'
          />
          <TextField
            id='content'
            size='small'
            label='Message'
            margin='normal'
            type='message'
            value={content}
            rows={5}
            onChange={(e) => setContent(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant='outlined'
            multiline
          />
          <Button
            onClick={(event) => {
              event.preventDefault();
              PostService.createPost(title, content)
                .then((response) => {
                  navigate('/home');
                })
                .catch((err) => {
                  setError(err.response.data.message);
                });
            }}
            disabled={content && title ? false : true}
            type='submit'
            sx={{ mt: '20px' }}
            variant='contained'
            endIcon={<SendIcon />}
          >
            Valider
          </Button>

          <Alert style={{ visibility: visibilityState }} severity='error'>
            {error}
          </Alert>
        </Box>
      </Container>
    </>
  );
}

export default AddPostPage;
