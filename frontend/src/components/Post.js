import * as React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import './styles/post.scss';
import AuthService from '../services/auth';
import PostService from '../services/post';

const isVisible = (isAdmin, isOwner) => {
  return isAdmin || isOwner == true ? 'inherit' : 'none';
};

function Post(post, posts, setPosts) {
  const deletePost = (e) => {
    const id = e.currentTarget.getAttribute('data-id');
    PostService.deletePost(id).then((res) => {
      setPosts(
        posts.filter((value, index, array) => {
          return value.id.toString() !== id;
        })
      );

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
          aria-label='delete'
          size='small'
        >
          <DeleteForeverIcon sx={{ color: 'white' }} data-id={post.id} fontSize='small' />
        </IconButton>
      </div>
      <div className='post-content'>{post.content}</div>
    </div>
  );
}

export default Post;
