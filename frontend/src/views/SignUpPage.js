import * as React from 'react';
import Container from '@mui/material/Container';
import Logo from '../components/Logo';
import FormSignUp from '../components/FormSignUp';

function SignUpPage() {
  return (
    <Container className='container' maxWidth='sm'>
      <Logo />
      <FormSignUp />
    </Container>
  );
}

export default SignUpPage;
