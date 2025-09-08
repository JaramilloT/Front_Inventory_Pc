import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sesion.css';
import log from '../../assets/logo-blanco.png';
import axios from 'axios';

export const Sesion = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!correo || !contraseña) {
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (!correo.includes('@gmail.com')) {
      setMessage('Por favor, ingrese un correo válido que contenga "@gmail.com"');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          correo,
          contraseña,
        },
        {
          withCredentials: true, 
        }
      );
      
      if (response.status === 201) {
        // Guardamos el estado de sesión
        localStorage.setItem('isAuthenticated', 'true');
        setMessage('Inicio de sesión exitoso');
        navigate('/home-152628282828');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <div className="session">
      <form onSubmit={handleSubmit}>
        <h1 className="h1-sesion">Inventory - Software</h1>

        <div className="logo-sesion">
          <img className="log" src={log} alt="Logo de la aplicación" />
        </div>

        <div className="cp">
          <div className="email">
            <label className="ep" htmlFor="correo">Correo</label>
            <input
              className="input"
              type="email"
              id="correo"
              placeholder="example@gmail.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="password">
            <label className="ep" htmlFor="contraseña">Contraseña</label>
            <input
              className="input"
              type="password"
              id="contraseña"
              placeholder="*********"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button className="ci" type="submit">Iniciar Sesión</button>
            <Link to="/register">
              <button className="ci" type="button">Crear Cuenta</button>
            </Link>
          </div>
        </div>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};
