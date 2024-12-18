import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
// import footerGif from "../../assets/bannerComprimidor.gif";
import footerGif from "../../assets/bannerComprimidor.mp4";
import "./Bienvenida.css";
import useStoreContext from "../../provider/storeProvider";

function Bienvenida() {
  const { configStore } = useStoreContext();
  return (
    <section className="Banner">
      {/* <div> */}
      {/* <img src={footerGif} className="banner_img" alt="footer-img" /> */}
      <video
        autoPlay
        loop
        muted
        src={footerGif}
        //   controls
        className="banner_img"
        alt="footer-img"
        style={{
          backgroundColor: configStore.colors.tertiaryColorStore,
        }}
      />
      <p className="banner_info text-white m-0">
        <BsChevronDoubleDown className="doubleDownIcon" />
      </p>
      {/* </div> */}
    </section>
  );
}

export default Bienvenida;
