import React from 'react';
import './wpBtn.css';
import imgWp from '../../assets/wp-logo.png'

function WpBtn() {
    return (
        <section id='wp-btn'>
            <a target={'_blank'} href="https://wa.me/5492966578860?text=Buenas, quiero contactarme con ustedes para realizar una compra en su página web. ¿Podrían indicarme los pasos a seguir para concretar la transacción?" rel="noreferrer">
                <img className="img-wp" src={imgWp} alt="wp-btn" />
            </a>
        </section>
    )
}

export default WpBtn;