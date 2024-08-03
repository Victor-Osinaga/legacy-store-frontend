import React, { useEffect, useState } from "react";
import ItemListAdmin from "../ItemListAdmin/ItemListAdmin";
import { useParams } from "react-router-dom";
// import './ItemListContainer.css';
import { getItems } from "../../fetch/fetch.js";


function ItemListContainerAdmin({ titulo }) {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getItems().then(respuestaPromise => {
            setProductos(respuestaPromise);
        })
    }, []);
    return (
        <div className="ItemListContainer">
            <span className="glitch" data-text={titulo.toUpperCase()}>{titulo.toUpperCase()}</span>
            <ItemListAdmin
                productos={productos}
            />
        </div>
    )
}

export default ItemListContainerAdmin;