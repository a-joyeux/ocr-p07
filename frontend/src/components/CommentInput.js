import * as React from 'react';
import './styles/CommentInput.scss';
import TextField from '@mui/material/TextField';
import CommentService from '../services/comment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

function CommentInput(postId, reload, openStatus, openAction, openAlert, alertMessage) {
  const [content, setContent] = useState('');
  const handleClose = () => {
    openAction(false);
  };
  return (
    <>
      <Dialog maxWidth='md' fullWidth={true} open={openStatus} onClose={handleClose}>
        <DialogTitle>Nouveau commentaire</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setContent(e.target.value)}
            value={content}
            margin='normal'
            autoFocus
            id='content'
            label='Message'
            type=''
            fullWidth
            variant='outlined'
            autoComplete='off'
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            onClick={(event) => {
              CommentService.addComment(content, postId).then((res) => {
                alertMessage = res.data.message;
                openAlert = true;
                openAction(false);
                setContent('');
                reload();
              });
            }}
            disabled={content ? false : true}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CommentInput;
