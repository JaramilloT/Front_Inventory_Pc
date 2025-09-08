import React from 'react';
import './Footer.css';
import logo_b from '../../assets/logo-blanco.png';
import facebook from '../../assets/facebook.png'; // <- imagen, no URL
import instagram from '../../assets/instagram.png';

export const Footer = () => {
  return (
    <div className='Footer'>
      <div className='footer'>
        <img className='img-f' src={logo_b} alt="logo" />

        <div className='direction'>
          <p>Dirección: Carrera 24 No. 39-54, Calarcá, Quindío</p>
          <br />
          <p>Dirección: Carrera 16 No. 44-210 barrio los Tanques, Calarcá</p>
          <br />
          <p>Email: contactenos@emca-calarca-quindio.gov.co</p>
        </div>

        <div className='icons'>
          <a href="https://www.facebook.com/emcaesp" target="_blank" rel="noopener noreferrer">
            <img className='icon' src={facebook} alt="facebook" />
          </a>
          <a href="https://www.instagram.com/emcaesp/" target="_blank" rel="noopener noreferrer">
            <img className='icon' src={instagram} alt="instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};
