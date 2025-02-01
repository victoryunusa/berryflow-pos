import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa6";
import {
  addItemToCart,
  decrease,
  getTotals,
  removeFromCart,
  updateItemQuantity,
} from "../../features/pos/cartSlice";
import { textEllipsis } from "../../functions/functions";

const CartItem = ({ cartItem }) => {
  const { user } = useSelector((state) => state.user);

  const { branches } = useSelector((state) => state.branches);

  const activeBranch = branches?.find(
    (branch) => branch.id === user?.branch_id
  );
  let dollarUSLocale = Intl.NumberFormat("en-US");

  const dispatch = useDispatch();

  //Add product to cart
  const handleAddToCart = (cartItem) => {
    dispatch(addItemToCart(cartItem));
  };

  //Decrease product quantity
  const handleDecreaseCart = (cartItem) => {
    dispatch(decrease(cartItem));
    dispatch(getTotals());
  };

  const handleChangeQuantity = ({ product_slug, value }) => {
    dispatch(updateItemQuantity({ product_slug, new_quantity: value }));
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
    console.log(cartItem);
  };
  return (
    <div className="flex flex-col py-3.5 px-3 border my-1 rounded-md bg-white">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center w-1/2">
          <span className="text-xs font-bold truncate">
            {textEllipsis(cartItem.name, 35)}
          </span>
        </div>
        <div className="flex items-center bg-white border p-1 rounded-md h-[1.75rem]">
          <button
            className="inline-flex items-center justify-center p-1 text-sm font-medium h-[1.25rem] w-[1.25rem] text-neutral-500 bg-white border border-neutral-300 rounded focus:outline-none hover:bg-neutral-100"
            type="button"
            onClick={() => {
              handleDecreaseCart(cartItem);
            }}
          >
            <span className="sr-only">Quantity button</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <div>
            <input
              type="number"
              value={cartItem.cart_quantity}
              onChange={(e) =>
                handleChangeQuantity({
                  product_slug: cartItem.product_slug,
                  value: e.target.value,
                })
              }
              className="bg-white w-10 text-center text-neutral-600 text-xs focus:outline-none block px-2 py-1"
              placeholder="1"
              required
            />
          </div>
          <button
            className="inline-flex items-center justify-center h-[1.25rem] w-[1.25rem] p-1 text-sm font-medium text-neutral-500 bg-white border border-neutral-300 rounded focus:outline-none hover:bg-neutral-100"
            type="button"
            onClick={() => {
              handleAddToCart(cartItem);
            }}
          >
            <span className="sr-only">Quantity button</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
        <div className=" w-20 flex justify-between ml-2">
          <h1 className="font-semibold text-xs">
            {activeBranch?.currency?.symbol}
            {dollarUSLocale.format(cartItem.price * cartItem.cart_quantity)}
          </h1>
        </div>

        <button
          className=" text-sm h-5 w-5"
          onClick={() => handleRemoveFromCart(cartItem)}
        >
          <FaIcons.FaXmark size={15} className="text-red-600" />
        </button>
      </div>
      <div>
        <p className="text-xs text-green-600">
          Discount Amount:{" "}
          {dollarUSLocale.format(
            cartItem.price *
              cartItem.cart_quantity *
              (cartItem.discount_percentage / 100)
          )}
        </p>
        <p className="text-xs text-neutral-500">
          Tax Amount:{" "}
          {dollarUSLocale.format(
            cartItem.price *
              cartItem.cart_quantity *
              (cartItem.tax_percentage / 100)
          )}
        </p>
      </div>
      {cartItem.customizable == 1 ? (
        <div>
          <span className="text-xs text-blue-500 font-semibold cursor-pointer">
            Modify
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default CartItem;
