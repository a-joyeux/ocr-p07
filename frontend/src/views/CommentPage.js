import * as React from 'react';
import Container from '@mui/material/Container';
import CommentBar from '../components/Bars/CommentBar';
import Comment from '../components/Comment';
import { useLocation } from 'react-router-dom';

function CommentPage() {
  const query = useLocation().search;
  const postId = new URLSearchParams(query).get('postId');
  return (
    <>
      {CommentBar('Commentaires', postId)}
      <Container className='container' maxWidth='sm'>
        {Comment(postId)}
      </Container>
    </>
  );
}

export default CommentPage;
