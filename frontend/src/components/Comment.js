import * as React from 'react';
import './styles/Comment.scss';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import AuthService from '../services/auth';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CommentService from '../services/comment';

const isVisible = (isAdmin, isOwner) => {
  return isAdmin || isOwner == true ? 'inline' : 'none';
};

function Comment(postId) {
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const reload = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    CommentService.getComment(postId).then((res) => {
      setComments(res.data);
    });
  }, [refresh]);

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
        {comments
          .sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
          .map((comment) => {
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
  } else {
    return <span>Aucun commentaire</span>;
  }
}

export default Comment;
