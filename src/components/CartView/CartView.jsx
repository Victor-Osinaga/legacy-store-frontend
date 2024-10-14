import useStoreContext from "../../provider/storeProvider";
import { Link } from "react-router-dom";
import "./CartView.css";
import getTextColor from "../../utils/getTextColor.js";

function CartView() {
  const { cart, removeFromCart, cleanCart, calcPriceCart, configStore } =
    useStoreContext();
  console.log("carrito: ", cart);

  if (cart.length === 0) {
    return (
      <section
        style={{
          backgroundColor: `${configStore.colors.tertiaryColorStore}`,
          color: `${getTextColor(configStore.colors.tertiaryColorStore)}`,
          minHeight: "calc(100vh - var(--navHeight))",
          padding: "3rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <div> */}
        <h4>No hay productos en tu carrito</h4>
        <Link
          to="/"
          style={{
            color: "inherit",
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          Volver al catálogo
        </Link>
        {/* </div> */}
      </section>
    );
  } else {
    return (
      <div
        style={{
          color: "white",
          minHeight: "calc(100vh - var(--navHeight))",
          padding: "3rem 0",
          backgroundColor: `${configStore.colors.tertiaryColorStore}`,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "2rem",
              color: `${getTextColor(configStore.colors.secondaryColorStore)}`,
            }}
          >
            Carrito de Compras
          </h1>
          <div style={{ display: "grid", gap: "2rem" }}>
            {/* <div style={{ display: 'grid', gap: '1.5rem' }}> */}
            {cart.map((item) => (
              <div
                className="cartItem"
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 100px",
                  alignItems: "center",
                  gap: "1rem",
                  backgroundColor: `${configStore.colors.secondaryColorStore}`,
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  color: `${getTextColor(
                    configStore.colors.secondaryColorStore
                  )}`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "0.5rem",
                    objectFit: "cover",
                    aspectRatio: "1",
                  }}
                />
                <div>
                  {/* <h3 style={{ fontWeight: '600' }}>{item.name} <h6><span>(${item.price} c/u)</span></h6> </h3> */}
                  <h5 style={{ fontWeight: "600" }}>{item.name}</h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      gap: "0rem",
                      fontSize: ".75rem",
                    }}
                  >
                    {/* <span>Cantidad: {item.quantity}</span>
                                            <span>Talla: {item.selectedSizeName}</span>
                                            <span>Color: {item.selectedColorName}</span> */}
                    <p className="m-0">Cantidad: {item.quantity}</p>
                    <p className="m-0">Talla: {item.selectedSizeName}</p>
                    <div className="d-flex gap-2 justify-content-center align-items-center">
                      <p className="m-0">Color: {item.selectedColorName}</p>
                      <span
                        className="rounded"
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: `${item.selectedColorValueHexa}`,
                          display: "flex",
                          border: `1px solid ${getTextColor(
                            configStore.colors.secondaryColorStore
                          )}`,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>
                    ${(item.quantity * item.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.selectedColorId)}
                    style={{
                      // backgroundColor: 'transparent',
                      // border: '1px solid danger',
                      // color: 'white',
                      // padding: '0.25rem 0.5rem',
                      // borderRadius: '0.25rem',
                      // cursor: 'pointer',
                      marginTop: "0.5rem",
                    }}
                    type="button"
                    className="btn btn-outline-danger btn rounded"
                    title="Eliminar producto"
                  >
                    {/* <DeleteIcon /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color: "inherit" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {/* </div> */}
            <div style={{ display: "grid", gap: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: `${getTextColor(
                    configStore.colors.secondaryColorStore
                  )}`,
                }}
              >
                <span style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                  Total sin envio: ${calcPriceCart()}
                </span>
                {/* <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>$111111</span> */}
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={cleanCart}
                  style={{
                    flex: 1,
                    // padding: '0.75rem',
                    // backgroundColor: 'transparent',
                    // border: '1px solid white',
                    // color: 'white',
                    // borderRadius: '0.25rem',
                    // cursor: 'pointer'
                  }}
                  type="button"
                  className="btn btn-outline-light btn rounded"
                  title="Eliminar producto"
                >
                  Vaciar Carrito
                </button>
                <Link
                  to="/checkout"
                  className="btnCheckout btn rounded text-white"
                  style={{
                    flex: 1,
                  }}
                >
                  <button>CHECKOUT</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartView;
