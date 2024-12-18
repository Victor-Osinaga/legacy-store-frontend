import Item from "../Item/Item";
import "./ItemList.css";
import ItemNoStock from "../ItemNoStock/ItemNoStock";

function ItemList({ productos }) {
  // PARA RENDERIZAR PRODUCTOS SIN STOCK, PERO SE NECESITA QUE TODOS LOS SIZES.COLORS.STOCK SEAN 0
  // const renderProducts = () => {
  //   const items = [];

  //   productos.forEach(producto => {
  //     producto.sizes.forEach(size => {
  //       size.colors.forEach(color => {
  //         if (color.stock <= 0) {
  //           items.push(
  //             <ItemNoStock producto={producto} key={`${producto.id}-${size.id}-${color.id}`} />
  //           );
  //         } else {
  //           items.push(
  //             <Item producto={producto} key={`${producto.id}-${size.id}-${color.id}`} />
  //           );
  //         }
  //       });
  //     });
  //   });

  //   return items;
  // };

  // return (
  //   <div className='itemList'>
  //     {renderProducts()}
  //   </div>
  // )
  return (
    <div className="itemList">
      {productos.map((producto) => {
        if (producto.stock <= 0) {
          return <ItemNoStock producto={producto} key={producto.id} />;
        } else {
          return <Item producto={producto} key={producto.id} />;
        }
      })}
    </div>
  );
}

export default ItemList;
