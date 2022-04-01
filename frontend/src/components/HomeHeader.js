import * as React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import './styles/HomeHeader.scss';

function HomeHeader() {
  return (
    <div className='home-header'>
      <h2>Fil d'actualité</h2>
      <Button className='button' variant='outlined' size='small' startIcon={<AddBoxIcon />}>
        Nouveau
      </Button>
    </div>
  );
}

export default HomeHeader;
