import React from "react";
import useStoreContext from "../../provider/storeProvider";
import { Link } from 'react-router-dom';
import DeleteIcon from "../Icons/DeleteIcon/DeleteIcon";
import './CartView.css'

function CartView() {
    const { cart, removeFromCart, cleanCart, calcPriceCart } = useStoreContext();
    console.log("carrito: ", cart);

    const buttonStyle = {
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        border: '1px solid #4A4B53',
        background: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.875rem'
    }
    if (cart.length === 0) {
        return (
            // <section className="CartView" >
            //     <div>
            //         <h4>No hay items en el carrito.</h4>
            //         <Link to="/">Volver al catálogo</Link>
            //     </div>
            // </section>
            <section style={{
                backgroundColor: '#23252F',
                color: 'white',
                minHeight: 'calc(100vh - var(--navHeight))',
                padding: '3rem 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }} >
                {/* <div> */}
                <h4>No hay items en el carrito</h4>
                <Link to="/" style={{
                    color: 'white',
                    textAlign: 'center'
                }}>
                    Volver al catálogo
                </Link>
                {/* </div> */}
            </section>
        )
    } else {
        return (

            // VARIANTE 1 V0

            // <div className="bg-[#23252F] text-white min-h-screen py-12">
            //     <div className="container mx-auto px-4 md:px-6">
            //         <h1 className="text-2xl font-bold mb-8">Carrito de Compras</h1>
            //         <div className="grid gap-8">
            //             <div className="grid gap-6">
            //                 {cart.map((item) => (
            //                     <div
            //                         key={item.id}
            //                         // className="grid grid-cols-[100px_1fr_100px] items-center gap-4 bg-[#2B2D38] rounded-lg p-4"
            //                     >
            //                         <img
            //                             src={item.image}
            //                             alt={item.name}
            //                             width={100}
            //                             height={100}
            //                             // className="rounded-lg object-cover"
            //                             // style={{ aspectRatio: "100/100", objectFit: "cover" }}
            //                         />
            //                         <div className="">
            //                             <h3 className="font-semibold">{item.name}</h3>
            //                             <div className="flex items-center gap-2">
            //                                 <span>Cantidad: {item.quantity}</span>
            //                                 <span>Talla: {item.size}</span>
            //                                 <span>Color: {item.color}</span>
            //                             </div>
            //                         </div>
            //                         <div className="">
            //                             {/* <span className="font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
            //                             <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
            //                                 Eliminar
            //                             </Button> */}
            //                             <span className="">$ 111</span>
            //                             <button >
            //                                 Eliminar
            //                             </button>
            //                         </div>
            //                     </div>
            //                 ))}
            //             </div>
            //             <div className="grid gap-4">
            //                 <div className="flex items-center justify-between">
            //                     <span className="text-lg font-semibold">Total:</span>
            //                     <span className="text-2xl font-bold">$ 123</span>
            //                 </div>
            //                 <div className="flex gap-4">
            //                     {/* <Button variant="outline" className="w-full" onClick={clearCart}>
            //                         Vaciar Carrito
            //                     </Button>
            //                     <Button className="w-full">Proceder al Checkout</Button> */}
            //                     <button variant="outline" className="w-100">
            //                         Vaciar Carrito
            //                     </button>
            //                     <button className="w-100">Proceder al Checkout</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>





            // VARIANTE 2
            // <div style={{
            //     minHeight: '100vh',
            //     backgroundColor: '#23252F',
            //     color: 'white',
            //     padding: '2rem 1rem',
            //     fontFamily: 'Arial, sans-serif'
            // }}>
            //     <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Carrito de Compras</h1>


            //     {/* {cart.length === 0 ? (
            //             <p>Tu carrito está vacío.</p>
            //         ) : ( */}
            //     <>
            //         {cart.map(item => (
            //             // <div style={{
            //             //     // maxWidth: '1000px',
            //             //     maxWidth: '100%',
            //             //     margin: '0 auto',
            //             //     backgroundColor: '#2B2D38',
            //             //     borderRadius: '0.5rem',
            //             //     // padding: '1.5rem',
            //             //     // padding: '0rem 1rem',
            //             //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            //             //     marginBottom: '10px'
            //             // }}>
            //                 <div key={item.id} style={{
            //                     backgroundColor: '#2B2D38',
            //                     borderRadius: '0.5rem',
            //                     marginBottom: '10px',
            //                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

            //                     display: 'flex',
            //                     justifyContent: 'space-between',
            //                     alignItems: 'center',
            //                     // borderBottom: '1px solid #4A4B53',
            //                     padding: '.5rem 1rem'
            //                 }}>
            //                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            //                         <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            //                         <div>
            //                             <h3 style={{ fontWeight: 'bold' }}>{item.name}</h3>
            //                             <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Talla: {item.selectedSizeName}, Color: {item.selectedColorName}</p>
            //                             <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Cantidad: {item.quantity}</p>
            //                         </div>
            //                     </div>
            //                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            //                         <span style={{ width: '80px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</span>
            //                         <button onClick={() => removeItem(item.id)} style={{
            //                             ...buttonStyle,
            //                             backgroundColor: '#EF4444',
            //                             color: 'white',
            //                             border: 'none'
            //                         }}>Eliminar</button>
            //                     </div>
            //                 </div>

            //             // </div>
            //         ))}

            //     </>
            //     {/* )} */}
            //     <div style={{
            //         marginTop: '1.5rem',
            //         display: 'flex',
            //         justifyContent: 'space-between',
            //         alignItems: 'center'
            //     }}>
            //         <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total: ${calcPriceCart()}</span>
            //         <div>
            //             <button style={{
            //                 ...buttonStyle,
            //                 backgroundColor: '#EF4444',
            //                 color: 'white',
            //                 border: 'none',
            //                 marginRight: '1rem'
            //             }}>Vaciar Carrito</button>
            //             <button style={{
            //                 ...buttonStyle,
            //                 backgroundColor: '#10B981',
            //                 color: 'white',
            //                 border: 'none'
            //             }}>Proceder al Pago</button>
            //         </div>
            //     </div>
            // </div>



            // VARIANTE 3
            <div style={{
                backgroundColor: '#23252F',
                color: 'white',
                minHeight: 'calc(100vh - var(--navHeight))',
                padding: '3rem 0'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1rem'
                }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem'
                    }}>Carrito de Compras</h1>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {/* <div style={{ display: 'grid', gap: '1.5rem' }}> */}
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '100px 1fr 100px',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        backgroundColor: '#2B2D38',
                                        borderRadius: '0.5rem',
                                        padding: '1rem'
                                    }}
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        style={{
                                            borderRadius: '0.5rem',
                                            objectFit: 'cover',
                                            aspectRatio: '1',
                                        }}
                                    />
                                    <div>
                                        {/* <h3 style={{ fontWeight: '600' }}>{item.name} <h6><span>(${item.price} c/u)</span></h6> </h3> */}
                                        <h3 style={{ fontWeight: '600' }}>{item.name}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0rem' }}>
                                            {/* <span>Cantidad: {item.quantity}</span>
                                            <span>Talla: {item.selectedSizeName}</span>
                                            <span>Color: {item.selectedColorName}</span> */}
                                            <p className="m-0">Cantidad: {item.quantity}</p>
                                            <p className="m-0">Talla: {item.selectedSizeName}</p>
                                            <div>
                                                <p className="m-0">Color: {item.selectedColorName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <span style={{ fontWeight: '600' }}>${(item.quantity * item.price).toFixed(2)}</span>
                                        <button
                                            onClick={() => removeFromCart(item.selectedColorId)}
                                            style={{
                                                // backgroundColor: 'transparent',
                                                // border: '1px solid danger',
                                                // color: 'white',
                                                // padding: '0.25rem 0.5rem',
                                                // borderRadius: '0.25rem',
                                                // cursor: 'pointer',
                                                marginTop: '0.5rem',
                                            }}
                                            type="button" className="btn btn-outline-danger btn rounded" title='Eliminar producto'
                                        >
                                            {/* <DeleteIcon /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width='25' height='25' fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'inherit' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        {/* </div> */}
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>Total sin envio: ${calcPriceCart()}</span>
                                {/* <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>$111111</span> */}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={cleanCart}
                                    style={{
                                        flex: 1,
                                        // padding: '0.75rem',
                                        // backgroundColor: 'transparent',
                                        // border: '1px solid white',
                                        // color: 'white',
                                        // borderRadius: '0.25rem',
                                        // cursor: 'pointer'
                                    }}
                                    type="button" className="btn btn-outline-light btn rounded" title='Eliminar producto'
                                >
                                    Vaciar Carrito
                                </button>
                                <Link to='/checkout'
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        backgroundColor: 'white',
                                        textAlign: 'center',
                                        color: '#23252F',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',

                                    }}>
                                    <button
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontWeight: '600',
                                        }}
                                    >
                                        CHECKOUT
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







            // VARIANTE ORIGINAL
            // <section className="CartView" >
            //     <h3 className='titleMainResumen'>Mi carrito</h3>
            //     <div className="itemCartContainer mb-3">
            //         {cart.map((itemCart, index) => {
            //             return (
            //                 <div className="itemCart" key={index}>
            //                     <span>{itemCart.name}</span>

            //                     <div className="itemDescription">
            //                         <div className="itemDescr1">
            //                             <img alt={itemCart.name} src={itemCart.image} />
            //                         </div>
            //                         <div className="itemDescr2">
            //                             <p>Cantidad: <strong>{itemCart.quantity}</strong></p>
            //                             <p>Tamaño: <strong>{`'${itemCart.selectedSizeName}'`}</strong></p>
            //                             <p>Color: <strong>{`'${itemCart.selectedColorName}'`}</strong></p>
            //                             <p>Precio c/u: <strong className="text-success">${itemCart.price}</strong></p>
            //                             <p>Subtotal: <strong className="text-success">${itemCart.quantity * itemCart.price}</strong></p>
            //                         </div>
            //                     </div>
            //                     <button className="btnEliminar" onClick={() => removeFromCart(itemCart.selectedColorId)}>
            //                         <strong>ELIMINAR</strong>
            //                     </button>
            //                 </div>
            //             )
            //         })}
            //     </div>
            //     <div className="infoFinal">
            //         <h4 className="precioFinal">Subtotal: <strong className="text-success">${calcPriceCart()}</strong></h4>
            //         <div className="infoFinalBtnsContainer">
            //             <button className="btnVaciarCarrito" onClick={cleanCart}>
            //                 <strong>VACIAR CARRITO</strong>
            //             </button>
            //             <Link to='/checkout'>
            //                 <button className="btnGoCheckout"><strong>CHECKOUT</strong></button>
            //             </Link>
            //         </div>
            //     </div>
            // </section>
        )
    }
}

export default CartView;