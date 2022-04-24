import PostService from '../services/post';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Comment from '../components/Comment';
import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';
import CommentInput from '../components/CommentInput';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import TopBar from '../components/AppBar';
import AuthService from '../services/auth';
import './styles/homepage.scss';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  let navigate = useNavigate();
  const [state, setState] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [postId, setPostId] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const reload = () => {
    setRefresh(refresh + 1);
  };

  const open = (value) => {
    setOpenModal(value);
  };

  const handleClick = (e) => {
    console.log(e.target);
    setPostId(e.currentTarget.getAttribute('data-id'));
    setOpenModal(true);
  };

  useEffect(() => {
    if (!AuthService.getCurrentUser()) {
      navigate('/', { replace: true });
    }
    PostService.getAllPost().then((posts) => {
      setState(posts.data);
    });
  }, [refresh]);

  return (
    <>
      {TopBar("Fil d'actualité", reload)}
      <Container className='container' maxWidth='md'>
        <div className='postList'>
          {state
            .sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((post) => {
              return (
                <div key={'post' + post.id} className='card'>
                  {Post(post, reload)}
                  <IconButton
                    className='add-comment'
                    variant='contained'
                    data-id={post.id}
                    fontSize='small'
                    onClick={handleClick}
                  >
                    <AddCommentIcon />
                  </IconButton>
                  {Comment(post.Comments, reload)}
                </div>
              );
            })}
        </div>
        {CommentInput(postId, reload, openModal, open, openAlert, alertMessage)}
        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          message={alertMessage}
          onClose={() => {
            setOpenAlert(false);
          }}
        />
      </Container>
    </>
  );
}

export default HomePage;
