import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import CommentService from '../services/comment';
import Footer from '../components/Footer';
import './styles/addcommentpage.scss';
import SimpleBar from '../components/Bars/SimpleBar';

function AddCommentPage() {
  let navigate = useNavigate();
  const [content, setContent] = useState('');
  const [error, setError] = useState([]);
  const query = useLocation().search;
  const postId = new URLSearchParams(query).get('postId');
  var visibilityState = error.length > 0 ? 'visible' : 'hidden';

  return (
    <>
      {SimpleBar('Nouveau commentaire', postId)}
      <Container className='container' maxWidth='sm'>
        <Box className='add-comment-page'>
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
              CommentService.addComment(content, postId)
                .then((response) => {
                  navigate('/comment?postId=' + postId);
                })
                .catch((err) => {
                  setError(err.response.data.message);
                });
            }}
            disabled={content ? false : true}
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
      <Footer />
    </>
  );
}

export default AddCommentPage;
