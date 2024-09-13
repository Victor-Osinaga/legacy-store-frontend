import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreContextProvider } from './provider/storeProvider'
import WpBtn from './components/WpBtn/WpBtn';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/nav/nav';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import CrearAdministrador from './components/CrearAdministrador/CrearAdministrador';
import Nosotros from './components/Nosotros/Nosotros';
import Login from './components/Login/Login';
import Panel from './components/Panel/Panel';
import CartView from './components/CartView/CartView';
import Checkout from './components/Checkout/Checkout';
import Resumen from './components/Resumen/Resumen';
import Ordenes from './components/Ordenes/Ordenes';
import FormCrearProducto from './components/FormCrearProducto/FormCrearProducto';
import ItemListContainerDelete from './components/ItemListContainerDelete/ItemListContainerDelete';
import ItemListContainerAdmin from './components/ItemListContainerAdmin/ItemListContainerAdmin';
import FormEditarProducto from './components/FormEditarProducto/FormEditarProducto';
import CrearCategoria from './components/CrearCategoria/CrearCategoria';
import FormStatusOrder from './components/FormStatusOrder/FormStatusOrder';
import EditarEliminarCategoria from './components/EditarEliminarCategoria/EditarEliminarCategoria';
import EditarCategoria from './components/EditarCategoria/EditarCategoria';
import Faqs from './components/Faqs/Faqs';
import RedirectToHome from './components/RedirectToHome/RedirectToHome';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <StoreContextProvider>
        <Toaster position='top-right' reverseOrder={true} />
        <BrowserRouter>
          <RedirectToHome />
          <NavBar />
          <Routes>
            <Route path="/admin/crear-administrador" element={<CrearAdministrador />} />
            <Route path="/producto/:itemid" element={<ItemDetailContainer />} />
            <Route path="/" element={<ItemListContainer titulo='Productos' />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/panel" element={<Panel />} />
            <Route path="/category/:name/:categoryid" element={<ItemListContainer titulo='Categoria ' />} />
            <Route path="/category/:name/:subcategoryname/:subcategoryid" element={<ItemListContainer titulo='Categoria ' />} />
            <Route path="/category/:name/:subcategoryname/:subsubcategoryname/:subsubcategoryid" element={<ItemListContainer titulo='Categoria ' />} />
            <Route path="/cart" element={<CartView />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/resumen' element={<Resumen />} />
            <Route path='/orden/estado' element={<FormStatusOrder />} />
            <Route path='/admin/ordenes' element={<Ordenes />} />
            <Route path='/admin/crear-producto' element={<FormCrearProducto />} />
            <Route path='/admin/eliminar-producto' element={<ItemListContainerDelete titulo='Elige cual eliminar' />} />
            <Route path='/admin/editar' element={<ItemListContainerAdmin titulo='Elige cual editar' />} />
            <Route path='/admin/editar/:editarid' element={<FormEditarProducto />} />
            <Route path='/admin/crear-categoria' element={<CrearCategoria />} />
            <Route path='/admin/categoria/editar-eliminar' element={<EditarEliminarCategoria />} />
            <Route path='/admin/categoria/editar/:id' element={<EditarCategoria />} />
            <Route path='/cliente/preguntas/frecuentes' element={<Faqs />} />
          </Routes>
        </BrowserRouter>
      </StoreContextProvider>
      <WpBtn />
    </>
  )
}

export default App
