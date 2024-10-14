import React, { useEffect, useState } from "react";
import "./footer.css";
import { ImFacebook2 } from "react-icons/im";
import { AiFillInstagram } from "react-icons/ai";
import { FaWhatsappSquare, FaTwitterSquare } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { SiGooglemaps } from "react-icons/si";
// import footerGif from '../../images/footer.gif';
import videoBg from "../../assets/bienvenida-bg.mp4";
import useStoreContext from "../../provider/storeProvider";
import getTextColor from "../../utils/getTextColor.js";

function Footer() {
  const { configStore, loadingConfig } = useStoreContext();
  const [config, setConfig] = useState(null);

  useEffect(() => {}, [loadingConfig]);
  return (
    <>
      {/* <div className='footer_bg'>
                <img src={footerGif} className='footer_img' alt='footer-img' />
            </div> */}
      {loadingConfig ? (
        <>
          <section id="footer">
            <section className="spinnerContainer">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </section>
          </section>
        </>
      ) : (
        <>
          <section
            id="footer"
            style={{
              backgroundColor: `${configStore.footerConfig.colors.primaryColorFooter}`,
              color: `${getTextColor(
                configStore.footerConfig.colors.primaryColorFooter
              )}`,
            }}
          >
            {/* <video className="videoBg" autoPlay loop muted playsInline>
                        <source src={videoBg} type="video/mp4" />
                    </video> */}
            <div className="footer_container">
              <h3
                className="footer_tltle text-center"
                // style={{ color: "var(--bgBlueLight)" }}
              >
                Contactanos ante cualquier duda
              </h3>
              <p className="footer_subtitle text-center">
                Siguenos en nuestras redes!
              </p>
              <div className="footer_social">
                <ul className="social_ul">
                  <h4 className="list_title">CONTACTO</h4>
                  <li>
                    <a
                      style={{
                        color: `${getTextColor(
                          configStore.footerConfig.colors.primaryColorFooter
                        )}`,
                      }}
                      className="socialA"
                      href={`mailto:${configStore.footerConfig.social.gmail}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {/* <GrMail className="iconLink" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="me-1"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                        <path d="M3 7l9 6l9 -6" />
                      </svg>
                      {configStore.footerConfig.social.gmail}
                    </a>
                  </li>
                </ul>
                <ul className="social_ul">
                  <h4 className="list_title">NUESTRO LOCAL</h4>
                  <li className="socialA">
                    {/* <SiGooglemaps className="iconLink" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="me-1"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                    </svg>
                    {configStore.footerConfig.social.storeAddress}
                  </li>
                </ul>
                <ul className="social_ul">
                  <h4 className="list_title">SOCIAL</h4>
                  {/* <li><a style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} className='socialA' target={'_blank'} href='https://www.facebook.com/profile.php?id=100089206952987&mibextid=ZbWKwL' rel="noreferrer"><ImFacebook2 className='iconLink' />Facebook</a></li> */}
                  <li>
                    <a
                      style={{
                        color: `${getTextColor(
                          configStore.footerConfig.colors.primaryColorFooter
                        )}`,
                      }}
                      className="socialA"
                      target={"_blank"}
                      href={configStore.footerConfig.social.facebook}
                      rel="noreferrer"
                    >
                      {/* <ImFacebook2 className="iconLink" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="me-1"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                      </svg>
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      style={{
                        color: `${getTextColor(
                          configStore.footerConfig.colors.primaryColorFooter
                        )}`,
                      }}
                      className="socialA"
                      target={"_blank"}
                      href={configStore.footerConfig.social.instagram}
                      rel="noreferrer"
                    >
                      {/* <AiFillInstagram className="iconLink" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="me-1"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M16.5 7.5l0 .01" />
                      </svg>
                      Instagram
                    </a>
                  </li>
                  {/* <li><a style={{color: `${getTextColor(configStore.footerConfig.colors.primaryColorFooter)}`}} className='socialA' target={'_blank'} href="https://wa.me/5492966578860?text=Buenas, tengo una consulta..." rel="noreferrer"><FaWhatsappSquare className='iconLink' />Whatsapp</a></li> */}
                  <li>
                    <a
                      style={{
                        color: `${getTextColor(
                          configStore.footerConfig.colors.primaryColorFooter
                        )}`,
                      }}
                      className="socialA"
                      target={"_blank"}
                      href={`https://wa.me/${configStore.footerConfig.social.whatsapp}?text=Buenas, tengo una consulta...`}
                      rel="noreferrer"
                    >
                      {/* <FaWhatsappSquare className="iconLink" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="me-1"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                      </svg>
                      Whatsapp
                    </a>
                  </li>
                  {/* <li><a className='socialA' target={'_blank'}  href='https://facebook.com' rel="noreferrer"><FaTwitterSquare className='iconLink' />Twitter</a></li> */}
                </ul>
              </div>
              <p className="text-center">
                -{" "}
                <a
                  style={{
                    color: `${getTextColor(
                      configStore.footerConfig.colors.primaryColorFooter
                    )}`,
                  }}
                  className="footer_wp text-decoration-underline"
                  href={`https://wa.me/${configStore.footerConfig.social.whatsapp}?text=Buenas, quiero contactarme con ustedes para realizar una compra en su página web. ¿Podrían indicarme los pasos a seguir para concretar la transacción?`}
                  target="_BLANK"
                  rel="noreferrer"
                >
                  Envianos un mensaje a nuestro <b>Whatsapp</b>
                </a>
              </p>
            </div>
            <p className="d-flex align-items-center justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M14 9.75a3.016 3.016 0 0 0 -4.163 .173a2.993 2.993 0 0 0 0 4.154a3.016 3.016 0 0 0 4.163 .173" />
                {/* © */}
              </svg>
              2024 - Diseñado y desarrollado por
              <a
                className="text-decoration-underline ms-1 fw-bold"
                style={{
                  color: `${getTextColor(
                    configStore.footerConfig.colors.primaryColorFooter
                  )}`,
                }}
                target={"_blank"}
                href="https://victor-osinaga.github.io/Portfolio/"
                rel="noreferrer"
              >
                Victor Osinaga
              </a>
              <img
                width={"20px"}
                src="/logolegacy.svg"
                alt=""
                className="ms-0"
              />
            </p>
          </section>
        </>
      )}
    </>
  );
}

export default Footer;
