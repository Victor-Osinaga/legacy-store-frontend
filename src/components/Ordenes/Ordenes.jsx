import React, { useState, useEffect } from 'react';
import './Ordenes.css';
import { getOrders } from '../../fetch/fetch';
import useStoreContext from '../../provider/storeProvider';


function Ordenes() {
    const { token } = useStoreContext();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function asd(token) {
            if (token) {
                const access_token = sessionStorage.getItem('access_token');
                const result = await getOrders(access_token)
                if (result.status === 'ok') {
                    setOrders(result.data)
                    // console.log("ordenessss", result.data);
                } else {
                    // console.log("no se pudo verificar el token", result.data);
                    setOrders(null)
                    // setOrders(result.data)
                }
            } else {
                setOrders(null)
            }
        }
        asd(token)
    }, []);

    if (orders === null) {
        return (
            <section id="ordenes">
                Hubo un error
            </section>
        )
    } else if (orders.length === 0) {
        return (
            <section id="ordenes">
                No hay ordenes
            </section>

        )
    } else {
        return (
            <section id='ordenes'>
                
                <ul className='orderList'>
                    {orders.map(order => (
                        <li key={order.id} className='orderItem' >
                            <p className='orderPaymentId'>ORDEN ID: {order.id}</p>
                            <p>Pago ID: {order.paymentId}</p>
                            <p>Tipo de pago: <b>{order.tipoDePago}</b></p>
                            <p>Metodo de pago: <b>{order.metodoDePago}</b></p>
                            <p>Costo de envio: <b>${order.costoEnvio}</b></p>
                            <p>Total de compra: <b>${order.totalDeCompra}</b></p>
                            <p>Total con envio: <b>${order.totalConEnvio}</b></p>
                            <p>Neto Recibido: <b>${order.netoRecibido}</b></p>
                            <p>Comisión de MP: <b>${order.comisionMp}</b></p>
                            <p>Cuotas: <b>{order.cuotas}</b></p>
                            <p>Fecha de Liberación: <b>{order.fechaDeLiberacion.replace('T',' / ')}</b></p>
                            <p>Hora: <b>{order.timestamp}</b></p>
                            <p>Ciudad: <b>{order.direccionEnvio.receiver_address.city_name}</b></p>
                            <p>Provincia: <b>{order.direccionEnvio.receiver_address.state_name}</b></p>
                            <p>Calle: <b>{order.direccionEnvio.receiver_address.street_name}</b></p>
                            <p>Numero: <b>{order.direccionEnvio.receiver_address.street_number}</b></p>
                            <p>Código postal: <b>{order.direccionEnvio.receiver_address.zip_code}</b></p>
                            <p>Nombre: <b>{order.payer.first_name}</b></p>
                            <p>Apellido: <b>{order.payer.last_name}</b></p>
                            <p>Telefono: <b>{order.payer.phone.area_code} - {order.payer.phone.number}</b></p>
                            <p>Email: <b>{order.payer.email}</b></p>
                            <p>Estado de orden: <b className={order.status == "pendiente" ? "text-danger" : ""}>{order.status}</b></p>
                            <p className='orderPaymentId'>Productos</p>
                            <ul className='orderProducts'>
                                {order.products.map(product => (
                                    <li key={product.id} className='orderProduct'>
                                        <p>Nombre: <b>{product.name}</b></p>
                                        <p>Cantidad: <b>{product.quantity}</b></p>
                                        <p>Color: <b>{product.color[0]}</b></p>
                                        <p>Tamaño: <b>{product.size[0]}</b></p>
                                        <p>Categoria: <b>{product.categories[0].categoria.name}</b></p>
                                        <p>Precio c/u: <b>${product.price}</b></p>
                                        {/* {console.log(product)} */}
                                        <div className='itemImgContainer'>
                                            <img className='itemImg' src={product.image} />
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}

export default Ordenes;