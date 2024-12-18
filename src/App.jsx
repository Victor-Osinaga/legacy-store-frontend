import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useStoreContext, {
  StoreContextProvider,
} from "./provider/storeProvider";
import WpBtn from "./components/WpBtn/WpBtn";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/nav/nav";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Nosotros from "./components/Nosotros/Nosotros";
import CartView from "./components/CartView/CartView";
import Checkout from "./components/Checkout/Checkout";
import Resumen from "./components/Resumen/Resumen";
// VERIFICAR QUE ORDENES NO AFECTE A OTROS COMPONENTES PARA PODER ELIMINARLO DEFINITIVAMENTE
// import Ordenes from './components/Ordenes/Ordenes';
import FormStatusOrder from "./components/FormStatusOrder/FormStatusOrder";
import Faqs from "./components/Faqs/Faqs";
import RedirectToHome from "./components/RedirectToHome/RedirectToHome";
import { Toaster } from "react-hot-toast";
import OrderSuccess from "./components/OrderSucces/OrderSuccess";

// Componente de loading
const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#23252F",
        color: "white",
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <img src="/logolegacy.svg" width="32" height="32" alt="" />
        <h1 className="fs-4">LEGACY SOFTWARE</h1>
      </div>
      <div className="">
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <p>Cargando tienda...</p>
    </div>
  );
};

function App() {
  return (
    <StoreContextProvider>
      <Toaster position="top-right" reverseOrder={true} />
      <BrowserRouter>
        <InnerApp />
      </BrowserRouter>
      <WpBtn />
    </StoreContextProvider>
  );
}

function InnerApp() {
  const { loadingConfig } = useStoreContext();
  if (loadingConfig) {
    return <LoadingScreen />; // Muestra el loading screen mientras isLoading es true
  } else {
    return (
      <>
        {/* <RedirectToHome /> */}
        <NavBar />
        <Routes>
          {/* HOME */}
          <Route path="/" element={<ItemListContainer titulo="Productos" />} />

          {/* PRODUCT DETAIL */}
          <Route path="/producto/:itemid" element={<ItemDetailContainer />} />

          {/* ABOUT */}
          <Route path="/nosotros" element={<Nosotros />} />

          {/* CATEGORIES */}
          <Route
            path="/category/:name/:categoryid"
            element={<ItemListContainer titulo="Categoria " />}
          />
          <Route
            path="/category/:name/:subcategoryname/:subcategoryid"
            element={<ItemListContainer titulo="Categoria " />}
          />
          <Route
            path="/category/:name/:subcategoryname/:subsubcategoryname/:subsubcategoryid"
            element={<ItemListContainer titulo="Categoria " />}
          />

          {/* CART */}
          <Route path="/cart" element={<CartView />} />

          {/* CHECKOUT */}
          <Route path="/checkout" element={<Checkout />} />

          {/* RESUME */}
          <Route path="/resumen" element={<Resumen />} />

          {/* ORDER */}
          <Route path="/orden/estado/:orderId?" element={<FormStatusOrder />} />
          <Route path="/orden/completa" element={<OrderSuccess />} />

          {/* FAQS */}
          <Route path="/faqs" element={<Faqs />} />
        </Routes>
      </>
    );
  }
}

export default App;
