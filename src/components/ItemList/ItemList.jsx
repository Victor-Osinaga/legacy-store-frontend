import React from 'react';
import Item from '../Item/Item';
import './ItemList.css';
import ItemNoStock from '../ItemNoStock/ItemNoStock';

function ItemList({ productos }) {
  return (
    <div className='itemList'>
      {productos.map(producto => {
          if (producto.stock <= 0) {
            return (
              <ItemNoStock producto={producto} key={producto.id} />
            )
          } else {
            return (
              <Item producto={producto} key={producto.id} />
            )
          }
        })
      }
    </div>
  )
}

export default ItemList;