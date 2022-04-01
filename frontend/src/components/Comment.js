import * as React from 'react';
import './styles/Comment.scss';

function Comment(comments) {
  return (
    <div className='comment-list'>
      <span className='comment-title'>Commentaires</span>
      {comments.map((comment) => {
        return (
          <div className='comment'>
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
              </span>
            </div>
            <div className='comment-content'>{comment.content}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
