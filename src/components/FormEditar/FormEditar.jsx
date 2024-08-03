import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategorias, getItemClear } from '../../fetch/fetch';
import './FormEditar.css';
import config from '../../../config.js';

function FormEditar() {
    const { editarid } = useParams();
    const [prod, setProd] = useState(null)
    const [categorias, setCategorias] = useState(null)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subSubCategory, setSubSubCategory] = useState('');
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [stock, setStock] = useState('');
    const [pesoGramos, setPesoGramos] = useState('');

    useEffect(() => {
        getItemClear(editarid).then(respuestaPromise => {
            fetchCategorias()
            setName(respuestaPromise.name)
            setDescription(respuestaPromise.description)
            setPrice(respuestaPromise.price)
            setCategory(respuestaPromise.categories[0].categoria.id)
            setSubCategory(respuestaPromise.categories[0].subCategoria.id)
            setSubSubCategory(respuestaPromise.categories[0].subSubCategoria.id)
            setSize(respuestaPromise.size.join(' '))
            setColor(respuestaPromise.color.join(' '))
            setStock(respuestaPromise.stock)
            setPesoGramos(respuestaPromise.pesoGramos)
            setProd(respuestaPromise)
            console.log("prod", respuestaPromise);
        });
    }, [editarid]);

    const fetchCategorias = async (id) => {
        getCategorias()
            .then((res) => {
                console.log("desde crear producto", res);
                setCategorias(res.data)
            })
            // .finally(() => setLoading(false))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const obj = {
            name: name,
            description: description,
            price: parseInt(price),
            categories: [{
                categoria: { id: category },
                subCategoria: { id: subCategory },
                subSubCategoria: { id: subSubCategory }
            }],
            size: size.split(' '),
            color: color.split(' '),
            stock: stock,
            pesoGramos: pesoGramos
        }

        try {
            const access_token = sessionStorage.getItem('access_token');
            const response = await fetch(`${config.API_BASE_URL}/products/${editarid}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },
                // headers: { Authorization: `Bearer 123123213213` },
                method: 'PUT',
                body: JSON.stringify(obj),

            });

            const data = await response.json();

            const result = document.getElementById('resultLogin')
            if (data.status === 'ok') {
                result.innerHTML = "Producto actualizado"
                result.style.color = "green"
                // result.style.transition = "all 4s ease"
                // setTimeout(() => {
                //     result.style.color = "transparent"
                // }, 2);
            } else {
                result.innerHTML = data.data
                result.style.color = "red"
                // result.style.transition = "all 4s ease"
                // setTimeout(() => {
                //     result.style.color = "transparent"
                // }, 2);
            }

            console.log("form data", obj);
            console.log(data);
            // Aquí podrías hacer algo con la respuesta, como actualizar una lista de productos.

        } catch (error) {
            console.error(error);
        }
    };
    return (

        <div className="main-crear">
            {/* <div className="main_left-crear">
                        <div className='main_left_cont-crear'>
                            <h3>JARRY INDUMENTARIA</h3>
                            <img className="img-fluid img_login mb-2" alt="" />
                            <h5>Daily Motivational</h5>
                            <p><b>"El único modo de hacer un gran trabajo es amar lo que haces"</b></p>
                            <p><b>- Steve Jobs -</b></p>
                        </div>
                    </div> */}
            <div className="main_right-crear col-12 col-md-7 bg-light">
                <form onSubmit={handleFormSubmit} className='main_right_cont-crear' method="post">
                    <h3 className="section_title-crear " data-text="Crea tu producto">Edita tu producto</h3>
                    <div className="form-group-crear">
                        <label htmlFor="name"><b>Nombre</b></label>
                        <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} required />
                    </div>

                    <div className='form-group-crear'>
                        <label htmlFor="description"><b>Descripcion</b></label>
                        <input type="text" id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
                    </div>

                    <div className='form-group-crear'>
                        <label htmlFor="price"><b>Precio</b></label>
                        <input type="number" id="price" name="price" value={price} onChange={(event) => setPrice(event.target.value)} required />
                    </div>

                    {/* <div className='form-group-crear'>
                            <label htmlFor="category">
                                <b>Categoria</b>

                                <select style={{ marginLeft: '10px' }} id="category" name="category" value={category} onChange={(event) => setCategory(event.target.value)} required>
                                    <option value="remeras">Remeras</option>
                                    <option value="buzos">Buzos</option>
                                    <option value="jeans">Jeans</option>
                                    <option value="camperas">Camperas</option>
                                    <option value="accesorios">Accesorios</option>
                                </select>
                            </label>
                        </div> */}
                    <div className='form-group-crear'>
                        <label htmlFor="category">
                            <b>Categoria</b>
                            <select style={{ marginLeft: '10px' }} id="category" name="category" value={category} onChange={(event) => setCategory(event.target.value)} required>
                                {/* {prod ? (<option key={prod.categories[0].categoria.id} value={prod.categories[0].categoria.id}>
                                    {prod.categories[0].categoria.name}
                                </option>) : null} */}
                                {categorias?.map(cat => {
                                    if (category) {
                                        return (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        );
                                    }
                                    return null;
                                })}

                            </select>
                        </label>
                    </div>

                    <div className='form-group-crear'>
                        <label htmlFor="subCategory">
                            <b>Sub-Categoria</b>
                            <select style={{ marginLeft: '10px' }} id="subCategory" name="subCategory" value={subCategory} onChange={(event) => setSubCategory(event.target.value)} required>
                                {/* {prod ? (<option key={subCategory} value={subCategory}>{prod.categories[0].subCategoria.name}</option>) : null} */}
                                {
                                    categorias?.map((cat) => {
                                        if (cat.id === category) {
                                            return cat.subCategories.map((sub) => {
                                                if (subCategory) {
                                                    return (
                                                        <option key={sub.id} value={sub.id}>
                                                            {sub.name}
                                                        </option>
                                                    )
                                                }
                                                return null
                                            });
                                        } else {
                                            return null;
                                        }
                                    })
                                }
                            </select>
                        </label>
                    </div>

                    <div className='form-group-crear'>
                        <label htmlFor="subSubCategory">
                            <b>Sub-Sub-Categoria</b>
                            <select style={{ marginLeft: '10px' }} id="subSubCategory" name="subSubCategory" value={subSubCategory} onChange={(event) => setSubSubCategory(event.target.value)} required>
                                {/* {prod ? (<option key={subSubCategory} value={subSubCategory}>{prod.categories[0].subSubCategoria.name}</option>) : null} */}
                                {
                                        categorias?.map((cat) => {
                                            if (cat.id === category) {
                                                return cat.subCategories.map((sub) => {
                                                    if (sub.id === subCategory) {
                                                        return sub.categories.map((sub2) => (
                                                            <option key={sub2.id} value={sub2.id}>
                                                                {sub2.name}
                                                            </option>
                                                        ));
                                                    }
                                                    return null;
                                                });
                                            } else {
                                                return null;
                                            }
                                        })
                                    }
                            </select>
                        </label>
                    </div>

                    <div className='form-group-crear'>
                        <label htmlFor="size"><b>Tamaños</b></label>
                        <input type="text" id="size" name="size" value={size} onChange={(event) => setSize(event.target.value)} required />
                    </div>

                    <div className='form-group-crear'>
                        <label htmlFor="color"><b>Color</b></label>
                        <input type="text" id="color" name="color" value={color} onChange={(event) => setColor(event.target.value)} required />
                    </div>

                    <div className='form-group-crear'>
                        <label htmlFor="stock">
                            <b>Stock</b>
                            {/* <select style={{ marginLeft: '10px' }} id="stock" name="stock" value={stock} onChange={(event) => setStock(event.target.value)} required>
                                <option value="true">Con stock</option>
                                <option value="false">Sin stock</option>
                            </select> */}
                        </label>
                        <input type="number" id="stock" name="stock" value={stock} onChange={(event) => setStock(event.target.value)} required />
                    </div>

                    <div className='form-group-crear'>
                        <label htmlFor="pesoGramos">
                            <b>Peso en gramos</b>
                            {/* <select style={{ marginLeft: '10px' }} id="stock" name="stock" value={stock} onChange={(event) => setStock(event.target.value)} required>
                                <option value="true">Con stock</option>
                                <option value="false">Sin stock</option>
                            </select> */}
                        </label>
                        <input type="number" id="pesoGramos" name="pesoGramos" value={pesoGramos} onChange={(event) => setPesoGramos(event.target.value)} required />
                    </div>

                    <div id="resultLogin"></div>
                    <button className='start_login-crear' type="submit"><b>Editar</b></button>
                </form>
            </div>
        </div>
    )
    // }
}

export default FormEditar



