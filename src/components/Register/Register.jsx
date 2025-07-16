// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
// import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useFromContext } from '../../context/FromContext';

export const Register = () => {
  // const { setUser } = useUser();
  const navigate = useNavigate();
  const {addUsers} = useFromContext();
  const [nombre, setName] = useState('');
  const [apellido, setSurname] = useState('');
  const [correo, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');
  const [codigo, setCode] = useState('');
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
    if (!codigo) {
      setMessage('El código ingresado es incorrecto.');
      return;
    }

    const formDatas = new FormData();
    formDatas.append('nombre', nombre);
    formDatas.append('apellido', apellido);
    

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        nombre,
        apellido,
        correo,
        contraseña,
        codigo,
      }, {withCredentials: true});

      if (response.status === 201) {
        navigate('/');
        const newUser= {
          nombre,
          apellido,
        }
        addUsers(newUser)
      }
      setMessage(response.data.message); // Mostrar mensaje de éxito
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error al registrar el usuario.');
      }
    }
  };

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
      <h1 className='h1-sesion'>Inventory.Soft</h1>

        <div className='name'>
          <p>Nombre</p>
          <input type="text" value={nombre} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='apelli'>
          <p>Apellido</p>
          <input type="text" value={apellido} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div className='Email'>
          <p>Correo</p>
          <input type="text" value={correo} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='pass'>
          <p>Contraseña</p>
          <input type="password" value={contraseña} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='clave'>
          <p>Código</p>
          <input type="text" value={codigo} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className='create'>
          <button className='btns-creation' type="submit">Crear Cuenta</button>
        </div>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};
