import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import './ItemDetailContainer.css';
import useStoreContext from "../../provider/storeProvider";


function ItemDetailContainer() {
  const navigate = useNavigate()
  const { getItemContext, loading } = useStoreContext()
    const [producto, setProducto] = useState();
    const { itemid } = useParams();

    useEffect(() => {
      if(!loading){
        const product = getItemContext(itemid)
        if(product){
          setProducto(product)
        }else{
          navigate('/')
        }
      }
    }, [itemid, loading]);

    return (
        <section className="ItemDetailContainer">
          <ItemDetail 
            producto = {producto}
          />
        </section>
    )
}

export default ItemDetailContainer;