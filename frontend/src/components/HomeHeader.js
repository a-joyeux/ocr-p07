import * as React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import './styles/HomeHeader.scss';

function HomeHeader() {
  let navigate = useNavigate();
  return (
    <div className='home-header'>
      <h2>Fil d'actualité</h2>
      <Button
        onClick={(event) => {
          navigate('/post', { replace: true });
        }}
        className='button'
        variant='outlined'
        size='small'
        startIcon={<AddBoxIcon />}
      >
        Nouveau
      </Button>
    </div>
  );
}

export default HomeHeader;
