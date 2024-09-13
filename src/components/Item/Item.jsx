import React, { useEffect } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import logoWp from '../../assets/wp-logo.png'
import useStoreContext from '../../provider/storeProvider';


function Item({ producto }) {
  const { token, loadingConfig, configStore } = useStoreContext();

  useEffect(() => {
    console.log("loadingConfigloadingConfig", loadingConfig);

  }, [loadingConfig])
  return (
    <div className='itemContainer'>

      <h3 className='itemTitulo'>{producto.name}</h3>
      <div className='itemImgContainer'>
        <img className='itemImg' src={producto.image} type='image/jpeg' alt={producto.titulo} />
      </div>
      <h4 className='itemPrecio'>${producto.price}</h4>

      {loadingConfig ? (
        <span>cargando xd</span>
      ) : (
        <Link
          className='btn__vermas'
          to={`/producto/${producto.id}`}
          style={{ backgroundColor: `${configStore.primaryColorStore}` }}
        >
          Ver mas
        </Link>
      )}
      <a className='consulta' target={'_blank'} href={`https://wa.me/5492966578860?text=Buenas, quiero información acerca del siguiente producto: ${producto.name.toUpperCase()} - precio: $${producto.price} - id: ${producto.id}`} >Consultanos <img className='item__logoWp' src={logoWp} alt="logo whatsapp" /></a>
    </div>
  )
}
// style={{backgroundColor: `${configStore.primaryColorStore}`}} 

export default Item;