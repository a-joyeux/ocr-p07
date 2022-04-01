import * as React from 'react';
import './styles/post.scss';

function Post(post) {
  return (
    <div className='post'>
      <div className='post-header'>
        <span className='author'>{post.User.firstName + ' ' + post.User.lastName}</span>
        <span className='date'>
          {new Date(post.createdAt).toLocaleDateString(navigator.language, {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <div className='post-content'>{post.content}</div>
    </div>
  );
}

export default Post;
