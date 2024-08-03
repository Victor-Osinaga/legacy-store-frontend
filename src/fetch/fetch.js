import config from "../../config.js";

async function getItems() {
    const response = await fetch(`${config.API_BASE_URL}/products`);
    const json = await response.json()
    // return json.data
    const itemsWithQuantity = json.data.map(item => {
        return {
            ...item,
            quantity: 1 // aquí puedes establecer cualquier valor predeterminado que desees
        };
    });
    // console.log("con qunatity", itemsWithQuantity);
    return itemsWithQuantity;
}

async function login(obj){
  const result = await fetch(`${config.API_BASE_URL}/users/login`,    
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  })
  const json = await result.json()
  console.log(json);
  return json
}

async function getOrders(token){
  const result = await fetch(`${config.API_BASE_URL}/orders/`, 
  {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })
  const json = await result.json()
  // console.log(json);
  return json
}

async function createProduct(token, product){
  console.log("--------------------------");
  product.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  try {
    const response = await fetch(`${config.API_BASE_URL}/products/`, 
  {
    headers: { Authorization: `Bearer ${token}` },
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: product,
  })

  if (!response.ok) {
    const json = await response.json()
    throw {statusText: response.statusText, status: response.status, msgBack: json.data, msgFront: "Datos erroneos" }
  }

  const json = await response.json()
  return json
  } catch (error) {
    throw error;
  }
}

async function createCategory(category) {
  try {
    const access_token = sessionStorage.getItem('access_token');
    const result = await fetch(`${config.API_BASE_URL}/categories/`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
      body: JSON.stringify(category),
    })

    if (!result.ok) {
      const json = await result.json()
      throw {statusText: result.statusText, status: result.status, msgBack: json.data, msgFront: "Datos erroneos" }
    }

    const json = await result.json();
    return json;
  } catch (error) {
    throw error;
  }
}

async function getItem(id) {
    const item = await fetch(`${config.API_BASE_URL}/products/${id}`);
    const itemJson = await item.json()
    console.log("JSON", itemJson);
    return {
        ...itemJson.data,
        quantity: 1
    }
}

async function getItemClear(id) {
  const item = await fetch(`${config.API_BASE_URL}/products/${id}`);
  const itemJson = await item.json()
  console.log("JSON", itemJson);
  return itemJson.data
  
}

async function getItemsByPrimaryCategory(category) {
    const productos = await getItems()
    console.log("2",productos);
    const prod = []
    const filteredItems = productos.filter(item => {
      
      item.categories.filter(cat => {
        if(cat.categoria.id == category){
          prod.push(item)
        }
        
      }) 
      
    });
    // console.log("LOS PRODUCTOS", prod);
    return prod
}

async function getItemsBySecondaryCategory(subCategory) {
  const productos = await getItems()
  const prod = []
  console.log("prodddddddd", productos);
    const filteredItems = productos.filter(item => {
      
      item.categories.filter(cat => {
        if(cat.subCategoria.id == subCategory){
          prod.push(item)
        }
        
      }) 
      
    });
    console.log("LOS PRODUCTOS", prod);
    return prod
}

async function getItemsByTerciaryCategory(subSubCategory) {
  const productos = await getItems()
  const prod = []
    const filteredItems = productos.filter(item => {
      
      item.categories.filter(cat => {
        if(cat.subSubCategoria.id == subSubCategory){
          prod.push(item)
        }
        
      }) 
      
    });
    // console.log("LOS PRODUCTOS", prod);
    return prod
}

async function createBuyOrder(orderData){
  const result = await fetch(`${config.API_BASE_URL}/orders/payment`, 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  const json = await result.json()
  console.log(json);
  }

  async function getCategorias(){
    const result = await fetch(`${config.API_BASE_URL}/categories/`,  
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await result.json()
    // console.log(json);
    return json
    }

    async function updateCategoryById(id, newCategory){
      const access_token = sessionStorage.getItem('access_token');
      const result = await fetch(`${config.API_BASE_URL}/categories/${id}`, 
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
        body: JSON.stringify(newCategory)
      })
      const json = await result.json()
      console.log(json);
      return json
      }

export {
    getItems,
    getItem,
    getItemsByPrimaryCategory,
    getItemsBySecondaryCategory,
    getItemsByTerciaryCategory,
    createBuyOrder,
    login,
    getOrders,
    createProduct,
    getItemClear,
    getCategorias,
    createCategory,
    updateCategoryById
}