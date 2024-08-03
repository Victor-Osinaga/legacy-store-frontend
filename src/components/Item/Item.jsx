import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import logoWp from '../../assets/wp-logo.png'
import useStoreContext from '../../provider/storeProvider';


function Item( {producto} ) {
  const { token } = useStoreContext();
  return (
    <div className='itemContainer'>
      
      <h3 className='itemTitulo'>{producto.name}</h3>
      <div className='itemImgContainer'>
        <img className='itemImg' src={producto.image} type='image/jpeg' alt={producto.titulo} />
      </div>
      {/* <p className='itemStock'>Stock: {producto.stock}</p> */}
      {token?(<span className='item__stock'>stock: {producto.stock}</span>) : null}
      <h4 className='itemPrecio'>${producto.price}</h4>
      <Link className='btn__vermas' to={`/producto/${producto.id}`}>Ver mas
        
      </Link>
      <a className='consulta' target={'_blank'} href={`https://wa.me/5492966578860?text=Buenas, quiero información acerca del siguiente producto: ${producto.name.toUpperCase()} - precio: $${producto.price} - id: ${producto.id}`} >Consultanos <img className='item__logoWp' src={logoWp} alt="logo whatsapp" /></a>
    </div>
  )
}

export default Item;