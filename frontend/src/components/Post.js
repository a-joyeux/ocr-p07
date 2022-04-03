import * as React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import './styles/post.scss';
import AuthService from '../services/auth';

const isVisible = (isAdmin) => {
  console.log(isAdmin);
  return isAdmin == true ? 'inherit' : 'none';
};

function Post(post) {
  return (
    <div className='post'>
      <div className='post-header'>
        <div className='post-infos'>
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
        <IconButton sx={{ display: isVisible(AuthService.isAdmin()) }} color='error' aria-label='delete'>
          <RemoveCircleOutlineIcon fontSize='small' />
        </IconButton>
      </div>
      <div className='post-content'>{post.content}</div>
    </div>
  );
}

export default Post;
