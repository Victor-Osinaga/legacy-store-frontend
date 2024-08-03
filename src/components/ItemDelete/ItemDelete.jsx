import React from 'react';
import './ItemDelete.css';
import config from '../../../config.js';


function ItemDelete({ producto }) {
  const handleSubmitEliminar = async (event) => {
    event.preventDefault();
    try {
      const access_token = sessionStorage.getItem('access_token');
      const response = await fetch(`${config.API_BASE_URL}/products/${producto.id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      });

      const data = await response.json();

            const result = document.getElementById(producto.id)
            if(data.status === 'ok'){
                result.innerHTML = "Producto eliminado"
                result.style.color = "green"
                console.log("eliminado");
            }else{
                result.innerHTML = data.data
                result.style.color = "red"
            }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='itemContainer'>
      <div id={producto.id}></div>
      <h3 className='itemTitulo'>{producto.name}</h3>
      <div className='itemImgContainer'>
        <img className='itemImg' src={producto.image} type='image/jpeg' alt={producto.titulo} />
      </div>
      <h4 className='itemPrecio'>Precio: ${producto.price}</h4>
      <form onSubmit={handleSubmitEliminar} className='form_delete'>
        <button type='submit' className='btn_delete' >
          Eliminar
        </button>
      </form>
    </div>
  )
}

export default ItemDelete;