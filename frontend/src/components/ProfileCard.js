import * as React from 'react';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/ProfileCard.scss';

const handleClick = () => {
  console.info('You clicked the delete icon.');
};

function ProfileCard(user) {
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
        <Chip className='profile-btn-delete' label='Supprimer le compte' onClick={handleClick} icon={<DeleteIcon />} />
      </div>
    </>
  );
}

export default ProfileCard;
