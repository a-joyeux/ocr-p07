import * as React from 'react';
import image from '../img/icon-left-font-monochrome-black.svg';
import './styles/Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
        <img className='footer-logo' src={image}></img>
      </div>
    );
  }
}

export default Footer;
