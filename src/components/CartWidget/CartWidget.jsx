import React from "react";
import { BsBag } from "react-icons/bs";
import useStoreContext from "../../provider/storeProvider";
import "./CartWidget.css";

function CartWidget() {
  const { cantInCart } = useStoreContext();
  return (
    <div className="nav__CartSvgContainer">
      <BsBag className="cartIcon" />
      <span>{cantInCart()}</span>
    </div>
  );
}

export default CartWidget;
