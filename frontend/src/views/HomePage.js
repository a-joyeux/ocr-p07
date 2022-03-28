import PostService from '../services/post';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import './styles/homepage.scss';

function HomePage() {
  const [state, setState] = useState([]);
  useEffect(() => {
    PostService.getAllPost().then((posts) => {
      setState(posts.data);
    });
  }, []);
  return (
    <div className='postList'>
      {state.map((post) => {
        return <>{Post(post)}</>;
      })}
    </div>
  );
}

export default HomePage;
