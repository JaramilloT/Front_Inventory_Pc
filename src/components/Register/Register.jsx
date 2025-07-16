// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useFromContext } from '../../context/FromContext';

export const Register = () => {
  const navigate = useNavigate();
  const { addUsers } = useFromContext();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [codigo, setCodigo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !correo || !contraseña || !codigo) {
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (!correo.includes('@gmail.com')) {
      setMessage('Por favor, ingrese un correo válido que contenga "@gmail.com"');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        nombre,
        apellido,
        correo,
        contraseña,
        codigo,
      }, { withCredentials: true });

      if (response.status === 201) {
        addUsers({ nombre, apellido });
        navigate('/');
      }

      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error al registrar el usuario.');
      }
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1 className="h1-sesion">Crear Cuenta</h1>

        <div className="cp">
          <div className="email">
            <label className="ep">Nombre</label>
            <input className="input" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div className="email">
            <label className="ep">Apellido</label>
            <input className="input" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>

          <div className="email">
            <label className="ep">Correo electrónico</label>
            <input className="input" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>

          <div className="password">
            <label className="ep">Contraseña</label>
            <input className="input" type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
          </div>

          <div className="password">
            <label className="ep">Código</label>
            <input className="input" type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
          </div>

          <div className="btn-group">
            <button className="ci" type="submit">Registrarse</button>
          </div>
        </div>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};
