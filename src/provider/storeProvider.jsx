import { createContext } from 'react';
import { useContext, useState, useEffect } from 'react';
import config from '../../config.js';
import { getProductsBySubdomain, getConfigBySubdomain, createBuyOrder } from '../fetch/fetch.js';
import toast from 'react-hot-toast';

const StoreContext = createContext();
const useStoreContext = () => useContext(StoreContext);

const { Provider } = StoreContext;



export function StoreContextProvider({ children }) {
    const [loading, setLoading] = useState(true); //esto necesario para manejar la renderizaciones 
    const [loadingConfig, setLoadingConfig] = useState(true); //esto necesario para manejar la renderizaciones 
    
    const [cart, setCart] = useState([]);
    const [token, settoken] = useState()
    const [products, setProducts] = useState(null)
    const [configStore, setConfigStore] = useState(null)
    const [toastId, setToastId] = useState(null);

    useEffect(() => {

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        const hostname = window.location.hostname;
        const subdomainAndDomain = hostname.split('.')[0];
        const subdomain = hostname.split('-')[0];
        console.log("host", hostname);
        console.log("subdomainAndDomain", subdomainAndDomain);
        console.log("subdomainAndDomain", subdomainAndDomain);
        
        document.title = capitalizeFirstLetter(subdomain)

        getProductsBySubdomainContext()
        getConfigBySubdomainContext()


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


    const addToCart = (item, cant, data) => {
        let itemExists = false;
        const newCart = cart.map(cartItem => {
            if (cartItem.id === item.id) {
                if (cartItem.selectedSizeId === data.selectedSizeId && cartItem.selectedColorId === data.selectedColorId) {
                    
                    let copyItem = { ...cartItem };
                    copyItem.quantity += cant;
                    console.log("producto existente en el carrito con mismo size y color, agregando mas quantity", copyItem);
                    itemExists = true;
                    return copyItem;
                }
            }
            return cartItem;
        });

        if (!itemExists) {
            const newItem = {
                id: item.id,
                selectedSizeId: data.selectedSizeId,
                selectedSizeName: data.selectedSizeName,
                selectedColorValueHexa: data.selectedColorValueHexa,
                selectedColorId: data.selectedColorId,
                selectedColorName: data.selectedColorName,
                image: data.image,
                price: data.price,
                name: data.name,
                quantity: cant,
                categoires: item.categories
            };
            setCart([...newCart, newItem]);
            console.log("producto nuevo añadido al carrito: ", newItem);
        } else {
            setCart(newCart);
        }
    }

    const removeFromCart = (idColor) => {
        const newCart = [...cart];
        const cartFilter = newCart.filter(item => {
            return item.selectedColorId !== idColor;
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
            // metadatos no son necesarios
            // metadata: {
            //     email: inputEmail
            // }
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

    const calculateTotalStock = (sizes) => {
        let totalStock = 0;
        sizes.forEach(size => {
            size.colors.forEach(color => {
                totalStock += color.stock;
            });
        });
        return totalStock;
    };

    const getProductsBySubdomainContext = async () => {
        const products = await getProductsBySubdomain()
        console.log("products desd context", products);

        setProducts(products)
        setLoading(false)
    }

    function getItemsByPrimaryCategoryContext(categoryId) {
        const prod = []
        const filteredItems = products.filter(item => {
            item.categories.filter(cat => {
                if (cat.categoria.id == categoryId) {
                    prod.push(item)
                }
            })

        });
        return prod
    }

    const getConfigBySubdomainContext = async () => {
        const config = await getConfigBySubdomain()
        console.log("config desde provider", config);
        
        setConfigStore(config)
        setLoadingConfig(false)
    } 

    function getItemsBySecondaryCategoryContext(subcategoryid) {
        const prod = []
        const filteredItems = products.filter(item => {
            item.categories.filter(cat => {
                if (cat.subCategoria.id == subcategoryid) {
                    prod.push(item)
                }
            })

        });
        return prod
    }

    function getItemsByTerciaryCategoryContext(subsubcategoryid) {
        const prod = []
        const filteredItems = products.filter(item => {
            item.categories.filter(cat => {
                if (cat.subSubCategoria.id == subsubcategoryid) {
                    prod.push(item)
                }
            })

        });
        return prod
    }

    function getItemContext(id) {
        const prod = products.find(prod => prod.id == id)
        return prod
    }

    // TOASTS

    const toastStyles = {
        minWidth: window.innerWidth < 1000 ? '80%' : '480px',
        maxWidth: window.innerWidth < 1000 ? '80%' : '480px',
        fontSize: '.8rem',
    }


    const toastLoading = (msg) => {
        const id = toast.loading(
            <div>
                <p className="mb-0">{msg}</p>
            </div>,
            {
                id: toastId,
                style: toastStyles
            }
        );
        setToastId(id);
        return id;
    };

    const toastSuccess = (msg, toastId) => {
        toast.success(
            <div>
                <p className="mb-0">{msg}</p>
            </div>,
            {
                id: toastId,
            }
        );
        setToastId(null); // Clear the toastId after success
    };

    const toastError = (msg, toastId) => {
        toast.error(
            msg,
            {
                id: toastId,
            }
        );
        setToastId(null); // Clear the toastId after error
    };

    const dismissToast = () => {
        // if (toastId) {
        // toast.dismiss(toastId);
        toast.dismiss();
        setToastId(null);
        // }
    };

    return (
        <Provider value={{
            loading,
            calculateTotalStock,
            cantInCart,
            calcPriceCart,
            cleanCart,
            getItemFromCart,
            cart,
            addToCart,
            removeFromCart,
            token,
            settoken,
            logout,
            createBuyOrder,
            handleBuy,
            calcPriceFinal,
            products,
            getItemsByPrimaryCategoryContext,
            getItemsBySecondaryCategoryContext,
            getItemsByTerciaryCategoryContext,
            getItemContext,
            getConfigBySubdomainContext,
            configStore,
            loadingConfig,
            toastLoading,
            toastSuccess,
            toastError,
            dismissToast
        }}
        >
            {children}
        </Provider>
    )
}

export default useStoreContext;