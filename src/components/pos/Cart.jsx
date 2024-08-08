import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, getTotals } from "../../features/pos/cartSlice";

const Cart = () => {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const lastElement = cartItems && cartItems?.length - 1;

  return (
    <div className="flex flex-col ">
      {cartItems.length >= 1 ? (
        cartItems.map((cartItem, index) => (
          <div key={index}>
            <CartItem cartItem={cartItem} />
            <hr className={` ${lastElement == index ? "hidden" : "block"}`} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center text-sm mt-20">
          <p>Please add items this order</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
