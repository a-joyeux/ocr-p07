import PostService from '../services/post';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Container from '@mui/material/Container';
import PostModal from '../components/PostModal';
import TopBar from '../components/AppBar';
import AuthService from '../services/auth';
import './styles/homepage.scss';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  let navigate = useNavigate();
  const [state, setState] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const reload = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    if (!AuthService.getCurrentUser()) {
      navigate('/', { replace: true });
    }
    PostService.getAllPost().then((posts) => {
      setState(posts.data);
    });
  }, [refresh]);

  return (
    <>
      {TopBar("Fil d'actualité", reload)}
      <Container className='container' maxWidth='md'>
        <div className='postList'>
          {state
            .sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((post) => {
              return (
                <div key={'post' + post.id} className='card'>
                  {Post(post, reload)}
                  {Comment(post.Comments, reload)}
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
}

export default HomePage;
