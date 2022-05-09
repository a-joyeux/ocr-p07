import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import SignUpPage from './views/SignUpPage';
import CommentPage from './views/CommentPage';
import AddCommentPage from './views/AddCommentPage';
import AddPostPage from './views/AddPostPage';
import Footer from './components/Footer';
import ProfilePage from './views/ProfilePage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/comment' element={<CommentPage />} />
        <Route path='/comment/new' element={<AddCommentPage />} />
        <Route path='/post/new' element={<AddPostPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
