import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthService from '../services/auth';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import './styles/FormSignUp.scss';

function formSignUp() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  var visibilityState = error.length > 0 ? 'visible' : 'hidden';
  return (
    <React.Fragment>
      <Box className='formSignUp'>
        <TextField
          id='firstName'
          size='small'
          label='Prénom'
          margin='normal'
          type='firstname'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          InputLabelProps={{ shrink: true }}
          variant='outlined'
        />
        <TextField
          id='lastName'
          size='small'
          label='Nom'
          margin='normal'
          type='lastname'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          variant='outlined'
          InputLabelProps={{ shrink: true }}
        />
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
            AuthService.register(firstName, lastName, email, password)
              .then((response) => {
                navigate('/', { replace: true });
              })
              .catch((err) => {
                setError(err.response.data.message);
              });
          }}
          disabled={firstName && lastName && email && password ? false : true}
          type='submit'
          sx={{ mt: '20px' }}
          variant='contained'
          endIcon={<HowToRegIcon />}
        >
          Créer votre compte
        </Button>

        <Alert style={{ visibility: visibilityState }} severity='error'>
          {error}
        </Alert>
      </Box>
    </React.Fragment>
  );
}

export default formSignUp;
