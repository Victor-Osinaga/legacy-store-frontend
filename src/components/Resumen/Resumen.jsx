import React from 'react';
import './Resumen.css';
import { useLocation } from 'react-router-dom';
import useStoreContext from '../../provider/storeProvider';

function Resumen() {
    const location = useLocation();
    const { cart, removeFromCart, cleanCart, calcPriceCart, calcPriceFinal } = useStoreContext();

    if (!location.state || !location.state.datos) {
        // Si el objeto "location.state" o "location.state.datos" no existe o es null/undefined, mostrar un mensaje de error o redirigir a otra página
        return <p>No hay datos para mostrar</p>;
    }
    // console.log("resumen", location.state.datos.resumen.products)
    return (
        // <section className="Cartview">
        //     <div className="itemCartContainer">
        //     <h2>Resumen de compra</h2>
        //     <h3>Productos</h3>
        //         {location.state.datos.resumen.products.map(producto => {
        //             return (
        //                 <div className="itemCart" key={producto.id}>
        //                     <h3>{producto.name}</h3>

        //                     <div className="itemDescription">
        //                         <div className="itemDescr1">
        //                             <img alt={producto.name} src={producto.image} />
        //                         </div>
        //                         <div className="itemDescr2">
        //                             <p>Cantidad: <b>{producto.quantity}</b></p>
        //                             <p>Tamaño: <b>{`'${producto.size}'`}</b></p>
        //                             <p>Color: <b>{`'${producto.color}'`}</b></p>
        //                             <p>Precio: <b>${producto.price}</b></p>
        //                             <p>Precio final: <b>${producto.quantity * producto.price}</b></p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             )
        //         })
        //         }
        //     </div>
        //     <div>
        //         <h3>Envio</h3>
        //     </div>
        //     <div>
        //         <a className="btnComprar" rel='noopener' target={'_blank'} href={location.state.datos.link}>¡Pagar!</a>
        //     </div>

        // </section>
        <section className="ResumenView" >
            <div className="itemResumenContainer">
                <h3 className='titleMainResumen'>Productos</h3>
                
                {location.state.datos.resumen.products.map(producto => {
                    console.log("item cart", producto);
                    return (
                        <div className="itemResumen" key={producto.id}>
                            <h5>{producto.name}</h5>
                            <div className="itemResumenDescription">
                                <div className="itemDescr1Resumen">
                                    <img alt={producto.name} src={producto.image} />
                                </div>
                                <div className="itemDescr2Resumen">
                                    <p>Cantidad: <b>{producto.quantity}</b></p>
                                    <p>Tamaño: <b>{`'${producto.size}'`}</b></p>
                                    <p>Color: <b>{`'${producto.color}'`}</b></p>
                                    <p>Precio c/u: <b>${producto.price}</b></p>
                                    <p>Subtotal: <b>${producto.quantity * producto.price}</b></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="infoFinalResumen">
                    <h3 className="precioFinalResumen">Subtotal: ${calcPriceFinal(location.state.datos.resumen.products, 0)}</h3>
                    <h3 className="precioFinalResumen">Envio: ${location.state.datos.shipmentCost}</h3>
                    <h3 className="precioFinalResumen">Total: ${calcPriceFinal(location.state.datos.resumen.products, location.state.datos.shipmentCost)}</h3>
                    <h3>Datos de envio</h3>
                    {/* <div className='datosEnvioContainer'> */}
                    {/* <p></p> */}
                    <p className='w-100'>Si realiza el pago correctamente guarde el siguiente id para poder realizar un seguimiento de su pedido: <strong>{location.state.datos.idOrder}</strong></p>
                    <ul className='datosEnvioContainerResumen'>
                        <li>Nombre: <b>{location.state.datos.resumen.payer.name}</b></li>
                        <li>Apellido: <b>{location.state.datos.resumen.payer.surname}</b></li>
                        <li>Email: <b>{location.state.datos.resumen.payer.email}</b></li>
                        <li>Codigo de area: <b>{location.state.datos.resumen.payer.phone.area_code}</b></li>
                        <li>Numero de Celular: <b>{location.state.datos.resumen.payer.phone.number}</b></li>
                        <li>Calle: <b>{location.state.datos.resumen.payer.address.street_name}</b></li>
                        <li>Numero: <b>{location.state.datos.resumen.payer.address.street_number}</b></li>
                        <li>Codigo postal: <b>{location.state.datos.resumen.payer.address.zip_code}</b></li>
                        <li>Provincia: <b>{location.state.datos.resumen.shipments.receiver_address.state_name}</b></li>
                        <li>Ciudad: <b>{location.state.datos.resumen.shipments.receiver_address.city_name}</b></li>
                    </ul>
                    {/* </div> */}
                    <div>
                        <a className="btnComprar" rel='noopener' /*target={'_blank'}*/ href={location.state.datos.link}>¡Pagar!</a>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Resumen;