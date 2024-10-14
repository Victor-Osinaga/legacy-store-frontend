import React from "react";
import logo from "../../assets/logo-jarry.png";
import nosotrosBg from "../../assets/nosotros.jpg";
import "./Nosotros.css";
import Footer from "../footer/footer";
import useStoreContext from "../../provider/storeProvider";
import getTextColor from "../../utils/getTextColor.js";

function Nosotros() {
  const { configStore } = useStoreContext();
  return (
    <>
      <section
        className="Nosotros"
        style={{
          backgroundColor: `${configStore.colors.tertiaryColorStore}b3`,
          color: `${getTextColor(configStore.colors.tertiaryColorStore)}`,
        }}
      >
        <div
          className="nosotrosContainer"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "3rem 1rem",
          }}
        >
          <div>
            <img src={nosotrosBg} className="imgBg" alt="logo company" />
          </div>
          <div className="nosotros-logoContainer">
            <img className="nosotros-logo" src={logo} alt="logo" />
          </div>
          <div>
            <h2 className="nosotros-title text-center">Sobre Nosotros</h2>
            <p className="text-center">
              Bienvenido a nuestra tienda de ropa, donde encontrarás las últimas
              tendencias de moda y la mejor calidad en cada prenda. Somos una
              tienda en línea fundada en 2020 apasionada por la moda y enfocada
              en el cliente, comprometida en ofrecer productos de alta calidad
              que satisfagan las necesidades y preferencias.<br></br>
              Nos enorgullecemos de trabajar con proveedores que comparten
              nuestros valores en cuanto a la calidad y la sostenibilidad, por
              lo que puedes confiar en que cada prenda que compras en nuestra
              tienda está hecha con materiales duraderos y respetuosos con el
              medio ambiente. <br></br>
              <br></br>
              En nuestra tienda, creemos en la importancia de la atención al
              cliente y en la experiencia de compra en línea. Por lo tanto, nos
              aseguramos de que cada compra sea fácil, segura y satisfactoria
              para nuestros clientes. Ofrecemos una variedad de opciones de
              pago, así como un equipo de atención al cliente disponible para
              ayudarte en cualquier momento.<br></br>
              <br></br>
              En resumen, nuestra tienda de ropa en línea es el lugar perfecto
              para encontrar las últimas tendencias de moda, con la mejor
              calidad y atención al cliente. ¡Esperamos que disfrutes de tu
              experiencia de compra con nosotros!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Nosotros;
