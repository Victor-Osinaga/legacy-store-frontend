import React, { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import './ItemListContainer.css';
import Footer from "../footer/footer";
import Bienvenida from "../Bienvenida/Bienvenida";
import useStoreContext from "../../provider/storeProvider.jsx";



function ItemListContainer({ titulo }) {
    const { products, getItemsByPrimaryCategoryContext, getItemsBySecondaryCategoryContext, getItemsByTerciaryCategoryContext } = useStoreContext()
    const [productos, setProductos] = useState(products);

    const { name, categoryid, subcategoryname, subcategoryid, subsubcategoryname, subsubcategoryid } = useParams();
    // console.log(name, categoryid, subcategoryname, subcategoryid);

    useEffect(() => {
        if (!categoryid && !subcategoryid && !subsubcategoryid) {
            // setTimeout(() => {
                setProductos(products)
            // }, 3000);
        } else if (categoryid && !subcategoryid && !subsubcategoryid) {
            // getItemsByPrimaryCategory(categoryid).then(respuestaPromise => {
            //     setProductos(respuestaPromise);
            // })
            const products = getItemsByPrimaryCategoryContext(categoryid)
            setProductos(products)
        } else if (subcategoryid && !categoryid) {
            // getItemsBySecondaryCategory(subcategoryid).then(respuestaPromise => {
            //     setProductos(respuestaPromise);
            // })
            const products = getItemsBySecondaryCategoryContext(subcategoryid)
            setProductos(products)
        } else if (subsubcategoryid && !categoryid && !subcategoryid) {
            // getItemsByTerciaryCategory(subsubcategoryid).then(respuestaPromise => {
            //     setProductos(respuestaPromise);
            // })
            const products = getItemsByTerciaryCategoryContext(subsubcategoryid)
            setProductos(products)
        }
    }, [products, name, categoryid, subcategoryid, subsubcategoryid, subcategoryname, subsubcategoryname]);

    let content; // Variable para almacenar el contenido JSX

    if (categoryid && !subcategoryid && !subsubcategoryid) {
        content = (
            <>
                <span className="glitch" data-text={titulo.toUpperCase()}>{titulo.toUpperCase()}</span>
                <span className="glitch" data-text={name.toUpperCase()}>
                    {name.toUpperCase()}
                </span>
            </>
        );
    } else if (subcategoryid && !categoryid && !subsubcategoryid) {
        content = (
            <>
                <span className="" data-text={`${titulo.toUpperCase()} ${name.toUpperCase()} > ${subcategoryname?.toUpperCase()}`}>
                    {titulo.toUpperCase()} {`${name.toUpperCase()} > ${subcategoryname?.toUpperCase()}`}
                </span>
            </>
        );
    } else if (subsubcategoryid && !categoryid && !subcategoryid) {
        content = (
            <>
                <span className="" data-text={`${titulo.toUpperCase()} ${name.toUpperCase()} > ${subcategoryname?.toUpperCase()} > ${subsubcategoryname?.toUpperCase()}`}>
                    {titulo.toUpperCase()} {`${name.toUpperCase()} > ${subcategoryname?.toUpperCase()} > ${subsubcategoryname?.toUpperCase()}`}
                </span>
            </>
        );
    }

    if (!categoryid && !subcategoryid && !subsubcategoryid) {
        return (
            <>
                {/* <Bienvenida /> */}
                <div className="ItemListContainer">
                    <span className="glitch" data-text={titulo.toUpperCase()}>{titulo.toUpperCase()}</span>
                    {console.log("productos", productos)}
                    {
                        !productos ? (
                            <div className="d-flex align-items-center justify-content-center h-100 ">
                                <p>Cargando ...</p>
                            </div>
                        ) : productos.length < 1 ? (
                            <div className="d-flex align-items-center justify-content-center h-100 ">
                                <p>Estamos agregando productos ...</p>
                            </div>
                        ) : (
                            <ItemList
                                productos={productos}
                            />
                        )
                    }

                </div>
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <div className="ItemListContainer">
                    {content}
                    {productos.length > 0 ? (
                        <ItemList
                            productos={productos}
                        />
                    ) : (
                        <div>Pronto agregaremos más productos a esta categoria ...</div>
                    )}
                </div>
                <Footer />
            </>
        )
    }
}

export default ItemListContainer;