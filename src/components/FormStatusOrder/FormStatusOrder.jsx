import config from '../../../config.js';
import './FormStatusOrder.css'
import toast, { Toaster } from 'react-hot-toast';

export default function FormStatusOrder() {
    const getStatusOrderById = async (e) => {
        e.preventDefault()
        const orderId = document.getElementById('orderId').value

        if (orderId.length > 5) {
            const res = await fetch(`${config.API_BASE_URL}/orders/${orderId}`)
            console.log(res);
            if (res.status) {
                const json = await res.json()
                const div = document.getElementById('statusOrder')

                if (json.data == "pendiente") {
                    console.log("JSON STATUS", json.data);
                    div.textContent = ''
                    const p = document.createElement('p')
                    p.innerHTML = `El estado de su pedido es: <strong class='text-danger'>${json.data},</strong> por enviar.`
                    div.appendChild(p)
                }else if(json.data == "enviado"){
                    console.log("JSON STATUS", json.data);
                    div.textContent = ''
                    const p = document.createElement('p')
                    p.innerHTML = `El estado de su pedido es: <strong class='text-success'>${json.data}</strong>.`
                    div.appendChild(p)
                }
            }
        } else {
            const toastId = toast.error(
                <div><strong>Porfavor, ingrese un ID de pedido válido</strong>...</div>,
                {
                    style: {
                        position: 'relative',
                        minWidth: '480px',
                        zIndex: '1000000'
                    }
                }
            );
        }


    }
    return (
        <>
            <Toaster position="top-right" reverseOrder={true} />
            <section className='formStatusOrderContainer py-5 px-3 d-flex align-items-center'>
                <form onSubmit={getStatusOrderById} className='bg-white d-flex flex-column align-items-center w-100 mx-auto p-5'>
                    <div className='d-flex flex-column w-75'>
                        <label htmlFor="orderId" className='mb-3'>Ingrese el ID de su pedido</label>
                        <input type="text" id="orderId" className='customSelect mb-3' required />
                    </div>
                    <div className=''>
                        <button type='submit' className='mb-3 btnGoCheckout'>VER ESTADO</button>
                    </div>
                    <div className='statusOrder' id='statusOrder' style={{ height: '40px' }}></div>
                </form>

            </section>
        </>
    )
}