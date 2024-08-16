import React from "react";
import useStoreContext from "../../provider/storeProvider";
import { Link } from 'react-router-dom';
import './CartView.css'

function CartView() {
    const { cart, removeFromCart, cleanCart, calcPriceCart } = useStoreContext();
    console.log("carrito: ", cart);
    

    if (cart.length === 0) {
        return (
            <section className="CartView" >
                <div>
                    <h4>No hay items en el carrito.</h4>
                    <Link to="/">Volver al catálogo</Link>
                </div>
            </section>
        )
    } else {
        return (
            <section className="CartView" >
                <h3 className='titleMainResumen'>Mi carrito</h3>
                <div className="itemCartContainer mb-3">
                    {cart.map((itemCart, index) => {
                        return (
                            <div className="itemCart" key={index}>
                                <span>{itemCart.name}</span>

                                <div className="itemDescription">
                                    <div className="itemDescr1">
                                        <img alt={itemCart.name} src={itemCart.image} />
                                    </div>
                                    <div className="itemDescr2">
                                        <p>Cantidad: <strong>{itemCart.quantity}</strong></p>
                                        <p>Tamaño: <strong>{`'${itemCart.selectedSizeName}'`}</strong></p>
                                        <p>Color: <strong>{`'${itemCart.selectedColorName}'`}</strong></p>
                                        <p>Precio c/u: <strong className="text-success">${itemCart.price}</strong></p>
                                        <p>Subtotal: <strong className="text-success">${itemCart.quantity * itemCart.price}</strong></p>
                                    </div>
                                </div>
                                <button className="btnEliminar" onClick={() => removeFromCart(itemCart.selectedColorId)}>
                                    <strong>ELIMINAR</strong>
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className="infoFinal">
                    <h4 className="precioFinal">Subtotal: <strong className="text-success">${calcPriceCart()}</strong></h4>
                    <div className="infoFinalBtnsContainer">
                        <button className="btnVaciarCarrito" onClick={cleanCart}>
                            <strong>VACIAR CARRITO</strong>
                        </button>
                        <Link to='/checkout'>
                            <button className="btnGoCheckout"><strong>CHECKOUT</strong></button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default CartView;