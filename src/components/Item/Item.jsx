import React, { useEffect } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import logoWp from '../../assets/wp-logo.png'
import useStoreContext from '../../provider/storeProvider';
import getTextColor from '../../utils/getTextColor';
import toNumberArgStandard from '../../utils/toNumberArgStandard.js';


function Item({ producto }) {
  const { token, loadingConfig, configStore } = useStoreContext();

  useEffect(() => {
    console.log("loadingConfigloadingConfig", loadingConfig);

  }, [loadingConfig])
  return (
    <div
      className='itemContainer'
      style={{
        backgroundColor: `${configStore.colors.secondaryColorStore}`
      }}
    >

      <h3 className='itemTitulo text-center' style={{ color: `${getTextColor(configStore.colors.secondaryColorStore)}` }}>
        {producto.name}
      </h3>
      <div className='itemImgContainer'>
        <img className='itemImg' src={producto.image} type='image/jpeg' alt={producto.titulo} />
      </div>
      <span className='item-price text-success fw-bold fs-5'>${toNumberArgStandard(producto.price)}</span>

      {loadingConfig ? (
        <div className=''>
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Link
          className='btn__vermas fw-bold fontSM-Custom'
          to={`/producto/${producto.id}`}
          style={{
            backgroundColor: `${configStore.colors.primaryColorStore}`,
            color: `${getTextColor(configStore.colors.primaryColorStore)}`
          }}
        >
          Ver más
        </Link>
      )}
      <a
        className='consulta'
        target={'_blank'}
        href={`https://wa.me/5492966578860?text=Buenas, quiero información acerca del siguiente producto: ${producto.name.toUpperCase()} - precio: $${producto.price} - id: ${producto.id}`}
        style={{
          color: `${getTextColor(configStore.colors.tertiaryColorStore)}`
        }}
      >
        <span className='gap-1 d-flex d-flex justify-content-center align-items-center'>
          <span 
          className='fontXS-Custom'
          style={{
            color: `${getTextColor(configStore.colors.secondaryColorStore)}`
          }}
          >
            Consultanos
            </span>
          <img className='item__logoWp' src={logoWp} alt="logo whatsapp" />
        </span>
      </a>
    </div>
  )
}
// style={{backgroundColor: `${configStore.colors.primaryColorStore}`}} 

export default Item;