import React, { useEffect, useState } from "react";
import useStoreContext from "../../provider/storeProvider";
import './Checkout.css'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { handleBuy, getProvincias, cart } = useStoreContext();
    const [provincias, setProvincias] = useState(getProvincias())
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

    useEffect(()=>{
        if(cart.length == 0){
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

    return (
        <>
            <Toaster position="top-right" reverseOrder={true} />
            <section className='checkout'>
                <div>
                    <form onSubmit={prevent}>
                        <div className='d-flex align-items-center flex-column w-100'>
                            <div className="">
                                <h3 className='fs-4 mainTitle'>Formulario de contacto</h3>
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
                        <div className='bg-white rounded mt-4 border'>
                            <div className='px-4 py-5 container'>
                                <div className='row mb-4'>
                                    <h5 className='col-12 col-md-2 mb-4 text-center text-md-start formTitles'>Info de Contacto</h5>
                                    <div className='col-md-10 col-12 row mb-4'>
                                        <div className='col-12 col-md-6 mb-3'>
                                            {/* <label htmlFor="name1" className='form-label w-100 d-flex mb-1'>
                                            <div className='fw-semibold'>
                                                Nombre
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input type="text" id="name1" name='name' className='form-control is-valid ps-2 w-100' required />
                                            </div>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div> */}

                                            <label htmlFor="name" className="form-label fw-semibold w-100 d-flex mb-1">Nombre</label>
                                            <input onChange={(event) => { handleName(event.target.value) }}
                                                type="text"
                                                className={`form-control ${name.length == 0
                                                    ? ""
                                                    : name.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="name"
                                                name="name"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mb-3'>
                                            {/* <label htmlFor="surname" className='w-100 d-flex mb-1 form-label'>
                                            <div className='fw-semibold'>
                                                Apellido
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input type="text" id="surname" name='surname' className='rounded form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
                                            <label htmlFor="surname" className="form-label fw-semibold w-100 d-flex mb-1">Apellido</label>
                                            <input type="text"
                                                onChange={(event) => { handleSurName(event.target.value) }}
                                                className={`form-control ${surname.length == 0
                                                    ? ""
                                                    : surname.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="surname"
                                                name="surname"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mb-3'>
                                            {/* <label htmlFor="email" className='w-100 d-flex mb-1 form-label'>
                                            <div className='fw-semibold'>
                                                Email
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input name='email' type="email" id="email" className='rounded form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
                                            <label htmlFor="email" className="form-label fw-semibold w-100 d-flex mb-1">Email</label>
                                            <input type="text"
                                                onChange={(event) => { handleEmail(event, event.target.value) }}
                                                className={`form-control`}
                                                id="email"
                                                name="email"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mb-3'>
                                            {/* <label htmlFor="areaCode" className='w-100 d-flex mb-1 form-label'>
                                            <div className='fw-semibold'>
                                                Código de area
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input name='areaCode' type="text" id="areaCode" className='rounded form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
                                            <label htmlFor="areaCode" className="form-label fw-semibold w-100 d-flex mb-1">Código de area</label>
                                            <input type="text"
                                                onChange={(event) => { handleAreaCode(event.target.value) }}
                                                className={`form-control ${areaCode.length == 0
                                                    ? ""
                                                    : areaCode.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="areaCode"
                                                name="areaCode"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mb-3'>
                                            {/* <label htmlFor="phone" className='w-100 d-flex mb-1 form-label'>
                                            <div className='fw-semibold'>
                                                Teléfono
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input name='phone' type="text" id="phone" className='rounded form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
                                            <label htmlFor="phone" className="form-label fw-semibold w-100 d-flex mb-1">Teléfono</label>
                                            <input type="number"
                                                onChange={(event) => { handlePhone(event.target.value) }}
                                                className={`form-control ${phone.length == 0
                                                    ? ""
                                                    : phone.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="phone"
                                                name="phone"
                                                required />
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='text-secondary' />
                                </div>
                                <div className='row mb-4'>
                                    <h5 className='col-12 col-md-2 mb-4 text-center text-md-start formTitles'>Enviar a</h5>
                                    <div className='col-md-10 col-12 row mb-4'>
                                        <div className='col-12 col-md-6 mb-3'>
                                            {/* <label htmlFor="stateName" className='w-100 d-flex mb-1'>
                                            <div className='fw-semibold'>
                                                Provincia
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input name='stateName' type="text" id="stateName" className='form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
                                            <label htmlFor="stateName" className="form-label fw-semibold w-100 d-flex mb-1">Provincia</label>
                                            <select name="" id="stateName" onChange={(e)=>{handleProvinceChange(e)}}
                                                className={`form-control ${selectedProvince.name.length == 0
                                                    ? ""
                                                    : selectedProvince.name.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                            >
                                                {/* <option key="" value="" id="">
                                                    Seleccione
                                                </option> */}
                                                <option key="0" value="Retiro en Puesto San Julián" id="0">
                                                    Retiro en Puesto San Julián
                                                </option>
                                                {provincias.map(prov => (
                                                    <option key={prov.id} value={prov.nombre} id={prov.id}>
                                                        {prov.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <input type="text"
                                                onChange={(event) => { handleStateName(event.target.value) }}
                                                className={`form-control ${stateName.length == 0
                                                    ? ""
                                                    : stateName.length > 3
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    }`}
                                                id="stateName"
                                                name="stateName"
                                                required /> */}
                                            <div className="valid-feedback">
                                                Completo!
                                            </div>
                                            <div className="invalid-feedback">
                                                Incompleto!
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mb-3'>
                                            {/* <label htmlFor="cityName" className='w-100 d-flex mb-1 form-label'>
                                            <div className='fw-semibold'>
                                                Departamento
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input name='cityName' type="text" id="cityName" className='rounded form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
                                            <label htmlFor="cityName" className="form-label fw-semibold w-100 d-flex mb-1">Departamento</label>
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
                                        </div>
                                        <div className='col-12 col-md-6 mb-3'>
                                            {/* <label htmlFor="zipCode" className='w-100 d-flex mb-1 form-label'>
                                            <div className='fw-semibold'>
                                                Código postal
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input name='zipCode' type="text" id="zipCode" className='rounded form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
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
                                            {/* <label htmlFor="streetName" className='w-100 d-flex mb-1 form-label'>
                                            <div className='fw-semibold'>
                                                Calle
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input name='streetName' type="text" id="streetName" className='rounded form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
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
                                            {/* <label htmlFor="streetNumber" className='w-100 d-flex mb-1 form-label'>
                                            <div className='fw-semibold'>
                                                Número
                                                <span>*</span>
                                            </div>
                                        </label>
                                        <div>
                                            <div className='mb-1'>
                                                <input name='streetNumber' type="text" id="streetNumber" className='rounded form-control ps-2 w-100' required />
                                            </div>
                                            <span>info</span>
                                        </div> */}
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
                                        </div>
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