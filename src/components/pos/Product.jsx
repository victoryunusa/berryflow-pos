import React, { useState } from "react";

import ProductModal from "./modals/ProductModal";
import { play_beep, textEllipsis } from "../../functions/functions";
import PopUpModal from "./modals/PopUpModal";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/pos/cartSlice";

const Product = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    //console.log(product);
    //dispatch(addItemToCart(product));
    if (product?.variants?.length > 0) {
      setOpenModal(true);
      console.log(product);
    } else {
      dispatch(addItemToCart(product));
      play_beep();
    }
  };

  //Decrease product quantity

  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <>
      <div
        onClick={() => handleAddToCart(product)}
        className="flex flex-col gap-2 justify-between bg-white shadow-md border rounded-md cursor-pointer h-36 p-3"
      >
        <div>
          <div className="flex flex-row justify-between items-center w-full gap-3">
            <div>
              <div className=" w-full space-y-2">
                <p className="text-xs md:text-xs font-normal text-neutral-700">
                  Code: {textEllipsis(product.product_code, 20)}
                </p>
                <p className="text-xs md:text-sm font-bold text-nelsa_primary">
                  {textEllipsis(product.name, 35)}
                </p>
              </div>
            </div>
            <img
              src={
                "https://pub-c53156c3afbd424aa9f8f46985cf39b7.r2.dev/nelsa-app/" +
                product?.images[0]?.filename
              }
              className="w-10 h-10 rounded"
              alt={product.name}
            />
          </div>

          <div className="flex flex-row justify-between w-full gap-3 mt-6">
            <div className=" w-full">
              {product?.discount_code && (
                <p className="text-sm md:text-xs text-green-500">
                  Discount: {product?.discount_code?.discount_percentage}%
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <span className="self-end font-bold text-xs md:text-lg text-neutral-700">
              ₦
              {dollarUSLocale.format(
                parseFloat(product.price_including_tax).toFixed(2)
              )}
            </span>
          </div>
          <div className="">
            <button
              className="px-2 py-1 flex items-center justify-center text-white font-semibold rounded bg-nelsa_primary hover:bg-nelsa_primary/80 w-full"
              //onClick={() => handleAddToCart({ name: "Chicken" })}
            >
              <span className="text-xs">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
      {openModal && <PopUpModal setOpen={setOpenModal} product={product} />}
    </>
  );
};

export default Product;
