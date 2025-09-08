import React, { useState } from 'react';
import axios from 'axios';
import './From.css';
import { useNavigate, Link } from 'react-router-dom';
import { useFromContext } from '../../context/FromContext';
import previouss from '../../assets/previ.png';

export const From = () => {
  const navigate = useNavigate();
  const { addData } = useFromContext();

  // Estado único para todos los campos
  const [form, setForm] = useState({
    nombre_pc: '',
    marca_pc: '',
    modelo: '',
    serial: '',
    codigo_pc: '',
    tipo_almacenamiento: '',
    almacenamiento: '',
    memoria_ram: '',
    procesador: '',
    codigo_monitor: '',
    serial_monitor: '',
    marca_monitor: '',
    marca_mouse: '',
    codigo_mouse: '',
    marca_tecleado: '',
    codigo_tecleado: '',
    area_ubicacion: '',
    encargado: '',
    sede: '',
    observaciones: '',
    tipo_pc: '',
    ip: '',
    tb_gb: '',
  });

  const [message, setMessage] = useState('');

  // Cambio genérico de campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar campos obligatorios
    const requiredFields = [
      'nombre_pc', 'marca_pc', 'modelo', 'serial', 'codigo_pc', 
      'tipo_almacenamiento', 'almacenamiento', 'memoria_ram', 'procesador',
      'codigo_monitor', 'serial_monitor', 'marca_monitor', 'marca_mouse', 
      'codigo_mouse', 'marca_tecleado', 'codigo_tecleado', 'area_ubicacion',
      'encargado', 'sede', 'observaciones', 'tipo_pc', 'ip'
    ];

    const emptyFields = requiredFields.filter(field => !form[field]?.trim());
    if (emptyFields.length > 0) {
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Construir FormData
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key] || '');
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/from`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.status === 201) {
        addData(form);
        setMessage('Registro exitoso.');
        navigate('/home-152628282828');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(Array.isArray(err.response.data.message) 
          ? err.response.data.message.join(', ') 
          : err.response.data.message);
      } else {
        setMessage('Ocurrió un error al registrar la información.');
      }
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-content" onSubmit={handleSubmit}>
        <Link to="/home-152628282828" className="back-link">
          <img src={previouss} alt="Volver" className="back-icon" /> Volver
        </Link>
        <h1 className="form-title">Inventory - Software</h1>
        <p className="text">Formulario de especificaciones para registrar un nuevo producto:</p>

        <div className="form-scroll-container">
          <div className="form-grid">
            {Object.keys(form).map(key => (
              <div className={`form-group ${key === 'observaciones' ? 'observations' : ''}`} key={key}>
                <label>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
                {key === 'observaciones' 
                  ? <textarea name={key} value={form[key]} onChange={handleChange} />
                  : <input type="text" name={key} value={form[key]} onChange={handleChange} />}
              </div>
            ))}
          </div>
        </div>

        <div className="btn-container">
          <button type="submit" className="submit-btn">Registrar Información</button>
        </div>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};
