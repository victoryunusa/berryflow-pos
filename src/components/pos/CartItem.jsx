import React from "react";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  decrease,
  getTotals,
  removeFromCart,
  updateItemQuantity,
} from "../../features/pos/cartSlice";

const CartItem = ({ cartItem }) => {
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

  const handleChangeQuantity = ({ pseudoId, value }) => {
    dispatch(updateItemQuantity({ pseudoId, new_quantity: value }));
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
    console.log(cartItem);
  };
  return (
    <div className="flex flex-row justify-between p-2.5">
      <div className="w-1/2">
        <span className="text-xs font-semibold truncate">
          {cartItem.name.substring(0, 25)}
        </span>
        {Object.keys(cartItem.item_variations.variations).length !== 0 && (
          <span>
            <p className="text-xs text-neutral-600 font-normal">
              Variation:{" "}
              {Object.values(cartItem.item_variations.names).map(
                (variation, index) => (
                  <span className="text-xs text-neutral-500 font-normal">
                    {variation}
                    {", "}
                  </span>
                )
              )}
            </p>
          </span>
        )}

        {cartItem.item_extras.extras.length > 0 && (
          <span>
            <p className="text-xs text-neutral-600 font-normal">
              Extra:{" "}
              {cartItem.item_extras.names.map((extra, index) => (
                <span className="text-xs text-neutral-500 font-normal">
                  {extra}
                  {", "}
                </span>
              ))}
            </p>
          </span>
        )}
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
            value={cartItem.quantity}
            onChange={(e) =>
              handleChangeQuantity({
                pseudoId: cartItem.pseudoId,
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
      <div className=" w-20 flex justify-between">
        <h1 className="font-semibold text-xs">
          ₦{" "}
          {dollarUSLocale.format(
            Math.round(
              (cartItem.price * 1 +
                cartItem.item_variation_total +
                cartItem.item_extra_total) *
                cartItem.quantity
            )
          )}
        </h1>
      </div>
      <div>
        <button
          className="rounded-md text-white bg-red-500 text-sm h-5 w-5"
          onClick={() => handleRemoveFromCart(cartItem)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CartItem;
