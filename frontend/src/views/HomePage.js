import PostService from '../services/post';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Container from '@mui/material/Container';
import PostModal from '../components/PostModal';
import './styles/homepage.scss';

function HomePage() {
  const [state, setState] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const reload = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    PostService.getAllPost().then((posts) => {
      setState(posts.data);
    });
  }, [refresh]);

  return (
    <Container className='container' maxWidth='sm'>
      <div className='home-header'>
        <h2>Fil d'actualité</h2>
        <div>{PostModal(reload)}</div>
      </div>
      <div className='postList'>
        {state
          .sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .map((post) => {
            return (
              <div key={post.id} className='card'>
                {Post(post, reload)}
                {Comment(post.Comments)}
              </div>
            );
          })}
      </div>
    </Container>
  );
}

export default HomePage;
