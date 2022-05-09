import PostService from '../services/post';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import Post from '../components/Post';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import TopBar from '../components/Bars/AppBar';
import AuthService from '../services/auth';
import ForumIcon from '@mui/icons-material/Forum';
import './styles/homepage.scss';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  let navigate = useNavigate();
  const size = 2;
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [postId, setPostId] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const reload = () => {
    setRefresh(refresh + 1);
    setPosts([]);
    setPage(0);
  };

  const open = (value) => {
    setOpenModal(value);
  };

  const handleClick = (e) => {
    const id = e.currentTarget.getAttribute('data-id');
    navigate('/comment?postId=' + id);
  };

  useEffect(() => {
    if (!AuthService.getCurrentUser()) {
      navigate('/', { replace: true });
    }
    PostService.getAllPost(size, page).then((res) => {
      setPosts([...posts, ...res.data.posts]);
      setTotalPages(res.data.totalPages);
    });
  }, [refresh, page]);

  return (
    <>
      {TopBar("Fil d'actualité", reload)}

      <Container className='container' maxWidth='md'>
        <div className='postList'>
          {posts
            .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
            .map((post) => {
              return (
                <div key={'post' + post.id} className='card'>
                  {Post(post, posts, setPosts)}
                  <IconButton
                    className='add-comment'
                    variant='contained'
                    data-id={post.id}
                    fontSize='small'
                    onClick={handleClick}
                  >
                    <ForumIcon />
                  </IconButton>
                </div>
              );
            })}
          {totalPages !== page && (
            <Button
              sx={{ width: 'fit-content', alignSelf: 'center' }}
              variant='contained'
              size='small'
              onClick={() => setPage(page + 1)}
            >
              Voir plus
            </Button>
          )}
        </div>

        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          message={alertMessage}
          onClose={() => {
            setOpenAlert(false);
          }}
        />
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
