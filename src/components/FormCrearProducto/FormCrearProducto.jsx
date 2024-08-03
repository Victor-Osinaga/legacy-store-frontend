import React, { useEffect, useState } from 'react';
import { createProduct, getCategorias } from '../../fetch/fetch';
import './FormCrearProducto.css';
import toast, { Toaster } from 'react-hot-toast';
import toastCreateHandle from '../../toasts/create/toastCreate';

function FormCrearProducto() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subSubCategory, setSubSubCategory] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [stock, setStock] = useState('');
    const [img, setImg] = useState(null);
    const [pesoGramos, setPesoGramos] = useState('');

    const [categorias, setCategorias] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategorias()
    }, [])

    const fetchCategorias = async () => {
        getCategorias()
            .then((res) => {
                console.log("desde crear producto", res);
                setCategorias(res.data)
            })
            .finally(() => setLoading(false))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const toastId = toast.loading(
            <div>
                <span>Guardando producto: <strong>"{name}"</strong>...</span>
            </div>,
            {
                style: {
                    position: 'relative',
                    minWidth: window.innerWidth < 767 ? '80%' : '480px',
                    maxWidth: window.innerWidth < 767 ? '80%' : '480px',
                    zIndex: '1000000',
                    fontSize: '.8rem',
                    // backgroundColor: 'var(--bgMain)'
                }
            }
        );

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('subSubCategory', subSubCategory);

        // Cada valor separado por espacio lo agrega a un array y hace el append
        let tamanios = size.split(' ')
        if (tamanios.length === 1) {
            // Si solo hay un color, envía un array con un solo elemento
            tamanios = [tamanios[0]];
        }
        console.log("tam", tamanios);
        for (let i = 0; i < tamanios.length; i++) {
            formData.append('size[]', tamanios[i]); // Usando 'tamanios[]' como nombre de campo
        }

        let colores = color.split(' ')
        if (!Array.isArray(colores)) {
            colores = [colores];
        }
        console.log("color", colores);
        for (let i = 0; i < colores.length; i++) {
            formData.append('color[]', colores[i]); // Usando 'colores[]' como nombre de campo
        }
        formData.append('stock', stock);
        formData.append('img', img);
        formData.append('pesoGramos', pesoGramos);
        console.log("SIZEEEEEEE", formData.getAll('size'));

        try {
            const access_token = sessionStorage.getItem('access_token');
            const result = await createProduct(access_token, formData)
            console.log("x", result);
            if (result) {
                toast.success(
                    <div>
                        Producto creado: <strong>"{result.data.name}"</strong>...
                    </div>,
                    {
                        id: toastId
                    }
                );
            }
        } catch (error) {
            toast.error(
                <div>
                    <p className='mb-0'><strong>ERROR</strong></p>
                    <p className='mb-0'>Estado: <strong>{error.statusText} - {error.status}</strong></p>
                    <p className='mb-0'>Desde back: <strong>{error.msgBack}</strong></p>
                    <p className='mb-0'>Desde front: <strong>{error.msgFront}</strong></p>
                </div>,
                {
                    id: toastId
                }
            );
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={true} />
            <section id="crear">
                <div className="div1-crear"></div>
                <div className="div2-crear"></div>
                <div className="main-crear">
                    <div className="main_right-crear col-12 col-md-7 bg-light">
                        <form onSubmit={handleFormSubmit} className='main_right_cont-crear' method="post">
                            <h3 className="section_title-crear " data-text="Crea tu producto">Crea tu producto</h3>
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

                            <div className='form-group-crear'>
                                <label htmlFor="category">
                                    <b>Categoria</b>
                                </label>
                                <select id="category" name="category" value={category} onChange={(event) => setCategory(event.target.value)} required>
                                    <option value="">Elige una categoria</option>
                                    {categorias?.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='form-group-crear'>
                                <label htmlFor="subCategory">
                                    <b>Sub-Categoria</b>
                                </label>
                                <select id="subCategory" name="subCategory" value={subCategory} onChange={(event) => setSubCategory(event.target.value)} required>
                                    <option value="">Elige una sub-categoria</option>
                                    {
                                        categorias?.map((cat) => {
                                            if (cat.id === category) {
                                                return cat.subCategories.map((sub) => (
                                                    <option key={sub.id} value={sub.id}>
                                                        {sub.name}
                                                    </option>
                                                ));
                                            } else {
                                                return null;
                                            }
                                        })
                                    }
                                </select>
                            </div>

                            <div className='form-group-crear'>
                                <label htmlFor="subSubCategory">
                                    <b>Sub-Sub-Categoria</b>

                                </label>
                                <select id="subSubCategory" name="subSubCategory" value={subSubCategory} onChange={(event) => setSubSubCategory(event.target.value)} required>
                                    <option value="">Elige una sub-sub-categoria</option>
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
                            </div>

                            <div className='form-group-crear'>
                                <label htmlFor="size"><b>Tamaños</b></label>
                                <input type="text" id="size" name="size" value={size} onChange={(event) => setSize(event.target.value)} required />
                            </div>

                            <div className='form-group-crear'>
                                <label htmlFor="color"><b>Colores</b></label>
                                <input type="text" id="color" name="color" value={color} onChange={(event) => setColor(event.target.value)} required />
                            </div>
                            <div className='form-group-crear'>
                                <label htmlFor="stock">
                                    <b>Stock</b>
                                </label>
                                <input type="number" id="stock" name="stock" value={stock} onChange={(event) => setStock(event.target.value)} required />
                            </div>

                            <div className='form-group-crear'>
                                <label htmlFor="pesoGramos">
                                    <b>Peso en gramos</b>
                                </label>
                                <input type="number" id="pesoGramos" name="pesoGramos" value={pesoGramos} onChange={(event) => setPesoGramos(event.target.value)} required />
                            </div>

                            <div className="form-group-crear">
                                <label htmlFor="img"><b>Imagen</b></label>
                                <input type="file" id="img" name="img" accept="image/*" onChange={(event) => setImg(event.target.files[0])} required />
                            </div>

                            {/* <div id="resultLogin"></div> */}
                            <button className='start_login-crear' type="submit"><b>Enviar</b></button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FormCrearProducto