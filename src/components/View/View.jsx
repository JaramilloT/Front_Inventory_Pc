import React from 'react'
import { Link } from 'react-router-dom';
import crear from '../../assets/crear.png'
import inventario from '../../assets/inventario.png'
import './View.css'

export const View = () => {
  return (
    <div className='views'> 
      <div className='view'>
        <div className='creation-view'>
          <img className='view-img' src={crear} alt="Crear hoja" />
          <Link to='/from'>
            <button className='btn-view'>Crear Hoja de vida</button>
          </Link>
        </div>

        <div className='creation-view'>
          <img className='view-img' src={inventario} alt="Ver hojas" />
          <Link to='/main'>
            <button className='btn-view'>Ver Hojas de vida</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
