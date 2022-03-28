import * as React from 'react';
import './styles/post.scss';

function Post(post) {
  console.log(post);
  return (
    <div className='post'>
      <div className='post-header'>{post.author}</div>
      <div className='post-content'>{post.content}</div>
    </div>
  );
}

export default Post;
