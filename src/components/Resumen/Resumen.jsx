import React from "react";
import "./Resumen.css";
import { Link, useLocation } from "react-router-dom";
import useStoreContext from "../../provider/storeProvider";
import getTextColor from "../../utils/getTextColor.js";

function Resumen() {
  const location = useLocation();
  const {
    cart,
    removeFromCart,
    cleanCart,
    calcPriceCart,
    calcPriceFinal,
    loadingConfig,
    configStore,
  } = useStoreContext();

  if (!location.state || !location.state.datos) {
    // Si el objeto "location.state" o "location.state.datos" no existe o es null/undefined, mostrar un mensaje de error o redirigir a otra página
    return <p>No hay datos para mostrar</p>;
  }
  // console.log("resumen", location.state.datos.resumen.products)
  return (
    <section
      style={{
        backgroundColor: `${configStore.colors.tertiaryColorStore}`,
        color: `${getTextColor(configStore.colors.tertiaryColorStore)}`,
        minHeight: "calc(100vh - var(--navHeight))",
        padding: "3rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "2rem",
          }}
        >
          Resumen de Compras
        </h1>
        {/* <div style={{ display: 'grid', gap: '2rem' }}> */}
        {/* <div style={{ display: 'grid', gap: '1.5rem' }}> */}
        <div
          data-shadow-color={getTextColor(
            configStore.colors.tertiaryColorStore
          )}
          style={{
            alignItems: "center",
            gap: "1rem",
            backgroundColor: `${configStore.colors.secondaryColorStore}`,
            color: `${getTextColor(configStore.colors.secondaryColorStore)}`,
            borderRadius: "0.5rem",
            padding: "1rem 2rem",
          }}
          className="mb-4"
        >
          <h4
            style={{
              fontWeight: "bold",
            }}
            className="mb-4"
          >
            Productos
          </h4>

          {location.state.datos.resumen.products.map((item) => (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 100px",
                  gap: "1rem",
                  marginBottom: "2rem",
                  // outline: '1px solid red'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "0.5rem",
                    objectFit: "cover",
                    aspectRatio: "1",
                  }}
                />
                <div className="d-flex flex-column justify-content-center align-items-start">
                  {/* <h3 style={{ fontWeight: '600' }}>{item.name} <h6><span>(${item.price} c/u)</span></h6> </h3> */}
                  <p className="m-0" style={{ fontWeight: "bold" }}>
                    {item.name}
                  </p>
                  <div
                    style={{
                      fontSize: ".75rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      gap: "0rem",
                    }}
                  >
                    <p className="m-0">
                      Talla: {item.selectedSizeName}, Color:{" "}
                      {item.selectedColorName}
                    </p>
                    {/* <div>
                                            <p className="m-0">Color: {item.selectedColorName}</p>
                                        </div> */}
                    <span className="m-0">Cantidad: {item.quantity}</span>
                    <span className="m-0">Precio: ${item.price}</span>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-end">
                  <span className="fw-bold">Subtotal</span>
                  <p>${item.quantity * item.price}</p>
                </div>
              </div>
            </>
          ))}
          <div
            className="d-flex flex-column justify-content-end align-items-end"
            style={{ fontSize: "1.1rem" }}
          >
            <span>
              Subtotal: $
              {calcPriceFinal(location.state.datos.resumen.products, 0)}
            </span>
            <span>Envio: ${location.state.datos.shipments.cost}</span>
            <span>
              Total: $
              {calcPriceFinal(
                location.state.datos.resumen.products,
                location.state.datos.shipments.cost
              )}
            </span>
          </div>
        </div>
        <div
          data-shadow-color={getTextColor(
            configStore.colors.tertiaryColorStore
          )}
          style={{
            alignItems: "center",
            gap: "1rem",
            backgroundColor: `${configStore.colors.secondaryColorStore}`,
            color: `${getTextColor(configStore.colors.secondaryColorStore)}`,
            borderRadius: "0.5rem",
            padding: "1rem 2rem",
          }}
          className="mb-4"
        >
          <h4
            style={{
              fontWeight: "bold",
            }}
            className="mb-4"
          >
            Datos de envio/retiro
          </h4>
          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Nombre
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.payer.name}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Apellido
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.payer.surname}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Email
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.payer.email}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Codigo de area
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.payer.area_code}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Telefono
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.payer.number_phone}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Calle
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.shipments.street_name}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Numero
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.shipments.street_number}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Codigo postal
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.shipments.zip_code}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Provincia
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.shipments.state_name}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">
                Localidad
              </label>
              <input
                type="text"
                className="form-control fontSM-Custom custom-placeholder"
                style={{
                  background: "",
                }}
                disabled
                value={location.state.datos.shipments.city_name}
              />
            </div>
          </div>
        </div>
        {/* <div
                    style={{
                        // alignItems: 'center',
                        // gap: '1rem',
                        // backgroundColor: '#2B2D38',
                        // borderRadius: '0.5rem',
                        // padding: '1rem 2rem'
                    }}
                // className='mb-4'
                >
                    <Link className=' w-100 fw-bold btnPagar' to={location.state.datos.init_point} target='_blank'>PAGAR</Link>
                </div> */}
        <div className="btnPagar rounded mb-2 text-white">
          <Link
            to={location.state.datos.init_point}
            className="m-0 fw-semibold"
          >
            PAGAR
          </Link>
        </div>
        {/* </div> */}
      </div>
    </section>
    // <section className="ResumenView" >
    //     <div className="itemResumenContainer">
    //         <h3 className='titleMainResumen'>Productos</h3>
    //         <h3 className='titleMainResumen'>Tienda: "POR HACER"</h3>

    //         {location.state.datos.resumen.products.map(producto => {
    //             console.log("item cart", producto);
    //             return (
    //                 <div className="itemResumen" key={producto.id}>
    //                     <h5>{producto.name}</h5>
    //                     <div className="itemResumenDescription">
    //                         <div className="itemDescr1Resumen">
    //                             <img alt={producto.name} src={producto.image} />
    //                         </div>
    //                         <div className="itemDescr2Resumen">
    //                             <p>Cantidad: <b>{producto.quantity}</b></p>
    //                             <p>Tamaño: <b>{`'${producto.selectedSizeName}'`}</b></p>
    //                             <p>Color: <b>{`'${producto.selectedColorName}'`}</b></p>
    //                             <p>Precio c/u: <b>${producto.price}</b></p>
    //                             <p>Subtotal: <b>${producto.quantity * producto.price}</b></p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )
    //         })}
    //         <div className="infoFinalResumen">
    //             <h3 className="precioFinalResumen">Subtotal: ${calcPriceFinal(location.state.datos.resumen.products, 0)}</h3>
    //             <h3 className="precioFinalResumen">Envio: ${location.state.datos.shipments.cost}</h3>
    //             <h3 className="precioFinalResumen">Total con envio: ${calcPriceFinal(location.state.datos.resumen.products, location.state.datos.shipments.cost)}</h3>
    //             <h3>Datos de envio</h3>
    //             <p className='w-100'>Si realiza el pago correctamente guarde el siguiente id para poder realizar un seguimiento de su pedido: <strong>{location.state.datos.externalReference}</strong></p>
    //             <ul className='datosEnvioContainerResumen'>
    //                 <li>Nombre: <b>{location.state.datos.payer.name}</b></li>
    //                 <li>Apellido: <b>{location.state.datos.payer.surname}</b></li>
    //                 <li>Email: <b>{location.state.datos.payer.email}</b></li>
    //                 <li>Codigo de area: <b>{location.state.datos.payer.area_code}</b></li>
    //                 <li>Numero de Celular: <b>{location.state.datos.payer.number_phone}</b></li>

    //                 <li>Calle: <b>{location.state.datos.shipments.street_name}</b></li>
    //                 <li>Numero: <b>{location.state.datos.shipments.street_number}</b></li>
    //                 <li>Codigo postal: <b>{location.state.datos.shipments.zip_code}</b></li>
    //                 <li>Provincia: <b>{location.state.datos.shipments.state_name}</b></li>
    //                 <li>Localidad: <b>{location.state.datos.shipments.city_name}</b></li>
    //             </ul>
    //             <div>
    //                 <a className="btnComprar" rel='noopener' target='_blank' href={location.state.datos.init_point}>¡Pagar!</a>
    //             </div>
    //         </div>
    //     </div>
    // </section>
  );
}

export default Resumen;
