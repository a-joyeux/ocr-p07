import * as React from 'react';
import Container from '@mui/material/Container';
import Logo from '../components/Logo';
import FormLogin from '../components/FormLogin';

import './styles/loginpage.scss';

function LoginPage() {
  return (
    <Container className='container' maxWidth='sm'>
      <Logo />
      <FormLogin />
    </Container>
  );
}

export default LoginPage;
