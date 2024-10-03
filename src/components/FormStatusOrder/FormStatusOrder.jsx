import { useForm } from 'react-hook-form';
import config from '../../../config.js';
import useStoreContext from '../../provider/storeProvider.jsx';
import './FormStatusOrder.css'
import { getOrderStatusById } from '../../fetch/fetch.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getTextColor from '../../utils/getTextColor.js';

export default function FormStatusOrder() {
    const { toastLoading, toastSuccess, toastError, dismissToast, loadingConfig, configStore } = useStoreContext()
    const { orderId } = useParams()
    const { register, handleSubmit, formState: { errors }, watch, reset, getValues, setValue } = useForm({
        defaultValues: {
            orderId: orderId
        }
    })
    const [orderStatus, setOrderStatus] = useState(null)

    useEffect(() => {
        return () => {
            dismissToast()
        }
    }, [loadingConfig])

    const customSubmit = async (data) => {
        console.log("data : FormStatusOrder ", data);
        const toastId = toastLoading("Obteniendo estado de orden")
        try {
            const orderStatus = await getOrderStatusById(data.orderId)
            setOrderStatus(orderStatus)
            return toastSuccess(<>Orden encontrada: <strong>'{orderStatus.id}'</strong></>, toastId)
        } catch (error) {
            toastError(
                <div className='text-center'>
                    <span>{error.msg}</span>
                </div>,
                toastId
            )
        }
    }
    return (
        <>
            {loadingConfig ? (
                <>
                    <section className='spinnerContainer'>
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <section className='formStatusOrderContainer d-flex align-items-center '
                        style={{
                            backgroundColor: `${configStore.colors.tertiaryColorStore}`,
                            color: `${getTextColor(configStore.colors.tertiaryColorStore)}`
                        }}
                    >
                        <form 
                        onSubmit={handleSubmit(customSubmit)} 
                        className='formOrderStatus rounded mx-auto px-4 py-4 gap-3 d-flex flex-column justify-content-center'
                        
                        style={{
                            backgroundColor: `${configStore.colors.secondaryColorStore}`,
                            color: `${getTextColor(configStore.colors.secondaryColorStore)}`
                        }}
                        >
                            <h4 className='text-center fw-bold'>Estado de la orden</h4>
                            <div className=''>
                                <label htmlFor="orderId" className='mb-2'>Ingrese el ID de la Orden</label>
                                <input
                                    type="text"
                                    id="orderId"
                                    className='form-control custom-placeholder fontSM-Custom'
                                    placeholder='1f2ad707-420a-40f0-94d5-cff75181d65b'
                                    {...register("orderId", {
                                        required: {
                                            value: true,
                                            message: "Ingresa un ID de orden"
                                        },
                                        validate: (value) => {
                                            if (value.length < 10) {
                                                return "Ingresa un ID de orden válido"
                                            }
                                            if (value == orderStatus?.id) {
                                                return "El ID es el mismo"
                                            }
                                        }
                                    })}
                                />
                                {errors.orderId && <span className='mt-1 fontXS-Custom text-danger'>{errors.orderId.message} <span className='fw-semibold'>*</span></span>}
                            </div>
                            <div className='btnCheckout rounded text-white'>
                                <button type='submit' className=''>VER ESTADO</button>
                            </div>

                            {orderStatus ? (
                                <>
                                    <hr />
                                    <div className='fontSM-Custom' id=''>
                                        <h5 className='fw-bold'>Resultado:</h5>
                                        <p>Estado de la orden: <span className='fw-bold text-capitalize text-decoration-underline'>{orderStatus.order_status}</span></p>
                                        <p>
                                            <span>Descripción: </span>
                                            {orderStatus.order_status == "pendiente" && (
                                                "Tu compra esta en espera de ser procesada"
                                            )}
                                            {orderStatus.order_status == "procesado" && (
                                                "Tu compra fue procesada y esta siendo preparada para el envio/retiro"
                                            )}
                                            {orderStatus.order_status == "listo" && (
                                                "Tu compra esta lista para enviarla/retirarla"
                                            )}
                                            {orderStatus.order_status == "enviado/retirado" && (
                                                "Tu compra ya fue enviada/retirada"
                                            )}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>

                                </>
                            )}

                        </form>

                    </section>
                </>
            )}
        </>
    )
}