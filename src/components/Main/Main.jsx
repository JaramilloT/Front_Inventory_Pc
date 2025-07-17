import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import previous from '../../assets/previ.png';
import axios from 'axios';
import './Main.css';
import { Nav } from '../Nav/Nav';

export const Main = () => {
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/from`);
        setForms(response.data);
      } catch (error) {
        console.error('Error al obtener los formularios:', error);
      }
    };

    fetchForms();
  }, []);

  const filteredForms = forms.filter(form =>
    form.nombre_pc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <Nav />

      <div className="scroll-content">
        <div className="header-section">
          <Link to='/home-152628282828' className="back-link">
            <img className='back-icon' src={previous} alt="" />
            <span className="back-text">Volver</span>
          </Link>

          <h1 className="main-title">Listado de productos registrados</h1>

          <div className='search-container'>
            <label htmlFor="search" className='search-label'>Búsqueda por filtro:</label>
            <input 
              id="search"
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {filteredForms.length > 0 ? (
          <div className="card-container">
            {filteredForms.map(form => (
              <div key={form.id_formulario} className="card">
                <h3 className="card-title">{form.nombre_pc}</h3>
                <Link to={`/details/${form.id_formulario}`} className="card-link">
                  <button className="view-button">Ver más</button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            {searchTerm ? 'No se encontraron resultados' : 'No hay productos registrados'}
          </div>
        )}
      </div>

      
    </div>
  );
};
