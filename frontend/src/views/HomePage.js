import PostService from '../services/post';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Comment from '../components/Comment';
import HomeHeader from '../components/HomeHeader';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
        {state
          .sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .map((post) => {
            return (
              <div className='card'>
                {Post(post)}
                {Comment(post.Comments)}
              </div>
            );
          })}
      </div>
    </Container>
  );
}

export default HomePage;
