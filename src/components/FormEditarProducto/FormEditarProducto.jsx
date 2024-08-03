import React, { useEffect, useState } from 'react';
import './FormEditarProducto.css';
import { useParams } from 'react-router-dom';
import { getItemClear } from '../../fetch/fetch';
import FormEditar from '../FormEditar/FormEditar';

function FormEditarProducto() {
    const [producto, setProducto] = useState();
    const { editarid } = useParams();

    useEffect(() => {
        getItemClear(editarid).then(respuestaPromise => {
            setProducto(respuestaPromise)
            // console.log("prod", producto);
        });
    }, [editarid]);

    // const [name, setName] = useState(producto.name);
    // const [description, setDescription] = useState(producto.description);
    // const [price, setPrice] = useState(producto.price);
    // const [category, setCategory] = useState(producto.category);
    // const [size, setSize] = useState(producto.size);
    // const [color, setColor] = useState(producto.color);
    // const [img, setImg] = useState(null);

    return (
        <section id="crear">
            <div className="div1-crear"></div>
            <div className="div2-crear"></div>
            <FormEditar /*producto={producto}*/ />
        </section>
    )
}

export default FormEditarProducto