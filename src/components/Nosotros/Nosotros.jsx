import React from "react";
import logo from '../../assets/logo-jarry.png'
import nosotrosBg from '../../assets/nosotros.jpg'
import './Nosotros.css'
import Footer from "../footer/footer";

function Nosotros() {
    return (
        <>
            <section className="Nosotros" >
                <div className='nosotros_bg'>
                    <img src={nosotrosBg} className='nosotros_img' alt='nosotros-img' />
                </div>
                <div className="nosotros-logoContainer">
                    <img className='nosotros-logo' src={logo} alt='logo' />
                </div>
                <div className="nosotros-text">
                    <h2 className="nosotros-title">Sobre Nosotros</h2>
                    <p>
                        Bienvenido a nuestra tienda de ropa, donde encontrarás las últimas tendencias de moda y la mejor calidad en cada prenda. Somos una tienda en línea fundada en 2020 apasionada por la moda y enfocada en el cliente, comprometida en ofrecer productos de alta calidad que satisfagan las necesidades y preferencias.<br></br>
                        Nos enorgullecemos de trabajar con proveedores que comparten nuestros valores en cuanto a la calidad y la sostenibilidad, por lo que puedes confiar en que cada prenda que compras en nuestra tienda está hecha con materiales  duraderos y respetuosos con el medio ambiente. <br></br>
                        En nuestra tienda, creemos en la importancia de la atención al cliente y en la experiencia de compra en línea. Por lo tanto, nos aseguramos de que cada compra sea fácil, segura y satisfactoria para nuestros clientes. Ofrecemos una variedad de opciones de pago, así como un equipo de atención al cliente disponible para ayudarte en cualquier momento.<br></br>
                        En resumen, nuestra tienda de ropa en línea es el lugar perfecto para encontrar las últimas tendencias de moda, con la mejor calidad y atención al cliente. ¡Esperamos que disfrutes de tu experiencia de compra con nosotros!
                    </p>
                </div>
                
            </section>
            <Footer />
        </>

    )
}

export default Nosotros;