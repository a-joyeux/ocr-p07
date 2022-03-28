import PostService from '../services/post';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import './styles/homepage.scss';
import icon from '../img/icon-left-font.svg';

function HomePage() {
  const [state, setState] = useState([]);
  useEffect(() => {
    PostService.getAllPost().then((posts) => {
      setState(posts.data);
    });
  }, []);
  return (
    <React.Fragment>
      <h2>Posts</h2>
      <div className='postList'>
        {state.map((post) => {
          return <>{Post(post)}</>;
        })}
        <img className='icon' src={icon}></img>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
