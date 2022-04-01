import PostService from '../services/post';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import HomeHeader from '../components/HomeHeader';
import Container from '@mui/material/Container';
import './styles/homepage.scss';

function HomePage() {
  const [state, setState] = useState([]);
  useEffect(() => {
    PostService.getAllPost().then((posts) => {
      setState(posts.data);
    });
  }, []);
  return (
    <Container className='container' maxWidth='sm'>
      <HomeHeader></HomeHeader>
      <div className='postList'>
        {state.map((post) => {
          return <>{Post(post)}</>;
        })}
      </div>
    </Container>
  );
}

export default HomePage;
