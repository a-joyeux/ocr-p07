import * as React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import PostService from '../services/post';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

function PostModal() {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [alert, setAlert] = useState('');

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} className='button' variant='outlined' size='small' startIcon={<AddBoxIcon />}>
        Nouveau
      </Button>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Nouvelle publication</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            margin='normal'
            autoFocus
            id='title'
            label='Titre'
            type=''
            fullWidth
            variant='outlined'
            autoComplete='off'
          />
          <TextField
            onChange={(e) => setContent(e.target.value)}
            value={content}
            margin='normal'
            multiline
            rows={4}
            id='content'
            label='Message'
            type=''
            fullWidth
            variant='outlined'
            autoComplete='off'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            onClick={(event) => {
              PostService.createPost(title, content).then((res) => {
                setAlert(res.data.message);
                setOpenAlert(true);
                setOpenModal(false);
              });
            }}
            disabled={title && content ? false : true}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={2000} message={alert} onClose={() => setOpenAlert(false)} />
    </>
  );
}

export default PostModal;
