import { useEffect, useState } from "react"
import { getCategorias } from "../../fetch/fetch"
import { useNavigate } from "react-router-dom";
import './EditarEliminarCategoria.css'

export default function EditarEliminarCategoria() {
    const [categorias, setCategorias] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        getCat()
    }, [])

    const getCat = async () => {
        const res = await getCategorias()

        setCategorias(res.data)
        console.log("desde edit delete", res.data);

    }

    return (
        <section className="editarEliminar">
            {!categorias ? (
                <div>cargando</div>
            ) : categorias.length <= 0 ? (
                <div>No hay categorías</div>
            ) : (
                <div className="d-flex justify-content-center align-items-center flex-column">

                    <h4>Categorias</h4>
                    {categorias.map((cat) => (
                        <div key={cat.id} className="d-flex mb-3">
                                <div className="d-flex flex-column">
                                    <h5>{cat.name}</h5>
                                    <div className="d-flex gap-3">
                                        <button
                                            onClick={() => {
                                                navigate(`/admin/categoria/editar/${cat.id}`, {
                                                    state: {
                                                        categoria: cat
                                                    },
                                                })
                                            }}
                                            className="btnGoCheckout"
                                        >
                                            Editar
                                        </button>
                                        <button className="btnVaciarCarrito">Eliminar</button>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}