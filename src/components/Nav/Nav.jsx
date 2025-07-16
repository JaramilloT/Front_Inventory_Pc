import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-blanco.png';
import './Nav.css';

export const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el almacenamiento local
    localStorage.clear();

    navigate('/');
  };

  return (
    <div className='nav'>
      <div className='navber'>
        <img className='logo' src={logo} alt="Logo" />

        <div className='name'>
          <h1 className='h1-nav'>Inventory - Software</h1>
        </div>

        <button className='logout-btn' onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
