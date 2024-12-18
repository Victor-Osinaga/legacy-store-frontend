import React, { useEffect, useState } from "react";
import useStoreContext from "../../provider/storeProvider";
import "./Checkout.css";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getShipmentsLocalStore,
  getShipmentsDeliveryStore,
  createPaymentStore,
} from "../../fetch/fetch.js";
import {
  validateAreaCodeCheckout,
  validateEmailCheckout,
  validateNameCheckout,
  validateNumberCheckout,
  validateSurnameCheckout,
} from "../../validators/validators.js";
import getTextColor from "../../utils/getTextColor.js";

function Checkout() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "victor",
      surname: "osinaga",
      areaCode: "2966",
      numberPhone: "123456",
      email: "victor@victor.com",
      shipmentType: "",
      postalCode: "4400",
      streetName: "los Andes",
      streetNumber: "10",
      shipmentId: "",
      cityName: "salta capital",
    },
  });
  const {
    cart,
    toastLoading,
    toastSuccess,
    toastError,
    dismissToast,
    loadingConfig,
    configStore,
  } = useStoreContext();

  const [shipmentsLocal, setShipmentsLocal] = useState([]);
  const [shipmentsDelivery, setShipmentsDelivery] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (cart.length == 0) {
      navigate("/");
    }
    fetchShipmentsLocalStore();
    fetchShipmentsDeliveryStore();
    console.log("CARRITO: ", cart);

    return () => {
      dismissToast();
    };
  }, [cart]);

  const fetchShipmentsLocalStore = async () => {
    const id = toastLoading("Cargando formulario");
    try {
      const shipmentsLocalFetch = await getShipmentsLocalStore();
      setShipmentsLocal(shipmentsLocalFetch);

      setTimeout(() => {
        setLoading(false);
        if (shipmentsLocalFetch.length == 0) {
          return toastSuccess(
            <>
              No hay sucursales cargadas:{" "}
              <strong>'{shipmentsLocalFetch.length}'</strong>
            </>,
            id
          );
        }

        return toastSuccess(
          <>
            Sucursales cargadas: <strong>'{shipmentsLocalFetch.length}'</strong>
          </>,
          id
        );
      }, 500);
    } catch (error) {
      toastError(
        <div className="text-center">
          <p className="mb-0">
            <strong>{error.msg}</strong>
          </p>
        </div>,
        id
      );
    }
  };

  const fetchShipmentsDeliveryStore = async () => {
    const id = toastLoading("Cargando formulario");
    try {
      const shipmentsDeliveryFetch = await getShipmentsDeliveryStore();
      setShipmentsDelivery(shipmentsDeliveryFetch);

      setTimeout(() => {
        setLoading(false);
        if (shipmentsDeliveryFetch.length == 0) {
          return toastSuccess(
            <>
              No hay provincias cargadas:{" "}
              <strong>'{shipmentsDeliveryFetch.length}'</strong>
            </>,
            id
          );
        }

        return toastSuccess(
          <>
            Provincias cargadas:{" "}
            <strong>'{shipmentsDeliveryFetch.length}'</strong>
          </>,
          id
        );
      }, 500);
    } catch (error) {
      toastError(
        <div className="text-center">
          <p className="mb-0">
            <strong>{error.msg}</strong>
          </p>
        </div>,
        id
      );
    }
  };
  //   const validateEmail = (inputValue) => {
  //     const emailRegex =
  //       /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  //     // Comprobar si el valor del input coincide con el regex
  //     return emailRegex.test(inputValue);
  //   };

  const onSubmit = async (data) => {
    console.log("data", data);
    const toastId = toastLoading("Creando orden de pago...");
    try {
      // TYPE SHIPMENT
      if (data.shipmentType == "shipment_local") {
        const dataPayment = {
          products: cart.map((prod) => ({
            name: prod.name,
            image: prod.image,
            selectedSizeName: prod.selectedSizeName,
            selectedColorName: prod.selectedColorName,
            selectedColorValueHexa: prod.selectedColorValueHexa,
            price: prod.price,

            id: prod.id,
            selectedSizeId: prod.selectedSizeId,
            selectedColorId: prod.selectedColorId,
            quantity: prod.quantity,
          })),
          payer: {
            name: data.name,
            surname: data.surname,
            email: data.email,
            areaCode: data.areaCode,
            numberPhone: data.numberPhone,
          },
          shipment: {
            shipmentType: data.shipmentType,
            shipmentId: data.shipmentId,
          },
        };

        console.log("dataPayment", dataPayment);

        const payment = await createPaymentStore(dataPayment);
        console.log("PAYMENT", payment);

        setTimeout(() => {
          toastSuccess(<>Redireccionando...</>, toastId);

          navigate("/resumen", {
            state: {
              // datos: { link: payment.init_point, resumen: dataPayment, shipments: payment.shipments, externalReference: payment.externalReference },
              datos: { ...payment, resumen: dataPayment },
            },
          });
        }, 1000);
      } else if (data.shipmentType == "shipment_delivery") {
        const dataPayment = {
          products: cart.map((prod) => ({
            name: prod.name,
            image: prod.image,
            selectedSizeName: prod.selectedSizeName,
            selectedColorName: prod.selectedColorName,
            price: prod.price,

            id: prod.id,
            selectedSizeId: prod.selectedSizeId,
            selectedColorId: prod.selectedColorId,
            quantity: prod.quantity,
          })),
          payer: {
            name: data.name,
            surname: data.surname,
            email: data.email,
            areaCode: data.areaCode,
            numberPhone: data.numberPhone,
          },
          shipment: {
            shipmentType: data.shipmentType,
            shipmentId: data.shipmentId,
            receiverAddress: {
              zipCode: data.postalCode,
              cityName: data.cityName,
              streetName: data.streetName,
              streetNumber: data.streetNumber,
            },
          },
        };

        console.log("dataPayment", dataPayment);

        const payment = await createPaymentStore(dataPayment);
        console.log("PAYMENT", payment);

        setTimeout(() => {
          toastSuccess(<>Redireccionando...</>, toastId);

          navigate("/resumen", {
            state: {
              // datos: { link: payment.init_point, resumen: dataPayment, shipments: payment.shipments, externalReference: payment.externalReference },
              datos: { ...payment, resumen: dataPayment },
            },
          });
        }, 1000);
      }
    } catch (error) {
      toastError(
        <div className="text-center">
          <p className="mb-0">
            <strong>{error.msg}</strong>
          </p>
        </div>,
        toastId
      );
    }
  };

  // watch()

  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={true} /> */}
      <section
        className="checkout py-3 bgContainer"
        style={{
          backgroundColor: `${configStore.colors.tertiaryColorStore}`,
        }}
      >
        {!loading ? (
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 1rem",
              }}
            >
              <div className="d-flex align-items-center flex-column w-100">
                <div
                  style={{
                    color: `${getTextColor(
                      configStore.colors.tertiaryColorStore
                    )}`,
                  }}
                >
                  <h3 className="fs-5 mainTitleCheckout fw-bold text-center">
                    FORMULARIO DE CONTACTO Y ENVIO
                  </h3>
                </div>
                {/* <div className='rounded py-1'>
                                    <div className='d-flex bg-success px-4 py-1 justify-content-between align-items-center'>
                                        <button type='submit' className='btnPagar bg-success border border-0 text-white d-flex h-100 w-100 justify-content-center align-items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svg_plus text-white me-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                                            </svg>
                                            RESUMEN
                                        </button>
                                    </div>
                                </div> */}
              </div>
              <div
                className="formContainerCheckout bgSecondary rounded mt-4 mb-4 "
                data-shadow-color={getTextColor(
                  configStore.colors.tertiaryColorStore
                )}
                style={{
                  backgroundColor: `${configStore.colors.secondaryColorStore}`,
                  color: `${getTextColor(
                    configStore.colors.secondaryColorStore
                  )}`,
                }}
              >
                <div className="px-2 py-4 px-md-4 py-md-5 container-fluid">
                  <div className="row mb-1">
                    <h5 className="col-12 col-md-2 mb-4 text-center text-md-start formTitles">
                      Información de Contacto
                    </h5>
                    <div className="col-12 col-md-10 row mx-auto mb-4">
                      {/* NAME */}
                      <div className="col-6 col-md-6 mb-3">
                        <label
                          htmlFor="name"
                          className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="form-control fontSM-Custom custom-placeholder"
                          id="name"
                          placeholder="Juan"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "'Nombre' es requerido",
                            },
                            validate: validateNameCheckout,
                          })}
                        />
                        {errors.name && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.name.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>

                      {/* SURNAME */}
                      <div className="col-6 col-md-6 mb-3">
                        <label
                          htmlFor="surname"
                          className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom"
                        >
                          Apellido
                        </label>
                        <input
                          type="text"
                          className="form-control fontSM-Custom custom-placeholder"
                          id="surname"
                          placeholder="Perez"
                          {...register("surname", {
                            required: {
                              value: true,
                              message: "'Apellido' es requerido",
                            },
                            validate: validateSurnameCheckout,
                          })}
                        />
                        {errors.surname && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.surname.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>

                      {/* AREA CODE */}
                      <div className="col-6 col-md-6 mb-3">
                        <label
                          htmlFor="areaCode"
                          className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom"
                        >
                          Código de area
                        </label>
                        <input
                          type="number"
                          className="form-control fontSM-Custom custom-placeholder"
                          id="areaCode"
                          placeholder="2966"
                          {...register("areaCode", {
                            required: {
                              value: true,
                              message: "'Código de area' es requerido",
                            },
                            validate: validateAreaCodeCheckout,
                          })}
                        />
                        {errors.areaCode && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.areaCode.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>

                      {/* NUMBER PHONE */}
                      <div className="col-6 col-md-6 mb-3">
                        <label
                          htmlFor="numberPhone"
                          className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom"
                        >
                          Número
                        </label>
                        <input
                          type="number"
                          className="form-control fontSM-Custom custom-placeholder"
                          id="numberPhone"
                          placeholder="630973"
                          {...register("numberPhone", {
                            required: {
                              value: true,
                              message: "'Número' es requerido",
                            },
                            validate: validateNumberCheckout,
                          })}
                        />
                        {errors.numberPhone && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.numberPhone.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>

                      {/* EMAIL */}
                      <div className="col-12 col-md-12 mb-3">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control fontSM-Custom custom-placeholder"
                          id="email"
                          placeholder="juanperez@gmail.com"
                          {...register("email", {
                            required: {
                              value: true,
                              message: "'Email' es requerido",
                            },
                            validate: validateEmailCheckout,
                          })}
                        />
                        {errors.email && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.email.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <hr
                      className="w-75 mx-auto"
                      style={{
                        color: `${getTextColor(
                          configStore.colors.secondaryColorStore
                        )}`,
                      }}
                    />
                  </div>
                  <div className="row mb-1">
                    <h5 className="col-12 col-md-2 mb-4 text-center text-md-start formTitles">
                      Opciones de envio
                    </h5>
                    <div className="col-12 col-md-10 row mx-auto mb-4">
                      {/* CHECK RADIOS SHIPMENTS TYPES */}
                      <div className="col-12 col-md-12 row mb-3">
                        {/* CHECK RADIO TYPE SHIPMENT LOCAL */}
                        <div className="col-6 text-md-start text-center">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="shipment_local"
                            {...register("shipmentType", {
                              required: {
                                value: true,
                                message: "Elige una opcion de envio/retiro",
                              },
                            })}
                            onClick={() => {
                              setValue("shipmentId", "");
                            }}
                          />
                          <label
                            className="form-check-label ms-1 fw-bold checkoutLabelOption"
                            htmlFor="flexRadioDefault2"
                          >
                            Retiro en sucursal
                          </label>
                        </div>

                        {/* CHECK RADIO TYPE SHIPMENT DELIVERY */}
                        <div className="col-6 text-md-start text-center">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="shipment_delivery"
                            {...register("shipmentType", {
                              required: {
                                value: true,
                                message: "Elige una opcion de envio/retiro",
                              },
                            })}
                            onClick={() => {
                              setValue("shipmentId", "");
                            }}
                          />
                          <label
                            className="form-check-label ms-1 fw-bold checkoutLabelOption"
                            htmlFor="flexRadioDefault1"
                          >
                            Envio a domicilio
                          </label>
                        </div>
                        {errors.shipmentType && (
                          <span className="mt-1 fontXS-Custom text-danger text-md-start text-center">
                            {errors.shipmentType.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>

                      {/* SHIPMENT LOCAL INPUTS VISIBLE */}
                      {watch("shipmentType") == "shipment_local" && (
                        <>
                          <div className="col-12 col-md-12 mb-3">
                            <label
                              htmlFor="shipmentId"
                              className="form-label fw-semibold w-100 d-flex mb-1"
                            >
                              Elige una sucursal
                            </label>
                            <select
                              type="select"
                              className="form-select fontSM-Custom"
                              id="shipmentId"
                              {...register("shipmentId", {
                                required: {
                                  value: true,
                                  message: "Elige una sucursal",
                                },
                              })}
                            >
                              <option value="">Elige una sucursal</option>
                              {shipmentsLocal.map((s) => (
                                <option key={s.id} value={s.id} id={s.id}>
                                  {s.province}
                                </option>
                              ))}
                            </select>
                            {errors.shipmentId && (
                              <span className="mt-1 fontXS-Custom text-danger">
                                {errors.shipmentId.message}{" "}
                                <span className="fw-semibold">*</span>
                              </span>
                            )}
                          </div>
                          <div className="col-12 col-md-12 mb-3">
                            <label
                              htmlFor="cityName"
                              className="form-label fw-semibold w-100 d-flex mb-1"
                            >
                              Información de retiro
                            </label>
                            {(watch("shipmentId") &&
                              shipmentsLocal.find(
                                (s) => s.id === getValues("shipmentId")
                              ) && (
                                <div className="col-12 col-md-12 mb-3">
                                  {shipmentsLocal.map((s, index) => {
                                    if (s.id == getValues("shipmentId")) {
                                      return (
                                        <div key={index}>
                                          <p>
                                            Retira en: {s.province},{" "}
                                            {s.locality} - {s.postalCode}
                                          </p>
                                          <p>
                                            Dirección: {s.streetName},{" "}
                                            {s.streetNumber}
                                          </p>
                                        </div>
                                      );
                                    }
                                  })}
                                </div>
                              )) || (
                              <div>
                                <p>
                                  Por favor selecciona una sucursal para
                                  mostrarte la información de retiro del local,
                                  si no ves ninguna opción para elegir es
                                  posible que el dueño de la tienda todavia no
                                  haya configurado esta opción.
                                </p>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {/* SHIPMENT DELIVERY INPUTS VISIBLE*/}
                      {watch("shipmentType") == "shipment_delivery" && (
                        <>
                          <div className="col-12 col-md-12 mb-3">
                            <label
                              htmlFor="shipmentId"
                              className="form-label fw-semibold w-100 d-flex mb-1"
                            >
                              Elige una provincia
                            </label>
                            <select
                              type="select"
                              className="form-select fontSM-Custom"
                              id="shipmentId"
                              {...register("shipmentId", {
                                required: {
                                  value: true,
                                  message: "Elige una provincia",
                                },
                              })}
                            >
                              <option value="">Elige una provincia</option>
                              {shipmentsDelivery.map((s) => (
                                <option key={s.id} value={s.id} id={s.id}>
                                  {s.province}
                                </option>
                              ))}
                            </select>
                            {errors.shipmentId && (
                              <span className="mt-1 fontXS-Custom text-danger">
                                {errors.shipmentId.message}{" "}
                                <span className="fw-semibold">*</span>
                              </span>
                            )}
                          </div>

                          <div className="col-12 col-md-12 mb-3">
                            <label
                              htmlFor="cityName"
                              className="form-label fw-semibold w-100 d-flex mb-1"
                            >
                              Información de envio
                            </label>
                            {(watch("shipmentId") &&
                              shipmentsDelivery.find(
                                (s) => s.id === getValues("shipmentId")
                              ) && (
                                <>
                                  {/* cityName */}
                                  <div className="col-12 col-md-6 mb-3">
                                    <label
                                      htmlFor="cityName"
                                      className="form-label fw-semibold w-100 d-flex mb-1"
                                    >
                                      Localidad
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control fontSM-Custom"
                                      id="cityName"
                                      {...register("cityName", {
                                        required: {
                                          value: true,
                                          message:
                                            "Debes ingresar una localidad",
                                        },
                                        validate: function (v) {
                                          if (v.length < 3 || v.length > 40) {
                                            return "La localidad debe tener entre 3 y 40 caracteres";
                                          }
                                        },
                                      })}
                                    />
                                    {errors.cityName && (
                                      <span className="mt-1 fontXS-Custom text-danger">
                                        {errors.cityName.message}{" "}
                                        <span className="fw-semibold">*</span>
                                      </span>
                                    )}
                                  </div>

                                  {/* POSTAL CODE */}
                                  <div className="col-12 col-md-6 mb-3">
                                    <label
                                      htmlFor="postalCode"
                                      className="form-label fw-semibold w-100 d-flex mb-1"
                                    >
                                      Código postal
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control fontSM-Custom"
                                      id="postalCode"
                                      {...register("postalCode", {
                                        required: {
                                          value: true,
                                          message:
                                            "Debes ingresar un 'código postal'",
                                        },
                                        validate: function (v) {
                                          if (v.length < 2 || v.length > 10) {
                                            return "El 'código postal' debe tener entre 2 y 10 caracteres";
                                          }
                                        },
                                      })}
                                    />
                                    {errors.postalCode && (
                                      <span className="mt-1 fontXS-Custom text-danger">
                                        {errors.postalCode.message}{" "}
                                        <span className="fw-semibold">*</span>
                                      </span>
                                    )}
                                  </div>

                                  {/* STREET NAME */}
                                  <div className="col-12 col-md-6 mb-3">
                                    <label
                                      htmlFor="streetName"
                                      className="form-label fw-semibold w-100 d-flex mb-1"
                                    >
                                      Nombre de calle
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control fontSM-Custom"
                                      id="streetName"
                                      {...register("streetName", {
                                        required: {
                                          value: true,
                                          message:
                                            "Debes ingresar el nombre de la 'calle'",
                                        },
                                        validate: function (v) {
                                          if (v.length < 2 || v.length > 10) {
                                            return "El nombre de la 'calle' debe tener entre 2 y 10 caracteres";
                                          }
                                        },
                                      })}
                                    />
                                    {errors.streetName && (
                                      <span className="mt-1 fontXS-Custom text-danger">
                                        {errors.streetName.message}{" "}
                                        <span className="fw-semibold">*</span>
                                      </span>
                                    )}
                                  </div>

                                  {/* STREET NUMBER */}
                                  <div className="col-12 col-md-6 mb-3">
                                    <label
                                      htmlFor="streetNumber"
                                      className="form-label fw-semibold w-100 d-flex mb-1"
                                    >
                                      Número de dpto/casa
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control fontSM-Custom"
                                      id="streetNumber"
                                      {...register("streetNumber", {
                                        required: {
                                          value: true,
                                          message: "Debes ingresar el 'número'",
                                        },
                                        validate: function (v) {
                                          // Intentar convertir la cadena a número
                                          const numberValue = Number(v);

                                          // Validar si la conversión resultó en un número válido
                                          if (isNaN(numberValue)) {
                                            return "El valor debe ser un número";
                                          }

                                          // Validar si es un número entero
                                          if (!Number.isInteger(numberValue)) {
                                            return "El valor debe ser un número entero";
                                          }

                                          // Validar que no sea negativo ni 0
                                          if (numberValue <= 0) {
                                            return "El valor debe ser mayor que 0";
                                          }

                                          // Verificar la longitud de la cadena original
                                          if (v.length < 1 || v.length > 10) {
                                            return "El 'número' debe tener entre 1 y 10 caracteres";
                                          }

                                          // Si pasa todas las validaciones
                                          return true;
                                        },
                                      })}
                                    />
                                    {errors.streetNumber && (
                                      <span className="mt-1 fontXS-Custom text-danger">
                                        {errors.streetNumber.message}{" "}
                                        <span className="fw-semibold">*</span>
                                      </span>
                                    )}
                                  </div>
                                </>
                              )) || (
                              <div>
                                <p>
                                  Por favor selecciona una provincia, si no ves
                                  la provincia a la que deseas que enviemos tus
                                  productos es posible que el dueño de la tienda
                                  todavia no realize envios hacia esa provincia.
                                </p>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {/* <hr className='text-secondary w-75 mx-auto' /> */}
                  </div>
                </div>
              </div>
              <div className="btnResumen rounded mb-2 text-white">
                <button type="submit" className="m-0 fw-semibold">
                  RESUMEN
                </button>
              </div>
            </form>
          </div>
        ) : (
          <section className="spinnerContainer">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </section>
        )}
      </section>
    </>
  );
}

export default Checkout;
