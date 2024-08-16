import React from "react";
import { BsChevronDoubleDown } from 'react-icons/bs';
import footerGif from '../../assets/banner.gif'
import './Bienvenida.css';

function Bienvenida() {
    return (
        <section className="Banner">
            <div className='banner_bg'>
                <img src={footerGif} className='banner_img' alt='footer-img' />
                <p className="banner_info text-white">
                    {/* <h5 className="banner-title">Productos</h5> */}
                    < BsChevronDoubleDown className="doubleDownIcon" />
                </p>
            </div>
        </section>
    )
}

export default Bienvenida;