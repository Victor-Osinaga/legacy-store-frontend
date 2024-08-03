import React from 'react';
import ItemDelete from '../ItemDelete/ItemDelete';
// import './ItemAdmin.css';

function ItemListDelete( { productos } ) {
  return(
    <div className='itemList'>
      { productos.map(producto => {
        return(
            <ItemDelete producto={producto} key={producto.id} />
          )
        })
      }
    </div>
  )
}

export default ItemListDelete;