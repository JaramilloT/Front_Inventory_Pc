import React, { useState } from 'react';
import axios from 'axios';
import './From.css';
import { useNavigate, Link } from 'react-router-dom';
import { useFromContext } from '../../context/FromContext';
import previouss from '../../assets/previ.png';

export const From = () => {
  const navigate = useNavigate();
  const { addData } = useFromContext();

  // Estados para cada campo del formulario
  const [nombrePc, setNombrePc] = useState('');
  const [marcaPc, setMarcaPc] = useState('');
  const [modelo, setModelo] = useState('');
  const [serial, setSerial] = useState('');
  const [codigoPc, setCodigoPc] = useState('');
  const [codigoMonitor, setCodigoMonitor] = useState('');
  const [serialMonitor, setSerialMonitor] = useState('');
  const [marcaMonitor, setMarcaMonitor] = useState('');
  const [marcaMouse, setMarcaMouse] = useState('');
  const [codigoMouse, setCodigoMouse] = useState('');
  const [marcaTeclado, setMarcaTeclado] = useState('');
  const [codigoTeclado, setCodigoTeclado] = useState('');
  const [areaUbicacion, setAreaUbicacion] = useState('');
  const [encargado, setEncargado] = useState('');
  const [sede, setSede] = useState('')
  const [observaciones, setObservaciones] = useState('');
  const [tipoPc, setTipoPc] = useState('');
  const [tipoAlmacenamiento, setTipoAlmacenamiento] = useState('');
  const [almacenamiento, setAlmacenamiento] = useState('');
  const [memoria, setMemoria] = useState('');
  const [procesador, setProcesador] = useState('');
  const [ip, setIp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombrePc || !marcaPc || !modelo || !serial || !codigoPc || 
      !codigoMonitor || !serialMonitor || !marcaMonitor || !marcaMouse || 
      !codigoMouse || !marcaTeclado || !codigoTeclado || !areaUbicacion || 
      !encargado || !sede || !tipoPc || !tipoAlmacenamiento || !almacenamiento || 
      !memoria || !procesador || !ip) {
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre_pc', nombrePc);
    formData.append('marca_pc', marcaPc);
    formData.append('modelo', modelo);
    formData.append('serial', serial);
    formData.append('codigo_pc', codigoPc);
    formData.append('tipo_almacenamiento', tipoAlmacenamiento);
    formData.append('almacenamiento', almacenamiento);
    formData.append('memoria_ram', memoria);
    formData.append('procesador', procesador);
    formData.append('codigo_monitor', codigoMonitor);
    formData.append('serial_monitor', serialMonitor);
    formData.append('marca_monitor', marcaMonitor);
    formData.append('marca_mouse', marcaMouse);
    formData.append('codigo_mouse', codigoMouse);
    formData.append('marca_tecleado', marcaTeclado);
    formData.append('codigo_tecleado', codigoTeclado);
    formData.append('area_ubicacion', areaUbicacion);
    formData.append('encargado', encargado);
    formData.append('sede', sede);
    formData.append('observaciones', observaciones);
    formData.append('tipo_pc', tipoPc);
    formData.append('ip', ip);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/from`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.status === 201) {
        const newEntry = { nombrePc, marcaPc, modelo, serial, codigoPc, tipoAlmacenamiento, 
          almacenamiento, memoria, procesador, codigoMonitor, serialMonitor, marcaMonitor,
          marcaMouse, codigoMouse, marcaTeclado, codigoTeclado, areaUbicacion, encargado,
          sede, observaciones, tipoPc, ip };
        addData(newEntry);
        setMessage('Registro exitoso.');
        navigate('/home-152628282828');
      }
    } catch (response) {
      if (response.response) {
        setMessage(response.response.data.message);
      } else {
        navigate('/home-152628282828');
        setMessage('registrar la información.');
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
            <div className="form-group">
              <label>Nombre PC</label>
              <input type="text" value={nombrePc} onChange={(e) => setNombrePc(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Marca PC</label>
              <input type="text" value={marcaPc} onChange={(e) => setMarcaPc(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Modelo</label>
              <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Serial</label>
              <input type="text" value={serial} onChange={(e) => setSerial(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Código PC</label>
              <input type="text" value={codigoPc} onChange={(e) => setCodigoPc(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Tipo almacenamiento</label>
              <input type="text" value={tipoAlmacenamiento} onChange={(e) => setTipoAlmacenamiento(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Almacenamiento</label>
              <input type="text" value={almacenamiento} onChange={(e) => setAlmacenamiento(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Memoria Ram</label>
              <input type="text" value={memoria} onChange={(e) => setMemoria(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Procesador</label>
              <input type="text" value={procesador} onChange={(e) => setProcesador(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Código Monitor</label>
              <input type="text" value={codigoMonitor} onChange={(e) => setCodigoMonitor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Serial Monitor</label>
              <input type="text" value={serialMonitor} onChange={(e) => setSerialMonitor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Marca Monitor</label>
              <input type="text" value={marcaMonitor} onChange={(e) => setMarcaMonitor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Marca Mouse</label>
              <input type="text" value={marcaMouse} onChange={(e) => setMarcaMouse(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Código Mouse</label>
              <input type="text" value={codigoMouse} onChange={(e) => setCodigoMouse(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Marca Teclado</label>
              <input type="text" value={marcaTeclado} onChange={(e) => setMarcaTeclado(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Código Teclado</label>
              <input type="text" value={codigoTeclado} onChange={(e) => setCodigoTeclado(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Área de Ubicación</label>
              <input type="text" value={areaUbicacion} onChange={(e) => setAreaUbicacion(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Encargado</label>
              <input type="text" value={encargado} onChange={(e) => setEncargado(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Sede</label>
              <input type="text" value={sede} onChange={(e) => setSede(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Tipo PC</label>
              <input type="text" value={tipoPc} onChange={(e) => setTipoPc(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Dirección IP</label>
              <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
            </div>
            <div className="form-group observations">
              <label>Observaciones</label>
              <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
            </div>
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