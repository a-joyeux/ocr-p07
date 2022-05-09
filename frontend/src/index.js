import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import React, { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./views/HomePage'));
const LoginPage = lazy(() => import('./views/LoginPage'));
const SignUpPage = lazy(() => import('./views/SignUpPage'));
const AddCommentPage = lazy(() => import('./views/AddCommentPage'));
const AddPostPage = lazy(() => import('./views/AddPostPage'));
const CommentPage = lazy(() => import('./views/CommentPage'));
const ProfilePage = lazy(() => import('./views/ProfilePage'));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className='overlay'>
            <CircularProgress className='loader'></CircularProgress>
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/comment' element={<CommentPage />} />
          <Route path='/comment/new' element={<AddCommentPage />} />
          <Route path='/post/new' element={<AddPostPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
