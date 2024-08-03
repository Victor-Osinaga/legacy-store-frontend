import React from 'react';
import ItemAdmin from '../ItemAdmin/ItemAdmin';
// import './ItemAdmin.css';

function ItemListAdmin( { productos } ) {
  return(
    <div className='itemList'>
      { productos.map(producto => {
        return(
            <ItemAdmin producto={producto} key={producto.id} />
          )
        })
      }
    </div>
  )
}

export default ItemListAdmin;