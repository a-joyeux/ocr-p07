import * as React from 'react';
import logo from '../img/icon-above-font.svg';
import './styles/logo.scss';

class Logo extends React.Component {
  render() {
    return (
      <div className='logo'>
        <img className='logo-img' alt='logo' src={logo}></img>
      </div>
    );
  }
}

export default Logo;
