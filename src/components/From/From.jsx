// src/components/From.js
import React, { useState } from 'react';
import axios from 'axios';
import './From.css';
import { useNavigate, Link } from 'react-router-dom';
import { useFromContext } from '../../context/FromContext'; // Asegúrate de que esta ruta sea correcta
import previouss from '../../assets/previ.png'

export const From = () => {
  const navigate = useNavigate();
  const { addData } = useFromContext(); // Obtener la función para añadir datos al contexto

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
  // const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // const handleChangeFile = (e) => {
  //   setFile(e.target.files[0]); // Guardar el archivo seleccionado
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!nombrePc || !marcaPc || !modelo || !serial || !codigoPc || 
      !codigoMonitor || !serialMonitor || !marcaMonitor || !marcaMouse || 
      !codigoMouse || !marcaTeclado || !codigoTeclado || !areaUbicacion || 
      !encargado || !sede || !tipoPc || !tipoAlmacenamiento || !almacenamiento || 
      !memoria || !procesador || !ip) { // ← Quitado tbGb de la validación
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Crear un FormData para enviar los datos
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
    formData.append('tb_gb', 'N/A'); // Este valor no debe faltar. Usa '0' si no quieres vacío.
    // formData.append('file', file); // Agregar el archivo a los datos del formulario

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/from`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        const newEntry = {
          nombrePc,
          marcaPc,
          modelo,
          serial,
          codigoPc,
          tipoAlmacenamiento,
          almacenamiento,
          memoria,
          procesador,
          codigoMonitor,
          serialMonitor,
          marcaMonitor,
          marcaMouse,
          codigoMouse,
          marcaTeclado,
          codigoTeclado,
          areaUbicacion,
          encargado,
          sede,
          observaciones,
          tipoPc,
          ip,
        };
        addData(newEntry); // Añadir el nuevo registro al contexto
        setMessage('Registro exitoso.');
        navigate('/home-152628282828'); // Navegar a la página de inicio después del registro
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
    <div className='container'>
      <form className='from' onSubmit={handleSubmit}>
      <h1 className='h1-sesion'>Inventory.Soft</h1>
        <div>

        <Link to='/home-152628282828'>
          <img className='back-from' src={previouss} alt="" />
        </Link>
        Volver
        </div>
        <div>
          <p >Nombre PC</p>
          <input type="text" value={nombrePc} onChange={(e) => setNombrePc(e.target.value)} />
        </div>
        <div>
          <p>Marca PC</p>
          <input type="text" value={marcaPc} onChange={(e) => setMarcaPc(e.target.value)} />
        </div>
        <div>
          <p>Modelo</p>
          <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
        </div>
        <div>
          <p>Serial</p>
          <input type="text" value={serial} onChange={(e) => setSerial(e.target.value)} />
        </div>
        <div>
          <p>Código PC</p>
          <input type="text" value={codigoPc} onChange={(e) => setCodigoPc(e.target.value)} />
        </div>
        <div>
          <p>Tipo almacenamiento</p>
          <input type="text" value={tipoAlmacenamiento} onChange={(e) => setTipoAlmacenamiento(e.target.value)} />
        </div>
        <div>
          <p> Almacenamiento</p>
          <input type="text" value={almacenamiento} onChange={(e) => setAlmacenamiento(e.target.value)} />
        </div>
        <div>
          <p>Memoria Ram</p>
          <input type="text" value={memoria} onChange={(e) => setMemoria(e.target.value)} />
        </div>
        <div>
          <p>Procesador</p>
          <input type="text" value={procesador} onChange={(e) => setProcesador(e.target.value)} />
        </div>
        <div>
          <p>Código Monitor</p>
          <input type="text" value={codigoMonitor} onChange={(e) => setCodigoMonitor(e.target.value)} />
        </div>
        <div>
          <p>Serial Monitor</p>
          <input type="text" value={serialMonitor} onChange={(e) => setSerialMonitor(e.target.value)} />
        </div>
        <div>
          <p>Marca Monitor</p>
          <input type="text" value={marcaMonitor} onChange={(e) => setMarcaMonitor(e.target.value)} />
        </div>
        <div>
          
          <p>Marca Mouse</p>
          <input type="text" value={marcaMouse} onChange={(e) => setMarcaMouse(e.target.value)} />
        </div>
        <div>
          <p>Código Mouse</p>
          <input type="text" value={codigoMouse} onChange={(e) => setCodigoMouse(e.target.value)} />
        </div>
        <div>
          <p>Marca Teclado</p>
          <input type="text" value={marcaTeclado} onChange={(e) => setMarcaTeclado(e.target.value)} />
        </div>
        <div>
          <p>Código Teclado</p>
          <input type="text" value={codigoTeclado} onChange={(e) => setCodigoTeclado(e.target.value)} />
        </div>
        <div>
          <p>Área de Ubicación</p>
          <input type="text" value={areaUbicacion} onChange={(e) => setAreaUbicacion(e.target.value)} />
        </div>
        <div>
          <p>Encargado</p>
          <input type="text" value={encargado} onChange={(e) => setEncargado(e.target.value)} />
        </div>
        <div>
          <p>Sede</p>
          <input type="text" value={sede} onChange={(e) => setSede(e.target.value)} />
        </div>
        <div>
          <p className='from-p'>Observaciones</p>
          <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
        </div>
        <div>
          <p>Tipo PC</p>
          <input type="text" value={tipoPc} onChange={(e) => setTipoPc(e.target.value)} />
        </div>
        <div>
          <p>Dirección IP</p> 
          <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
        </div>
        {/* <div>
          <p>Archivo (documento relacionado)</p>
          <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={handleChangeFile} required />
        </div> */}
        <div className='btn-register'>
          <button className='register-btn' type="submit">Registrar Información</button>
        </div>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};