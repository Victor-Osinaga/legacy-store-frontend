import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import './ItemDetailContainer.css';
import { getItem } from "../../fetch/fetch";
import Footer from "../footer/footer";

function ItemDetailContainer() {
    const [producto, setProducto] = useState();
    const { itemid } = useParams();

    useEffect(() => {
        getItem(itemid).then(respuestaPromise => {
          setProducto(respuestaPromise)
        });
    }, [itemid]);

    return (
        <section className="ItemDetailContainer">
          <ItemDetail 
            producto = {producto}
          />
        </section>
    )
}

export default ItemDetailContainer;