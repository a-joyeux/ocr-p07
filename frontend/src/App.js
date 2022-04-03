import * as React from 'react';
import Container from '@mui/material/Container';
import Logo from './components/Logo';
import FormSignUp from './components/FormLogin';
import AuthService from './services/auth';
import './app.scss';

function App() {
  if (AuthService.getCurrentUser()) {
    return (
      <Container className='container' maxWidth='sm'>
        <Logo />
        <FormSignUp />
      </Container>
    );
  }
}

export default App;
