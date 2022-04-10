import * as React from 'react';
import './styles/Comment.scss';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import AuthService from '../services/auth';
import CommentService from '../services/comment';

const isVisible = (isAdmin, isOwner) => {
  return isAdmin || isOwner == true ? 'inline' : 'none';
};

function Comment(comments, reload) {
  const deleteComment = (e) => {
    const id = e.target.getAttribute('data-id');

    CommentService.deleteComment(id).then((res) => {
      reload();
      return JSON.stringify(res);
    });
  };

  if (comments.length > 0) {
    return (
      <div className='comment-list'>
        <span className='comment-title'>Commentaires</span>
        {comments.map((comment) => {
          return (
            <div key={'comment' + comment.id} data-id={comment.id} className='comment'>
              <div className='comment-header'>
                <span className='author'>{comment.User.firstName + ' ' + comment.User.lastName}</span>
                <span className='date'>
                  {new Date(comment.createdAt).toLocaleDateString(navigator.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  <IconButton
                    data-id={comment.id}
                    sx={{ display: isVisible(AuthService.isAdmin(), AuthService.isOwner(comment.author)) }}
                    color='error'
                    aria-label='delete'
                    onClick={deleteComment}
                  >
                    <RemoveCircleOutlineIcon data-id={comment.id} sx={{ fontSize: 14 }} />
                  </IconButton>
                </span>
              </div>
              <div className='comment-content'>{comment.content}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Comment;
