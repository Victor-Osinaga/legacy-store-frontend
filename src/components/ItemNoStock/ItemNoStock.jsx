import React from 'react';
import './ItemNoStock.css';
import { Link } from 'react-router-dom';


function ItemNoStock({ producto }) {
    return (
        <div className='itemContainer itemContainerNoStock'>
            <div className='NoStock'>SIN STOCK</div>
            <h3 className='itemTitulo'>{producto.name}</h3>
            <div className='itemImgContainer'>
                <img className='itemImg' src={producto.image} type='image/jpeg' alt={producto.titulo} />
            </div>
            {/* <p className='itemStock'>Stock: {producto.stock}</p> */}
            <h4 className='itemPrecio'>Precio: ${producto.price}</h4>
            <Link className='btn__vermas' to={`/producto/${producto.id}`}>Ver mas

            </Link>
            <a target={'_blank'} href={`https://wa.me/5492966578860?text=Buenas, quiero información acerca del siguiente producto: ${producto.name.toUpperCase()} - precio: $${producto.price} - id: ${producto.id}`} >Consulta sobre el producto</a>
        </div>
    )
}

export default ItemNoStock;