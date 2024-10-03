import React, { useEffect, useState } from 'react';
import './footer.css';
import { ImFacebook2 } from 'react-icons/im';
import { AiFillInstagram } from 'react-icons/ai';
import { FaWhatsappSquare, FaTwitterSquare } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { SiGooglemaps } from 'react-icons/si';
// import footerGif from '../../images/footer.gif';
import videoBg from '../../assets/bienvenida-bg.mp4'
import useStoreContext from '../../provider/storeProvider';
import getTextColor from '../../utils/getTextColor.js';

function Footer() {
    const { configStore, loadingConfig } = useStoreContext()
    const [config, setConfig] = useState(null)

    useEffect(() => {

    }, [loadingConfig])
    return (
        <>
            {/* <div className='footer_bg'>
                <img src={footerGif} className='footer_img' alt='footer-img' />
            </div> */}
            {loadingConfig ? (
                <>
                    <section id='footer'>
                        <section className='spinnerContainer'>
                            <div className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </section>
                    </section>
                </>
            ) : (
                <>
                    <section id='footer'
                    style={{
                        backgroundColor: `${configStore.footerConfig.colors.primaryColorFooter}`,
                        color: "white"
                    }}
                    >
                        {/* <video className="videoBg" autoPlay loop muted playsInline>
                        <source src={videoBg} type="video/mp4" />
                    </video> */}
                        <div className='footer_container'>
                            <h3 className='footer_tltle text-center'>Contactanos ante cualquier duda</h3>
                            <p className='footer_subtitle text-center'>Siguenos en nuestras redes!</p>
                            <div className='footer_social'>
                                <ul className='social_ul'>
                                    <h4 className='list_title'>CONTACTO</h4>
                                    <li><a style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} className='socialA' href={`mailto:${configStore.footerConfig.social.gmail}`} rel="noreferrer" target="_blank"><GrMail className='iconLink' />{configStore.footerConfig.social.gmail}</a></li>
                                </ul>
                                <ul className='social_ul'>
                                    <h4 className='list_title'>NUESTRO LOCAL</h4>
                                    <li className='socialA' ><SiGooglemaps className='iconLink' />{configStore.footerConfig.social.storeAddress}</li>
                                </ul>
                                <ul className='social_ul'>
                                    <h4 className='list_title'>SOCIAL</h4>
                                    {/* <li><a style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} className='socialA' target={'_blank'} href='https://www.facebook.com/profile.php?id=100089206952987&mibextid=ZbWKwL' rel="noreferrer"><ImFacebook2 className='iconLink' />Facebook</a></li> */}
                                    <li><a style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} className='socialA' target={'_blank'} href={configStore.footerConfig.social.facebook} rel="noreferrer"><ImFacebook2 className='iconLink' />Facebook</a></li>
                                    <li><a style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} className='socialA' target={'_blank'} href={configStore.footerConfig.social.instagram} rel="noreferrer"><AiFillInstagram className='iconLink' />Instagram</a></li>
                                    {/* <li><a style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} className='socialA' target={'_blank'} href="https://wa.me/5492966578860?text=Buenas, tengo una consulta..." rel="noreferrer"><FaWhatsappSquare className='iconLink' />Whatsapp</a></li> */}
                                    <li><a style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} className='socialA' target={'_blank'} href={`https://wa.me/${configStore.footerConfig.social.whatsapp}?text=Buenas, tengo una consulta...`}rel="noreferrer"><FaWhatsappSquare className='iconLink' />Whatsapp</a></li>
                                    {/* <li><a className='socialA' target={'_blank'}  href='https://facebook.com' rel="noreferrer"><FaTwitterSquare className='iconLink' />Twitter</a></li> */}
                                </ul>
                            </div>
                            <p className='text-center'>- <a className='footer_wp' href={`https://wa.me/${configStore.footerConfig.social.whatsapp}?text=Buenas, quiero contactarme con ustedes para realizar una compra en su página web. ¿Podrían indicarme los pasos a seguir para concretar la transacción?`}
                                target="_BLANK" rel="noreferrer">Envianos un mensaje a nuestro Whatsapp</a>
                            </p>
                        </div>
                        <p className='footer_info'>
                            © 2024 - Diseñado y desarrollado por <a className='text-decoration-underline' style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} target={'_blank'} href='https://victor-osinaga.github.io/Portfolio/' rel="noreferrer">Victor Osinaga</a>
                        </p>
                    </section>
                </>
            )}
        </>

    )
}

export default Footer;