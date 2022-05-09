import * as React from 'react';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import AuthService from '../services/auth';
import SimpleBar from '../components/Bars/SimpleBar';
import ProfileCard from '../components/ProfileCard';

function ProfilePage() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.getCurrentUser()) {
      navigate('/', { replace: true });
    }
  });

  return (
    <>
      {SimpleBar('Profile')}
      <Container className='container' maxWidth='sm'>
        {ProfileCard(AuthService.getCurrentUser())}
      </Container>
      <Footer />
    </>
  );
}

export default ProfilePage;
