import { Link } from "react-router-dom"
import './Faqs.css'

export default function Faqs() {
    return (
        <section className="Faqs py-3 px-3">
            <div>
                <div className="mb-4">
                    <h5><strong>¿Por dónde comunicarnos?</strong></h5>
                    <p>A traves de nuestro e-mail puedes enviarnos cualquier consulta, estamos a tu disposición.</p>
                </div>
                <div className="mb-4">
                    <h5><strong>Cambios y devoluciones</strong></h5>
                    <p>Si quieres realizar cambios o devoluciones, contáctanos por mail. Brindándonos tu ID de compra, el e-mail con el que la realizaste y el motivo por el cual quieres relizar el cambio o devolución, nosotros evaluaremos tu situción y nos contactaremos contigo nuevamente.</p>
                </div>
                <div className="mb-4">
                    <h5><strong>¿Ya compré, cómo realizo un seguimiento de mi pedido?</strong></h5>
                    <p>Podrás realizar el seguimiento con tu ID de compra brindado antes de realizar el pago de la misma, accediendo a <Link to={'/orden/estado'} className="linkFaqs">seguimiento de pedido</Link>, dónde podrás ingresar tu ID de compra y ver su estado.</p>
                    {/* <ul>
                        <li><strong className="link-underline-secondary">Estado pendiente:</strong> significa que tu compra esta siendo preparada para el envio a la dirección que nos proporcionaste en el formulario de envio/contacto antes de realizar tu compra.</li>
                        <li><strong>Estado enviado:</strong> significa que tu compra ya fue empacada y esta en proceso de envío en nuestro distribuidor de paquetes.</li>
                    </ul> */}
                </div>
                <div className="mb-4">
                    <h5><strong>¿Quiénes somos?</strong></h5>
                    <p>Si quieres conocer más acerca de nosotros puedes seguirnos en nuestras redes sociales para estar al tanto de nuestras ultimas adquisiciones y sorteos o visitar nuestra sección <Link to={'/nosotros'} className="linkFaqs">acerca de nosotros</Link>.</p>
                </div>
            </div>
        </section>
    )
}