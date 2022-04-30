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
  const size = 1;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [post, setPost] = useState([]);
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
    PostService.getAllPost(size, page).then((res) => {
      setPost([...post, ...res.data.posts]);
      setTotalPages(res.data.totalPages);
    });
  }, [refresh, page]);

  return (
    <>
      {TopBar("Fil d'actualité")}
      <Container className='container' maxWidth='md'>
        <div className='postList'>
          {post
            .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
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
          {totalPages !== page && <button onClick={() => setPage(page + 1)}>{'Load More'}</button>}
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
