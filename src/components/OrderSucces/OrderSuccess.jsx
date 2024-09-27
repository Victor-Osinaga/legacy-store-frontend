import './orderSuccess.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function OrderSuccess() {
    const [copied, setCopied] = useState(false);

    const navigate = useNavigate()
    const location = useLocation()
    const [externalReference, setExternalReference] = useState(false);

    console.log("URL completa antes de redirigir:", `${window.location.origin + location.pathname}`);

    // useEffect(() => {
    //     navigate("/orden/completa")
    // }, []);

    useEffect(() => {
        // Crear un objeto de URLSearchParams para obtener los query parameters
        const queryParams = new URLSearchParams(location.search);

        // Obtener el valor de 'external_reference' de los query parameters
        const externalReferenceFromParams = queryParams.get('external_reference');

        console.log("externalReferenceFromParams", externalReferenceFromParams);


        // Guardar el external_reference en el estado local
        if (externalReferenceFromParams) {
            setExternalReference(externalReferenceFromParams);
        }

        // Redirigir a la URL limpia sin query parameters
        // Usamos 'replace: true' para evitar que el componente entre en un bucle de redirecciones
        if (location.search) {
            navigate('/orden/completa', { replace: true });
        }
    }, [location.search, navigate]); // Solo ejecuta el efecto cuando cambia 'location.search'

    const handleCopy = () => {
        navigator.clipboard.writeText(externalReference).then(() => {
            setCopied(true);
            // Cambiar el estado de nuevo a "no copiado" después de unos segundos
            setTimeout(() => setCopied(false), 2500);
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    };

    return (
        <>
            <section className='orderSuccessContainer d-flex align-items-center justify-content-center'>
                <div className='orderSuccess rounded mx-auto px-4 py-4 gap-3 d-flex flex-column justify-content-center align-items-center'>
                    {externalReference ? (
                        <>
                            <svg className='text-success' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" />
                            </svg>
                            <h4 className='fw-bold'>¡Compra realizada!</h4>
                            <div className=''>
                                <p className='fontSM-Custom'>
                                    ID de orden: <span className='fw-bold text-decoration-underline'>{externalReference}</span>

                                    {copied ? (
                                        <>
                                            <button className='btn btn-secondary btn-sm ms-2 '>

                                                ¡Copiado!
                                                {/* <svg className='ms-1' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" />
                                        </svg> */}
                                                {/* <svg className='text-success ms-1' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" />
                                        </svg> */}
                                                <svg className='ms-1' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                                                </svg>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={handleCopy} className='btn btn-secondary btn-sm ms-2'>
                                                Copiar
                                            </button>
                                        </>
                                    )}
                                </p>
                                <p className='fontSM-Custom'>Puede ver el estado de tu compra utilizando el 'ID de orden' haciendo click abajo en 'Ver estado de orden'</p>
                                <Link className='btnCheckout rounded text-white' to={`/orden/estado/${externalReference}`}>
                                    <button>VER ESTADO</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <h4 className='fw-bold'>No hay datos de orden</h4>
                        </>
                    )}
                </div>
            </section>
        </>
    )
}