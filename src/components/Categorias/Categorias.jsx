import React from 'react';
import { Link } from 'react-router-dom';
import './Categorias.css'

function Categorias(){
  return (
    <section className='categorias'>
      <div className='categoriasContainer'>
        <Link to='/category/remeras' className='link'>Remeras</Link>
        <Link to='/category/buzos' className='link'>Buzos</Link>
        <Link to='/category/jeans' className='link'>Pantalones</Link>
        <Link to='/category/camperas' className='link'>Camperas</Link>
        <Link to='/category/accesorios' className='link'>Accesorios</Link>
      </div>
    </section>
  );
}

export default Categorias;