import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import './ItemDetailContainer.css';
import useStoreContext from "../../provider/storeProvider";
import Footer from "../footer/footer";


function ItemDetailContainer() {
  const navigate = useNavigate()
  const { getItemContext, loading, loadingConfig, configStore } = useStoreContext()
  const [producto, setProducto] = useState();
  const { itemid } = useParams();

  useEffect(() => {
    if (!loading) {
      const product = getItemContext(itemid)
      if (product) {
        setProducto(product)
      } else {
        navigate('/')
      }
    }
  }, [itemid, loading, loadingConfig]);

  return (
    <>
      <section
        className="ItemDetailContainer py-0"
        style={{
          backgroundColor: `${configStore.colors.tertiaryColorStore}`
        }}
      >
        {!loadingConfig ? (
          <>
            <ItemDetail
              producto={producto}
            />
          </>
        ) : (
          <>
            <div className=''>
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  )
}

export default ItemDetailContainer;