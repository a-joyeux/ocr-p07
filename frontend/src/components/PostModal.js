import * as React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import PostService from '../services/post';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useState } from 'react';

function PostModal(reload) {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [alert, setAlert] = useState('');
  const [trigger, setTrigger] = useState(0);

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const action = (
    <Button
      onClick={() => {
        reload();
        setOpenAlert(false);
      }}
      color='secondary'
      size='small'
    >
      Reload
    </Button>
  );

  return (
    <>
      <IconButton sx={{ color: 'white' }} onClick={handleClickOpen} aria-label='nouveau'>
        <AddCircleIcon />
      </IconButton>
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
                setAlert('Nouveaux messages');
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openAlert}
        message={alert}
        action={action}
      />
    </>
  );
}

export default PostModal;
