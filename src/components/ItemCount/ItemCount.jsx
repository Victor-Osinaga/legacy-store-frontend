import './ItemCount.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form"
import useStoreContext from '../../provider/storeProvider';


function ItemCount({ onAdd, producto }) {
    const { addToCart, cart } = useStoreContext()
    const [count, setCount] = useState(0);
    const [availableStock, setAvailableStock] = useState(null);

    const { register, handleSubmit, formState: { errors }, control, getValues, setValue, watch, reset } = useForm({
        defaultValues: {
            selectedSize: "",
            selectedSizeName: "",
            selectedColor: null,
            selectedColorName: "",
            image: producto.image,
            price: producto.price,
            name: producto.name,
        }
    })

    useEffect(() => {
        const sizeId = getValues('selectedSizeId');
        const colorId = getValues('selectedColorId');

        if (sizeId && colorId) {
            const findSize = producto.sizes.find(s => s.id === sizeId);
            if (findSize) {
                const findColor = findSize.colors.find(c => c.id === colorId);
                if (findColor) {
                    const productInCart = cart.find(c => c.selectedColorId == findColor.id)
                    if (productInCart) {
                        console.log("nuevo stock dependiendo del item en carrito", findColor.stock);
                        setAvailableStock(findColor.stock - productInCart.quantity);
                    } else {
                        console.log("nuevo stock", findColor.stock);
                        setAvailableStock(findColor.stock);
                    }
                }
            }
        }
    }, [getValues('selectedSizeId'), getValues('selectedColorId')]);

    // useEffect(() => {

    // }, [reset])

    // verificar si esta en el carrito para calcular cuantas unidades se pueden añadir al carrito
    const countAdd = () => {
        // const findSize = producto.sizes.find(s => s.id == getValues('selectedSize'))
        // console.log("findSize", findSize);

        // const findColor = findSize.colors.find(c => c.id == getValues('selectedColor'))
        // console.log("findColor", findColor);

        // const stock = findColor.stock
        // if (count < stock) {
        //     setCount(count + 1);
        // }
        if (count < availableStock) {
            setCount(count + 1);
        }
    }
    const countRemove = () => {

        if (count > 1) {
            setCount(count - 1);
        }
    }

    const onSubmit = (data) => {
        const findItem = cart.find(c => c.selectedColorId == data.selectedColorId)
        if (!findItem) {
            console.log("antes de agregar al carrito producto no encontrado en el carrito", data);
            const itemAgregado = addToCart(producto, count, data)
            setCount(1)
            setAvailableStock(prevStock => prevStock - count)
        } else {
            const totalQuantityToAdd = findItem.quantity + count
            console.log("total en el carrito si se agrega: ", totalQuantityToAdd);
            console.log("availableStock", availableStock);


            if (count <= availableStock) {
                console.log("antes de agregar al carrito se encontro el prod en el carrito", data);
                const itemAgregado = addToCart(producto, count, data)
                setCount(1)
                setAvailableStock(prevStock => prevStock - count)
            } else {
                console.log("stock agotado compraste TODOOOOOOOOOOOOO", availableStock);

            }

        }
        // console.log("no puedes superar el stock principal");

    };

    watch()
    // console.log("errors", errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='contador d-flex flex-column justify-content-center align-items-center py-3 gap-3 shadow-lg'>

                {/* SIZE */}
                <div className='d-flex w-100 justify-content-center align-items-center flex-column'>
                    <label htmlFor="size">Tamaños</label>
                    <div className='d-flex gap-2'>
                        {producto.sizes.map((size) => {
                            if (size.id == getValues('selectedSizeId')) {
                                return (
                                    <div key={size.id} style={{ width: "40px", height: "40px" }} className='d-flex justify-content-center align-items-center p-1 border border-secondary rounded shadow-lg'>
                                        <button type='button'
                                            className='btn rounded bg-white d-flex justify-content-center align-items-center'
                                            style={{ width: "35px", height: "35px" }}
                                            title={size.name}
                                            key={size.id}
                                            onClick={() => {
                                                // console.log("STOCKKKKKKKKKK",availableStock);

                                                setCount(1)
                                                setValue('selectedSizeId', size.id)
                                                setValue('selectedSizeName', size.name)
                                                setValue('selectedColorId', "")
                                                setValue('selectedColorName', "")
                                            }}
                                        >
                                            {size.name}
                                        </button>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={size.id} style={{ width: "40px", height: "40px" }} className='d-flex justify-content-center align-items-center p-1 rounded '>
                                        <button type='button'
                                            className='btn rounded bg-white d-flex justify-content-center align-items-center'
                                            style={{ width: "35px", height: "35px" }}
                                            title={size.name}
                                            key={size.id}
                                            onClick={() => {
                                                // console.log("STOCKKKKKKKKKK",availableStock);
                                                setCount(1)
                                                setValue('selectedSizeId', size.id)
                                                setValue('selectedSizeName', size.name)
                                                setValue('selectedColorId', "")
                                                setValue('selectedColorName', "")
                                            }}
                                        >
                                            {size.name}
                                        </button>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    {errors.selectedSize && <span className='mt-1 fontXS-Custom text-danger'>{errors.selectedSize.message} <span className='fw-semibold'>*</span></span>}
                </div>

                {/* COLOR */}
                <div className='d-flex w-100 justify-content-center align-items-center flex-column'>
                    <label htmlFor="color">Colores</label>
                    {watch('selectedSizeId') ? (
                        <div className='d-flex gap-2'>
                            {producto.sizes
                                .find(s => s.id == getValues('selectedSizeId'))
                                ?.colors.map((color) => {
                                    if (color.id == getValues('selectedColorId')) {
                                        return (
                                            <div key={color.id} className='d-flex p-1 border border-secondary rounded shadow-lg' title={color.name}>
                                                <button type='button'
                                                    className='btn rounded'
                                                    title={color.name}
                                                    style={{ minWidth: "30px", height: "30px", backgroundColor: `${color.value}` }}
                                                    key={color.id}
                                                    onClick={() => {
                                                        setCount(1)
                                                        setValue('selectedColorId', color.id)
                                                        setValue('selectedColorName', color.name)
                                                    }}

                                                >
                                                    {/* {color.name} */}
                                                </button>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={color.id} className='d-flex p-1 border border-light rounded '>
                                                <button type='button'
                                                    className='btn rounded '
                                                    title={color.name}
                                                    style={{ minWidth: "30px", height: "30px", backgroundColor: `${color.value}` }}
                                                    key={color.id}
                                                    onClick={() => {
                                                        setCount(1)
                                                        setValue('selectedColorId', color.id)
                                                        setValue('selectedColorName', color.name)
                                                    }}
                                                >
                                                    {/* {color.name} */}
                                                </button>
                                            </div>
                                        )
                                    }
                                }
                                )
                            }
                        </div>
                    ) : (
                        <div className='d-flex p-1 rounded shadow-lg' >
                            <button type='button'
                                className='btn rounded'
                                style={{ minWidth: "30px", height: "30px", backgroundColor: `white` }}
                            >
                            </button>
                        </div>
                    )}
                    {errors.selectedColor && <span className='mt-1 fontXS-Custom text-danger'>{errors.selectedColor.message} <span className='fw-semibold'>*</span></span>}
                </div>

                {/* CONTADOR */}
                {getValues('selectedSizeId') && getValues('selectedColorId') ? (
                    availableStock == 0 ? (
                        <div className='contadorControl d-flex align-items-center justify-content-center bg-secondary'>
                            <button type='button' className='text-white fw-bold' disabled>-</button>
                            <strong className='text-white fw-bold'>1</strong>
                            <button type='button' className='text-white fw-bold' disabled>+</button>
                        </div>
                    ) : (
                        <div className='contadorControl d-flex align-items-center justify-content-center bg-white'>
                            <button type='button' className=' text-dark fw-bold' onClick={countRemove}>-</button>
                            <strong className='text-dark fw-bold'>{count}</strong>
                            <button type='button' className='text-dark fw-bold' onClick={countAdd}>+</button>
                        </div>
                    )
                ) : (
                    <div className='contadorControl d-flex align-items-center justify-content-center bg-secondary'>
                        <button type='button' className='text-white fw-bold' disabled>-</button>
                        <strong className='text-white fw-bold'>1</strong>
                        <button type='button' className='text-white fw-bold' disabled>+</button>
                    </div>
                )}

                {availableStock == 0 && getValues('selectedColorId') ? <span className='text-danger'>Añadiste todo al carrito</span> : <span className='text-danger invisible'>stock agotado</span>}
                {/* BTN AÑADIR AL CARRITO */}
                {/* <button className='addCart' onClick={() => onAdd(count)}><b>Añadir al carrito</b></button> */}
                {getValues('selectedSizeId') && getValues('selectedColorId') ? (
                    <div className='d-flex flex-column btnAddCart'>
                        <span className='text-danger invisible'>asd</span>
                        {/* <button className='btn btn-primary rounded-0' type='submit'><b>Añadir al carrito</b></button> */}
                        {availableStock != 0 && <button className='btn btn-primary rounded-0 text-white' type='submit'>Añadir al carrito</button>}
                        {availableStock == 0 && <button type='button' className='btn btn-secondary w-100 rounded-0 text-white' disabled>Añadir al carrito</button>}
                    </div>
                ) : (
                    <div className='d-flex flex-column btnAddCart'>
                        {!getValues('selectedSizeId') ? (
                            <span className='text-danger'>Selecciona un talle</span>
                        ) : (
                            <span className='text-danger'>Selecciona un color</span>
                        )}
                        {/* <button className='btn btn-primary rounded-0' disabled><b>Añadir al carrito</b></button> */}

                        <button type='button' className='btn btn-secondary w-100 rounded-0 text-white' disabled>Añadir al carrito</button>
                    </div>
                )}
            </div>
            {/* <div>selectedSizeId: {getValues('selectedSizeId')}</div>
            <div>selectedColorId: {getValues('selectedColorId')}</div> */}
        </form >

    )
}
export default ItemCount;