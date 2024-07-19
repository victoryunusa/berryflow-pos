import React from "react";
import CartItem from "./CartItem";

const Cart = () => {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  return (
    <div className=" bg-zinc-100 border rounded-xl">
      <div className="p-1 md:p-2.5 overflow-y-auto h-[130px] md:h-[320px]">
        {/* {cartItems.length >= 1 ? (
      cartItems.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.id} />
      ))
    ) : (
      <div className="flex items-center justify-center text-sm mt-20">
        <p>Please add items to your cart</p>
      </div>
    )} */}
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="">
        <div className="flex flex-col bg-white rounded-b-xl p-4 gap-2">
          <div className="flex w-full rounded-lg gap-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter coupon code"
              className="w-full rounded-l-lg border-l px-3 border-zinc-200 bg-zinc-50"
            />
            <button className="bg-black text-white text-sm font-semibold p-3 rounded-r-lg focus-none">
              Apply
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between ">
              <span className="font-semibold text-sm">Subtotal</span>
              <span className="font-bold">
                ₦ {dollarUSLocale.format(Math.round(1000))}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="font-semibold text-sm">Discount</span>
              <span className="font-bold">- ₦0.00</span>
            </div>
            <div className="flex justify-between ">
              <span className="font-semibold text-sm">Shipping</span>
              <span className="font-bold">₦2.25</span>
            </div>
            <div className="border-t border-zinc-200 flex items-center justify-between">
              <span className="font-semibold text-2xl">Total</span>
              <span className="font-bold text-2xl">
                ₦ {dollarUSLocale.format(Math.round(1000))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
