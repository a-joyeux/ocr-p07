import * as React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import PostModal from './PostModal';

import './styles/HomeHeader.scss';

function HomeHeader() {
  return (
    <div className='home-header'>
      <h2>Fil d'actualité</h2>
      <div>{PostModal()}</div>
    </div>
  );
}

export default HomeHeader;
