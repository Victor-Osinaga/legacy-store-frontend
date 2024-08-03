import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './EditarCategoria.css'
import { updateCategoryById } from '../../fetch/fetch';

export default function EditarCategoria() {
    const location = useLocation();
    const [categoria, setCategoria] = useState(location.state.categoria);
    const [count, setCount] = useState(0)

    // Función para actualizar el nombre principal
    const handleCategoryNameChange = (newName) => {
        setCategoria((prevCategoria) => ({
            ...prevCategoria,
            name: newName,
        }));
    };

    // Función para actualizar el nombre de una subcategoría
    const handleSubCategoryNameChange = (subCategoryId, newName) => {
        const updatedCategoria = { ...categoria };
        updatedCategoria.subCategories = updatedCategoria.subCategories.map(
            (subCategory) => {
                if (subCategory.id === subCategoryId) {
                    return { ...subCategory, name: newName };
                }
                return subCategory;
            }
        );
        setCategoria(updatedCategoria);
    };

    // Función para actualizar el nombre de una categoría en una subcategoría
    const handleCategoryNameInSubCategoryChange = (
        subCategoryId,
        categoryId,
        newName
    ) => {
        const updatedCategoria = { ...categoria };
        updatedCategoria.subCategories = updatedCategoria.subCategories.map(
            (subCategory) => {
                if (subCategory.id === subCategoryId) {
                    subCategory.categories = subCategory.categories.map(
                        (category) => {
                            if (category.id === categoryId) {
                                return { ...category, name: newName };
                            }
                            return category;
                        }
                    );
                }
                return subCategory;
            }
        );
        setCategoria(updatedCategoria);
    };

    // Función para agregar una nueva subcategoría
    const addSubCategory = () => {
        const newSubCategoryId = uuidv4(); // Genera un nuevo ID
        const newSubCategory = {
            id: newSubCategoryId,
            name: "NUEVA_SUBCATEGORIA",
            categories: [
                {
                    id: uuidv4(),
                    name: "NUEVA_CATEGORIA",
                },
            ],
        };

        const updatedCategoria = { ...categoria };
        updatedCategoria.subCategories.push(newSubCategory);
        setCategoria(updatedCategoria);
    };

    // Función para agregar una nueva categoría dentro de categories en una subcategoría
    const addCategoryToSubCategory = (subCategoryId) => {
        const updatedCategoria = { ...categoria };
        updatedCategoria.subCategories = updatedCategoria.subCategories.map(
            (subCategory, index) => {
                if (subCategory.id === subCategoryId) {
                    const newCategoryId = uuidv4(); // Genera un nuevo ID
                    const newCategory = {
                        id: newCategoryId,
                        name: "NUEVA_CATEGORIA",
                    };
                    subCategory.categories.push(newCategory);
                }
                return subCategory;
            }
        );
        setCategoria(updatedCategoria);
    };

    const mostrar = async() => {
        const res = await updateCategoryById(categoria.id, categoria)
        console.log("CATEGORIA UPD: ", categoria);
    }

    return (
        <div className="editarCategoria p-4">
            <div className='formContainer p-4'>
                <div className='d-flex justify-content-center'>
                    <div className='d-flex flex-column mx-auto mb-2 '>
                        <label htmlFor="">Categoria</label>
                        <input
                            type="text"
                            value={categoria.name}
                            className='mx-auto customSelect inputEditar'
                            onChange={(e) => handleCategoryNameChange(e.target.value)}
                        />
                    </div>
                </div>
                <button className='mb-3 btnEditar' onClick={addSubCategory}>Agregar Subcategoría</button>
                <div className='d-flex flex-wrap gap-3 justify-content-center mb-3'>
                    {categoria.subCategories.map((subCategory) => (
                        <div className='d-flex flex-column' key={subCategory.id}>
                            <div className='d-flex flex-column mb-3'>
                                <label htmlFor="">Sub-Categoria</label>
                                <input
                                    type="text"
                                    value={subCategory.name}
                                    onChange={(e) =>
                                        handleSubCategoryNameChange(
                                            subCategory.id,
                                            e.target.value
                                        )
                                    }
                                    className='customSelect inputEditar'
                                />
                            </div>
                            <button className='mb-3 mx-auto btnEditar' onClick={() => addCategoryToSubCategory(subCategory.id)}>
                                Agregar SubSub Categoria
                            </button>
                            {subCategory.categories.map((category) => (
                                <div className='d-flex flex-column mb-2' key={category.id}>
                                    <label htmlFor="">SubSub-Categoria</label>
                                    <input
                                        type="text"
                                        value={category.name}
                                        onChange={(e) =>
                                            handleCategoryNameInSubCategoryChange(
                                                subCategory.id,
                                                category.id,
                                                e.target.value
                                            )
                                        }
                                        className='customSelect inputEditar'
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <button onClick={mostrar}
                        className='btnGoCheckout'
                >
                        ACTUALIZAR
                </button>
            </div>
        </div>
    );
}