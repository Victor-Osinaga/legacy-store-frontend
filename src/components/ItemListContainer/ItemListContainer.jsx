import React, { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import './ItemListContainer.css';
import { getItems, getItemsByPrimaryCategory, getItemsBySecondaryCategory, getItemsByTerciaryCategory } from "../../fetch/fetch.js";
import Footer from "../footer/footer";
import Bienvenida from "../Bienvenida/Bienvenida";


function ItemListContainer({ titulo }) {
    const [productos, setProductos] = useState([]);

    const { name, categoryid, subcategoryname, subcategoryid, subsubcategoryname, subsubcategoryid } = useParams();
    // console.log(name, categoryid, subcategoryname, subcategoryid);

    useEffect(() => {
        if (!categoryid && !subcategoryid && !subsubcategoryid) {
            console.log("1111");
            getItems().then(respuestaPromise => {
                setProductos(respuestaPromise);
            })
        } else if (categoryid && !subcategoryid && !subsubcategoryid) {
            console.log("2222");
            getItemsByPrimaryCategory(categoryid).then(respuestaPromise => {
                setProductos(respuestaPromise);
            })
        } else if (subcategoryid && !categoryid) {
            console.log("3333");
            console.log("la categoria", subcategoryid);
            getItemsBySecondaryCategory(subcategoryid).then(respuestaPromise => {
                setProductos(respuestaPromise);
            })
        } else if (subsubcategoryid && !categoryid && !subcategoryid) {
            console.log("4444");
            console.log("la categoria", subsubcategoryid);
            getItemsByTerciaryCategory(subsubcategoryid).then(respuestaPromise => {
                setProductos(respuestaPromise);
            })
        }
    }, [name, categoryid, subcategoryid, subsubcategoryid, subcategoryname, subsubcategoryname]);

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
                <Bienvenida />
                <div className="ItemListContainer">
                    <span className="glitch" data-text={titulo.toUpperCase()}>{titulo.toUpperCase()}</span>
                    {productos.length < 1?(
                        <div className="d-flex align-items-center justify-content-center h-100 ">
                            <p>Estamos agregando productos ...</p>
                        </div>
                    ):(
                        <ItemList
                        productos={productos}
                    />
                    )}

                </div>
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <div className="ItemListContainer">

                    {/* <span className="glitch" data-text={`${name.toUpperCase()}>${subcategoryname?.toUpperCase()}>${subsubcategoryname?.toUpperCase()}`}>
                        {`${name.toUpperCase()}>${subcategoryname?.toUpperCase()}>${subsubcategoryname?.toUpperCase()}`}
                    </span> */}
                    {content}
                    {productos.length > 0 ? (
                        <ItemList
                        productos={productos}
                    />
                    ):(
                        <div>Pronto agregaremos más productos a esta categoria ...</div>
                    )}
                </div>
                <Footer />
            </>
        )
    }
}

export default ItemListContainer;