import React, { useEffect, useState } from "react";
import ItemListDelete from "../ItemListDelete/ItemListDelete";
import { useParams } from "react-router-dom";
// import './ItemListContainer.css';
import { getItems } from "../../fetch/fetch.js";


function ItemListContainerDelete({ titulo }) {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getItems().then(respuestaPromise => {
            setProductos(respuestaPromise);
        })
    }, []);
    return (
        <div className="ItemListContainer">
            <span className="glitch" data-text={titulo.toUpperCase()}>{titulo.toUpperCase()}</span>
            <ItemListDelete
                productos={productos}
            />
        </div>
    )
}

export default ItemListContainerDelete;