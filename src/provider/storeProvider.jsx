import { createContext } from 'react';
import { useContext, useState, useEffect } from 'react';
import config from '../../config.js';

const StoreContext = createContext();
const useStoreContext = () => useContext(StoreContext);

const { Provider } = StoreContext;



export function StoreContextProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [token, settoken] = useState()

    useEffect(() => {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token) {
            settoken(true)
            console.log('Hay datos en session storage', token);
        } else {
            settoken(false)
            console.log('No hay datos en session storage', token);
        }
    }, [token]);

    const logout = () => {
        if (sessionStorage.getItem('access_token')) {
            sessionStorage.removeItem('access_token')
            settoken(false)
            console.log("deslogeado");
        } else {
            console.log("no logueado");
        }
    }

    const getProvincias = ()=>{
        return [
            {
                id: "1",
                categoria: "Provincia",
                nombre: "Santa Cruz"
            },
            {
                id: "2",
                categoria: "Provincia",
                nombre: "San Luis"
            },
            {
                id: "3",
                categoria: "Provincia",
                nombre: "San Juan"
            },
            {
                id: "4",
                categoria: "Provincia",
                nombre: "Entre Ríos"
            },
            {
                id: "5",
                categoria: "Provincia",
                nombre: "Misiones"
            },
            {
                id: "6",
                categoria: "Provincia",
                nombre: "Río Negro"
            },
            {
                id: "7",
                categoria: "Provincia",
                nombre: "Chubut"
            },
            {
                id: "8",
                categoria: "Provincia",
                nombre: "Córdoba"
            },
            {
                id: "9",
                categoria: "Provincia",
                nombre: "Mendoza"
            },
            {
                id: "10",
                categoria: "Provincia",
                nombre: "La Rioja"
            },
            {
                id: "11",
                categoria: "Provincia",
                nombre: "Catamarca"
            },
            {
                id: "12",
                categoria: "Provincia",
                nombre: "La Pampa"
            },
            {
                id: "13",
                categoria: "Provincia",
                nombre: "Santiago del Estero"
            },
            {
                id: "14",
                categoria: "Provincia",
                nombre: "Corrientes"
            },
            {
                id: "15",
                categoria: "Provincia",
                nombre: "Santa Fe"
            },
            {
                id: "16",
                categoria: "Provincia",
                nombre: "Tucumán"
            },
            {
                id: "17",
                categoria: "Provincia",
                nombre: "Neuquén"
            },
            {
                id: "18",
                categoria: "Provincia",
                nombre: "Salta"
            },
            {
                id: "19",
                categoria: "Provincia",
                nombre: "Chaco",
            },
            {
                id: "20",
                categoria: "Provincia",
                nombre: "Formosa"
            },
            {
                id: "21",
                categoria: "Provincia",
                nombre: "Jujuy",
            },
            {
                id: "22",
                categoria: "Ciudad Autónoma",
                nombre: "Ciudad Autónoma de Buenos Aires"
            },
            {
                id: "23",
                categoria: "Provincia",
                nombre: "Buenos Aires"
            },
            {
                id: "24",
                categoria: "Provincia",
                nombre: "Tierra del Fuego"
            }
        ]
    }


    const addToCart = (item, cant, selectedColor, selectedSize) => {
        if (isInCart(item.id)) {
            const newCart = cart.map(cartItem => {
                if (cartItem.id === item.id) {
                    const copyItem = { ...cartItem };
                    copyItem.quantity += cant;
                    copyItem.color = [selectedColor]
                    copyItem.size = [selectedSize]
                    return copyItem;
                } else {
                    return cartItem;
                }
            })
            setCart(newCart);
        } else {
            const newItem = { ...item, color: [selectedColor], size: [selectedSize], quantity: cant };
            console.log("new item", newItem)
            setCart([...cart, newItem]);
        }
    }

    const createBuyOrder = async (orderData) => {
        const result = await fetch(`${config.API_BASE_URL}/orders/payment`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            })
        const json = await result.json()
        return json
    }

    const removeFromCart = (id) => {
        const newCart = [...cart];
        const cartFilter = newCart.filter(item => {
            return item.id !== id;
        });
        setCart(cartFilter)
    }

    const cleanCart = () => {
        setCart([]);
    }

    const isInCart = (id) => {
        return cart.some(itemCart => itemCart.id === id)
    }

    const getItemFromCart = (id) => {
        return cart.find(itemCart => itemCart.id === id)
    }

    const cantInCart = () => {
        let total = 0;
        cart.forEach(itemCart => {
            total += itemCart.quantity
        })
        return total;
    }

    const calcPriceCart = () => {
        let total = 0;
        cart.forEach(itemCart => {
            total += itemCart.quantity * itemCart.price
        })
        return total;
    }

    const calcPriceFinal = (products, costShipment) => {
        let total = 0;
        products.forEach(itemCart => {
            total += itemCart.quantity * itemCart.price
        })
        return total + costShipment
    }

    const handleBuy = async () => {
        let inputName = document.getElementById('name').value;
        let inputSurname = document.getElementById('surname').value;
        let inputEmail = document.getElementById('email').value;
        let inputAreaCode = document.getElementById('areaCode').value
        let inputNumber = document.getElementById('phone').value
        let inputStreetName = document.getElementById('streetName').value
        let inputStreetNumber = document.getElementById('streetNumber').value
        let inputZipCode = document.getElementById('zipCode').value
        let inputStateName = document.getElementById('stateName')

        let selectedName;
        let selectedId;
        const selectElement = document.getElementById('stateName')
        var selectedIndex = selectElement.selectedIndex;
        var selectedOption = selectElement.options[selectedIndex];
        
        var selectedValue = selectedOption.value;
        var selectedOptionId = selectedOption.id;
        console.log("ID y VALUE del option seleccionado: " + selectedOptionId, selectedValue);

        let inputCityName = document.getElementById('cityName').value

        const itemsToBuy = cart.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            categories: item.categories,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            pesoGramos: item.pesoGramos
        }
        ))

        const buyOrder = {
            products: itemsToBuy,
            payer: {
                name: inputName,
                surname: inputSurname,
                email: inputEmail,
                phone: {
                    area_code: inputAreaCode,
                    number: inputNumber
                },
                address: {
                    street_name: inputStreetName,
                    street_number: inputStreetNumber,
                    zip_code: inputZipCode
                }
            },
            shipments: {
                receiver_address: {
                    zip_code: inputZipCode,
                    state_name: selectedValue,
                    city_name: inputCityName,
                    street_name: inputStreetName,
                    street_number: inputStreetNumber,
                    state_id: selectedOptionId
                }
            },
            metadata: {
                email: inputEmail
            }
        }

        console.log("carritooo", cart);
        console.log("buy order", buyOrder.products);
        const result = await createBuyOrder(buyOrder);
        if (result.status === 'ok') {
            console.log("result desde context", result);
            cleanCart()
            result.buyOrder = buyOrder
            console.log("limpiando carrito", result);
            return result
        }
    }

    return (
        <Provider value={{ cantInCart, getProvincias, calcPriceCart, cleanCart, getItemFromCart, cart, addToCart, removeFromCart, token, settoken, logout, createBuyOrder, handleBuy, calcPriceFinal }}>
            {children}
        </Provider>
    )
}

export default useStoreContext;