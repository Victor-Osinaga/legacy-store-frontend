import React, { useEffect } from 'react';
import './wpBtn.css';
import imgWp from '../../assets/wp-logo.png'
import useStoreContext from '../../provider/storeProvider';

function WpBtn() {
    const { configStore, loadingConfig } = useStoreContext()
    useEffect(() => {

    }, [loadingConfig])
    return (
        <>
            {loadingConfig ? (
                <>
                    <section id='wp-btn'>
                        <a target={'_blank'} href="#" rel="noreferrer">
                            <img className="img-wp" src={imgWp} alt="wp-btn" />
                        </a>
                    </section>
                </>
            ) : (
                <>
                    <section id='wp-btn'>
                        <a target={'_blank'} href={`https://wa.me/${configStore.footerConfig.social.whatsapp}?text=Buenas, quiero contactarme con ustedes para realizar una compra en su página web. ¿Podrían indicarme los pasos a seguir para concretar la transacción?`} rel="noreferrer">
                            <img className="img-wp" src={imgWp} alt="wp-btn" />
                        </a>
                    </section>
                </>
            )}
        </>
    )
}

export default WpBtn;