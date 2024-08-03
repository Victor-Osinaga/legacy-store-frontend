import React from 'react';
import './footer.css';
import { ImFacebook2 } from 'react-icons/im';
import { AiFillInstagram } from 'react-icons/ai';
import { FaWhatsappSquare, FaTwitterSquare } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { SiGooglemaps } from 'react-icons/si';
// import footerGif from '../../images/footer.gif';
import videoBg from '../../assets/bienvenida-bg.mp4'

function Footer() {
    return (
        <section id='footer'>
            {/* <div className='footer_bg'>
                <img src={footerGif} className='footer_img' alt='footer-img' />
            </div> */}
            <video className="videoBg" autoPlay loop muted playsInline>
                    <source src={videoBg} type="video/mp4" />
                </video>
            <div className='footer_container'>
                <h3 className='footer_tltle'>Contactanos ante cualquier duda</h3>
                <p className='footer_subtitle'>Siguenos en nuestras redes!</p>
                <div className='footer_social'>
                    <ul className='social_ul'>
                        <h4 className='list_title'>CONTACTO</h4>
                        <li><a className='socialA' href="mailto:jarryindumentaria@gmail.com" rel="noreferrer" target="_blank"><GrMail className='iconLink'/>jarryindumentaria@gmail.com</a></li>
                    </ul>
                    <ul className='social_ul'>
                        <h4 className='list_title'>SOCIAL</h4>
                        <li><a className='socialA'target={'_blank'} href='https://www.facebook.com/profile.php?id=100089206952987&mibextid=ZbWKwL' rel="noreferrer"><ImFacebook2 className='iconLink' />Facebook</a></li>
                        <li><a className='socialA' target={'_blank'}  href='https://facebook.com' rel="noreferrer"><AiFillInstagram className='iconLink' />Instagram</a></li>
                        <li><a className='socialA' target={'_blank'}  rel="noreferrer" href="https://wa.me/5492966578860?text=Buenas, tengo una consulta..."><FaWhatsappSquare className='iconLink' />Whatsapp</a></li>
                        {/* <li><a className='socialA' target={'_blank'}  href='https://facebook.com' rel="noreferrer"><FaTwitterSquare className='iconLink' />Twitter</a></li> */}
                    </ul>
                    <ul className='social_ul'>
                        <h4 className='list_title'>OFICINA</h4>
                        <li className='socialA' ><SiGooglemaps className='iconLink'/>Puerto San Julian - Santa Cruz</li>
                    </ul>
                </div>
                <p>- <a className='footer_wp' href="https://wa.me/5492966578860?text=Buenas, quiero contactarme con ustedes para realizar una compra en su página web. ¿Podrían indicarme los pasos a seguir para concretar la transacción?"
                    target="_BLANK" rel="noreferrer">Envianos un mensaje a nuestro Whatsapp</a>
                </p>
            </div>
            <p className='footer_info'>
                © 2023 - Jarry Indumentaria - Diseñado y desarrollado por <a target={'_blank'} href='https://victor-osinaga.github.io/Portfolio/' rel="noreferrer">Victor Osinaga</a>
            </p>
        </section>

    )
}

export default Footer;