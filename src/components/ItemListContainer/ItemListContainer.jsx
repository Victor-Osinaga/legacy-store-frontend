import React, { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import "./ItemListContainer.css";
import Footer from "../footer/footer";
import Bienvenida from "../Bienvenida/Bienvenida";
import useStoreContext from "../../provider/storeProvider.jsx";
import getTextColor from "../../utils/getTextColor.js";

function ItemListContainer({ titulo }) {
  const {
    products,
    getItemsByPrimaryCategoryContext,
    getItemsBySecondaryCategoryContext,
    getItemsByTerciaryCategoryContext,
    configStore,
    loadingConfig,
  } = useStoreContext();
  const [productos, setProductos] = useState(products);

  const {
    name,
    categoryid,
    subcategoryname,
    subcategoryid,
    subsubcategoryname,
    subsubcategoryid,
  } = useParams();
  // console.log(name, categoryid, subcategoryname, subcategoryid);

  useEffect(() => {
    if (!categoryid && !subcategoryid && !subsubcategoryid) {
      // setTimeout(() => {
      setProductos(products);
      // }, 3000);
    } else if (categoryid && !subcategoryid && !subsubcategoryid) {
      // getItemsByPrimaryCategory(categoryid).then(respuestaPromise => {
      //     setProductos(respuestaPromise);
      // })
      const products = getItemsByPrimaryCategoryContext(categoryid);
      setProductos(products);
    } else if (subcategoryid && !categoryid) {
      // getItemsBySecondaryCategory(subcategoryid).then(respuestaPromise => {
      //     setProductos(respuestaPromise);
      // })
      const products = getItemsBySecondaryCategoryContext(subcategoryid);
      setProductos(products);
    } else if (subsubcategoryid && !categoryid && !subcategoryid) {
      // getItemsByTerciaryCategory(subsubcategoryid).then(respuestaPromise => {
      //     setProductos(respuestaPromise);
      // })
      const products = getItemsByTerciaryCategoryContext(subsubcategoryid);
      setProductos(products);
    }
  }, [
    loadingConfig,
    products,
    name,
    categoryid,
    subcategoryid,
    subsubcategoryid,
    subcategoryname,
    subsubcategoryname,
  ]);

  let content; // Variable para almacenar el contenido JSX

  if (categoryid && !subcategoryid && !subsubcategoryid) {
    content = (
      <>
        <span
          className="glitch mx-auto text-uppercase"
          data-text={`${titulo.toUpperCase()} ${name.toUpperCase()}`}
          style={{ color: getTextColor(configStore.colors.tertiaryColorStore) }}
        >
          {titulo.toUpperCase()} {name.toUpperCase()}
        </span>
        {/* <span
                    className="glitch"
                    data-text={name.toUpperCase()}
                    style={{ color: getTextColor(configStore.colors.tertiaryColorStore) }}
                >
                    {}
                </span> */}
      </>
    );
  } else if (subcategoryid && !categoryid && !subsubcategoryid) {
    content = (
      <>
        <span
          className="glitch mx-auto text-uppercase"
          data-text={`${titulo.toUpperCase()} ${name.toUpperCase()} > ${subcategoryname?.toUpperCase()}`}
          style={{ color: getTextColor(configStore.colors.tertiaryColorStore) }}
        >
          {titulo.toUpperCase()}{" "}
          {`${name.toUpperCase()} > ${subcategoryname?.toUpperCase()}`}
        </span>
      </>
    );
  } else if (subsubcategoryid && !categoryid && !subcategoryid) {
    content = (
      <>
        <span
          className="glitch mx-auto text-uppercase"
          data-text={`${titulo.toUpperCase()} ${name.toUpperCase()} > ${subcategoryname?.toUpperCase()} > ${subsubcategoryname?.toUpperCase()}`}
          style={{ color: getTextColor(configStore.colors.tertiaryColorStore) }}
        >
          {titulo.toUpperCase()}{" "}
          {`${name.toUpperCase()} > ${subcategoryname?.toUpperCase()} > ${subsubcategoryname?.toUpperCase()}`}
        </span>
      </>
    );
  }

  function renderContent() {
    if (!loadingConfig) {
      if (!categoryid && !subcategoryid && !subsubcategoryid) {
        return (
          <>
            <Bienvenida />
            <div
              className="ItemListContainer py-2"
              style={{
                backgroundColor: `${configStore.colors.tertiaryColorStore}`,
              }}
            >
              <div className="text-center mb-3">
                <span
                  className="glitch mx-auto text-uppercase"
                  style={{
                    color: getTextColor(configStore.colors.tertiaryColorStore),
                  }}
                  data-text={titulo.toUpperCase()}
                >
                  {titulo}
                </span>
              </div>
              {console.log("productos", productos)}
              {!productos ? (
                <div className="d-flex align-items-center justify-content-center h-100 ">
                  <p>Cargando ...</p>
                </div>
              ) : productos.length < 1 ? (
                <div
                  className="d-flex align-items-center justify-content-center h-100 "
                  style={{
                    color: getTextColor(configStore.colors.tertiaryColorStore),
                  }}
                >
                  <p>Estamos agregando productos ...</p>
                </div>
              ) : (
                <ItemList productos={productos} />
              )}
            </div>
            <Footer />
          </>
        );
      } else {
        return (
          <>
            <div
              className="ItemListContainer py-2"
              style={{
                backgroundColor: `${configStore.colors.tertiaryColorStore}`,
              }}
            >
              <div className="text-center mb-3">{content}</div>

              {productos.length > 0 ? (
                <ItemList productos={productos} />
              ) : (
                <div
                  className=" text-center"
                  style={{
                    color: `${getTextColor(
                      configStore.colors.tertiaryColorStore
                    )}`,
                  }}
                >
                  <p className="p-0">
                    Pronto agregaremos más productos a esta categoria ...
                  </p>
                </div>
              )}
            </div>
            <Footer />
          </>
        );
      }
    } else {
      <>
        <section className="spinnerContainer">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </section>
        <Footer />
      </>;
    }
  }

  return <>{renderContent()}</>;

  // if (!categoryid && !subcategoryid && !subsubcategoryid) {
  //     return (
  //         <>
  //             {/* <Bienvenida /> */}
  //             {loadingConfig ? (
  //                 <>
  //                     <section className='spinnerContainer'>
  //                         <div className="spinner-grow" role="status">
  //                             <span className="visually-hidden">Loading...</span>
  //                         </div>
  //                     </section>
  //                 </>
  //             ) : (
  //                 <>
  //                     <div className="ItemListContainer" style={{ backgroundColor: `${configStore.colors.tertiaryColorStore}` }}>
  //                         <div className="text-center">
  //                             <span className="glitch mx-auto" style={{ color: getTextColor(configStore.colors.tertiaryColorStore) }} data-text={titulo.toUpperCase()}>{titulo.toUpperCase()}</span>
  //                         </div>
  //                         {console.log("productos", productos)}
  //                         {
  //                             !productos ? (
  //                                 <div className="d-flex align-items-center justify-content-center h-100 ">
  //                                     <p>Cargando ...</p>
  //                                 </div>
  //                             ) : productos.length < 1 ? (
  //                                 <div className="d-flex align-items-center justify-content-center h-100 ">
  //                                     <p>Estamos agregando productos ...</p>
  //                                 </div>
  //                             ) : (
  //                                 <ItemList
  //                                     productos={productos}
  //                                 />
  //                             )
  //                         }

  //                     </div>
  //                     <Footer />
  //                 </>
  //             )}
  //         </>
  //     )
  // } else {
  //     return (
  //         <>
  //             <div className="ItemListContainer">
  //                 {content}
  //                 {productos.length > 0 ? (
  //                     <ItemList
  //                         productos={productos}
  //                     />
  //                 ) : (
  //                     <div>Pronto agregaremos más productos a esta categoria ...</div>
  //                 )}
  //             </div>
  //             <Footer />
  //         </>
  //     )
  // }
}

export default ItemListContainer;
