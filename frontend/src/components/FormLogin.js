import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth';
import './styles/FormLogin.scss';

function FormLogin() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  var visibilityState = error.length > 0 ? 'visible' : 'hidden';
  return (
    <React.Fragment>
      <Box className='formLogin'>
        <TextField
          id='email'
          size='small'
          label='Email'
          margin='normal'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          variant='outlined'
        />
        <TextField
          id='password'
          size='small'
          type='password'
          label='Mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockIcon />
              </InputAdornment>
            ),
          }}
          variant='outlined'
        />
        <Button
          onClick={(event) => {
            event.preventDefault();
            AuthService.login(email, password)
              .then((response) => {
                navigate('/home', { replace: true });
              })
              .catch((err) => {
                console.log(err);
                setError(err.toString());
              });
          }}
          disabled={email && password ? false : true}
          type='submit'
          sx={{ mt: '20px' }}
          variant='contained'
          endIcon={<SendIcon />}
        >
          Login
        </Button>
        <p>
          <Link style={{ textDecoration: 'none' }} to='/signup'>
            Pas encore de compte ?
          </Link>
        </p>
        <Alert style={{ visibility: visibilityState }} severity='error'>
          {error}
        </Alert>
        ;
      </Box>
    </React.Fragment>
  );
}

export default FormLogin;
