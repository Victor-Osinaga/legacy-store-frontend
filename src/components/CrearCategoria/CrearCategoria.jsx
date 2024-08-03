import './CrearCategoria.css'
import { useEffect, useState } from "react"
import { createCategory, getCategorias } from "../../fetch/fetch.js"
import toast, { Toaster } from 'react-hot-toast';
import toastCreateHandle from '../../toasts/create/toastCreate.jsx';


export default function CrearCategoria() {
  const [categories, setCategories] = useState([
    {
      name: '',
      subCategories: [
        {
          name: '',
          categories: [
            { name: '' }
          ]
        }
      ]
    }
  ]);

  const addSubcategory = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subCategories.push({
      name: '',
      categories: []
    });
    setCategories(updatedCategories);
  };

  const addSubsubcategory = (categoryIndex, subcategoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subCategories[subcategoryIndex].categories.push({});
    setCategories(updatedCategories);
  };

  const handleCategoryNameChange = (event, categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].name = event.target.value;
    setCategories(updatedCategories);
  };

  const handleSubcategoryNameChange = (event, categoryIndex, subcategoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subCategories[subcategoryIndex].name = event.target.value;
    setCategories(updatedCategories);
  };

  const handleSubsubcategoryChange = (event, categoryIndex, subcategoryIndex, subsubIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subCategories[subcategoryIndex].categories[subsubIndex].name = event.target.value;
    setCategories(updatedCategories);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const toastId = toast.loading(
      <div>Guardando: <strong>"{categories[0].name}"</strong>...</div>,
      {
        style: {
          position: 'relative',
          minWidth: '480px',
          zIndex: '1000000'
        }
      }
    );
    try {
      const result = await createCategory(categories[0]);
      // Si la solicitud fue exitosa, no hay error para manejar aquí
      console.log("x", result);
      if(result){
        toastCreateHandle({
          toastId,
          msgSuccess: <>
            Categoria creada: <strong>"{result.data.name}"</strong>...
          </>
        });
      }
    } catch (error) {
      // Si se produce un error, manejarlo aquí
      toastCreateHandle({
        toastId,
        msgError: <>
          <p>Estado: <strong>{error.statusText} - {error.status}</strong></p>
          <p>Desde back: <strong>{error.msgBack}</strong></p>
          <p>Desde front: <strong>{error.msgFront}</strong></p>
        </>
      });
    }
    // event.preventDefault();
    // const toastId = toast.loading(<div>Guardando: <strong>"{categories[0].name}"</strong>...</div>, {
    //   style: {
    //     position: 'relative',
    //     minWidth: '380px',
    //     zIndex: '1000000',
    //   },
    // });

    // try {
    //   // IMPLEMENTAR TOASTS
    //   const result = await createCategory(categories[0])
    //   console.log("RESULT",result);

    //   if (result) {
    //     toast.success(<div>Categoria creada: <strong>"{categories[0].name}"</strong>...</div>, {
    //       id: toastId
    //     });
    //   }
    // } catch (error) {
    //   toast.error(
    //   <div className='text-start'>
    //     <p>Ocurrió un error:</p>
    //     <p>Estado: {error.statusText} : {error.status}</p>
    //     <p>Desde back: {error.msgBack}</p>
    //     <p>Desde front: {error.msgFront}</p>
    //   </div>, 
    //   {
    //     id: toastId
    //   });
    //   console.log("DESDE CATCH", error.statusText, error.status, error.msgBack, error.msgFront);
    // }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />

      <form onSubmit={handleSubmit} className='crearCategoria'>
        {categories.map((category, categoryIndex) => (
          <div className='d-flex flex-column align-items-center p-4' key={categoryIndex}>
            <label>1-Categoria</label>
            <input
              type="text"
              placeholder="Nombre de la categoría principal"
              value={category.name}
              onChange={(e) => handleCategoryNameChange(e, categoryIndex)}
              required
              className='customSelect mb-2'
            />
            <button className='mb-5' onClick={() => addSubcategory(categoryIndex)}>Añadir subcategoría</button>
            <div className='d-flex flex-wrap gap-5'>
              {category.subCategories.map((subcategory, subcategoryIndex) => (
                <div className='d-flex flex-column' key={subcategoryIndex}>

                  <label>2-Sub Categoria</label>
                  <input
                    type="text"
                    placeholder="Nombre de la subcategoría"
                    value={subcategory.name}
                    onChange={(e) => handleSubcategoryNameChange(e, categoryIndex, subcategoryIndex)}
                    required
                    className='w-100 customSelect mb-2'
                  />
                  <button className='mb-5' onClick={() => addSubsubcategory(categoryIndex, subcategoryIndex)}>Añadir subsubcategoría</button>

                  {subcategory.categories.map((subsubcategory, subsubIndex) => (
                    <div className='d-flex flex-column ' key={subsubIndex}>
                      <label>3-SubSub categoria</label>
                      <input
                        type="text"
                        placeholder="Nombre de la subsubcategoría"
                        value={subsubcategory.name}
                        onChange={(e) => handleSubsubcategoryChange(e, categoryIndex, subcategoryIndex, subsubIndex)}
                        required
                        className='mb-2 customSelect'
                      />
                      {/* <button onClick={() => {

                      }}>Eliminar subsubcategoria</button> */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type='sumbit'>Crear</button>
      </form>
    </>
  );
}