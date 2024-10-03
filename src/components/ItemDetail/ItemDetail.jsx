import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useState } from 'react';
import './ItemDetail.css';
import useStoreContext from '../../provider/storeProvider.jsx';
import { Link } from 'react-router-dom';
import getTextColor from '../../utils/getTextColor.js';

function ItemDetail({ producto }) {
    const { calculateTotalStock, addToCart, loadingConfig, configStore } = useStoreContext()
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
            <div className='container-fluid p-3'>
                <h3
                    style={{color: `${getTextColor(configStore.colors.tertiaryColorStore)}`}}
                    className='detailTitle col-12 text-center glitch'
                    data-text="Detalle del producto"
                >
                    Detalle del producto
                </h3>
                <div className='row'>
                    <div className='col-12 col-md-4 d-flex justify-content-center align-items-center p-3'>
                        <img className='img-fluid w-50 w-md-100' src={producto.image} type='image/jpeg' alt='foto' />
                    </div>
                    <div className='col-12 col-md-8 text-center'>
                        <h2
                            style={{ color: `${getTextColor(configStore.colors.tertiaryColorStore)}` }}
                        >
                            {producto.name}
                        </h2>
                        <p
                            style={{ color: `${getTextColor(configStore.colors.tertiaryColorStore)}` }}
                        >
                            {producto.description}
                        </p>
                        <h4 
                        style={{color: `${getTextColor(configStore.colors.tertiaryColorStore)}`}}
                        >
                            ${producto.price}
                            </h4>

                        {isInCart ? (
                            <div >
                                <Link className='toCart' to="/cart">Ir al carrito</Link>
                                <p  onClick={seguirComprando}>Comprar más!</p>
                            </div>
                        ) : (
                            <>
                            <ItemCount
                                onAdd={onAdd}
                                producto={producto}
                            />
                            </>
                            
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default ItemDetail;