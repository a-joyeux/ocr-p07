import * as React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import './styles/post.scss';
import AuthService from '../services/auth';
import PostService from '../services/post';
import { useState } from 'react';

const isVisible = (isAdmin, isOwner) => {
  return isAdmin || isOwner == true ? 'inherit' : 'none';
};

function Post(post, reload) {
  const deletePost = (e) => {
    const id = e.target.getAttribute('data-id');

    PostService.deletePost(id).then((res) => {
      reload();
      return JSON.stringify(res);
    });
  };

  return (
    <div data-id={post.id} className='post'>
      <div className='post-header'>
        <div className='post-infos'>
          <span className='title'>{post.title}</span>
          <span className='meta-data'>
            <span className='author'>{post.User.firstName + ' ' + post.User.lastName}</span>
            <> @ </>
            {new Date(post.createdAt).toLocaleDateString(navigator.language, {
              hour: 'numeric',
              minute: 'numeric',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <IconButton
          data-id={post.id}
          onClick={deletePost}
          sx={{ display: isVisible(AuthService.isAdmin(), AuthService.isOwner(post.author)) }}
          color='error'
          aria-label='delete'
        >
          <RemoveCircleOutlineIcon data-id={post.id} fontSize='small' />
        </IconButton>
      </div>
      <div className='post-content'>{post.content}</div>
    </div>
  );
}

export default Post;
