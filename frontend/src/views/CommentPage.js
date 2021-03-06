import * as React from 'react';
import Container from '@mui/material/Container';
import CommentBar from '../components/Bars/CommentBar';
import Comment from '../components/Comment';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

import AuthService from '../services/auth';

function CommentPage() {
  let navigate = useNavigate();
  const query = useLocation().search;
  const postId = new URLSearchParams(query).get('postId');

  useEffect(() => {
    if (!AuthService.getCurrentUser()) {
      navigate('/', { replace: true });
    }
  });

  return (
    <>
      {CommentBar('Commentaires', postId)}
      <Container className='container' maxWidth='sm'>
        {Comment(postId)}
      </Container>
      <Footer />
    </>
  );
}

export default CommentPage;
