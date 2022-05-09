import * as React from 'react';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/ProfileCard.scss';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';

function ProfileCard(user) {
  let navigate = useNavigate();
  return (
    <>
      <div className='profile-card'>
        <span>
          <b>Nom</b> : {user.lastName}
        </span>
        <span>
          <b>Prénom</b> : {user.firstName}
        </span>
        <span>
          <b>Rôle</b> : {user.role}
        </span>
        <span>
          <b>Date d'inscription</b> :{' '}
          {new Date(user.createdAt).toLocaleDateString(navigator.language, {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <Chip
          className='profile-btn-delete'
          label='Supprimer le compte'
          onClick={() => {
            AuthService.deleteUser(AuthService.getCurrentUser().id);
            AuthService.logout();
            navigate('/', { replace: true });
          }}
          icon={<DeleteIcon />}
        />
      </div>
    </>
  );
}

export default ProfileCard;
