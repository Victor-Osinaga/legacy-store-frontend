import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useState } from 'react';
import './ItemDetail.css';
import useStoreContext from '../../provider/storeProvider.jsx';
import { Link } from 'react-router-dom';

function ItemDetail({ producto }) {
    const { calculateTotalStock, addToCart } = useStoreContext()
    const [isInCart, setIsInCart] = useState(false);

    function onAdd(count, selectedColor, selectedSize) {
        setIsInCart(true);
        addToCart(producto, count, selectedColor, selectedSize);
    }

    function seguirComprando() {
        setIsInCart(false);
    }

    if (!producto) {
        return (
            <h4>Cargando...</h4>
        )
    } else {
        return (
            <section className='itemDetail'>
                <h3 className='detailTitle glitch2' data-text="Detalle del producto">Detalle del producto</h3>
                <div className='itemDetailLeft'>
                    <img className='itemDetailImg' src={producto.image} type='image/jpeg' alt='foto' />
                </div>
                <div className='itemDetailRight'>

                    <h2 className='itemDetailTitulo'>{producto.name}</h2>
                    <p className='itemDetailDescripcion'>{producto.description}</p>
                    <h4 className='itemDetailPrecio'>${producto.price}</h4>

                    {isInCart ? (
                        <div className='actionsContainer'>
                            <Link className='toCart' to="/cart">Ir al carrito</Link>
                            <p className='seguirComprando' onClick={seguirComprando}>Comprar más!</p>
                        </div>
                    ) : (
                        <ItemCount
                            onAdd={onAdd}
                            producto={producto}
                        />
                    )
                    }
                </div>
            </section>
        )
    }

}

export default ItemDetail;