import React from 'react';
import './Panel.css';
import useStoreContext from '../../provider/storeProvider';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Panel() {
    const { token, getOrders } = useStoreContext();
    const navigate = useNavigate();
    const goToOrders = async () => {
        const result = await getOrders();
        // result.status === 'ok' ? navigate('/resumen', { state: { datos: { nombre: 'Juan', edad: 30 } } }) : navigate('error')
        // result.status === 'ok' ? navigate('/resumen', { state: result }) : navigate('error')
        //  si salio OK enviar la data (link MP) sino no enviar nada
        navigate('/admin/ordenes')
    }
    if(token){
        return (
            <section id="panel">
                <ul className='panelContainer'>
                    <li><Link to='/admin/ordenes' className='link'>Ordenes</Link></li>
                    <li><Link to='/admin/crear-administrador' className='link'>Crear administrador</Link></li>
                    <li><Link to='/admin/crear-producto' className='link'>Crear producto</Link></li>
                    <li><Link to='/admin/editar' className='link'>Editar producto</Link></li>
                    <li><Link to='/admin/eliminar-producto' className='link'>Eliminar producto</Link></li>
                    <li><Link to='/admin/crear-categoria' className='link'>Crear categoria</Link></li>
                    <li><Link to='/admin/categoria/editar-eliminar' className='link'>Editar/eliminar categoria</Link></li>
                </ul>
            </section>
        )
    }else{
        return (
            <section id="panel">
                <p>
                    NO LOGUEADO
                </p>
            </section>
        )
    }
    
}

export default Panel;