import { Link } from "react-router-dom";
import "./Faqs.css";
import Footer from "../footer/footer";
import useStoreContext from "../../provider/storeProvider";
import getTextColor from "../../utils/getTextColor.js";

export default function Faqs() {
  const { configStore } = useStoreContext();
  return (
    <>
      <section
        className="Faqs"
        style={{
          backgroundColor: `${configStore.colors.tertiaryColorStore}`,
          color: `${getTextColor(configStore.colors.tertiaryColorStore)}`,
        }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-start"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "3rem 1rem",
          }}
        >
          <div className="mb-4">
            <h5>
              <strong>¿Por dónde comunicarnos?</strong>
            </h5>
            <p>
              A traves de nuestro mail puedes enviarnos cualquier consulta,
              estamos a tu disposición.
            </p>
          </div>
          <div className="mb-4">
            <h5>
              <strong>Cambios y devoluciones</strong>
            </h5>
            <p>
              Si quieres realizar cambios o devoluciones, contáctanos por mail.
              Brindándonos tu ID de compra, el e-mail con el que la realizaste y
              el motivo por el cual quieres relizar el cambio o devolución,
              nosotros evaluaremos tu situción y nos contactaremos contigo
              nuevamente.
            </p>
          </div>
          <div className="mb-4">
            <h5>
              <strong>
                ¿Ya compré, cómo realizo un seguimiento de mi pedido?
              </strong>
            </h5>
            <p>
              Podrás realizar el seguimiento con tu ID de compra brindado antes
              de realizar el pago de la misma, accediendo a{" "}
              <Link
                className="text-decoration-underline"
                style={{ color: "inherit" }}
                to={"/orden/estado"}
              >
                seguimiento de pedido
              </Link>
              , dónde podrás ingresar tu ID de compra y ver su estado.
            </p>
            {/* <ul>
                        <li><strong className="link-underline-secondary">Estado pendiente:</strong> significa que tu compra esta siendo preparada para el envio a la dirección que nos proporcionaste en el formulario de envio/contacto antes de realizar tu compra.</li>
                        <li><strong>Estado enviado:</strong> significa que tu compra ya fue empacada y esta en proceso de envío en nuestro distribuidor de paquetes.</li>
                    </ul> */}
          </div>
          <div className="mb-4">
            <h5>
              <strong>¿Quiénes somos?</strong>
            </h5>
            <p>
              Si quieres conocer más acerca de nosotros puedes seguirnos en
              nuestras redes sociales para estar al tanto de nuestras ultimas
              adquisiciones y sorteos o visitar nuestra sección{" "}
              <Link
                className="text-decoration-underline"
                style={{ color: "inherit" }}
                to={"/nosotros"}
              >
                acerca de nosotros
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
