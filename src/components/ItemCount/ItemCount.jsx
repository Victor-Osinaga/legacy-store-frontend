import React from 'react';
import { useState } from 'react';
import './ItemCount.css';

function ItemCount({ titulo, stock, initial, onAdd, producto, initialColor, initialSize }) {
    const [count, setCount] = useState(initial);
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [selectedSize, setSelectedSize] = useState(initialSize);

    const countAdd = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    }

    const countRemove = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    return (
        <div className='contador'>
            {/* <h4>{titulo}</h4> */}
            <div className='d-flex w-100 justify-content-center align-items-center'>
                <label htmlFor="size">Selecciona Tamaño:</label>
                <select className='ms-2 w-25 customSelect' id="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                    {/* <option value="">Seleccionar tamaño</option> */}
                    {producto.size.map((size, index) => {
                        return (
                            <option key={index} value={size}>{size}</option>
                        );
                    })}
                </select>
            </div>
            <div className='d-flex w-100 justify-content-center align-items-center'>
                <label htmlFor="color">Selecciona Color:</label>
                <select className='ms-2 w-25 customSelect' id="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                    {/* <option value="">Seleccionar color</option> */}
                    {producto.color.map((color, index) => {
                        return (
                            <option key={index} value={color}>{color}</option>
                        );
                    })}
                </select>
            </div>
            {/* <div>Cantidad</div> */}
            <div className='contadorControl'>
                <button onClick={countRemove}>-</button>
                <strong>{count}</strong>
                <button onClick={countAdd}> + </button>
            </div>
            <button className='addCart' onClick={() => onAdd(count, selectedColor, selectedSize)}><b>Añadir al carrito</b></button>
        </div>
    )
}
export default ItemCount;