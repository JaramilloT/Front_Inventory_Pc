import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logos from '../../assets/logo-blanco.png';
import previous from '../../assets/previ.png';
import './Details.css';

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFormDetails, setEditedFormDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/from/${id}`);
        const { file, id_formulario, ...rest } = response.data;
        setFormDetails(rest);

        const parsedFiles = Array.isArray(file) ? file : JSON.parse(file || '[]');
        setUploadedFiles(parsedFiles);
      } catch (error) {
        console.error('Error al obtener los datos del formulario:', error);
        alert('Error al obtener los datos del formulario: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleEditClick = () => {
    if (window.confirm('¿Estás seguro de que deseas editar?')) {
      setIsEditing(true);
      setEditedFormDetails(formDetails);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (window.confirm('¿Estás seguro de que deseas guardar los cambios?')) {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/from/${id}`, editedFormDetails);
        if (response.status === 200) {
          setFormDetails(editedFormDetails);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('Error al guardar los cambios: ' + error.message);
      }
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert('Por favor, selecciona al menos un archivo.');
      return;
    }

    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      formData.append('id_formulario', id);

      try {
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/from/${id}/uploads`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          uploaded.push(response.data.file);
        }
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        alert('Error al subir el archivo: ' + error.message);
      }
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...uploaded]);
    setFiles([]);
  };

  const handleDeleteForm = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar la hoja de vida?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/from/${id}`);
        navigate('/main');
      } catch (error) {
        console.error('Error al eliminar el formulario:', error);
        alert('Error al eliminar el formulario: ' + error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (!formDetails) {
    return <p className="error-message">No se pudieron cargar los datos</p>;
  }

  return (
    <div className="scroll-wrapper">
      <div className="details-container">
        <header className="details-header">
          <div className='back-button-container'>
            <Link to='/main' className="back-link">
              <img className='back-icon' src={previous} alt="Volver" />
              <span className='back-text'>Volver</span>
              <h1 className='app-title'>Inventory.Soft</h1>
            </Link>
          </div>
        </header>

        <div className="details-content">
          <div className="details-card">
            <h2 className="details-title">Detalles del Producto</h2>

            <div className="details-grid">
              {Object.entries(formDetails).map(([key, value]) => (
                <div key={key} className="detail-field">
                  <label className="detail-label">{formatLabel(key)}</label>
                  {isEditing ? (
                    <input
                      className="detail-input"
                      type="text"
                      name={key}
                      value={editedFormDetails[key] || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="detail-value">{value || '-'}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="files-section">
            <h3 className="files-title">Archivos adjuntos</h3>

            {uploadedFiles.length > 0 ? (
              <ul className="files-list">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="file-item">
                    <a
                      href={`${process.env.REACT_APP_BACKEND_URL.replace('/api/v1', '')}/uploads/${file.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      <span className="file-icon">📄</span>
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-files">No hay archivos adjuntos</p>
            )}

            <form onSubmit={handleFileUpload} className="upload-form">
              <div className="file-input-container">
                <label htmlFor="file-upload" className="file-upload-label">
                  <span className="upload-icon">⬆️</span>
                  Seleccionar archivos
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                    className="file-input"
                  />
                </label>
                {files.length > 0 && (
                  <div className="selected-files">
                    {Array.from(files).map((file, i) => (
                      <span key={i} className="file-name">{file.name}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="action-buttons">
                <button type="submit" className="btn btn-upload" disabled={files.length === 0}>
                  Subir Archivos
                </button>

                <div className="edit-buttons">
                  {isEditing ? (
                    <>
                      <button type="button" className="btn btn-save" onClick={handleSaveChanges}>
                        Guardar Cambios
                      </button>
                      <button type="button" className="btn btn-cancel" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn btn-edit" onClick={handleEditClick}>
                      Editar Información
                    </button>
                  )}
                </div>

                <button type="button" className="btn btn-delete" onClick={handleDeleteForm}>
                  Eliminar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Función auxiliar para formatear las claves
function formatLabel(key) {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
