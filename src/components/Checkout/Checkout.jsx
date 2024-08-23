import React, { useEffect, useState } from "react";
import useStoreContext from "../../provider/storeProvider";
import './Checkout.css'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { validateAreaCodeCheckout, validateEmailCheckout, validateNameCheckout, validateNumberCheckout, validateSurnameCheckout } from "../../validators/validators.js";

function Checkout() {
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors }, } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            areaCode: "",
            phone: "",
            email: "",
            radioGroup: "",
            stateName: "",
            cityName: ""
        }
    })
    const { handleBuy, getProvincias, getSucursales, cart } = useStoreContext();
    const [provincias, setProvincias] = useState(getProvincias())
    const [sucursales, setSucursales] = useState(getSucursales())
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [areaCode, setAreaCode] = useState('')
    const [phone, setPhone] = useState('')
    const [stateName, setStateName] = useState('')
    const [cityName, setCityName] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [streetName, setStreetName] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [selectedProvince, setSelectedProvince] = useState({
        name: '', // Nombre de la provincia seleccionada
        id: ''    // ID de la provincia seleccionada
    });

    useEffect(() => {
        if (cart.length == 0) {
            navigate('/');
        }
    }, [cart])
    const handleProvinceChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        setSelectedProvince({
            name: selectedOption.value,
            id: selectedOption.id
        });
        console.log("prov y id", selectedOption.value, selectedOption.id);
    };

    const handleName = (value) => {
        // console.log("el valor", value);
        setName(value)
    }
    const handleSurName = (value) => {
        // console.log("el valor", value);
        setSurname(value)
    }
    const handleEmail = (event) => {
        // console.log("el valor", event.target.value);
        setEmail(event.target.value)
        const isValidEmail = validateEmail(event.target.value);
        // if(isValidEmail === 0)return
        event.target.classList.toggle('is-valid', isValidEmail);
        event.target.classList.toggle('is-invalid', !isValidEmail);
    }
    const handleAreaCode = (value) => {
        // console.log("el valor", value);
        setAreaCode(value)
    }
    const handlePhone = (value) => {
        // console.log("el valor", value);
        setPhone(value)
    }
    const handleStateName = (value) => {
        // console.log("el valor", value);
        setStateName(value)
    }
    const handleCityName = (value) => {
        // console.log("el valor", value);
        setCityName(value)
    }
    const handleZipCode = (value) => {
        // console.log("el valor", value);
        setZipCode(value)
    }
    const handleStreetName = (value) => {
        // console.log("el valor", value);
        setStreetName(value)
    }
    const handleStreetNumber = (value) => {
        // console.log("el valor", value);
        setStreetNumber(value)
    }

    // const prevent = async (event) => {
    //     event.preventDefault();
    //     const result = await handleBuy();
    //     // result.status === 'ok' ? navigate('/resumen', { state: { datos: { nombre: 'Juan', edad: 30 } } }) : navigate('error')
    //     // result.status === 'ok' ? navigate('/resumen', { state: result }) : navigate('error')
    //     //  si salio OK enviar la data (link MP) sino no enviar nada
    //     navigate('/resumen', { state: { datos: { link: result.data, resumen: result.buyOrder } } })
    // }
    const validateEmail = (inputValue) => {
        // if(inputValue.length == 0)return 0
        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

        // Comprobar si el valor del input coincide con el regex
        return emailRegex.test(inputValue);
    };

    const prevent = async (event) => {
        event.preventDefault()
        const toastId = toast.loading(
            <div> <strong>Comprobando</strong>...</div>,
            {
                style: {
                    position: 'relative',
                    minWidth: '480px',
                    zIndex: '1000000'
                }
            }
        );
        const inputs = event.target.querySelectorAll('input');
        let allInputsValid = true;

        // Recorrer los inputs y verificar sus clases
        inputs.forEach((input) => {
            if (!input.classList.contains('is-valid')) {
                // Si un input no tiene la clase "is-valid", establecer allInputsValid en false
                allInputsValid = false;
            }
        });

        if (allInputsValid) {
            const result = await handleBuy();
            if (result.status === 'ok') {
                toast.success(
                    <div><strong>Redireccionando...</strong></div>,
                    {
                        id: toastId
                    }
                );
                // setTimeout(() => {
                navigate('/resumen', {
                    state: {
                        datos: { link: result.data.init_point, resumen: result.buyOrder, shipmentCost: result.data.costShipment, idOrder: result.data.idOrder },
                    },
                });
                // }, 1000);
                // navigate('/resumen', { state: { datos: { link: result.data, resumen: result.buyOrder } } })
            }
        } else {
            // Si al menos un input no tiene la clase "is-valid", mostrar un mensaje de error o tomar alguna otra acción
            toast.error(
                <div><strong>Porfavor complete todos los campos correctamente...</strong>...</div>,
                {
                    id: toastId
                }
            );
        }
    }

    const onSubmit = async (data) => {
        console.log("data", data);

    }

    // watch()

    return (
        <>
            <Toaster position="top-right" reverseOrder={true} />
            <section className='checkout p-3 p-md-4 bgContainer'>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='d-flex align-items-center flex-column w-100'>
                            <div className="">
                                <h3 className='fs-5 mainTitleCheckout '>FORMULARIO DE CONTACTO Y ENVIO</h3>
                            </div>
                            <div className='rounded py-1'>
                                <div className='d-flex bg-success px-4 py-1 justify-content-between align-items-center'>

                                    <button type='submit' id='submitNewClient' className='btnPagar bg-success border border-0 text-white d-flex h-100 w-100 justify-content-center align-items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svg_plus text-white me-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                                        </svg>
                                        RESUMEN
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='formContainerCheckout bgSecondary rounded mt-4 border shadow-lg'>
                            <div className='px-2 py-4 px-md-4 py-md-5 container-fluid'>
                                <div className='row mb-1'>
                                    <h5 className='col-12 col-md-2 mb-4 text-center text-md-start formTitles'>Información de Contacto</h5>
                                    <div className='col-12 col-md-10 row mx-auto mb-4'>
                                        <div className='col-6 col-md-6 mb-3'>
                                            <label htmlFor="name" className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control fontSM-Custom custom-placeholder"
                                                id="name"
                                                placeholder="Juan"
                                                {...register('name', {
                                                    required: {
                                                        value: true,
                                                        message: "'Nombre' es requerido"
                                                    },
                                                    validate: validateNameCheckout
                                                })}
                                            />
                                            {errors.name && <span className="mt-1 fontXS-Custom text-danger">{errors.name.message} <span className='fw-semibold'>*</span></span>}
                                        </div>
                                        <div className='col-6 col-md-6 mb-3'>
                                            <label htmlFor="surname" className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">Apellido</label>
                                            <input
                                                type="text"
                                                className="form-control fontSM-Custom custom-placeholder"
                                                id="surname"
                                                placeholder="Perez"
                                                {...register("surname", {
                                                    required: {
                                                        value: true,
                                                        message: "'Apellido' es requerido"
                                                    },
                                                    validate: validateSurnameCheckout
                                                })}
                                            />
                                            {errors.surname && <span className="mt-1 fontXS-Custom text-danger">{errors.surname.message} <span className='fw-semibold'>*</span></span>}
                                        </div>

                                        <div className='col-6 col-md-6 mb-3'>
                                            <label htmlFor="areaCode" className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">Código de area</label>
                                            <input
                                                type="number"
                                                className="form-control fontSM-Custom custom-placeholder"
                                                id="areaCode"
                                                placeholder="2966"
                                                {...register("areaCode", {
                                                    required: {
                                                        value: true,
                                                        message: "'Código de area' es requerido"
                                                    },
                                                    validate: validateAreaCodeCheckout
                                                })}
                                            />
                                            {errors.areaCode && <span className="mt-1 fontXS-Custom text-danger">{errors.areaCode.message} <span className='fw-semibold'>*</span></span>}
                                        </div>
                                        <div className='col-6 col-md-6 mb-3'>
                                            <label htmlFor="phone" className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">Número</label>
                                            <input
                                                type="number"
                                                className="form-control fontSM-Custom custom-placeholder"
                                                id="phone"
                                                placeholder="630973"
                                                {...register("phone", {
                                                    required: {
                                                        value: true,
                                                        message: "'Número' es requerido"
                                                    },
                                                    validate: validateNumberCheckout
                                                })}
                                            />
                                            {errors.phone && <span className="mt-1 fontXS-Custom text-danger">{errors.phone.message} <span className='fw-semibold'>*</span></span>}
                                        </div>
                                        <div className='col-12 col-md-12 mb-3'>
                                            <label htmlFor="email" className="form-label fw-semibold w-100 d-flex mb-1 fontSM-Custom">Email</label>
                                            <input
                                                type="text"
                                                className="form-control fontSM-Custom custom-placeholder"
                                                id="email"
                                                placeholder="juanperez@gmail.com"
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: "'Email' es requerido"
                                                    },
                                                    validate: validateEmailCheckout
                                                })}
                                            />
                                            {errors.email && <span className="mt-1 fontXS-Custom text-danger">{errors.email.message} <span className='fw-semibold'>*</span></span>}
                                        </div>
                                    </div>
                                    <hr className='text-secondary' />
                                </div>
                                <div className='row mb-1'>
                                    <h5 className='col-12 col-md-2 mb-4 text-center text-md-start formTitles'>Opciones de envio</h5>
                                    <div className='col-12 col-md-10 row mx-auto mb-4'>

                                        <div className="col-12 col-md-12 row mb-3">
                                            <div className="col-6">
                                                <input
                                                    class="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault2"
                                                    value="local"
                                                    {...register('radioGroup', {
                                                        required: {
                                                            value: true,
                                                            message: "Elige una opcion de envio/retiro"
                                                        }
                                                    })}
                                                // onClick={() => {
                                                //     setValue('radioGroup', "local")
                                                //     setValue('stateName', "")
                                                // }}
                                                />
                                                <label class="form-check-label ms-1" for="flexRadioDefault2">
                                                    Retiro en sucursal
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    class="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault1"
                                                    value="domicilio"
                                                    {...register('radioGroup', {
                                                        required: {
                                                            value: true,
                                                            message: "Elige una opcion de envio/retiro"
                                                        }
                                                    })}
                                                // onClick={() => {
                                                //     setValue('radioGroup', "domicilio")
                                                //     setValue('stateName', "")
                                                // }}
                                                />
                                                <label class="form-check-label ms-1" for="flexRadioDefault1">
                                                    Envio a domicilio
                                                </label>
                                            </div>
                                            {errors.radioGroup && <span className="mt-1 fontXS-Custom text-danger text-center">{errors.radioGroup.message} <span className='fw-semibold'>*</span></span>}
                                        </div>
                                        {watch('radioGroup') == "domicilio" && <>
                                            <div className='col-12 col-md-6 mb-3'>
                                                <label htmlFor="stateName" className="form-label fw-semibold w-100 d-flex mb-1">Elige una provincia</label>
                                                <select
                                                    type="select"
                                                    className="form-select fontSM-Custom"
                                                    id="stateName"
                                                    {...register('stateName', {
                                                        required: {
                                                            value: true,
                                                            message: "Elige donde lo enviamos"
                                                        }
                                                    })}
                                                >
                                                    <option value="">Elige una provincia</option>
                                                    {provincias.map(prov => (
                                                        <option key={prov.id} value={prov.id} id={prov.id}>
                                                            {prov.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.stateName && <span className="mt-1 fontXS-Custom text-danger">{errors.stateName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                            <div className='col-12 col-md-6 mb-3'>
                                                <label htmlFor="cityName" className="form-label fw-semibold w-100 d-flex mb-1">Localidad</label>
                                                <input
                                                    type="text"
                                                    className="form-control fontSM-Custom"
                                                    id="cityName"
                                                    {...register('cityName', {
                                                        required: {
                                                            value: true,
                                                            message: "Debes ingresar una localidad"
                                                        },
                                                        validate: function (v) {
                                                            if (v.length < 3 || v.length > 40) {
                                                                return "La localidad debe tener entre 3 y 40 caracteres"
                                                            }
                                                        }
                                                    })}

                                                />
                                                {errors.cityName && <span className="mt-1 fontXS-Custom text-danger">{errors.cityName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </>}
                                        {watch('radioGroup') == "local" && <>
                                            <div className='col-12 col-md-6 mb-3'>
                                                <label htmlFor="stateName" className="form-label fw-semibold w-100 d-flex mb-1">Elige una sucursal</label>
                                                <select
                                                    type="select"
                                                    className="form-select fontSM-Custom"
                                                    id="stateName"
                                                    {...register('stateName', {
                                                        required: {
                                                            value: true,
                                                            message: "Elige una sucursal"
                                                        }
                                                    })}
                                                >
                                                    <option value="">Elige una sucursal</option>
                                                    {sucursales.map(s => (
                                                        <option key={s.id} value={s.id} id={s.id}>
                                                            {s.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.stateName && <span className="mt-1 fontXS-Custom text-danger">{errors.stateName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                            {watch('stateName') && sucursales.find(s => s.id === getValues('stateName')) && (
                                                <div className='col-12 col-md-6 mb-3'>
                                                    <label htmlFor="cityName" className="form-label fw-semibold w-100 d-flex mb-1">Localidad</label>
                                                    <input
                                                        type="text"
                                                        className="form-control fontSM-Custom"
                                                        id="cityName"
                                                        defaultValue={sucursales.find(s => s.id === getValues('stateName'))?.localidad || ""}
                                                        onChange={setValue("cityName", sucursales.find(s => s.id === getValues('stateName'))?.localidad || "")}
                                                    />
                                                    {errors.cityName && (
                                                        <span className="mt-1 fontXS-Custom text-danger">
                                                            {errors.cityName.message} <span className='fw-semibold'>*</span>
                                                        </span>
                                                    )}
                                                </div>
                                            ) || (
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label htmlFor="cityName" className="form-label fw-semibold w-100 d-flex mb-1">Localidad</label>
                                                        <input
                                                            type="text"
                                                            className="form-control fontSM-Custom"
                                                            id="cityName"
                                                            defaultValue={ ""}
                                                            onChange={setValue("cityName", sucursales.find(s => s.id === getValues('stateName'))?.localidad || "")}
                                                        />
                                                        {errors.cityName && (
                                                            <span className="mt-1 fontXS-Custom text-danger">
                                                                {errors.cityName.message} <span className='fw-semibold'>*</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            {/* <div className='col-12 col-md-6 mb-3'>
                                                <label htmlFor="zipCode" className="form-label fw-semibold w-100 d-flex mb-1">Código postal</label>
                                                <input type="text"
                                                    onChange={(event) => { handleZipCode(event.target.value) }}
                                                    className={`form-control ${zipCode.length == 0
                                                        ? ""
                                                        : zipCode.length > 3
                                                            ? "is-valid"
                                                            : "is-invalid"
                                                        }`}
                                                    id="zipCode"
                                                    name="zipCode"
                                                    required />
                                                <div className="valid-feedback">
                                                    Completo!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Incompleto!
                                                </div>
                                            </div> */}
                                            {/* <div className='col-12 col-md-6 mb-3'>
                                                <label htmlFor="streetName" className="form-label fw-semibold w-100 d-flex mb-1">Calle</label>
                                                <input type="text"
                                                    onChange={(event) => { handleStreetName(event.target.value) }}
                                                    className={`form-control ${streetName.length == 0
                                                        ? ""
                                                        : streetName.length > 3
                                                            ? "is-valid"
                                                            : "is-invalid"
                                                        }`}
                                                    id="streetName"
                                                    name="streetName"
                                                    required />
                                                <div className="valid-feedback">
                                                    Completo!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Incompleto!
                                                </div>
                                            </div> */}
                                            {/* <div className='col-12 col-md-6 mb-3'>
                                                <label htmlFor="streetNumber" className="form-label fw-semibold w-100 d-flex mb-1">Número</label>
                                                <input type="text"
                                                    onChange={(event) => { handleStreetNumber(event.target.value) }}
                                                    className={`form-control ${streetNumber.length == 0
                                                        ? ""
                                                        : streetNumber.length > 3
                                                            ? "is-valid"
                                                            : "is-invalid"
                                                        }`}
                                                    id="streetNumber"
                                                    name="streetNumber"
                                                    required />
                                                <div className="valid-feedback">
                                                    Completo!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Incompleto!
                                                </div>
                                            </div> */}
                                        </>}
                                        {/* <div className='col-12 col-md-6 mb-3'>
                                            <label htmlFor="cityName" className="form-label fw-semibold w-100 d-flex mb-1">Localidad</label>
                                            <input type="text"
                                                onChange={(event) => { handleCityName(event.target.value) }}
                                                className={`form-control ${cityName.length == 0
                                                    ? ""
                                                    : cityName.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="cityName"
                                                name="cityName"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div> */}
                                        {/* <div className='col-12 col-md-6 mb-3'>
                                            <label htmlFor="zipCode" className="form-label fw-semibold w-100 d-flex mb-1">Código postal</label>
                                            <input type="text"
                                                onChange={(event) => { handleZipCode(event.target.value) }}
                                                className={`form-control ${zipCode.length == 0
                                                    ? ""
                                                    : zipCode.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="zipCode"
                                                name="zipCode"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mb-3'>
                                            <label htmlFor="streetName" className="form-label fw-semibold w-100 d-flex mb-1">Calle</label>
                                            <input type="text"
                                                onChange={(event) => { handleStreetName(event.target.value) }}
                                                className={`form-control ${streetName.length == 0
                                                    ? ""
                                                    : streetName.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="streetName"
                                                name="streetName"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mb-3'>
                                            <label htmlFor="streetNumber" className="form-label fw-semibold w-100 d-flex mb-1">Número</label>
                                            <input type="text"
                                                onChange={(event) => { handleStreetNumber(event.target.value) }}
                                                className={`form-control ${streetNumber.length == 0
                                                    ? ""
                                                    : streetNumber.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="streetNumber"
                                                name="streetNumber"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* <hr className='text-secondary' /> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )


}

export default Checkout;